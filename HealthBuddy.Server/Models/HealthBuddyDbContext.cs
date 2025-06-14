using System;
using System.Collections.Generic;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Models;

public partial class HealthBuddyDbContext : DbContext
{
    public HealthBuddyDbContext()
    {
    }

    public HealthBuddyDbContext(DbContextOptions<HealthBuddyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Exercise> Exercises { get; set; }

    public virtual DbSet<ExerciseType> ExerciseTypes { get; set; }

    public virtual DbSet<Food> Foods { get; set; }

    public virtual DbSet<FoodType> FoodTypes { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<Like> Likes { get; set; }

    public virtual DbSet<MealDetail> MealDetails { get; set; }

    public virtual DbSet<MealSchedule> MealSchedules { get; set; }

    public virtual DbSet<MuscleType> MuscleTypes { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    public virtual DbSet<UserMealSchedule> UserMealSchedules { get; set; }

    public virtual DbSet<UserMealTracking> UserMealTrackings { get; set; }

    public virtual DbSet<UserNotificationPreference> UserNotificationPreferences { get; set; }

    public virtual DbSet<UserPreference> UserPreferences { get; set; }

    public virtual DbSet<UserWorkoutSchedule> UserWorkoutSchedules { get; set; }

    public virtual DbSet<UserWorkoutTracking> UserWorkoutTrackings { get; set; }

    public virtual DbSet<WorkoutDetail> WorkoutDetails { get; set; }

    public virtual DbSet<WorkoutSchedule> WorkoutSchedules { get; set; }

  
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__Comments__C3B4DFAA79667157");

            entity.Property(e => e.CommentId).HasColumnName("CommentID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TargetId).HasColumnName("TargetID");
            entity.Property(e => e.TargetType).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comments__UserID__6A30C649");
        });

        modelBuilder.Entity<Exercise>(entity =>
        {
            entity.HasKey(e => e.ExerciseId).HasName("PK__Exercise__A074AD0F63BA07DB");

            entity.Property(e => e.ExerciseId).HasColumnName("ExerciseID");
            entity.Property(e => e.DifficultyLevel).HasMaxLength(50);
            entity.Property(e => e.ExerciseName).HasMaxLength(255);
            entity.Property(e => e.UploaderId).HasColumnName("UploaderID");

            entity.HasOne(d => d.Uploader).WithMany(p => p.Exercises)
                .HasForeignKey(d => d.UploaderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Exercises__Uploa__5AEE82B9");

            entity.HasMany(d => d.ExerciseTypes).WithMany(p => p.Exercises)
                .UsingEntity<Dictionary<string, object>>(
                    "ExerciseExerciseType",
                    r => r.HasOne<ExerciseType>().WithMany()
                        .HasForeignKey("ExerciseTypeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Exercise___Exerc__60A75C0F"),
                    l => l.HasOne<Exercise>().WithMany()
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Exercise___Exerc__5FB337D6"),
                    j =>
                    {
                        j.HasKey("ExerciseId", "ExerciseTypeId").HasName("PK__Exercise__C6BF56028FDA59DD");
                        j.ToTable("Exercise_ExerciseType");
                        j.IndexerProperty<int>("ExerciseId").HasColumnName("ExerciseID");
                        j.IndexerProperty<int>("ExerciseTypeId").HasColumnName("ExerciseTypeID");
                    });

            entity.HasMany(d => d.MuscleTypes).WithMany(p => p.Exercises)
                .UsingEntity<Dictionary<string, object>>(
                    "ExerciseMuscleType",
                    r => r.HasOne<MuscleType>().WithMany()
                        .HasForeignKey("MuscleTypeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Exercise___Muscl__66603565"),
                    l => l.HasOne<Exercise>().WithMany()
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Exercise___Exerc__656C112C"),
                    j =>
                    {
                        j.HasKey("ExerciseId", "MuscleTypeId").HasName("PK__Exercise__D58AEA2F333AFC17");
                        j.ToTable("Exercise_MuscleType");
                        j.IndexerProperty<int>("ExerciseId").HasColumnName("ExerciseID");
                        j.IndexerProperty<int>("MuscleTypeId").HasColumnName("MuscleTypeID");
                    });
        });

        modelBuilder.Entity<ExerciseType>(entity =>
        {
            entity.HasKey(e => e.ExerciseTypeId).HasName("PK__Exercise__6CBFB0D7781E5789");

            entity.ToTable("ExerciseType");

            entity.Property(e => e.ExerciseTypeId).HasColumnName("ExerciseTypeID");
            entity.Property(e => e.ExerciseName).HasMaxLength(255);
        });

        modelBuilder.Entity<Food>(entity =>
        {
            entity.HasKey(e => e.FoodId).HasName("PK__Food__856DB3CBA629DDDD");

            entity.ToTable("Food");

            entity.Property(e => e.FoodId).HasColumnName("FoodID");
            entity.Property(e => e.DifficultyLevel).HasMaxLength(50);
            entity.Property(e => e.FoodName).HasMaxLength(255);
            entity.Property(e => e.UploaderId).HasColumnName("UploaderID");

            entity.HasOne(d => d.Uploader).WithMany(p => p.Foods)
                .HasForeignKey(d => d.UploaderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Food__UploaderID__48CFD27E");

            entity.HasMany(d => d.FoodTypes).WithMany(p => p.Foods)
                .UsingEntity<Dictionary<string, object>>(
                    "FoodFoodType",
                    r => r.HasOne<FoodType>().WithMany()
                        .HasForeignKey("FoodTypeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Food_Food__FoodT__4E88ABD4"),
                    l => l.HasOne<Food>().WithMany()
                        .HasForeignKey("FoodId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Food_Food__FoodI__4D94879B"),
                    j =>
                    {
                        j.HasKey("FoodId", "FoodTypeId").HasName("PK__Food_Foo__5850A68DCD8C18B3");
                        j.ToTable("Food_FoodTypes");
                        j.IndexerProperty<int>("FoodId").HasColumnName("FoodID");
                        j.IndexerProperty<int>("FoodTypeId").HasColumnName("FoodTypeID");
                    });
        });

        modelBuilder.Entity<FoodType>(entity =>
        {
            entity.HasKey(e => e.FoodTypeId).HasName("PK__FoodType__D3D1546C6E1FD183");

            entity.Property(e => e.FoodTypeId).HasColumnName("FoodTypeID");
            entity.Property(e => e.FoodTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.IngredientId).HasName("PK__Ingredie__BEAEB27AFA785F1B");

            entity.Property(e => e.IngredientId).HasColumnName("IngredientID");
            entity.Property(e => e.IngredientName).HasMaxLength(255);
            entity.Property(e => e.MeasurementUnit).HasMaxLength(50);
        });

        modelBuilder.Entity<Like>(entity =>
        {
            entity.HasKey(e => e.LikeId).HasName("PK__Likes__A2922CF4A3D8DD64");

            entity.Property(e => e.LikeId).HasColumnName("LikeID");
            entity.Property(e => e.TargetId).HasColumnName("TargetID");
            entity.Property(e => e.TargetType).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Likes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Likes__UserID__6D0D32F4");
        });

        modelBuilder.Entity<MealDetail>(entity =>
        {
            entity.HasKey(e => e.MealDetailId).HasName("PK__MealDeta__425974B34382DB9F");

            entity.Property(e => e.MealDetailId).HasColumnName("MealDetailID");
            entity.Property(e => e.FoodId).HasColumnName("FoodID");
            entity.Property(e => e.MealScheduleId).HasColumnName("MealScheduleID");
            entity.Property(e => e.MealTime).HasMaxLength(50);

            entity.HasOne(d => d.Food).WithMany(p => p.MealDetails)
                .HasForeignKey(d => d.FoodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MealDetai__FoodI__07C12930");

            entity.HasOne(d => d.MealSchedule).WithMany(p => p.MealDetails)
                .HasForeignKey(d => d.MealScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MealDetai__MealS__06CD04F7");
        });

        modelBuilder.Entity<MealSchedule>(entity =>
        {
            entity.HasKey(e => e.MealScheduleId).HasName("PK__MealSche__404D879CE6759FA2");

            entity.Property(e => e.MealScheduleId).HasColumnName("MealScheduleID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.MealName).HasMaxLength(255);
            entity.Property(e => e.UpdatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UploaderId).HasColumnName("UploaderID");

            entity.HasOne(d => d.Uploader).WithMany(p => p.MealSchedules)
                .HasForeignKey(d => d.UploaderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MealSched__Uploa__03F0984C");
        });

        modelBuilder.Entity<MuscleType>(entity =>
        {
            entity.HasKey(e => e.MuscleTypeId).HasName("PK__MuscleTy__5FE4720658395BAD");

            entity.ToTable("MuscleType");

            entity.Property(e => e.MuscleTypeId).HasColumnName("MuscleTypeID");
            entity.Property(e => e.MuscleTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => new { e.FoodId, e.IngredientId }).HasName("PK__Recipes__3E8758EC2D4EA7B9");

            entity.Property(e => e.FoodId).HasColumnName("FoodID");
            entity.Property(e => e.IngredientId).HasColumnName("IngredientID");

            entity.HasOne(d => d.Food).WithMany(p => p.Recipes)
                .HasForeignKey(d => d.FoodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Recipes__FoodID__534D60F1");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.Recipes)
                .HasForeignKey(d => d.IngredientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Recipes__Ingredi__5441852A");
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__Report__D5BD48E568154372");

            entity.ToTable("Report");

            entity.Property(e => e.ReportId).HasColumnName("ReportID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TargetId).HasColumnName("TargetID");
            entity.Property(e => e.TargetType).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Reports)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Report__UserID__70DDC3D8");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC3BEDEC93");

            entity.ToTable(tb => tb.HasTrigger("trg_AfterInsert_Users"));

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534170D1B2A").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserDeta__1788CCAC000BC5FD");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("UserID");

            entity.HasOne(d => d.User).WithOne(p => p.UserDetail)
                .HasForeignKey<UserDetail>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserDetai__UserI__3B75D760");
        });

        modelBuilder.Entity<UserMealSchedule>(entity =>
        {
            entity.HasKey(e => e.UserMealScheduleId).HasName("PK__UserMeal__D784CE54AA32CC16");

            entity.ToTable("UserMealSchedule");

            entity.Property(e => e.UserMealScheduleId).HasColumnName("UserMealScheduleID");
            entity.Property(e => e.CompletionDate).HasColumnType("datetime");
            entity.Property(e => e.MealScheduleId).HasColumnName("MealScheduleID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.MealSchedule).WithMany(p => p.UserMealSchedules)
                .HasForeignKey(d => d.MealScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserMealS__MealS__151B244E");

            entity.HasOne(d => d.User).WithMany(p => p.UserMealSchedules)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserMealS__UserI__14270015");
        });

        modelBuilder.Entity<UserMealTracking>(entity =>
        {
            entity.HasKey(e => e.UserMealTrackingId).HasName("PK__UserMeal__8B54A089AD242534");

            entity.ToTable("UserMealTracking");

            entity.Property(e => e.UserMealTrackingId).HasColumnName("UserMealTrackingID");
            entity.Property(e => e.MealScheduleId).HasColumnName("MealScheduleID");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.TrackingDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.MealSchedule).WithMany(p => p.UserMealTrackings)
                .HasForeignKey(d => d.MealScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserMealT__MealS__18EBB532");

            entity.HasOne(d => d.User).WithMany(p => p.UserMealTrackings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserMealT__UserI__17F790F9");
        });

        modelBuilder.Entity<UserNotificationPreference>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserNoti__1788CCAC52489948");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("UserID");

            entity.HasOne(d => d.User).WithOne(p => p.UserNotificationPreference)
                .HasForeignKey<UserNotificationPreference>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserNotif__UserI__4222D4EF");
        });

        modelBuilder.Entity<UserWorkoutSchedule>(entity =>
        {
            entity.HasKey(e => e.UserWorkoutScheduleId).HasName("PK__UserWork__3DA6DF0DD7CEB540");

            entity.ToTable("UserWorkoutSchedule");

            entity.Property(e => e.UserWorkoutScheduleId).HasColumnName("UserWorkoutScheduleID");
            entity.Property(e => e.CompletionDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.WorkoutScheduleId).HasColumnName("WorkoutScheduleID");

            entity.HasOne(d => d.User).WithMany(p => p.UserWorkoutSchedules)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserWorko__UserI__0B91BA14");

            entity.HasOne(d => d.WorkoutSchedule).WithMany(p => p.UserWorkoutSchedules)
                .HasForeignKey(d => d.WorkoutScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserWorko__Worko__0C85DE4D");
        });

        modelBuilder.Entity<UserWorkoutTracking>(entity =>
        {
            entity.HasKey(e => e.UserWorkoutTrackingId).HasName("PK__UserWork__311D8EB3421F1AC5");

            entity.ToTable("UserWorkoutTracking");

            entity.Property(e => e.UserWorkoutTrackingId).HasColumnName("UserWorkoutTrackingID");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.TrackingDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.WorkoutScheduleId).HasColumnName("WorkoutScheduleID");

            entity.HasOne(d => d.User).WithMany(p => p.UserWorkoutTrackings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserWorko__UserI__0F624AF8");

            entity.HasOne(d => d.WorkoutSchedule).WithMany(p => p.UserWorkoutTrackings)
                .HasForeignKey(d => d.WorkoutScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserWorko__Worko__10566F31");
        });

        modelBuilder.Entity<WorkoutDetail>(entity =>
        {
            entity.HasKey(e => e.WorkoutDetailId).HasName("PK__WorkoutD__F3D39920B11CC002");

            entity.Property(e => e.WorkoutDetailId).HasColumnName("WorkoutDetailID");
            entity.Property(e => e.ExerciseId).HasColumnName("ExerciseID");
            entity.Property(e => e.WorkoutScheduleId).HasColumnName("WorkoutScheduleID");

            entity.HasOne(d => d.Exercise).WithMany(p => p.WorkoutDetails)
                .HasForeignKey(d => d.ExerciseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkoutDe__Exerc__7D439ABD");

            entity.HasOne(d => d.WorkoutSchedule).WithMany(p => p.WorkoutDetails)
                .HasForeignKey(d => d.WorkoutScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkoutDe__Worko__7C4F7684");
        });

        modelBuilder.Entity<WorkoutSchedule>(entity =>
        {
            entity.HasKey(e => e.WorkoutScheduleId).HasName("PK__WorkoutS__5C5C8FF2B2A5440C");

            entity.Property(e => e.WorkoutScheduleId).HasColumnName("WorkoutScheduleID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UploaderId).HasColumnName("UploaderID");
            entity.Property(e => e.WorkOutName).HasMaxLength(255);

            entity.HasOne(d => d.Uploader).WithMany(p => p.WorkoutSchedules)
                .HasForeignKey(d => d.UploaderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkoutSc__Uploa__797309D9");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
