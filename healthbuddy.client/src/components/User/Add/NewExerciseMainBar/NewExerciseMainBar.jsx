import React, { useState, useTransition, useEffect } from "react";
import { Spinner, Badge } from "flowbite-react";
import { TextInput, Textarea, Select, Label } from "flowbite-react";
import { motion } from "framer-motion";
import {
  Pen,
  Layers,
  Flame,
  ChartCandlestick,
  Clock4,
  Video,
  Anvil,
  Image,
  XCircle,
} from "lucide-react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NameTextInput from "../FormComponent/NameTextInput";
import TextAreaInput from "../FormComponent/TextAreaInput";
import StatTextInput from "../FormComponent/StatTextInput";
import api from "../../../../features/AxiosInstance/AxiosInstance";

const AddNewExerciseMainBar = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    difficultyLevel: "Beginner",
    numberOfReps: 10,
    numberOfSets: 3,
    timeBetweenSets: 60,
    caloriesBurned: 0,
    exerciseTypes: [],
    muscleGroups: [],
  });

  const [formDataValidationError, setFormDataValidationError] = useState({
    name: null,
    description: null,
    imageUrl: null,
    videoUrl: null,
    difficultyLevel: null,
    numberOfReps: null,
    numberOfSets: null,
    timeBetweenSets: null,
    caloriesBurned: null,
    exerciseTypes: null,
    muscleGroups: null,
  });

  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const [newExerciseType, setNewExerciseType] = useState("");
  const [newMuscleType, setNewMuscleType] = useState("");

  const [exerciseCategories, setExerciseCategories] = useState([]);
  const [muscleCategories, setMuscleCategories] = useState([]);

  const [isFetchingDataPending, startFetchingDataTransition] = useTransition();
  const [isFormSubmitting, startFormSubmitTransition] = useTransition();

  //#region add data
  const addNewExerciseTypeAPI = async (type) => {
    try {
      const response = await api.post("/api/ExerciseType/AddExerciseType", {
        exerciseName: type.name,
      });

      return {
        id: response.data.exerciseTypeId,
        name: response.data.exerciseName,
        isNew: false, // Đánh dấu không còn là mới
      };
    } catch (error) {
      message.error("Error adding new exercise type: " + error.message);
      throw error;
    }
  };

  const addNewMuscleTypeAPI = async (type) => {
    try {
      const response = await api.post("/api/ExerciseType/AddExerciseType", {
        muscleTypeName: type.name,
      });

      return {
        id: response.data.muscleTypeId,
        name: response.data.muscleTypeName,
        isNew: false, // Đánh dấu không còn là mới
      };
    } catch (error) {
      message.error("Error adding new muscle type: " + error.message);
      throw error;
    }
  };

  const addNewExerciseAPI = async (formData) => {
    try {
      // Chuẩn bị dữ liệu body từ formData
      const requestBody = {
        exerciseName: formData.name, // Sử dụng `name` thay vì `foodName`
        description: formData.description,
        imgUrl: formData.imageUrl, // Sử dụng `imageUrl` thay vì `imgUrl`
        videoUrl: formData.videoUrl,
        numberOfReps: formData.numberOfReps,
        difficultyLevel: formData.difficultyLevel,
        numberOfSets: formData.numberOfSets,
        timeBetweenSet: formData.timeBetweenSets,
        caloriesBurned: formData.caloriesBurned,
        uploaderId: userId, // Thay bằng ID người dùng thực tế nếu cần
        exerciseTypeIds: formData.exerciseTypes.map((type) => type.id), // Lấy danh sách ID của `foodTypes`
        muscleTypeIds: formData.muscleGroups.map((type) => type.id), // Lấy danh sách ID của `foodTypes`
      };

      // Gọi API để thêm food mới
      const response = await api.post(
        "/api/Exercise/AddNewExercise",
        requestBody
      );

      // Xử lý kết quả trả về
      message.success(
        "Exercise added successfully: " + response.data.exerciseName
      );
      setTimeout(() => {
        navigate("/");
      }, 250);

      return response.data; // Trả về dữ liệu của món ăn mới
    } catch (error) {
      console.error("Error adding new exercise:", error);
      message.error("Failed to add new exercise: " + error.message);
    }
  };
  //#endregion

  //#region fetch data
  const fetchExerciseCategories = async () => {
    try {
      const response = await api.get(
        "/api/ExerciseType/GetAllApprovedExerciseTypes"
      );
      const mappedData = response.data.map((data) => ({
        id: data.exerciseTypeId,
        name: data.exerciseName,
        isNew: false,
      }));
      setExerciseCategories(mappedData);
    } catch (error) {
      message.error("Error fetching exercise categories: " + error.message);
    }
  };

  const fetchMuscleCategories = async () => {
    try {
      const response = await api.get(
        "/api/MuscleType/GetAllApprovedMuscleTypes"
      );
      const mappedData = response.data.map((data) => ({
        id: data.muscleTypeId,
        name: data.muscleTypeName,
        isNew: false,
      }));
      setMuscleCategories(mappedData);
    } catch (error) {
      message.error("Error fetching muscle categories: " + error.message);
    }
  };

  useEffect(() => {
    startFetchingDataTransition(async () => {
      const exerciseTypeResponse = fetchExerciseCategories();
      const muscleTypeResponse = fetchMuscleCategories();
      await Promise.all([exerciseTypeResponse, muscleTypeResponse]);
    });
  }, []);
  //#endregion

  //#region muscle types
  const handleMuscleTypeSelect = (type) => {
    if (
      formData.muscleGroups.length < 3 &&
      !formData.muscleGroups.some((muscleType) => muscleType.id === type.id)
    ) {
      setFormData({
        ...formData,
        muscleGroups: [...formData.muscleGroups, type],
      });
    }
  };

  const handleMuscleTypeRemove = (typeId) => {
    setFormData({
      ...formData,
      muscleGroups: formData.muscleGroups.filter(
        (muscleType) => muscleType.id !== typeId
      ),
    });
  };

  const addNewMuscleType = () => {
    if (
      newMuscleType &&
      !muscleCategories.some(
        (cat) => cat.name.toLowerCase() === newMuscleType.toLowerCase()
      )
    ) {
      const newType = { id: Date.now(), name: newMuscleType, isNew: true };
      muscleCategories.push(newType);
      setNewMuscleType("");
    }
  };
  //#endregion

  //#region exercise types

  const handleExerciseTypeSelect = (type) => {
    if (
      formData.exerciseTypes.length < 3 &&
      !formData.exerciseTypes.some(
        (exerciseType) => exerciseType.id === type.id
      )
    ) {
      setFormData({
        ...formData,
        exerciseTypes: [...formData.exerciseTypes, type],
      });
    }
  };

  const handleExerciseTypeRemove = (typeId) => {
    setFormData({
      ...formData,
      exerciseTypes: formData.exerciseTypes.filter(
        (exerciseType) => exerciseType.id !== typeId
      ),
    });
  };

  const addNewExerciseType = () => {
    if (
      newExerciseType &&
      !exerciseCategories.some(
        (cat) => cat.name.toLowerCase() === newExerciseType.toLowerCase()
      )
    ) {
      const newType = { id: Date.now(), name: newExerciseType, isNew: true };
      exerciseCategories.push(newType);
      setNewExerciseType("");
    }
  };
  //#endregion

  //#region form data
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
      case "numberOfReps":
        return value <= 0 ? "Number of reps must be greater than 0" : null;
      case "numberOfSets":
        return value <= 0 ? "Number of sets must be greater than 0" : null;
      case "timeBetweenSets":
        return value < 0
          ? "Time between sets must be at least 0 seconds"
          : null;
      case "caloriesBurned":
        return value < 0 ? "Calories burned must be at least 0" : null;
      case "exerciseTypes":
        return value.length === 0
          ? "Please select at least one exercise type"
          : null;
      case "muscleGroups":
        return value.length === 0
          ? "Please select at least one muscle type"
          : null;
      default:
        return null;
    }
  };

  const validateForm = () => {
    const errors = {
      name: validateField("name", formData.name),
      description: validateField("description", formData.description),
      numberOfReps: validateField("numberOfReps", formData.numberOfReps),
      numberOfSets: validateField("numberOfSets", formData.numberOfSets),
      timeBetweenSets: validateField(
        "timeBetweenSets",
        formData.timeBetweenSets
      ),
      caloriesBurned: validateField("caloriesBurned", formData.caloriesBurned),
      exerciseTypes: validateField("exerciseTypes", formData.exerciseTypes),
      muscleGroups: validateField("muscleGroups", formData.muscleGroups),
    };

    setFormDataValidationError(errors);

    return Object.values(errors).every((error) => error === null); // Trả về true nếu không có lỗi
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    // Cập nhật formData
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Cập nhật lỗi dựa trên giá trị nhập vào
    setFormDataValidationError((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, newValue), // Gọi hàm validate từng field
    }));
  };

  const handleAddExercise = async () => {
    const promises = [];

    const newExerciseTypes = formData.exerciseTypes.filter(
      (type) => type.isNew === true
    );
    const newMuscleTypes = formData.muscleGroups.filter(
      (type) => type.isNew === true
    );

    let updatedFormData = { ...formData }; // Tạo một bản sao của formData

    // Tạo promise cho types
    if (newExerciseTypes.length > 0) {
      const exerciseTypePromise = Promise.all(
        newExerciseTypes.map((type) => addNewExerciseTypeAPI(type))
      ).then((addedExerciseTypes) => {
        const nameToNewType = {};
        addedExerciseTypes.forEach((newType) => {
          nameToNewType[newType.name] = newType;
        });

        const updatedExerciseTypes = updatedFormData.exerciseTypes.map(
          (type) => {
            if (type.isNew && nameToNewType[type.name]) {
              return nameToNewType[type.name];
            }
            return type;
          }
        );
        return updatedExerciseTypes; // Trả về mảng foodTypes đã cập nhật
      });
      promises.push({ type: "exerciseTypes", promise: exerciseTypePromise });
    }

    // Tạo promise cho types
    if (newMuscleTypes.length > 0) {
      const muscleTypePromise = Promise.all(
        newMuscleTypes.map((type) => addNewMuscleTypeAPI(type))
      ).then((addedMuscleTypes) => {
        const nameToNewType = {};
        addedMuscleTypes.forEach((newType) => {
          nameToNewType[newType.name] = newType;
        });

        const updatedMuscleTypes = updatedFormData.muscleGroups.map((type) => {
          if (type.isNew && nameToNewType[type.name]) {
            return nameToNewType[type.name];
          }
          return type;
        });
        console.log(updatedMuscleTypes);

        return updatedMuscleTypes; // Trả về mảng foodTypes đã cập nhật
      });
      promises.push({ type: "muscleTypes", promise: muscleTypePromise });
    }

    try {
      // Chạy tất cả promises song song và đợi kết quả
      const results = await Promise.all(promises.map((p) => p.promise));

      // Cập nhật formData với kết quả từ tất cả promises
      const finalFormData = { ...formData };
      promises.forEach((p, index) => {
        if (p.type === "exerciseTypes") {
          finalFormData.exerciseTypes = results[index];
        } else if (p.type === "muscleTypes") {
          finalFormData.muscleGroups = results[index];
        }
      });

      // Cập nhật state với dữ liệu cuối cùng
      setFormData(finalFormData);

      // Log để kiểm tra
      console.log("Final updated form data:", finalFormData);

      // Gọi API để thêm món ăn mới
      await addNewExerciseAPI(finalFormData);
    } catch (error) {
      console.error("Error in process:", error);
      message.error("Failed to process: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //#region validation
    if (!validateForm()) {
      message.error("Form contains errors. Please check again!");
      return;
    }
    //#endregion
    startFormSubmitTransition(async () => {
      await handleAddExercise();
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
        <Label className="text-2xl font-bold mb-8">Add New Exercise</Label>
        <form onSubmit={handleSubmit} className="space-y-8">
          <NameTextInput
            labelText="Exercise Name"
            onChange={handleChange}
            placeholder="Enter exercise name"
            name={formData.name}
            itemVariants={itemVariants}
            error={formDataValidationError.name}
          ></NameTextInput>

          <TextAreaInput
            labelText="Description"
            placeholder="Enter exercise description"
            text={formData.description}
            name="description"
            onChange={handleChange}
            itemVariants={itemVariants}
            error={formDataValidationError.description}
          ></TextAreaInput>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatTextInput
              labelText="Number of Reps"
              onChange={handleChange}
              name="numberOfReps"
              value={formData.numberOfReps}
              itemVariants={itemVariants}
              type="number"
              icon={Anvil}
              error={formDataValidationError.numberOfReps}
            ></StatTextInput>

            <StatTextInput
              labelText="Number of Sets"
              onChange={handleChange}
              name="numberOfSets"
              value={formData.numberOfSets}
              itemVariants={itemVariants}
              type="number"
              icon={ChartCandlestick}
              error={formDataValidationError.numberOfSets}
            ></StatTextInput>

            <StatTextInput
              labelText="Time Between Sets (s)"
              onChange={handleChange}
              name="timeBetweenSets"
              value={formData.timeBetweenSets}
              itemVariants={itemVariants}
              type="number"
              icon={Clock4}
              error={formDataValidationError.timeBetweenSets}
            ></StatTextInput>

            <StatTextInput
              labelText="Calories Burned"
              onChange={handleChange}
              name="caloriesBurned"
              value={formData.caloriesBurned}
              itemVariants={itemVariants}
              type="number"
              icon={Flame}
              error={formDataValidationError.caloriesBurned}
            ></StatTextInput>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 font-medium">Difficulty Level</Label>
              <Select
                icon={Layers}
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Select>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">
              Exercise Types
            </Label>
            <TextInput
              placeholder="Search or add an exercise type"
              value={newExerciseType}
              onChange={(e) => setNewExerciseType(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNewExerciseType();
                }
              }}
            />
            {formDataValidationError.exerciseTypes && (
              <p className="mt-1 text-red-500 text-xs italic">
                {formDataValidationError.exerciseTypes}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.exerciseTypes.map((type) => (
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
                      onClick={() => handleExerciseTypeRemove(type.id)}
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
                {exerciseCategories
                  .filter((type) =>
                    type.name
                      .toLowerCase()
                      .includes(newExerciseType.toLowerCase())
                  )
                  .map((type) => (
                    <div
                      key={type.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleExerciseTypeSelect(type)}
                    >
                      <Label>{type.name}</Label>
                      {formData.exerciseTypes.some(
                        (exerciseType) => exerciseType.id === type.id
                      ) && <span className="text-gray-400">Selected</span>}
                    </div>
                  ))}
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">
              Muscle Type
            </Label>
            <TextInput
              placeholder="Search or add a muscle type"
              value={newMuscleType}
              onChange={(e) => setNewMuscleType(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNewMuscleType();
                }
              }}
            />
            {formDataValidationError.muscleGroups && (
              <p className="mt-1 text-red-500 text-xs italic">
                {formDataValidationError.muscleGroups}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.muscleGroups.map((type) => (
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
                      onClick={() => handleMuscleTypeRemove(type.id)}
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
                {muscleCategories
                  .filter((type) =>
                    type.name
                      .toLowerCase()
                      .includes(newMuscleType.toLowerCase())
                  )
                  .map((type) => (
                    <div
                      key={type.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleMuscleTypeSelect(type)}
                    >
                      <Label>{type.name}</Label>
                      {formData.muscleGroups.some(
                        (muscleType) => muscleType.id === type.id
                      ) && <span className="text-gray-400">Selected</span>}
                    </div>
                  ))}
              </div>
            )}
          </motion.div>

          {/* <motion.div variants={itemVariants}>
            <Label className="block mb-2 font-medium">Image</Label>
            <TextInput
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
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
            <Label className="block mb-2 font-medium">Video URL</Label>
            <TextInput
              icon={Video}
              required
              placeholder="Enter video URL"
              name="videoUrl"
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
              "Add Exercise"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddNewExerciseMainBar;
