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

        public Task<bool> CheckEmailExistWithProviderAsync(string email, string provider)
        {
            return dbContext.Users.AnyAsync(u => u.Email == email
            && u.Provider == provider);
        }

        public async Task<bool> CreateUserAsync(string username, string email, string password, string Provider)
        {
            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
                var user = new User
                {
                    Email = email.Normalize(),
                    Password = hashedPassword,
                    Username = username,
                    IsDeactivated = false,
                    Provider = Provider.Normalize()
                };
                await CreateAsync(user);
                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error creating user" + e.Message);
                return false;
            }
        }

        public async Task<User> GetUserByEmailAndProviderAsync(string email, string provider)
        {
            return await dbContext.Users.Where(u => u.Email == email
            && u.Provider == provider).FirstOrDefaultAsync();
        }

        public Task<User> GetUserByIdAsync(int userId)
        {
            return dbContext.Users.Where(u => u.UserId == userId).FirstOrDefaultAsync();
        }
    }
}
