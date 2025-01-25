using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserDetailRepository : HealthBuddyRepository<UserDetail>, IUserDetailRepository
    {
        public SQLUserDetailRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public Task<UserDetail> GetUserDetailByUserIdAsync(int userId)
        {
            return dbContext.UserDetails.Where(u => u.UserId == userId).FirstOrDefaultAsync();
        }
    }
}
