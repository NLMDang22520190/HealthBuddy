using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using BCrypt.Net;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

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
                var user = new User { Email = email, Password = hashedPassword, Username = email, IsDeactivated = false };
                await CreateAsync(user);
                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error creating user" + e.Message);
                return false;
            }
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await dbContext.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
            return user;
        }
    }
}
