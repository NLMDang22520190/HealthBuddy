import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label, Spinner, Button, TextInput } from "flowbite-react";
import { Image, PlusCircle } from "lucide-react";
import { Select } from "antd";

import DeleteButton from "../FormComponent/DeleteButton";
import NameTextInput from "../FormComponent/NameTextInput";
import TextAreaInput from "../FormComponent/TextAreaInput";

const sampleMeals = [
  { id: 1, name: "Grilled Chicken Salad" },
  { id: 2, name: "Beef Stir Fry" },
  { id: 3, name: "Oatmeal with Fruits" },
  { id: 4, name: "Vegetable Soup" },
  { id: 5, name: "Spaghetti" },
];

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

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  //#region form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    console.log("Form data submitted:", formData);
    // Fake submit delay
    setTimeout(() => {
      setIsFormSubmitting(false);
    }, 1500);
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
                  onChange={(value) => handleEditDetail(index, "mealId", value)}
                  options={sampleMeals.map((meal) => ({
                    label: meal.name,
                    value: meal.id,
                  }))}
                  className="flex-1 h-10"
                />

                <DeleteButton onClick={() => handleDeleteDetail(index)} />
              </div>
            ))}

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
