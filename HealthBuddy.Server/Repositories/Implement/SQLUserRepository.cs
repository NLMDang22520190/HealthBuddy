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

        public Task<bool> CheckEmailExistsAsync(string email)
        {
            return dbContext.Users.AnyAsync(u => u.Email.Normalize().Equals(email.Normalize()));
        }

        public Task<bool> CheckEmailExistWithProviderAsync(string email, string provider)
        {
            return dbContext.Users.AnyAsync(u => u.Email.Normalize().Equals(email.Normalize()) && u.Provider.Equals(provider));
        }

        public async Task<bool> CreateUserAsync(string email, string password, string Provider)
        {
            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
                var user = new User { Email = email, Password = hashedPassword, Username = email, IsDeactivated = false, Provider = Provider };
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
            return await dbContext.Users.Where(u => u.Email.Normalize().Equals(email.Normalize()) && u.Provider == provider).FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await dbContext.Users.Where(u => u.Email.Normalize().Equals(email.Normalize())).FirstOrDefaultAsync();
            return user;
        }
    }
}
