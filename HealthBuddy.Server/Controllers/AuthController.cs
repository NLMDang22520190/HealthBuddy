using System.Text.Json;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.AUTH;
using HealthBuddy.Server.Repositories;
using HealthBuddy.Server.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly Auth0Service _auth0Service;

        public AuthController(IUserRepository userRepository, Auth0Service auth0Service)
        {
            _userRepository = userRepository;
            _auth0Service = auth0Service;
        }

        [HttpPost("login/email-password")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            try
            {
                var response = await _auth0Service.LoginAsync(request.Email, request.Password);
                var user = await _userRepository.GetUserByEmailAsync(request.Email);
                if (user == null)
                {
                    return BadRequest(new { error = "User not found with email " + request.Email });
                }
                return Ok(new
                {
                    token = response,
                    userID = user.UserId,
                    role = user.IsAdmin ? "admin" : "user"
                });
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequestDTO request)
        {
            try
            {
                var emailExists = await _userRepository.CheckEmailExistsAsync(request.Email);
                if (emailExists)
                {
                    return BadRequest(new { error = "Email already exists" });
                }
                var response = await _auth0Service.SignupAsync(request.Email, request.Password);

                var result = await _userRepository.CreateUserAsync(request.Email, request.Password, "EmailAndPassword");
                if (!result)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user");
                }

                return Ok(JsonSerializer.Deserialize<object>(response));
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            try
            {
                await _auth0Service.ForgotPasswordAsync(email);
                return Ok("Email sent");
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        #region SocialLogin

        [HttpGet("login/social")]
        public IActionResult LoginWithSocial([FromQuery] string provider, string returnUrl = "/")
        {
            if (string.IsNullOrEmpty(provider))
            {
                return BadRequest(new { error = "Provider is required (e.g., google, facebook)." });
            }

            var redirectUrl = Url.Action(nameof(Callback), "Auth", new { returnUrl = "https://healthbuddyyy.netlify.app/callback" });
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };

            // Phân biệt provider để định tuyến Auth0 connection
            if (provider.Equals("google", StringComparison.OrdinalIgnoreCase))
            {
                properties.Items["connection"] = "google-oauth2"; // Tên connection trên Auth0
            }
            else if (provider.Equals("facebook", StringComparison.OrdinalIgnoreCase))
            {
                properties.Items["connection"] = "facebook";
            }
            else
            {
                return BadRequest(new { error = "Invalid provider. Supported providers: google, facebook." });
            }

            return Challenge(properties, "Auth0");
        }

        // Callback sau khi login với Social
        [HttpGet("callback")]
        public IActionResult Callback(string returnUrl = "/")
        {
            return LocalRedirect(returnUrl);
        }

        // Đăng xuất
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme,
                OpenIdConnectDefaults.AuthenticationScheme);
        }

        #endregion

    }
}
