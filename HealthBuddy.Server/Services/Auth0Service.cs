using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.ServiceModels;
using Microsoft.Extensions.Options;

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
        var body = new
        {
            grant_type = "password",
            username = email,
            password = password,
            client_id = _settings.ClientId,
            client_secret = _settings.ClientSecret,
            audience = _settings.Audience
        };

        var response = await _httpClient.PostAsync(
            $"https://{_settings.Domain}/oauth/token",
            new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json")
        );

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
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

        response.EnsureSuccessStatusCode();
    }

    public async Task HandleAuth0Error(HttpResponseMessage response)
    {
        var errorContent = await response.Content.ReadAsStringAsync();

        try
        {
            using var jsonDoc = JsonDocument.Parse(errorContent);
            var root = jsonDoc.RootElement;

            if (root.TryGetProperty("error", out var errorProperty))
            {
                // Xử lý lỗi dạng đơn giản (email)
                var errorMessage = errorProperty.GetString();
                throw new HttpRequestException($"Auth0 Error: {errorMessage}");
            }
            else if (root.TryGetProperty("name", out var nameProperty))
            {
                // Xử lý lỗi dạng chi tiết (password)
                var name = nameProperty.GetString();
                var message = root.GetProperty("message").GetString();
                throw new HttpRequestException($"Auth0 Error: {name} - {message}\n");
            }
            else
            {
                // Lỗi không xác định
                throw new HttpRequestException($"Auth0 Unknown Error: {errorContent}");
            }
        }
        catch (JsonException)
        {
            throw new HttpRequestException($"Auth0 Error: Unable to parse error response. Raw response: {errorContent}");
        }
    }

}
