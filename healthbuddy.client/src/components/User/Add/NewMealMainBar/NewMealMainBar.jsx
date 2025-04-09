import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { Label, Spinner, Button, TextInput } from "flowbite-react";
import { Image, PlusCircle } from "lucide-react";
import { Select } from "antd";

import DeleteButton from "../FormComponent/DeleteButton";
import NameTextInput from "../FormComponent/NameTextInput";
import TextAreaInput from "../FormComponent/TextAreaInput";
import api from "../../../../features/AxiosInstance/AxiosInstance";

// const sampleMeals = [
//   { id: 1, name: "Grilled Chicken Salad" },
//   { id: 2, name: "Beef Stir Fry" },
//   { id: 3, name: "Oatmeal with Fruits" },
//   { id: 4, name: "Vegetable Soup" },
//   { id: 5, name: "Spaghetti" },
// ];

const mealTimes = ["Breakfast", "Lunch", "Dinner"];

const NewMealMainBar = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    details: [
      {
        id: crypto.randomUUID(),
        day: 1,
        mealTime: "Breakfast",
        mealId: "",
      },
    ],
  });

  const [food, setFood] = useState([]);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFetchingDataPending, startFetchingDataTransition] = useTransition();

  const [formDataValidationError, setFormDataValidationError] = useState({
    name: null,
    description: null,
    imageUrl: null,
    details: null,
  });

  //#region fethch data
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await api.get("/api/Food/GetAllFoodForSchedule");
        const mappedData = response.data.map((food) => ({
          id: food.foodId,
          name: food.foodName,
        }));
        setFood(mappedData);
      } catch (error) {
        message.error("Error fetching exercises: " + error.message);
      }
    };
    startFetchingDataTransition(async () => {
      await fetchFood();
    });
  }, []);
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

  const handleAddDetail = () => {
    const currentDetails = formData.details;
    const lastDetail = currentDetails[currentDetails.length - 1];
    const nextMealIndex = mealTimes.indexOf(lastDetail.mealTime) + 1;

    let newDay = lastDetail.day;
    let newMealTime = "";

    if (nextMealIndex >= mealTimes.length) {
      newDay += 1;
      newMealTime = mealTimes[0]; // Bắt đầu ngày mới với "Breakfast"
    } else {
      newMealTime = mealTimes[nextMealIndex];
    }

    setFormData((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        {
          id: crypto.randomUUID(),
          day: newDay,
          mealTime: newMealTime,
          mealId: "",
        },
      ],
    }));
  };

  const handleEditDetail = (index, field, value) => {
    const updated = [...formData.details];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, details: updated }));
  };

  const handleDeleteDetail = (index) => {
    const updated = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      details: updated,
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

      default:
        return null;
    }
  };

  const validateForm = () => {
    const errors = {
      name: validateField("name", formData.name),
      description: validateField("description", formData.description),
      details:
        formData.details.length === 0
          ? "Please add at least one food!"
          : formData.details.map((detail) =>
              !detail.mealId ? "Invalid food" : null
            ),
    };

    setFormDataValidationError(errors);
    return Object.values(errors).every(
      (error) =>
        error === null ||
        (Array.isArray(error) && error.every((e) => e === null))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      message.error("Form contains errors. Please check again!");
      return;
    }
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
        className="flex flex-col p-3 md:p-6"
      >
        <Label className="text-2xl font-bold mb-8">Add New Meal Schedule</Label>
        <form onSubmit={handleSubmit} className="space-y-8">
          <NameTextInput
            labelText="Meal Name"
            onChange={handleChange}
            placeholder="Enter meal name"
            name={formData.name}
            itemVariants={itemVariants}
          ></NameTextInput>

          <TextAreaInput
            labelText="Description"
            placeholder="Enter meal description"
            text={formData.description}
            name="description"
            onChange={handleChange}
            itemVariants={itemVariants}
          ></TextAreaInput>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Details</Label>
            {isFetchingDataPending ? (
              <div className="flex justify-center">
                <Spinner color="info"></Spinner>
              </div>
            ) : (
              <>
                {formData.details.map((detail, index) => (
                  <div
                    key={detail.id}
                    className="flex items-center gap-4 rounded-lg p-2 mb-2"
                  >
                    <Label className="w-40 font-semibold">
                      {`Day ${detail.day} - ${detail.mealTime}`}
                    </Label>

                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select meal"
                      optionFilterProp="label"
                      value={detail.mealId || undefined}
                      onChange={(value) =>
                        handleEditDetail(index, "mealId", value)
                      }
                      options={food.map((meal) => ({
                        label: meal.name,
                        value: meal.id,
                      }))}
                      className="flex-1 h-10"
                    />

                    <DeleteButton onClick={() => handleDeleteDetail(index)} />
                  </div>
                ))}
              </>
            )}

            <Button
              type="button"
              className="self-start mt-2"
              onClick={handleAddDetail}
            >
              <PlusCircle className="mr-2" size={18} />
              Add Meal
            </Button>
          </motion.div>

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
              "Add Schedule"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default NewMealMainBar;
