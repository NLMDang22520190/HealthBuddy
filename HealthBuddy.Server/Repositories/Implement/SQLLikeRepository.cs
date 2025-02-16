using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLLikeRepository : HealthBuddyRepository<Like>, ILikeRepository
    {
        public SQLLikeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<bool> GetPostLikeByUserId(int postId, int userId, string postType)
        {
            var result = await dbContext.Likes.FirstOrDefaultAsync(x => x.TargetId == postId && x.UserId == userId && x.TargetType == postType);
            if (result != null)
            {
                return true;
            }
            return false;

        }
    }
}
