public class SuperTokensMiddleware
{
    private readonly RequestDelegate _next;

    public SuperTokensMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // public async Task InvokeAsync(HttpContext context, SuperTokensService superTokensService)
    // {
    //     var authHeader = context.Request.Headers["Authorization"].ToString();

    //     if (!string.IsNullOrEmpty(authHeader))
    //     {
    //         var token = authHeader.Replace("Bearer ", "");
    //         // Gửi token đến SuperTokens để xác thực
    //         var isValid = await superTokensService.VerifyToken(token);
    //         if (!isValid)
    //         {
    //             context.Response.StatusCode = 401;
    //             await context.Response.WriteAsync("Unauthorized");
    //             return;
    //         }
    //     }

    //     await _next(context);
    // }
}
