using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserRepository : HealthBuddyRepository<User>, IUserRepository
    {
        public SQLUserRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
