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
    ingredients: [{ id: "", name: "", quantity: "", unit: "", isNew: false }],
    foodTypes: [],
  });
  const [newFoodType, setNewFoodType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  const [isFetchingDataPending, startFetchingDataTransition] = useTransition();
  const [isFormSubmitting, startFormSubmitTransition] = useTransition();

  const navigate = useNavigate();

  //#region add data
  const addNewIngredientAPI = async (ingre) => {
    try {
      const response = await api.post("/api/Ingredient/AddIngredient", {
        ingredientName: ingre.name,
        measurementUnit: ingre.unit,
      });
      const newIngredient = {
        id: response.data.ingredientId,
        name: response.data.ingredientName,
        unit: response.data.measurementUnit,
        isNew: true,
      };
      return newIngredient;
    } catch (error) {
      message.error("Error adding new ingredient: " + error.message);
      throw error; // Đảm bảo lỗi được ném ra để promise có thể xử lý
    }
  };

  const addNewFoodTypeAPI = async (type) => {
    try {
      const response = await api.post("/api/FoodType/AddFoodType", {
        foodTypeName: type.name,
      });
      const newType = {
        id: response.data.foodTypeId,
        name: response.data.foodTypeName,
        isNew: false,
      };
      return newType;
    } catch (error) {
      message.error("Error adding new food type: " + error.message);
      throw error; // Đảm bảo lỗi được ném ra để promise có thể xử lý
    }
  };

  const addNewFoodAPI = async (formData) => {
    try {
      // Chuẩn bị dữ liệu body từ formData

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
        uploaderId: 13, // Thay bằng ID người dùng thực tế nếu cần
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
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //#region Validation
    if (formData.calories <= 0) {
      message.error("Calories must be greater than 0!");
      return;
    }

    if (formData.cookingTime <= 0) {
      message.error("Cooking time must be greater than 0!");
      return;
    }

    if (formData.portion <= 0) {
      message.error("Portion size must be greater than 0!");
      return;
    }

    if (formData.foodTypes.length === 0) {
      message.error("Please select at least one food type!");
      return; // Dừng submit nếu có lỗi
    }

    if (formData.ingredients.length === 0) {
      message.error("Please add at least one ingredient!");
      return; // Dừng submit nếu có lỗi
    }

    const invalidIngredients = formData.ingredients.some(
      (ingredient) =>
        !ingredient.name.trim() || // Kiểm tra tên trống
        ingredient.quantity <= 0 // Kiểm tra số lượng trống
    );

    if (invalidIngredients) {
      message.error(
        "All ingredients must have a name and an appropriate quantity!"
      );
      return; // Dừng submit nếu có lỗi
    }
    //#endregion

    startFormSubmitTransition(async () => {
      //#region add new type and ingredient

      const newFoodTypes = formData.foodTypes.filter(
        (type) => type.isNew === true
      );
      const newIngredients = formData.ingredients.filter(
        (ingre) => ingre.isNew === true
      );

      // Tạo mảng các promise cho từng loại nếu cần
      const promises = [];

      if (newFoodTypes.length > 0) {
        const foodTypePromise = Promise.all(
          newFoodTypes.map((type) => addNewFoodTypeAPI(type))
        ).then((addedFoodTypes) => {
          setFormData((prevFormData) => {
            const updatedFoodTypes = [
              ...prevFormData.foodTypes.filter((type) => !type.isNew),
              ...addedFoodTypes, // Thêm các food types mới đã có id
            ];

            return {
              ...prevFormData,
              foodTypes: updatedFoodTypes, // Cập nhật lại foodTypes trong formData
            };
          });
          message.success("All new food types have been added successfully.");
        });

        promises.push(foodTypePromise);
      }

      if (newIngredients.length > 0) {
        const ingredientPromise = Promise.all(
          newIngredients.map((ingre) => addNewIngredientAPI(ingre))
        ).then((addedIngredients) => {
          setFormData((prevFormData) => {
            // Cập nhật lại ingredients trong formData
            const updatedIngredients = prevFormData.ingredients.map((ingre) => {
              // Tìm nguyên liệu mới trong addedIngredients
              const newIngre = addedIngredients.find(
                (newIngre) =>
                  newIngre.name === ingre.name && ingre.isNew === true
              );
              if (newIngre) {
                // Thay thế ingredient cũ bằng ingredient mới
                const newlyAddedIngredient = {
                  ...newIngre, // Cập nhật với id mới và các thông tin khác
                  quantity: isNaN(ingre.quantity) ? 0 : ingre.quantity, // Giữ lại quantity cũ, tránh NaN
                };

                return newlyAddedIngredient;
              }

              return ingre; // Nếu không phải là ingredient mới, giữ nguyên
            });

            return {
              ...prevFormData,
              ingredients: updatedIngredients, // Cập nhật lại ingredients trong formData
            };
          });
          message.success("All new ingredients have been added successfully.");
        });

        promises.push(ingredientPromise);
      }

      // Chạy tất cả các promise cùng lúc
      if (promises.length > 0) {
        await Promise.all(promises)
          .then(() => {
            message.success(
              "All new food types and ingredients have been added successfully."
            );
          })
          .catch((error) => {
            console.error("Error adding food types or ingredients:", error);
            message.error(
              "Failed to add some food types or ingredients: " + error.message
            );
          });
      }

      //#endregion

      // Gọi API để thêm món ăn mới
      await addNewFoodAPI(formData);
      setTimeout(() => {
        navigate("/");
      }, 2000); // Chờ 2 giây để hiển thị thông báo
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
