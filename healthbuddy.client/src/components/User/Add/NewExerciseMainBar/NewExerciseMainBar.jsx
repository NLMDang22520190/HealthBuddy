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

import NameTextInput from "../FormComponent/NameTextInput";
import TextAreaInput from "../FormComponent/TextAreaInput";
import StatTextInput from "../FormComponent/StatTextInput";

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
    imageUrl: "",
    videoUrl: "",
    difficultyLevel: "intermediate",
    numberOfReps: 10,
    numberOfSets: 3,
    timeBetweenSets: 60,
    caloriesBurned: 0,
    exerciseTypes: [],
    muscleGroups: [],
  });

  const [newExerciseType, setNewExerciseType] = useState("");
  const [newMuscleType, setNewMuscleType] = useState("");

  const [exerciseCategories, setExerciseCategories] = useState([]);
  const [muscleCategories, setMuscleCategories] = useState([]);

  const [isFetchingDataPending, startFetchingDataTransition] = useTransition();
  const [isFormSubmitting, startFormSubmitTransition] = useTransition();

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
          ></NameTextInput>

          <TextAreaInput
            labelText="Description"
            placeholder="Enter exercise description"
            text={formData.description}
            name="description"
            onChange={handleChange}
            itemVariants={itemVariants}
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
            ></StatTextInput>

            <StatTextInput
              labelText="Number of Sets"
              onChange={handleChange}
              name="numberOfSets"
              value={formData.numberOfSets}
              itemVariants={itemVariants}
              type="number"
              icon={ChartCandlestick}
            ></StatTextInput>

            <StatTextInput
              labelText="Time Between Sets (s)"
              onChange={handleChange}
              name="timeBetweenSets"
              value={formData.timeBetweenSets}
              itemVariants={itemVariants}
              type="number"
              icon={Clock4}
            ></StatTextInput>

            <StatTextInput
              labelText="Calories Burned"
              onChange={handleChange}
              name="caloriesBurned"
              value={formData.caloriesBurned}
              itemVariants={itemVariants}
              type="number"
              icon={Flame}
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
