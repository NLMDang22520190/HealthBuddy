using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface ILikeRepository : IHealthBuddyRepository<Like>
    {
        public Task<bool> GetPostLikeByUserId(int postId, int userId, string postType);
    }
}
