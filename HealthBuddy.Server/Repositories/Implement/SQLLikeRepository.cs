using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLLikeRepository : HealthBuddyRepository<Like>, ILikeRepository
    {
        public SQLLikeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
