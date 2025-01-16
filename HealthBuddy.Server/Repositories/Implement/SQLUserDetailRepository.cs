using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserDetailRepository : HealthBuddyRepository<UserDetail>, IUserDetailRepository
    {
        public SQLUserDetailRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
