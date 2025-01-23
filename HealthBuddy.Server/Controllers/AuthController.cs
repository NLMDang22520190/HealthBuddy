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
                var emailExists = await _userRepository.CheckEmailExistWithProviderAsync(request.Email, "EmailAndPassword");
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
        public IActionResult LoginWithSocial([FromQuery] string provider, [FromQuery] string returnUrl)
        {
            if (string.IsNullOrEmpty(provider))
            {
                return BadRequest(new { error = "Provider is required (e.g., google, facebook)." });
            }

            if (string.IsNullOrEmpty(returnUrl))
            {
                return BadRequest(new { error = "Return URL is required." });
            }

            var properties = new AuthenticationProperties { RedirectUri = returnUrl };

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




        [HttpGet("callback")]
        public async Task<IActionResult> Callback(string returnUrl = "/")
        {
            var authenticateResult = await HttpContext.AuthenticateAsync("Auth0");

            if (!authenticateResult.Succeeded)
            {
                return BadRequest(new { error = "Authentication failed.", details = authenticateResult.Failure?.Message });
            }

            var user = authenticateResult.Principal;
            var email = user?.FindFirstValue(ClaimTypes.Email);
            var provider = user?.FindFirstValue("iss") ?? "";
            if (provider.Contains("google"))
                provider = "google";
            else if (provider.Contains("facebook"))
                provider = "facebook";

            var accessToken = authenticateResult.Properties.GetTokenValue("access_token");
            var idToken = authenticateResult.Properties.GetTokenValue("id_token");

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(idToken))
            {
                return BadRequest(new { error = "Invalid data from Auth0." });
            }

            // Kiểm tra người dùng trong cơ sở dữ liệu
            var existingUser = await _userRepository.GetUserByEmailAndProviderAsync(email, provider);
            if (existingUser == null)
            {
                // Nếu chưa tồn tại, tạo người dùng mới
                var result = await _userRepository.CreateUserAsync(email, "", provider); // Tạo người dùng với provider (nếu có)

                if (!result)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user");
                }

                // Sau khi tạo người dùng, lấy lại thông tin người dùng từ cơ sở dữ liệu
                existingUser = await _userRepository.GetUserByEmailAsync(email);
            }
            // Trả về access_token, id_token, userId và role
            return Ok(new
            {
                access_token = accessToken,
                id_token = idToken,
                userId = existingUser.UserId,
                role = existingUser.IsAdmin ? "admin" : "user"
            });
        }

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

        // [HttpGet("social-callback")]
        // public async Task<IActionResult> SocialCallback(string code, string state)
        // {
        //     try
        //     {
        //         var redirectUri = Url.Action("SocialCallback", "Auth", null, Request.Scheme);
        //         var authResult = await _auth0Service.HandleSocialCallbackAsync(code, redirectUri);

        //         // Sau khi xử lý, bạn có thể lưu người dùng vào database hoặc trả kết quả về frontend
        //         return Ok(new
        //         {
        //             authResult.AccessToken,
        //             authResult.IdToken,
        //             authResult.Email,
        //             authResult.Name,
        //             authResult.Provider
        //         });
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(new { error = ex.Message });
        //     }
        //}

        [HttpGet("social-callback")]
        public async Task<IActionResult> SocialCallback(string code, string state)
        {
            try
            {
                var redirectUri = Url.Action("SocialCallback", "Auth", null, Request.Scheme);
                var authResult = await _auth0Service.HandleSocialCallbackAsync(code, redirectUri);

                // Tạo URL frontend và truyền token vào query string (hoặc sử dụng session/cookie)
                var frontendUrl = $"https://healthbuddyyy.netlify.app/callback?access_token={authResult.AccessToken}&id_token={authResult.IdToken}";

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
