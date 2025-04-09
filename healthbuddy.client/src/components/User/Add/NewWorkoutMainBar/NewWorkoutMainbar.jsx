import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Label, Spinner, Button, TextInput } from "flowbite-react";
import { Image, Trash2, PlusCircle } from "lucide-react";
import { Select } from "antd";

import NameTextInput from "../FormComponent/NameTextInput";
import TextAreaInput from "../FormComponent/TextAreaInput";
import DeleteButton from "../FormComponent/DeleteButton";

const sampleExercises = [
  { id: 1, name: "Push Ups" },
  { id: 2, name: "Squats" },
  { id: 3, name: "Lunges" },
  { id: 4, name: "Plank" },
  { id: 5, name: "Burpees" },
];

const NewWorkoutMainbar = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    details: [
      {
        id: "",
        day: "",
        exerciseId: "",
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

    // Cập nhật lỗi của field đó
    setFormDataValidationError((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Thêm một chi tiết mới (1 dòng mới)
  const handleAddDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        {
          id: crypto.randomUUID(),
          day: prev.details.length + 1,
          exerciseId: "",
        },
      ],
    }));
  };

  // Chỉnh sửa 1 detail tại index
  const handleEditDetail = (index, field, value) => {
    const updated = [...formData.details];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, details: updated }));
  };

  // Xóa 1 detail tại index
  const handleDeleteDetail = (index) => {
    const updated = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      details: updated.map((item, i) => ({ ...item, day: i + 1 })),
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

  const handleSubmit = (e) => {};
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
          Add New Workout Schedule
        </Label>
        <form onSubmit={handleSubmit} className="space-y-8">
          <NameTextInput
            labelText="Workout Name"
            onChange={handleChange}
            placeholder="Enter workout name"
            name={formData.name}
            itemVariants={itemVariants}
          ></NameTextInput>

          <TextAreaInput
            labelText="Description"
            placeholder="Enter workout description"
            text={formData.description}
            name="description"
            onChange={handleChange}
            itemVariants={itemVariants}
          ></TextAreaInput>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 text-sm font-medium">Details</Label>
            {formData.details.map((detail, index) => (
              <div
                key={detail.id || index} // Sử dụng id nếu có, nếu không thì dùng index
                className="flex items-center gap-4 rounded-lg p-2 mb-2"
              >
                {/* Label ngày cố định chiều rộng */}
                <Label className="w-24 shrink-0 font-lg font-semibold">
                  {`Day ${index + 1}`}
                </Label>

                {/* Dropdown chọn bài tập */}
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select exercise"
                  optionFilterProp="label"
                  value={detail.exerciseId || undefined}
                  onChange={(value) =>
                    handleEditDetail(index, "exerciseId", value)
                  }
                  options={sampleExercises.map((exercise) => ({
                    label: exercise.name,
                    value: exercise.id,
                  }))}
                  className="flex-1 h-10" // Giúp select chiếm không gian còn lại
                />

                {/* Nút xóa với icon */}
                <DeleteButton
                  onClick={() => handleDeleteDetail(index)}
                ></DeleteButton>
              </div>
            ))}

            <Button
              type="button"
              className="self-start mt-2"
              onClick={handleAddDetail}
            >
              <PlusCircle className="mr-2" size={18} />
              Add Exercise
            </Button>
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

export default NewWorkoutMainbar;
