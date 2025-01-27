import React, { useState, useEffect, useTransition } from "react";
import {
  Button,
  TextInput,
  Label,
  Badge,
  Select,
  Spinner,
} from "flowbite-react";
import { motion } from "framer-motion";
import {
  Flame,
  Layers,
  UsersRound,
  Clock4,
  Carrot,
  XCircle,
  Image,
  Video,
} from "lucide-react";
import { message, Select as AntdSelect } from "antd";

import api from "../../../../features/AxiosInstance/AxiosInstance";
import NameTextInput from "../../Add/FormComponent/NameTextInput";
import TextAreaInput from "../../Add/FormComponent/TextAreaInput";
import StatTextInput from "../../Add/FormComponent/StatTextInput";
import DeleteButton from "../FormComponent/DeleteButton";
import AddNewIngredientModal from "../AddNewIngredientModal/AddNewIngredientModal";

const NewFoodMainBar = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  const [isFetchingDataPending, startFetchingDataTransition] = useTransition();

  //#region fetch data
  const fetchIngredients = async () => {
    try {
      const response = await api.get(
        "/api/Ingredient/GetAllApprovedIngredients"
      );
      const mappedData = response.data.map((data) => ({
        id: data.ingredientId,
        name: data.ingredientName,
        unit: data.measurementUnit,
        isNew: false,
      }));
      setAvailableIngredients(mappedData);
    } catch (error) {
      message.error("Error fetching ingredients: " + error.message);
    }
  };

  const fetchFoodCategories = async () => {
    try {
      const response = await api.get("/api/FoodType/GetAllApprovedFoodTypes");
      const mappedData = response.data.map((data) => ({
        id: data.foodTypeId,
        name: data.foodTypeName,
        isNew: false,
      }));
      setFoodCategories(mappedData);
    } catch (error) {
      message.error("Error fetching food categories: " + error.message);
    }
  };

  useEffect(() => {
    startFetchingDataTransition(async () => {
      console.log("log");
      const ingredientsResponse = fetchIngredients();
      const foodCategoriesResponse = fetchFoodCategories();
      await Promise.all([ingredientsResponse, foodCategoriesResponse]);
    });
  }, []);

  //#endregion

  //#region Ingredient
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];

    if (field === "name") {
      // Khi chọn nguyên liệu, tự động cập nhật đơn vị đo
      const selectedIngredient = availableIngredients.find(
        (ingredient) => ingredient.name === value
      );
      newIngredients[index]["unit"] = selectedIngredient
        ? selectedIngredient.unit
        : "";
    }

    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const getAvailableOptions = (index) => {
    const selectedIngredients = formData.ingredients.map(
      (ingredient) => ingredient.name
    );

    return availableIngredients.filter(
      (ingredient) =>
        !selectedIngredients.includes(ingredient.name) ||
        formData.ingredients[index]?.name === ingredient.name
    );
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", quantity: "", unit: "" },
      ],
    });
  };

  const addNewIngredient = (ingre) => {
    const ingreExist = availableIngredients.some(
      (i) => i.name.toLowerCase() === ingre.name.toLowerCase()
    );

    if (!ingreExist) {
      message.success("New ingredient added: " + ingre.name);
      availableIngredients.push(ingre);
    } else {
      message.error("Ingredient already exists: " + ingre.name);
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  //#endregion

  //#region Food Type
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
      )
    ) {
      const newType = { id: Date.now(), name: newFoodType, isNew: true };
      foodCategories.push(newType);
      setNewFoodType("");
    }
  };
  //#endregion

  //#region form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const newFoodTypes = formData.foodTypes.filter(
      (type) => type.isNew === true
    );
    if (newFoodTypes.length > 0) {
      newFoodTypes.forEach((type) => {
        message.success("New food type added: " + type.name);
      }); // Add new food types to the database
    }

    message.success("Dish added successfully!");
  };
  //#endregion

  //#region motion
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
  //#endregion

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
            {isFetchingDataPending ? (
              <Spinner color="info"></Spinner>
            ) : (
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
            )}
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
          </motion.div>  */}

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">
              Ingredients
            </Label>
            {isFetchingDataPending ? (
              <Spinner color="info"></Spinner>
            ) : (
              <>
                {formData.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex gap-4 mt-2 justify-between items-center"
                  >
                    {/* Dropdown chọn nguyên liệu */}
                    <AntdSelect
                      showSearch
                      className="w-1/2 h-10 text-white "
                      placeholder="Select Ingredient"
                      optionFilterProp="label"
                      value={ingredient.name || undefined} // Gán giá trị hiện tại
                      onChange={(value) =>
                        handleIngredientChange(index, "name", value)
                      } // Xử lý khi thay đổi
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={getAvailableOptions(index).map(
                        (availableIngredient) => ({
                          value: availableIngredient.name, // Giá trị sẽ được trả về khi chọn
                          label: availableIngredient.name, // Hiển thị label trong dropdown
                        })
                      )}
                    />
                    {/* Ô nhập số lượng */}
                    <TextInput
                      type="number"
                      required
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      className="w-1/4"
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                    {/* Ô đơn vị đo (tự động điền) */}
                    <TextInput
                      readOnly
                      className="w-1/4"
                      placeholder="Unit"
                      value={ingredient.unit}
                    />
                    {/* Nút xóa nguyên liệu */}
                    <DeleteButton onClick={() => removeIngredient(index)} />
                  </div>
                ))}
                <div className="flex gap-4 mt-4">
                  <Button
                    type="button"
                    color="gray"
                    onClick={addIngredient}
                    className="flex-grow"
                  >
                    Add Ingredient
                  </Button>
                  <Button
                    type="button"
                    color="success"
                    onClick={() => setIsModalVisible(true)}
                    className="flex-grow"
                  >
                    Add New Ingredient
                  </Button>
                </div>
              </>
            )}
          </motion.div>
          {/* 
          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Image</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500"
            />
          </motion.div> */}

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Image URL</Label>
            <TextInput
              icon={Image}
              name="imageUrl"
              required
              placeholder="Enter image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Video URL</Label>
            <TextInput
              icon={Video}
              required
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
      <AddNewIngredientModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onUpdate={addNewIngredient}
      ></AddNewIngredientModal>
    </div>
  );
};

export default NewFoodMainBar;
