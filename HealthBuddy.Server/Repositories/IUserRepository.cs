using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserRepository : IHealthBuddyRepository<User>
    {
        Task<bool> CreateUserAsync(string username, string email, string password, string Provider);
        Task<bool> CheckEmailExistWithProviderAsync(string email, string provider);
        Task<User> GetUserByEmailAndProviderAsync(string email, string provider);

        Task<User> GetUserByIdAsync(int userId);
    }
}
