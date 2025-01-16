using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLReportRepository : HealthBuddyRepository<Report>, IReportRepository
    {
        public SQLReportRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
