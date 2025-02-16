using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLCommentRepository : HealthBuddyRepository<Comment>, ICommentRepository
    {
        public SQLCommentRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<List<Comment>> GetCommentsByPostId(int postId, string postType)
        {
            return await dbContext.Comments.Where(x => x.TargetId == postId && x.TargetType == postType)
            .Include(c => c.User)
            .ToListAsync();
        }
    }
}
