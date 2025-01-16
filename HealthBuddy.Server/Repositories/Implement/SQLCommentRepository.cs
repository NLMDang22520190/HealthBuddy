﻿using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLCommentRepository : HealthBuddyRepository<Comment>, ICommentRepository
    {
        public SQLCommentRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
