using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthBuddy.Server.Migrations
{
    /// <inheritdoc />
    public partial class addimagetoschedule2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "WorkoutSchedules",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "WorkoutSchedules");
        }
    }
}
