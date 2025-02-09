using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthBuddy.Server.Migrations
{
    /// <inheritdoc />
    public partial class addmealdescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "MealSchedules",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfComments",
                table: "MealSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfLikes",
                table: "MealSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "MealSchedules");

            migrationBuilder.DropColumn(
                name: "NumberOfComments",
                table: "MealSchedules");

            migrationBuilder.DropColumn(
                name: "NumberOfLikes",
                table: "MealSchedules");
        }
    }
}
