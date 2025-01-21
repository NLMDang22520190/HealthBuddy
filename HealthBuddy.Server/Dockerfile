FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5289
EXPOSE 7222

ENV ASPNETCORE_URLS=http://+:5289

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

# Sao chép tệp .csproj vào thư mục làm việc trong container
COPY ["HealthBuddy.Server.csproj", "./"]
RUN dotnet restore "HealthBuddy.Server.csproj"

# Sao chép toàn bộ nội dung của thư mục HealthBuddy.Server
COPY . .
WORKDIR "/src"
RUN dotnet build "HealthBuddy.Server.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "HealthBuddy.Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HealthBuddy.Server.dll"]
