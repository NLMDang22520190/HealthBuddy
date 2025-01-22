using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.ServiceModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace HealthBuddy.Server.Services;

public class Auth0Service
{
    private readonly Auth0Settings _settings;
    private readonly HttpClient _httpClient;

    public Auth0Service(IOptions<Auth0Settings> options, IHttpClientFactory httpClientFactory)
    {
        _settings = options.Value;
        _httpClient = httpClientFactory.CreateClient();
    }

    // Login function
    public async Task<string> LoginAsync(string email, string password)
    {
        // Kiểm tra nếu email đã được xác minh
        var isEmailVerified = await IsEmailVerifiedAsync(email);
        if (!isEmailVerified)
        {
            // Gửi lại email xác minh nếu email chưa được xác nhận
            await SendVerificationEmailAsync(email);
            throw new HttpRequestException("Please verify your email before logging in. A verification link has been sent.");
        }

        // Nếu email đã được xác minh, tiến hành đăng nhập
        var body = new
        {
            grant_type = "password",
            username = email,
            password = password,
            client_id = _settings.ClientId,
            client_secret = _settings.ClientSecret,
            audience = _settings.Audience,
            connection = "Username-Password-Authentication"
        };

        var response = await _httpClient.PostAsync(
            $"https://{_settings.Domain}/oauth/token",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json")
        );

        if (!response.IsSuccessStatusCode)
        {
            await HandleAuth0Error(response);
        }
        var responseContent = await response.Content.ReadAsStringAsync();
        var jwtToken = JsonSerializer.Deserialize<JsonElement>(responseContent);
        var accessToken = jwtToken.GetProperty("access_token").GetString();

        return accessToken;
    }


    // Signup function
    public async Task<string> SignupAsync(string email, string password)
    {
        var body = new
        {
            email,
            password,
            connection = "Username-Password-Authentication",
            client_id = _settings.ClientId
        };

        var response = await _httpClient.PostAsync(
            $"https://{_settings.Domain}/dbconnections/signup",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json")
        );

        if (!response.IsSuccessStatusCode)
        {
            await HandleAuth0Error(response);
        }
        return await response.Content.ReadAsStringAsync();
    }

    // Forgot Password function
    public async Task ForgotPasswordAsync(string email)
    {
        var body = new
        {
            client_id = _settings.ClientId,
            email,
            connection = "Username-Password-Authentication"
        };

        var response = await _httpClient.PostAsync(
            $"https://{_settings.Domain}/dbconnections/change_password",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json")
        );

        if (!response.IsSuccessStatusCode)
        {
            await HandleAuth0Error(response);
        }
    }

    // Add to your existing Auth0Service class
    public async Task SendVerificationEmailAsync(string email)
    {
        // Lấy token quản trị Auth0
        var managementApiToken = await GetManagementApiTokenAsync();

        // Tạo yêu cầu để lấy thông tin người dùng theo email
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://{_settings.Domain}/api/v2/users-by-email?email={email}");
        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken);

        var response = await _httpClient.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            // Nếu phản hồi không phải là mảng rỗng, có nghĩa là email tồn tại
            if (content != "[]")
            {
                // Phân tích JSON và lấy user_id
                using var jsonDoc = JsonDocument.Parse(content);
                var user = jsonDoc.RootElement[0]; // Chúng ta giả sử chỉ có một người dùng với email đó
                var userId = user.GetProperty("user_id").GetString();

                // Gửi lại email xác minh
                var verificationRequestBody = new
                {
                    user_id = userId
                };

                var verificationRequest = new HttpRequestMessage(HttpMethod.Post, $"https://{_settings.Domain}/api/v2/jobs/verification-email")
                {
                    Headers = { Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken) },
                    Content = new StringContent(JsonSerializer.Serialize(verificationRequestBody), Encoding.UTF8, "application/json")
                };

                var verificationResponse = await _httpClient.SendAsync(verificationRequest);

