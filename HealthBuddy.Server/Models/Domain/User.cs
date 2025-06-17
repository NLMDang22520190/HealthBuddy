using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Avatar { get; set; }

    public string Email { get; set; } = null!;

    public bool IsDeactivated { get; set; }

    public bool IsAdmin { get; set; }

    public string Provider { get; set; }

    public DateTime CreatedDate { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();

    public virtual ICollection<Food> Foods { get; set; } = new List<Food>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual ICollection<MealSchedule> MealSchedules { get; set; } = new List<MealSchedule>();

    public virtual ICollection<Report> Reports { get; set; } = new List<Report>();

    public virtual UserDetail? UserDetail { get; set; }

    public virtual ICollection<UserMealSchedule> UserMealSchedules { get; set; } = new List<UserMealSchedule>();

    public virtual ICollection<UserMealTracking> UserMealTrackings { get; set; } = new List<UserMealTracking>();

    public virtual UserNotificationPreference? UserNotificationPreference { get; set; }

    public virtual UserPreference? UserPreference { get; set; }

    public virtual ICollection<UserWorkoutSchedule> UserWorkoutSchedules { get; set; } = new List<UserWorkoutSchedule>();

    public virtual ICollection<UserWorkoutTracking> UserWorkoutTrackings { get; set; } = new List<UserWorkoutTracking>();

    public virtual ICollection<WorkoutSchedule> WorkoutSchedules { get; set; } = new List<WorkoutSchedule>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<ConversationParticipant> ConversationParticipants { get; set; } = new List<ConversationParticipant>();
}
