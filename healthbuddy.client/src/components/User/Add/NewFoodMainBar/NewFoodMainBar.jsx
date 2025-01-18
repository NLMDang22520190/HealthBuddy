import React, { useState } from "react";
import { Button, TextInput, Textarea, Select, Label } from "flowbite-react";
import { motion } from "framer-motion";
import {
  Pen,
  NotebookText,
  Cross,
  HeartPulse,
  Flame,
  Layers,
  UsersRound,
  Clock4,
  Carrot,
  Image,
  Video,
} from "lucide-react";

const NewFoodMainBar = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    videoUrl: "",
    calories: 0,
    difficultyLevel: "medium",
    healthBenefits: "",
    cookingTime: 30,
    portion: 1,
    ingredients: [{ name: "", quantity: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Dish added successfully!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="h-screen overflow-y-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col p-3 md:p-6"
      >
        <Label variants={itemVariants} className="text-2xl font-bold mb-8">
          Add New Dish
        </Label>
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Dish Name</Label>
            <TextInput
              icon={Pen}
              name="name"
              placeholder="Enter dish name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">
              Description
            </Label>
            <Textarea
              name="description"
              placeholder="Enter dish description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">
              Health Benefits
            </Label>
            <Textarea
              name="healthBenefits"
              placeholder="Enter health benefits"
              value={formData.healthBenefits}
              onChange={handleChange}
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <Label className="block mb-2 text-sm font-medium">Calories</Label>
              <TextInput
                icon={Flame}
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 text-sm font-medium">
                Difficulty Level
              </Label>
              <Select
                icon={Layers}
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={(e) =>
                  setFormData({ ...formData, difficultyLevel: e.target.value })
                }
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 text-sm font-medium">
                Cooking Time (minutes)
              </Label>
              <TextInput
                icon={Clock4}
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 text-sm font-medium">
                Portion Size
              </Label>
              <TextInput
                icon={UsersRound}
                type="number"
                name="portion"
                value={formData.portion}
                onChange={handleChange}
                required
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">
              Ingredients
            </Label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-4 mt-2">
                <TextInput
                  icon={Carrot}
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />
                <TextInput
                  type="number"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
            <Button
              type="button"
              color="gray"
              className="mt-2"
              onClick={addIngredient}
            >
              Add Ingredient
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Image</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Video URL</Label>
            <TextInput
              icon={Video}
              name="videoUrl"
              placeholder="Enter video URL"
              value={formData.videoUrl}
              onChange={handleChange}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-self-end items-center p-4 rounded-2xl h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark font-semibold"
            type="submit"
          >
            Add new food
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default NewFoodMainBar;