                if (!verificationResponse.IsSuccessStatusCode)
                {
                    await HandleAuth0Error(verificationResponse);
                }
                else
                {
                    // Email xác minh đã được gửi thành công
                    return;
                }
            }
        }

        // Nếu không thành công, xử lý lỗi
        await HandleAuth0Error(response);
    }

    public async Task<bool> CheckIfEmailExistsAsync(string email)
    {
        // Obtain the Auth0 Management API token
        var managementApiToken = await GetManagementApiTokenAsync();

        var request = new HttpRequestMessage(HttpMethod.Get, $"https://{_settings.Domain}/api/v2/users-by-email?email={email}");
        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken);

        var response = await _httpClient.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            // If content is not empty array, it means the email exists
            return content != "[]"; // Check if the response is not an empty array string
        }

        await HandleAuth0Error(response);
        return false;
    }

    public async Task<bool> IsEmailVerifiedAsync(string email)
    {
        // Lấy token quản trị Auth0
        var managementApiToken = await GetManagementApiTokenAsync();

        // Tạo yêu cầu để lấy thông tin người dùng theo email
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://{_settings.Domain}/api/v2/users-by-email?email={email}");
        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", managementApiToken);

        var response = await _httpClient.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            // Nếu phản hồi không phải là mảng rỗng, có nghĩa là email tồn tại
            if (content != "[]")
            {
                // Chúng ta sẽ phân tích JSON và kiểm tra thuộc tính "email_verified"
                using var jsonDoc = JsonDocument.Parse(content);
                var user = jsonDoc.RootElement[0]; // Chúng ta giả sử chỉ có một người dùng với email đó
                return user.GetProperty("email_verified").GetBoolean();
            }
        }

        // Nếu không thành công, xử lý lỗi
        await HandleAuth0Error(response);
        return false;
    }
    // This method gets the Management API token using client credentials
    private async Task<string> GetManagementApiTokenAsync()
    {
        var body = new
        {
            grant_type = "client_credentials",
            client_id = _settings.ClientId,
            client_secret = _settings.ClientSecret,
            audience = $"https://{_settings.Domain}/api/v2/"
        };

        var response = await _httpClient.PostAsync(
            $"https://{_settings.Domain}/oauth/token",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json")
        );

        if (!response.IsSuccessStatusCode)
        {
            await HandleAuth0Error(response);
        }

        var responseContent = await response.Content.ReadAsStringAsync();
        using var jsonDoc = JsonDocument.Parse(responseContent);
        var accessToken = jsonDoc.RootElement.GetProperty("access_token").GetString();

        return accessToken;
    }

    private async Task HandleAuth0Error(HttpResponseMessage response)
    {
        var errorContent = await response.Content.ReadAsStringAsync();

        try
        {
            using var jsonDoc = JsonDocument.Parse(errorContent);
            var root = jsonDoc.RootElement;

            if (root.TryGetProperty("error", out var errorProperty))
            {
                // Xử lý lỗi dạng đơn giản (email)
                if (root.TryGetProperty("error_description", out var errorDescriptionProperty))
                {
                    var errorDescription = errorDescriptionProperty.GetString();
                    throw new HttpRequestException(errorDescription);
                }

                var errorMessage = errorProperty.GetString();
                throw new HttpRequestException(errorMessage);
            }
            else if (root.TryGetProperty("name", out var nameProperty))
            {
                // Xử lý lỗi dạng chi tiết (password)
                var name = nameProperty.GetString();
                var message = root.GetProperty("message").GetString();
                throw new HttpRequestException($"{name} - {message}");
            }
            else
            {
                // Lỗi không xác định
                throw new HttpRequestException(errorContent);
            }
        }
        catch (JsonException)
        {
            throw new HttpRequestException($"Auth0 Error: Unable to parse error response. Raw response: {errorContent}");
        }
    }

}
