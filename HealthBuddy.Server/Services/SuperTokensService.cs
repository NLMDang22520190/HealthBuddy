using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

public class SuperTokensService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public SuperTokensService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClient = httpClientFactory.CreateClient();
        _httpClient.BaseAddress = new Uri(configuration["SuperTokens:ConnectionURI"]);
        _apiKey = configuration["SuperTokens:APIKey"];

        if (!string.IsNullOrEmpty(_apiKey))
        {
            _httpClient.DefaultRequestHeaders.Add("api-key", _apiKey);
        }
    }

    public async Task<string> SignUpUser(string email, string password)
    {
        var payload = new
        {
            email = email,
            password = password
        };

        var content = new StringContent(
            JsonConvert.SerializeObject(payload),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync("/auth/signup", content);
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<dynamic>(result)?.user.id;
    }

    public async Task<string> LoginUser(string email, string password)
    {
        var payload = new
        {
            email = email,
            password = password
        };

        var content = new StringContent(
            JsonConvert.SerializeObject(payload),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync("/auth/login", content);
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<dynamic>(result)?.accessToken;
    }

    public async Task ForgotPassword(string email)
    {
        var payload = new { email = email };

        var content = new StringContent(
            JsonConvert.SerializeObject(payload),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync("/auth/user/password/reset/token", content);
        response.EnsureSuccessStatusCode();
    }


}
