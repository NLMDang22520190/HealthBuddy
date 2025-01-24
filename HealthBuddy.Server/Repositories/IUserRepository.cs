using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserRepository : IHealthBuddyRepository<User>
    {
        Task<bool> CreateUserAsync(string username, string email, string password, string Provider);

        Task<bool> CheckEmailExistsAsync(string email);

        Task<bool> CheckEmailExistWithProviderAsync(string email, string provider);
        Task<User> GetUserByEmailAsync(string email);

        Task<User> GetUserByEmailAndProviderAsync(string email, string provider);
    }
}
