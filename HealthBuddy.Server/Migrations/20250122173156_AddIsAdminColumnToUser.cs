using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthBuddy.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddIsAdminColumnToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.CreateTable(
            //     name: "ExerciseType",
            //     columns: table => new
            //     {
            //         ExerciseTypeID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         ExerciseName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Exercise__6CBFB0D7781E5789", x => x.ExerciseTypeID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "FoodTypes",
            //     columns: table => new
            //     {
            //         FoodTypeID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         FoodTypeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__FoodType__D3D1546C6E1FD183", x => x.FoodTypeID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Ingredients",
            //     columns: table => new
            //     {
            //         IngredientID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         IngredientName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            //         MeasurementUnit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Ingredie__BEAEB27AFA785F1B", x => x.IngredientID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "MuscleType",
            //     columns: table => new
            //     {
            //         MuscleTypeID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         MuscleTypeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__MuscleTy__5FE4720658395BAD", x => x.MuscleTypeID);
            //     });

            migrationBuilder.AddColumn<bool>(
    name: "IsAdmin",
    table: "Users",
    nullable: false,
    defaultValue: false);


            // migrationBuilder.CreateTable(
            //     name: "Users",
            //     columns: table => new
            //     {
            //         UserID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
            //         Password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            //         Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            //         IsDeactivated = table.Column<bool>(type: "bit", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Users__1788CCAC3BEDEC93", x => x.UserID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Comments",
            //     columns: table => new
            //     {
            //         CommentID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         TargetType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //         TargetID = table.Column<int>(type: "int", nullable: false),
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //         CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Comments__C3B4DFAA79667157", x => x.CommentID);
            //         table.ForeignKey(
            //             name: "FK__Comments__UserID__6A30C649",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Exercises",
            //     columns: table => new
            //     {
            //         ExerciseID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         ExerciseName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            //         Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         DifficultyLevel = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //         NumberOfReps = table.Column<int>(type: "int", nullable: true),
            //         NumberOfSets = table.Column<int>(type: "int", nullable: true),
            //         VideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         ImgUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         TimeBetweenSet = table.Column<int>(type: "int", nullable: true),
            //         CaloriesBurned = table.Column<int>(type: "int", nullable: true),
            //         IsApproved = table.Column<bool>(type: "bit", nullable: false),
            //         IsHidden = table.Column<bool>(type: "bit", nullable: false),
            //         UploaderID = table.Column<int>(type: "int", nullable: false),
            //         NumberOfLikes = table.Column<int>(type: "int", nullable: false),
            //         NumberOfComments = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Exercise__A074AD0F63BA07DB", x => x.ExerciseID);
            //         table.ForeignKey(
            //             name: "FK__Exercises__Uploa__5AEE82B9",
            //             column: x => x.UploaderID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Food",
            //     columns: table => new
            //     {
            //         FoodID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         FoodName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            //         Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         ImgUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         VideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         Calories = table.Column<int>(type: "int", nullable: false),
            //         DifficultyLevel = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //         HealthBenefits = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         CookingTime = table.Column<int>(type: "int", nullable: false),
            //         Portion = table.Column<int>(type: "int", nullable: false),
            //         UploaderID = table.Column<int>(type: "int", nullable: false),
            //         IsApproved = table.Column<bool>(type: "bit", nullable: false),
            //         IsHidden = table.Column<bool>(type: "bit", nullable: false),
            //         NumberOfLikes = table.Column<int>(type: "int", nullable: false),
            //         NumberOfComments = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Food__856DB3CBA629DDDD", x => x.FoodID);
            //         table.ForeignKey(
            //             name: "FK__Food__UploaderID__48CFD27E",
            //             column: x => x.UploaderID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Likes",
            //     columns: table => new
            //     {
            //         LikeID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         TargetType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //         TargetID = table.Column<int>(type: "int", nullable: false),
            //         UserID = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Likes__A2922CF4A3D8DD64", x => x.LikeID);
            //         table.ForeignKey(
            //             name: "FK__Likes__UserID__6D0D32F4",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "MealSchedules",
            //     columns: table => new
            //     {
            //         MealScheduleID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         UploaderID = table.Column<int>(type: "int", nullable: false),
            //         MealName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            //         TotalDays = table.Column<int>(type: "int", nullable: false),
            //         IsApproved = table.Column<bool>(type: "bit", nullable: false),
            //         IsHidden = table.Column<bool>(type: "bit", nullable: false),
            //         CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
            //         UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__MealSche__404D879CE6759FA2", x => x.MealScheduleID);
            //         table.ForeignKey(
            //             name: "FK__MealSched__Uploa__03F0984C",
            //             column: x => x.UploaderID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Report",
            //     columns: table => new
            //     {
            //         ReportID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         TargetType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //         TargetID = table.Column<int>(type: "int", nullable: false),
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Report__D5BD48E568154372", x => x.ReportID);
            //         table.ForeignKey(
            //             name: "FK__Report__UserID__70DDC3D8",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "UserDetails",
            //     columns: table => new
            //     {
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         Height = table.Column<double>(type: "float", nullable: true),
            //         Weight = table.Column<double>(type: "float", nullable: true),
            //         HealthCondition = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         Allergies = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__UserDeta__1788CCAC000BC5FD", x => x.UserID);
            //         table.ForeignKey(
            //             name: "FK__UserDetai__UserI__3B75D760",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "UserNotificationPreferences",
            //     columns: table => new
            //     {
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         FoodNoti = table.Column<bool>(type: "bit", nullable: false),
            //         ExerciseNoti = table.Column<bool>(type: "bit", nullable: false),
            //         WorkoutScheduleNoti = table.Column<bool>(type: "bit", nullable: false),
            //         MealScheduleNoti = table.Column<bool>(type: "bit", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__UserNoti__1788CCAC52489948", x => x.UserID);
            //         table.ForeignKey(
            //             name: "FK__UserNotif__UserI__4222D4EF",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "WorkoutSchedules",
            //     columns: table => new
            //     {
            //         WorkoutScheduleID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         UploaderID = table.Column<int>(type: "int", nullable: false),
            //         WorkOutName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            //         Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         NumberOfLikes = table.Column<int>(type: "int", nullable: false),
            //         NumberOfComments = table.Column<int>(type: "int", nullable: false),
            //         TotalDays = table.Column<int>(type: "int", nullable: false),
            //         IsApproved = table.Column<bool>(type: "bit", nullable: false),
            //         IsHidden = table.Column<bool>(type: "bit", nullable: false),
            //         CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
            //         UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__WorkoutS__5C5C8FF2B2A5440C", x => x.WorkoutScheduleID);
            //         table.ForeignKey(
            //             name: "FK__WorkoutSc__Uploa__797309D9",
            //             column: x => x.UploaderID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Exercise_ExerciseType",
            //     columns: table => new
            //     {
            //         ExerciseID = table.Column<int>(type: "int", nullable: false),
            //         ExerciseTypeID = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Exercise__C6BF56028FDA59DD", x => new { x.ExerciseID, x.ExerciseTypeID });
            //         table.ForeignKey(
            //             name: "FK__Exercise___Exerc__5FB337D6",
            //             column: x => x.ExerciseID,
            //             principalTable: "Exercises",
            //             principalColumn: "ExerciseID");
            //         table.ForeignKey(
            //             name: "FK__Exercise___Exerc__60A75C0F",
            //             column: x => x.ExerciseTypeID,
            //             principalTable: "ExerciseType",
            //             principalColumn: "ExerciseTypeID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Exercise_MuscleType",
            //     columns: table => new
            //     {
            //         ExerciseID = table.Column<int>(type: "int", nullable: false),
            //         MuscleTypeID = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Exercise__D58AEA2F333AFC17", x => new { x.ExerciseID, x.MuscleTypeID });
            //         table.ForeignKey(
            //             name: "FK__Exercise___Exerc__656C112C",
            //             column: x => x.ExerciseID,
            //             principalTable: "Exercises",
            //             principalColumn: "ExerciseID");
            //         table.ForeignKey(
            //             name: "FK__Exercise___Muscl__66603565",
            //             column: x => x.MuscleTypeID,
            //             principalTable: "MuscleType",
            //             principalColumn: "MuscleTypeID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Food_FoodTypes",
            //     columns: table => new
            //     {
            //         FoodID = table.Column<int>(type: "int", nullable: false),
            //         FoodTypeID = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Food_Foo__5850A68DCD8C18B3", x => new { x.FoodID, x.FoodTypeID });
            //         table.ForeignKey(
            //             name: "FK__Food_Food__FoodI__4D94879B",
            //             column: x => x.FoodID,
            //             principalTable: "Food",
            //             principalColumn: "FoodID");
            //         table.ForeignKey(
            //             name: "FK__Food_Food__FoodT__4E88ABD4",
            //             column: x => x.FoodTypeID,
            //             principalTable: "FoodTypes",
            //             principalColumn: "FoodTypeID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Recipes",
            //     columns: table => new
            //     {
            //         FoodID = table.Column<int>(type: "int", nullable: false),
            //         IngredientID = table.Column<int>(type: "int", nullable: false),
            //         Quantity = table.Column<double>(type: "float", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__Recipes__3E8758EC2D4EA7B9", x => new { x.FoodID, x.IngredientID });
            //         table.ForeignKey(
            //             name: "FK__Recipes__FoodID__534D60F1",
            //             column: x => x.FoodID,
            //             principalTable: "Food",
            //             principalColumn: "FoodID");
            //         table.ForeignKey(
            //             name: "FK__Recipes__Ingredi__5441852A",
            //             column: x => x.IngredientID,
            //             principalTable: "Ingredients",
            //             principalColumn: "IngredientID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "MealDetails",
            //     columns: table => new
            //     {
            //         MealDetailID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         MealScheduleID = table.Column<int>(type: "int", nullable: false),
            //         DayNumber = table.Column<int>(type: "int", nullable: false),
            //         MealTime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //         FoodID = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__MealDeta__425974B34382DB9F", x => x.MealDetailID);
            //         table.ForeignKey(
            //             name: "FK__MealDetai__FoodI__07C12930",
            //             column: x => x.FoodID,
            //             principalTable: "Food",
            //             principalColumn: "FoodID");
            //         table.ForeignKey(
            //             name: "FK__MealDetai__MealS__06CD04F7",
            //             column: x => x.MealScheduleID,
            //             principalTable: "MealSchedules",
            //             principalColumn: "MealScheduleID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "UserMealSchedule",
            //     columns: table => new
            //     {
            //         UserMealScheduleID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         MealScheduleID = table.Column<int>(type: "int", nullable: false),
            //         DayNumber = table.Column<int>(type: "int", nullable: false),
            //         IsCompleted = table.Column<bool>(type: "bit", nullable: false),
            //         CompletionDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__UserMeal__D784CE54AA32CC16", x => x.UserMealScheduleID);
            //         table.ForeignKey(
            //             name: "FK__UserMealS__MealS__151B244E",
            //             column: x => x.MealScheduleID,
            //             principalTable: "MealSchedules",
            //             principalColumn: "MealScheduleID");
            //         table.ForeignKey(
            //             name: "FK__UserMealS__UserI__14270015",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "UserMealTracking",
            //     columns: table => new
            //     {
            //         UserMealTrackingID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         MealScheduleID = table.Column<int>(type: "int", nullable: false),
            //         StartDate = table.Column<DateTime>(type: "datetime", nullable: false),
            //         TrackingDate = table.Column<DateTime>(type: "datetime", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__UserMeal__8B54A089AD242534", x => x.UserMealTrackingID);
            //         table.ForeignKey(
            //             name: "FK__UserMealT__MealS__18EBB532",
            //             column: x => x.MealScheduleID,
            //             principalTable: "MealSchedules",
            //             principalColumn: "MealScheduleID");
            //         table.ForeignKey(
            //             name: "FK__UserMealT__UserI__17F790F9",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "UserWorkoutSchedule",
            //     columns: table => new
            //     {
            //         UserWorkoutScheduleID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         WorkoutScheduleID = table.Column<int>(type: "int", nullable: false),
            //         DayNumber = table.Column<int>(type: "int", nullable: false),
            //         IsCompleted = table.Column<bool>(type: "bit", nullable: false),
            //         CompletionDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__UserWork__3DA6DF0DD7CEB540", x => x.UserWorkoutScheduleID);
            //         table.ForeignKey(
            //             name: "FK__UserWorko__UserI__0B91BA14",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //         table.ForeignKey(
            //             name: "FK__UserWorko__Worko__0C85DE4D",
            //             column: x => x.WorkoutScheduleID,
            //             principalTable: "WorkoutSchedules",
            //             principalColumn: "WorkoutScheduleID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "UserWorkoutTracking",
            //     columns: table => new
            //     {
            //         UserWorkoutTrackingID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         WorkoutScheduleID = table.Column<int>(type: "int", nullable: false),
            //         StartDate = table.Column<DateTime>(type: "datetime", nullable: false),
            //         TrackingDate = table.Column<DateTime>(type: "datetime", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__UserWork__311D8EB3421F1AC5", x => x.UserWorkoutTrackingID);
            //         table.ForeignKey(
            //             name: "FK__UserWorko__UserI__0F624AF8",
            //             column: x => x.UserID,
            //             principalTable: "Users",
            //             principalColumn: "UserID");
            //         table.ForeignKey(
            //             name: "FK__UserWorko__Worko__10566F31",
            //             column: x => x.WorkoutScheduleID,
            //             principalTable: "WorkoutSchedules",
            //             principalColumn: "WorkoutScheduleID");
            //     });

            // migrationBuilder.CreateTable(
            //     name: "WorkoutDetails",
            //     columns: table => new
            //     {
            //         WorkoutDetailID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         WorkoutScheduleID = table.Column<int>(type: "int", nullable: false),
            //         ExerciseID = table.Column<int>(type: "int", nullable: false),
            //         DayNumber = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK__WorkoutD__F3D39920B11CC002", x => x.WorkoutDetailID);
            //         table.ForeignKey(
            //             name: "FK__WorkoutDe__Exerc__7D439ABD",
            //             column: x => x.ExerciseID,
            //             principalTable: "Exercises",
            //             principalColumn: "ExerciseID");
            //         table.ForeignKey(
            //             name: "FK__WorkoutDe__Worko__7C4F7684",
            //             column: x => x.WorkoutScheduleID,
            //             principalTable: "WorkoutSchedules",
            //             principalColumn: "WorkoutScheduleID");
            //     });

            // migrationBuilder.CreateIndex(
            //     name: "IX_Comments_UserID",
            //     table: "Comments",
            //     column: "UserID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Exercise_ExerciseType_ExerciseTypeID",
            //     table: "Exercise_ExerciseType",
            //     column: "ExerciseTypeID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Exercise_MuscleType_MuscleTypeID",
            //     table: "Exercise_MuscleType",
            //     column: "MuscleTypeID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Exercises_UploaderID",
            //     table: "Exercises",
            //     column: "UploaderID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Food_UploaderID",
            //     table: "Food",
            //     column: "UploaderID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Food_FoodTypes_FoodTypeID",
            //     table: "Food_FoodTypes",
            //     column: "FoodTypeID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Likes_UserID",
            //     table: "Likes",
            //     column: "UserID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_MealDetails_FoodID",
            //     table: "MealDetails",
            //     column: "FoodID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_MealDetails_MealScheduleID",
            //     table: "MealDetails",
            //     column: "MealScheduleID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_MealSchedules_UploaderID",
            //     table: "MealSchedules",
            //     column: "UploaderID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Recipes_IngredientID",
            //     table: "Recipes",
            //     column: "IngredientID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Report_UserID",
            //     table: "Report",
            //     column: "UserID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserMealSchedule_MealScheduleID",
            //     table: "UserMealSchedule",
            //     column: "MealScheduleID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserMealSchedule_UserID",
            //     table: "UserMealSchedule",
            //     column: "UserID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserMealTracking_MealScheduleID",
            //     table: "UserMealTracking",
            //     column: "MealScheduleID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserMealTracking_UserID",
            //     table: "UserMealTracking",
            //     column: "UserID");

            // migrationBuilder.CreateIndex(
            //     name: "UQ__Users__A9D10534170D1B2A",
            //     table: "Users",
            //     column: "Email",
            //     unique: true);

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserWorkoutSchedule_UserID",
            //     table: "UserWorkoutSchedule",
            //     column: "UserID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserWorkoutSchedule_WorkoutScheduleID",
            //     table: "UserWorkoutSchedule",
            //     column: "WorkoutScheduleID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserWorkoutTracking_UserID",
            //     table: "UserWorkoutTracking",
            //     column: "UserID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_UserWorkoutTracking_WorkoutScheduleID",
            //     table: "UserWorkoutTracking",
            //     column: "WorkoutScheduleID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_WorkoutDetails_ExerciseID",
            //     table: "WorkoutDetails",
            //     column: "ExerciseID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_WorkoutDetails_WorkoutScheduleID",
            //     table: "WorkoutDetails",
            //     column: "WorkoutScheduleID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_WorkoutSchedules_UploaderID",
            //     table: "WorkoutSchedules",
            //     column: "UploaderID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Exercise_ExerciseType");

            migrationBuilder.DropTable(
                name: "Exercise_MuscleType");

            migrationBuilder.DropTable(
                name: "Food_FoodTypes");

            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DropTable(
                name: "MealDetails");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Report");

            migrationBuilder.DropTable(
                name: "UserDetails");

            migrationBuilder.DropTable(
                name: "UserMealSchedule");

            migrationBuilder.DropTable(
                name: "UserMealTracking");

            migrationBuilder.DropTable(
                name: "UserNotificationPreferences");

            migrationBuilder.DropTable(
                name: "UserWorkoutSchedule");

            migrationBuilder.DropTable(
                name: "UserWorkoutTracking");

            migrationBuilder.DropTable(
                name: "WorkoutDetails");

            migrationBuilder.DropTable(
                name: "ExerciseType");

            migrationBuilder.DropTable(
                name: "MuscleType");

            migrationBuilder.DropTable(
                name: "FoodTypes");

            migrationBuilder.DropTable(
                name: "Food");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "MealSchedules");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "WorkoutSchedules");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
