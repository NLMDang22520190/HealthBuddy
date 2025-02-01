import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Flag,
  Clock,
  Anvil,
  Flame,
  Layers,
  ChartCandlestick,
} from "lucide-react";
import { Accordion, Checkbox, Label, Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { message } from "antd";

import StatCard from "../StatCard/StatCard";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import CommentCard from "../CommentCard/CommentCard";
import CommentAccordition from "../CommentAccordition/CommentAccordition";
import ShowImageModal from "../../../ShowImageModal/ShowImageModal";
import api from "../../../../features/AxiosInstance/AxiosInstance";

// const exerciseDetail = {
//   id: 1,
//   title: "Push-up",
//   image: "https://placehold.co/50x50.png",
//   description:
//     "A compound exercise that targets multiple muscle groups including chest, shoulders, and triceps. Perfect for building upper body strength and endurance.",
//   stats: {
//     reps: 20,
//     sets: 2,
//     timeBetweenSets: 2, // phút
//     caloriesBurned: 200,
//     difficulty: "Medium",
//   },
//   exerciseTypes: ["Strength", "Bodyweight", "Upper Body"], // Thêm thông tin loại bài tập
//   muscleTypes: ["Chest", "Shoulders", "Triceps"], // Thêm thông tin loại cơ
// };

const ExerciseMainBar = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [isDataLoading, startDataTransition] = useTransition();
  const { postId } = useParams();

  const fetchExerciseDetail = async () => {
    try {
      const response = await api.get(`/api/Exercise/GetExerciseById/${postId}`);
      const apiResponse = response.data;
      const mappedData = {
        id: apiResponse.exerciseId,
        title: apiResponse.exerciseName,
        image: apiResponse.imgUrl, // Assuming imgUrl is the image link
        description: apiResponse.description,
        stats: {
          reps: apiResponse.numberOfReps,
          sets: apiResponse.numberOfSets,
          timeBetweenSets: apiResponse.timeBetweenSet, // minutes
          caloriesBurned: apiResponse.caloriesBurned,
          difficulty: apiResponse.difficultyLevel,
        },
        exerciseTypes: apiResponse.exerciseTypes.map(
          (type) => type.exerciseName
        ), // Extract exercise types' names
        muscleTypes: apiResponse.muscleTypes.map(
          (muscle) => muscle.muscleTypeName
        ), // Extract muscle types' names
      };
      setExerciseDetail(mappedData);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch exercise detail" + error.message);
    }
  };

  useEffect(() => {
    startDataTransition(async () => {
      await fetchExerciseDetail();
    });
  }, []);

  if (isDataLoading || !exerciseDetail) {
    return (
      <div className="flex h-full justify-center items-center">
        <Spinner size="xl" color="info" />
      </div>
    );
  }

  return (
    <div className="user-page-mainbar-content-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-3 md:p-6 user-page-mainbar-content-marginbottom"
      >
        {/* Main image */}
        <motion.img
          onClick={() => setShowImageModal(true)}
          src={exerciseDetail.image}
          alt="Exercise"
          className="cursor-pointer w-full h-64 object-cover rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Title and actions */}
        <div className="flex justify-between items-center mb-6">
          <Label className="text-3xl font-bold">{exerciseDetail.title}</Label>
          <button className="text-primary-light dark:text-primary-dark">
            <Flag className="size-7" />
          </button>
        </div>

        {/* Exercise Types */}
        <div className="mb-6">
          <Label className="text-xl font-semibold mb-4">Exercise Types</Label>
          <div className="flex flex-wrap gap-2 mt-4">
            {exerciseDetail.exerciseTypes.map((exerciseType, index) => (
              <span
                key={index}
                className="bg-primary-light dark:bg-primary-dark text-white py-1 px-3 rounded-full"
              >
                {exerciseType}
              </span>
            ))}
          </div>
        </div>

        {/* Muscle Types */}
        <div className="mb-6">
          <Label className="text-xl font-semibold mb-4">Muscle Types</Label>
          <div className="flex flex-wrap gap-2 mt-4">
            {exerciseDetail.muscleTypes.map((muscleType, index) => (
              <span
                key={index}
                className="bg-primary-light dark:bg-primary-dark text-white py-1 px-3 rounded-full"
              >
                {muscleType}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
          <StatCard
            icon={Anvil}
            value={exerciseDetail.stats.reps}
            label="Number of Reps"
          />
          <StatCard
            icon={ChartCandlestick}
            value={exerciseDetail.stats.sets}
            label="Number of Sets"
          />
          <StatCard
            icon={Clock}
            value={exerciseDetail.stats.timeBetweenSets}
            label="Time between sets"
          />
          <StatCard
            icon={Flame}
            value={exerciseDetail.stats.caloriesBurned}
            label="Calories Burned"
          />
          <StatCard
            icon={Layers}
            value={exerciseDetail.stats.difficulty}
            label="Difficulty"
          />
        </div>

        <Accordion className="mb-6 dark:border-bg_divide_dark border-bg_divide_light">
          <Accordion.Panel>
            <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg dark:hover:bg-primary-light dark:bg-primary-900">
              {" "}
              <Label className="text-xl font-semibold mb-2">
                Exercise Info
              </Label>
            </Accordion.Title>
            <Accordion.Content className="bg-transparent dark:bg-transparent ">
              {/* Description */}
              <DescriptionCard
                title="Description"
                description={exerciseDetail.description}
              />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>

        <CommentCard></CommentCard>
      </motion.div>

      <CommentAccordition></CommentAccordition>
      <ShowImageModal
        image={exerciseDetail.image}
        show={showImageModal}
        onCancel={() => setShowImageModal(false)}
      ></ShowImageModal>
    </div>
  );
};

export default ExerciseMainBar;
