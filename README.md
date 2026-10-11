Website: https://healthbuddyyy.netlify.app/

## Configuration and secrets

`HealthBuddy.Server/appsettings.json` holds only non-secret settings. Secret values are empty there and must be supplied at runtime.

**Local development** (stored outside the repository with .NET user secrets):

```bash
cd HealthBuddy.Server
dotnet user-secrets set "Auth0:ClientSecret" "<your Auth0 client secret>"
dotnet user-secrets set "SuperTokens:APIKey" "<your SuperTokens API key>"
dotnet user-secrets set "ConnectionStrings:HealthBuddy" "<your SQL Server connection string>"
```

**Deployed environments** (environment variables, `__` separates sections):

```bash
Auth0__ClientSecret=...
SuperTokens__APIKey=...
ConnectionStrings__HealthBuddy=...
```

Never commit real values to `appsettings*.json`. Earlier commits contained credentials; they were removed from the history and rotated.
