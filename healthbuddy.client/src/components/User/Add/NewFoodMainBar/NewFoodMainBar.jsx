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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    difficultyLevel: "Easy",
    healthBenefits: "",
    cookingTime: 30,
    portion: 1,
    ingredients: [{ id: "", name: "", quantity: "", unit: "", isNew: false }],
    foodTypes: [],
  });

  const [formDataValidationError, setFormDataValidationError] = useState({
    name: null,
    description: null,
    imageUrl: null,
    videoUrl: null,
    calories: null,
    difficultyLevel: null,
    healthBenefits: null,
    cookingTime: null,
    portion: null,
    ingredients: [],
    foodTypes: null,
  });

  const [newFoodType, setNewFoodType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  const [isFetchingDataPending, startFetchingDataTransition] = useTransition();
  const [isFormSubmitting, startFormSubmitTransition] = useTransition();

  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  //#region add data
  const addNewIngredientAPI = async (ingre) => {
    try {
      const response = await api.post("/api/Ingredient/AddIngredient", {
        ingredientName: ingre.name,
        measurementUnit: ingre.unit,
      });

      return {
        id: response.data.ingredientId,
        name: response.data.ingredientName,
        unit: response.data.measurementUnit,
        isNew: false, // Đánh dấu không còn là mới
      };
    } catch (error) {
      message.error("Error adding new ingredient: " + error.message);
      throw error;
    }
  };

  const addNewFoodTypeAPI = async (type) => {
    try {
      const response = await api.post("/api/FoodType/AddFoodType", {
        foodTypeName: type.name,
      });

      return {
        id: response.data.foodTypeId,
        name: response.data.foodTypeName,
        isNew: false, // Đánh dấu không còn là mới
      };
    } catch (error) {
      message.error("Error adding new food type: " + error.message);
      throw error;
    }
  };

  const addNewFoodAPI = async (formData) => {
    try {
      // Chuẩn bị dữ liệu body từ formData
      console.log(formData);

      const requestBody = {
        foodName: formData.name, // Sử dụng `name` thay vì `foodName`
        description: formData.description,
        imgUrl: formData.imageUrl, // Sử dụng `imageUrl` thay vì `imgUrl`
        videoUrl: formData.videoUrl,
        calories: formData.calories,
        difficultyLevel: formData.difficultyLevel,
        healthBenefits: formData.healthBenefits,
        cookingTime: formData.cookingTime,
        portion: formData.portion,
        uploaderId: userId, // Thay bằng ID người dùng thực tế nếu cần
        foodTypeIds: formData.foodTypes.map((type) => type.id), // Lấy danh sách ID của `foodTypes`
        recipes: formData.ingredients.map((ingredient) => ({
          ingredientId: ingredient.id, // ID của ingredient
          quantity: parseFloat(ingredient.quantity), // Chuyển đổi `quantity` sang số
        })),
      };

      // Gọi API để thêm food mới
      const response = await api.post("/api/Food/AddNewFood", requestBody);

      // Xử lý kết quả trả về
      message.success("Food added successfully: " + response.data.foodName);
      setTimeout(() => {
        navigate("/");
      }, 250);

      return response.data; // Trả về dữ liệu của món ăn mới
    } catch (error) {
      console.error("Error adding new food:", error);
      message.error("Failed to add new food: " + error.message);
    }
  };

  //#endregion

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
      newIngredients[index]["isNew"] = selectedIngredient
        ? selectedIngredient.isNew
        : false;
      newIngredients[index]["id"] = selectedIngredient
        ? selectedIngredient.id
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
        { id: "", name: "", quantity: "", unit: "", isNew: false },
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
    setFormData({
      ...formData,
      [name]: value,
    });

    // Cập nhật lỗi của field đó
    setFormDataValidationError((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 5
          ? "Name must be at least 5 characters"
          : null;
      case "description":
        return value.trim().length < 10
          ? "Description must be at least 10 characters"
          : null;
      case "healthBenefits":
        return value.trim().length < 10
          ? "Health benefits must be at least 10 characters"
          : null;
      case "calories":
        return value <= 0 ? "Calories must be greater than 0!" : null;
      case "cookingTime":
        return value <= 0 ? "Cooking time must be greater than 0!" : null;
      case "portion":
        return value <= 0 ? "Portion size must be greater than 0!" : null;
      default:
        return null;
    }
  };

  const validateForm = () => {
    const errors = {
      name: validateField("name", formData.name),
      calories: validateField("calories", formData.calories),
      cookingTime: validateField("cookingTime", formData.cookingTime),
      portion: validateField("portion", formData.portion),
      foodTypes:
        formData.foodTypes.length === 0
          ? "Please select at least one food type!"
          : null,
      ingredients:
        formData.ingredients.length === 0
          ? "Please add at least one ingredient!"
          : formData.ingredients.map((ingredient) =>
              !ingredient.name.trim() || ingredient.quantity <= 0
                ? "Invalid ingredient"
                : null
            ),
    };

    setFormDataValidationError(errors);
    return Object.values(errors).every(
      (error) =>
        error === null ||
        (Array.isArray(error) && error.every((e) => e === null))
    );
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddFood = async () => {
    const promises = [];

    const newFoodTypes = formData.foodTypes.filter(
      (type) => type.isNew === true
    );
    const newIngredients = formData.ingredients.filter(
      (ingre) => ingre.isNew === true
    );

    let updatedFormData = { ...formData }; // Tạo một bản sao của formData

    // Tạo promise cho food types
    if (newFoodTypes.length > 0) {
      const foodTypePromise = Promise.all(
        newFoodTypes.map((type) => addNewFoodTypeAPI(type))
      ).then((addedFoodTypes) => {
        const nameToNewType = {};
        addedFoodTypes.forEach((newType) => {
          nameToNewType[newType.name] = newType;
        });

        const updatedFoodTypes = updatedFormData.foodTypes.map((type) => {
          if (type.isNew && nameToNewType[type.name]) {
            return nameToNewType[type.name];
          }
          return type;
        });

        return updatedFoodTypes; // Trả về mảng foodTypes đã cập nhật
      });
      promises.push({ type: "foodTypes", promise: foodTypePromise });
    }

    // Tạo promise cho ingredients
    if (newIngredients.length > 0) {
      const ingredientPromise = Promise.all(
        newIngredients.map((ingre) => addNewIngredientAPI(ingre))
      ).then((addedIngredients) => {
        const nameToNewIngredient = {};
        addedIngredients.forEach((newIngre) => {
          nameToNewIngredient[newIngre.name] = newIngre;
        });

        const updatedIngredients = updatedFormData.ingredients.map((ingre) => {
          if (ingre.isNew && nameToNewIngredient[ingre.name]) {
            return {
              ...nameToNewIngredient[ingre.name],
              quantity: ingre.quantity || 0,
              isNew: false,
            };
          }
          return ingre;
        });

        return updatedIngredients; // Trả về mảng ingredients đã cập nhật
      });
      promises.push({ type: "ingredients", promise: ingredientPromise });
    }

    try {
      // Chạy tất cả promises song song và đợi kết quả
      const results = await Promise.all(promises.map((p) => p.promise));

      // Cập nhật formData với kết quả từ tất cả promises
      const finalFormData = { ...formData };
      promises.forEach((p, index) => {
        if (p.type === "foodTypes") {
          finalFormData.foodTypes = results[index];
        } else if (p.type === "ingredients") {
          finalFormData.ingredients = results[index];
        }
      });

      // Cập nhật state với dữ liệu cuối cùng
      setFormData(finalFormData);

      // Log để kiểm tra
      console.log("Final updated form data:", finalFormData);

      // Gọi API để thêm món ăn mới
      await addNewFoodAPI(finalFormData);
    } catch (error) {
      console.error("Error in process:", error);
      message.error("Failed to process: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      message.error("Form contains errors. Please check again!");
      return;
    }

    startFormSubmitTransition(async () => {
      //#region add new type and ingredient

      //#endregion
      await handleAddFood();
      // Gọi API để thêm món ăn mới
      //await addNewFoodAPI(formData);
    });
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
            error={formDataValidationError.name}
          ></NameTextInput>

          <TextAreaInput
            labelText="Description"
            placeholder="Enter food description"
            text={formData.description}
            name="description"
            onChange={handleChange}
            itemVariants={itemVariants}
            error={formDataValidationError.description}
          ></TextAreaInput>

          <TextAreaInput
            labelText="Health Benefits"
            placeholder="Enter health benefits"
            text={formData.healthBenefits}
            name="healthBenefits"
            onChange={handleChange}
            itemVariants={itemVariants}
            error={formDataValidationError.healthBenefits}
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
              error={formDataValidationError.calories}
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
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
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
              error={formDataValidationError.cookingTime}
            ></StatTextInput>

            <StatTextInput
              labelText="Portion Size"
              onChange={handleChange}
              name="portion"
              value={formData.portion}
              itemVariants={itemVariants}
              type="number"
              icon={UsersRound}
              error={formDataValidationError.portion}
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
            {formDataValidationError.foodTypes && (
              <p className="text-red-500 text-xs italic">
                {formDataValidationError.foodTypes}
              </p>
            )}
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
              <div className="flex justify-center">
                <Spinner color="info"></Spinner>
              </div>
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

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">
              Ingredients
            </Label>
            {formDataValidationError.ingredients && (
              <p className="text-red-500 text-xs italic">
                {formDataValidationError.ingredients}
              </p>
            )}
            {isFetchingDataPending ? (
              <div className="flex justify-center">
                <Spinner color="info"></Spinner>
              </div>
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
                    disabled={
                      availableIngredients.length === 0 ||
                      formData.ingredients.length === 10 ||
                      isFormSubmitting
                    }
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
            disabled={isFormSubmitting}
            whileTap={{ scale: 0.98 }}
            className={`flex justify-self-end items-center p-4 rounded-2xl h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white font-semibold ${
              isFormSubmitting
                ? "cursor-not-allowed opacity-50"
                : " hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
            }`}
            type="submit"
          >
            {isFormSubmitting ? (
              <span className="flex items-center justify-center">
                <Spinner color="info" aria-label="White spinner example" />
                <span className="ml-2">Submitting...</span>
              </span>
            ) : (
              "Add Food"
            )}
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
