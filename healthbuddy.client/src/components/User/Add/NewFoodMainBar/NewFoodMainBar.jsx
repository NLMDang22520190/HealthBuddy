import React, { useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  Select,
  Label,
  Badge,
} from "flowbite-react";
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
  XCircle,
  Image,
  Video,
} from "lucide-react";

import NameTextInput from "../../Add/FormComponent/NameTextInput";
import TextAreaInput from "../../Add/FormComponent/TextAreaInput";
import StatTextInput from "../../Add/FormComponent/StatTextInput";

const foodCategories = [
  { id: 1, name: "Vegetarian" },
  { id: 2, name: "Vegan" },
  { id: 3, name: "Dessert" },
  { id: 4, name: "Meat" },
  { id: 5, name: "Seafood" },
  { id: 6, name: "Gluten-Free" },
  { id: 7, name: "Keto" },
];

const availableIngredients = [
  { id: 1, name: "Carrot", unit: "grams" },
  { id: 2, name: "Potato", unit: "grams" },
  { id: 3, name: "Onion", unit: "pieces" },
  { id: 4, name: "Chicken", unit: "grams" },
  { id: 5, name: "Salt", unit: "teaspoons" },
  { id: 6, name: "Sugar", unit: "teaspoons" },
  { id: 7, name: "Flour", unit: "cups" },
];

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
    ingredients: [{ name: "", quantity: "", unit: "" }],
    foodTypes: [],
  });
  const [newFoodType, setNewFoodType] = useState("");
  const [newFoodTypesList, setNewFoodTypesList] = useState([]);

  const [ingredientSearch, setIngredientSearch] = useState("");
  const [customIngredient, setCustomIngredient] = useState({
    name: "",
    unit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddIngredient = (ingredient) => {
    if (formData.ingredients.length >= 10) return;

    const exists = formData.ingredients.find((i) => i.name === ingredient.name);
    if (!exists) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredient],
      });
      setIngredientSearch("");
    }
  };

  const handleRemoveIngredient = (id) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    });
  };

  const handleCustomIngredientAdd = () => {
    if (customIngredient.name && customIngredient.unit) {
      const newIngredient = {
        id: Date.now(),
        name: customIngredient.name,
        unit: customIngredient.unit,
      };
      handleAddIngredient(newIngredient);
      setCustomIngredient({ name: "", unit: "" });
    }
  };

  const handleFoodTypeSelect = (type) => {
    if (
      formData.foodTypes.length < 3 &&
      !formData.foodTypes.some((foodType) => foodType.id === type.id)
    ) {
      setFormData({ ...formData, foodTypes: [...formData.foodTypes, type] });
    }
  };

  const handleFoodTypeRemove = (typeId) => {
    setFormData({
      ...formData,
      foodTypes: formData.foodTypes.filter(
        (foodType) => foodType.id !== typeId
      ),
    });
  };

  const addNewFoodType = () => {
    if (
      newFoodType &&
      !foodCategories.some(
        (cat) => cat.name.toLowerCase() === newFoodType.toLowerCase()
      ) &&
      !newFoodTypesList.some((type) => type.name === newFoodType)
    ) {
      const newType = { id: Date.now(), name: newFoodType };
      foodCategories.push(newType);
      setNewFoodTypesList([...newFoodTypesList, newType]);
      setNewFoodType("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Dish added successfully!");
  };

  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

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
    <div className="user-page-mainbar-content-container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col p-3 md:p-6 user-page-mainbar-content-marginbottom"
      >
        <Label variants={itemVariants} className="text-2xl font-bold mb-8">
          Add New Food
        </Label>
        <form onSubmit={handleSubmit} className="space-y-8">
          <NameTextInput
            labelText="Food Name"
            onChange={handleChange}
            placeholder="Enter food name"
            name={formData.name}
            itemVariants={itemVariants}
          ></NameTextInput>

          <TextAreaInput
            labelText="Description"
            placeholder="Enter food description"
            text={formData.description}
            name="description"
            onChange={handleChange}
            itemVariants={itemVariants}
          ></TextAreaInput>

          <TextAreaInput
            labelText="Health Benefits"
            placeholder="Enter health benefits"
            text={formData.healthBenefits}
            name="healthBenefits"
            onChange={handleChange}
            itemVariants={itemVariants}
          ></TextAreaInput>

          <div className="grid grid-cols-2 gap-4">
            <StatTextInput
              labelText="Calories"
              onChange={handleChange}
              name="calories"
              value={formData.calories}
              itemVariants={itemVariants}
              type="number"
              icon={Flame}
            ></StatTextInput>

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

            <StatTextInput
              labelText="Cooking Time (minutes)"
              onChange={handleChange}
              name="cookingTime"
              value={formData.cookingTime}
              itemVariants={itemVariants}
              type="number"
              icon={Clock4}
            ></StatTextInput>

            <StatTextInput
              labelText="Portion Size"
              onChange={handleChange}
              name="portion"
              value={formData.portion}
              itemVariants={itemVariants}
              type="number"
              icon={UsersRound}
            ></StatTextInput>
          </div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Food Types</Label>
            <TextInput
              placeholder="Search or add a food type"
              value={newFoodType}
              onChange={(e) => setNewFoodType(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNewFoodType();
                }
              }}
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.foodTypes.map((type) => (
                <Badge
                  key={type.id}
                  color="info"
                  className="flex py-2 items-center"
                >
                  <span className="flex">
                    {type.name}{" "}
                    <XCircle
                      size={16}
                      className="ml-1 cursor-pointer"
                      onClick={() => handleFoodTypeRemove(type.id)}
                    />
                  </span>
                </Badge>
              ))}
            </div>
            <div className="mt-4 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2">
              {foodCategories
                .filter((type) =>
                  type.name.toLowerCase().includes(newFoodType.toLowerCase())
                )
                .map((type) => (
                  <div
                    key={type.id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFoodTypeSelect(type)}
                  >
                    <Label>{type.name}</Label>
                    {formData.foodTypes.some(
                      (foodType) => foodType.id === type.id
                    ) && <span className="text-gray-400">Selected</span>}
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div>
            <Label className="block mb-2 text-sm font-medium">
              Ingredients
            </Label>
            <TextInput
              placeholder="Search for an ingredient"
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
            />
            <div className="mt-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2">
              {filteredIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddIngredient(ingredient)}
                >
                  <Label>
                    {ingredient.name} ({ingredient.unit})
                  </Label>
                </div>
              ))}
            </div>

            <Label className="block mt-4 mb-2 text-sm font-medium">
              Add Custom Ingredient
            </Label>
            <div className="flex gap-4">
              <TextInput
                placeholder="Ingredient name"
                value={customIngredient.name}
                onChange={(e) =>
                  setCustomIngredient({
                    ...customIngredient,
                    name: e.target.value,
                  })
                }
              />
              <TextInput
                placeholder="Unit (e.g., grams, cups)"
                value={customIngredient.unit}
                onChange={(e) =>
                  setCustomIngredient({
                    ...customIngredient,
                    unit: e.target.value,
                  })
                }
              />
              <Button color="gray" onClick={handleCustomIngredientAdd}>
                Add
              </Button>
            </div>

            <div className="mt-4">
              {formData.ingredients.map((ingredient) => (
                <Badge
                  key={ingredient.id}
                  color="info"
                  className="flex py-2 items-center mb-2"
                >
                  <span className="flex items-center">
                    {ingredient.name} ({ingredient.unit})
                    <XCircle
                      size={16}
                      className="ml-1 cursor-pointer"
                      onClick={() => handleRemoveIngredient(ingredient.id)}
                    />
                  </span>
                </Badge>
              ))}
            </div>

            <p className="text-sm mt-2 text-gray-500">
              {formData.ingredients.length < 5
                ? "Please add at least 5 ingredients."
                : formData.ingredients.length > 10
                ? "You can only add up to 10 ingredients."
                : ""}
            </p>
          </motion.div>

          {/* <motion.div variants={itemVariants}>
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
                <TextInput
                  placeholder="Unit (e.g., grams, cups)"
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
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
          </motion.div> */}

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
