using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserDetailRepository : IHealthBuddyRepository<UserDetail>
    {
        Task<UserDetail> GetUserDetailByUserIdAsync(int userId);
    }
}
