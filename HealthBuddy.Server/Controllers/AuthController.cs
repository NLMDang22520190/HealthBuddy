using System.Security.Claims;
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
                var lowerEmail = request.Email.ToLower();
                var user = await _userRepository.GetUserByEmailAndProviderAsync(lowerEmail, "EmailAndPassword".ToLower());
                if (user == null)
                {
                    return BadRequest(new { error = "No user found with this email:" + request.Email });
                }
                var response = await _auth0Service.LoginAsync(lowerEmail, request.Password);

                return Ok(new
                {
                    accessToken = response,
                    userId = user.UserId,
                    userRole = user.IsAdmin ? "admin" : "user",
                    provider = "EmailAndPassword"
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
                var lowerEmail = request.Email.ToLower();
                var emailExists = await _userRepository.CheckEmailExistWithProviderAsync(lowerEmail, "emailandpassword");
                if (emailExists)
                {
                    return BadRequest(new { error = "Email already exists" });
                }
                var response = await _auth0Service.SignupAsync(lowerEmail, request.Password);

                var result = await _userRepository.CreateUserAsync(request.Username, lowerEmail, request.Password, "emailandpassword");
                if (!result)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user");
                }

                return Ok("User created successfully. Please check your email to verify your account.");
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
                var lowerEmail = email.ToLower();
                var emailExists = await _userRepository.CheckEmailExistWithProviderAsync(lowerEmail, "emailandpassword");
                if (!emailExists)
                {
                    return BadRequest(new { error = "Email not found" });
                }
                await _auth0Service.ForgotPasswordAsync(lowerEmail);
                return Ok("Reset password email sent");
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        #region SocialLogin

        [HttpGet("social-login")]
        public IActionResult GetSocialLoginUrl(string provider, string returnUrl = "/")
        {
            if (string.IsNullOrEmpty(provider))
            {
                return BadRequest(new { error = "Provider is required (e.g., google, facebook)." });
            }

            var redirectUri = Url.Action("SocialCallback", "Auth", null, Request.Scheme);
            var loginUrl = _auth0Service.GetSocialLoginUrl(provider, redirectUri);

            return Ok(new { url = loginUrl });
        }


        [HttpGet("social-callback")]
        public async Task<IActionResult> SocialCallback(string code, string state)
        {
            try
            {
                var redirectUri = Url.Action("SocialCallback", "Auth", null, Request.Scheme);
                var authResult = await _auth0Service.HandleSocialCallbackAsync(code, redirectUri);

                // Sau khi xử lý, bạn có thể lưu người dùng vào database hoặc trả kết quả về frontend
                var lowerEmail = authResult.Email.ToLower();
                var lowerProvider = authResult.Provider.ToLower();
                var userExist = await _userRepository.CheckEmailExistWithProviderAsync(lowerEmail, lowerProvider);
                if (!userExist)
                {
                    var result = await _userRepository.CreateUserAsync(lowerEmail, lowerEmail, "", lowerProvider);
                }
                var user = await _userRepository.GetUserByEmailAndProviderAsync(lowerEmail, lowerProvider);

                // Tạo URL frontend và truyền token vào query string (hoặc sử dụng session/cookie)
                var frontendUrl = $"https://healthbuddyyy.netlify.app/callback?access_token={authResult.AccessToken}&user_id={user.UserId}&role={(user.IsAdmin ? "admin" : "user")}&provider={user.Provider}";

                // Redirect về frontend với các token
                return Redirect(frontendUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
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
