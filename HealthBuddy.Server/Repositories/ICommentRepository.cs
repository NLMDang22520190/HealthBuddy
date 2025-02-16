using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface ICommentRepository : IHealthBuddyRepository<Comment>
    {
        public Task<List<Comment>> GetCommentsByPostId(int postId, string postType);
    }
}
