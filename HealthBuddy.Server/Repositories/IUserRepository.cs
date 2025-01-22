using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserRepository : IHealthBuddyRepository<User>
    {
        Task<bool> CreateUserAsync(string email, string password);
        Task<User> GetUserByEmailAsync(string email);
    }
}
