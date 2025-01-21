using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using BCrypt.Net;
using System.Diagnostics;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserRepository : HealthBuddyRepository<User>, IUserRepository
    {
        public SQLUserRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<bool> CreateUserAsync(string email, string password)
        {
            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
                var user = new User { Email = email, Password = hashedPassword };
                await CreateAsync(user);
                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error creating user" + e.Message);
                return false;
            }
        }
    }
}
