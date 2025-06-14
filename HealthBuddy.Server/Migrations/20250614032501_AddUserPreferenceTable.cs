using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthBuddy.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserPreferenceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserPreferences",
                columns: table => new
                {
                    UserPreferenceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DietaryRestrictions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PreferredCuisines = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DislikedIngredients = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxCookingTime = table.Column<int>(type: "int", nullable: true),
                    PreferredDifficultyLevel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TargetCaloriesPerMeal = table.Column<int>(type: "int", nullable: true),
                    PreferredExerciseTypes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PreferredMuscleGroups = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxWorkoutDuration = table.Column<int>(type: "int", nullable: true),
                    FitnessGoals = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PreferredWorkoutTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FitnessLevel = table.Column<int>(type: "int", nullable: true),
                    TargetWeight = table.Column<double>(type: "float", nullable: true),
                    TargetCaloriesPerDay = table.Column<int>(type: "int", nullable: true),
                    HealthGoals = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActivityLevel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPreferences", x => x.UserPreferenceId);
                    table.ForeignKey(
                        name: "FK_UserPreferences_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPreferences_UserId",
                table: "UserPreferences",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPreferences");
        }
    }
}
