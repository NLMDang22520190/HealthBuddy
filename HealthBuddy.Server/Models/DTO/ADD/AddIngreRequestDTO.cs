namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class AddIngreRequestDTO
    {
        public string IngredientName { get; set; } = string.Empty;
        public string? MeasurementUnit { get; set; }
    }
}