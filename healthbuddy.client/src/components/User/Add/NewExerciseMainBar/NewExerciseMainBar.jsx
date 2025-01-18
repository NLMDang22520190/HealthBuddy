import React, { useState } from "react";
import { Button } from "flowbite-react";
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
} from "lucide-react";

const exerciseTypes = ["Cardio", "Strength", "Flexibility", "Balance", "HIIT"];

const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
  "Core",
  "Full Body",
];

const AddNewExerciseMainBar = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    videoUrl: "",
    difficultyLevel: "intermediate",
    numberOfReps: 10,
    numberOfSets: 3,
    timeBetweenSets: 60,
    caloriesBurned: 0,
    exerciseTypes: [],
    muscleGroups: [],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Exercise added successfully!");
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
        <Label className="text-2xl font-bold mb-8">Add New Exercise</Label>
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div variants={itemVariants}>
            <Label className="block mb-2 font-medium">Exercise Name</Label>
            <TextInput
              icon={Pen}
              placeholder="Enter exercise name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 font-medium">Description</Label>
            <Textarea
              placeholder="Enter exercise description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants}>
              <Label className="block mb-2 font-medium">Number of Reps</Label>
              <TextInput
                icon={Anvil}
                type="number"
                name="numberOfReps"
                value={formData.numberOfReps}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 font-medium">Number of Sets</Label>
              <TextInput
                icon={ChartCandlestick}
                type="number"
                name="numberOfSets"
                value={formData.numberOfSets}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 font-medium">
                Time Between Sets (seconds)
              </Label>
              <TextInput
                icon={Clock4}
                type="number"
                name="timeBetweenSets"
                value={formData.timeBetweenSets}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 font-medium">Calories Burned</Label>
              <TextInput
                icon={Flame}
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label className="block mb-2 font-medium">Difficulty Level</Label>
              <Select
                icon={Layers}
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 font-medium">Image</Label>
            <TextInput
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label className="block mb-2 font-medium">Video URL</Label>
            <TextInput
              icon={Video}
              placeholder="Enter video URL"
              name="videoUrl"
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
            Add new exercise
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddNewExerciseMainBar;
