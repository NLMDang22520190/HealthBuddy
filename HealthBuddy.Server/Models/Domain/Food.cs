using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class Food
{
    public int FoodId { get; set; }

    public string FoodName { get; set; } = null!;

    public string? Description { get; set; }

    public string? ImgUrl { get; set; }

    public string? VideoUrl { get; set; }

    public int Calories { get; set; }

    public string? DifficultyLevel { get; set; }

    public string? HealthBenefits { get; set; }

    public int CookingTime { get; set; }

    public int Portion { get; set; }

    public int UploaderId { get; set; }

    public bool IsApproved { get; set; }

    public bool IsHidden { get; set; }

    public int NumberOfLikes { get; set; }

    public int NumberOfComments { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public virtual ICollection<MealDetail> MealDetails { get; set; } = new List<MealDetail>();

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

    public virtual User Uploader { get; set; } = null!;

    public virtual ICollection<FoodType> FoodTypes { get; set; } = new List<FoodType>();
}
