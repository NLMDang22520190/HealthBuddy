using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthBuddy.Server.Migrations
{
    /// <inheritdoc />
    public partial class addisapprovedtotype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "MuscleType",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Ingredients",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "FoodTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "MuscleType");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "FoodTypes");
        }
    }
}
