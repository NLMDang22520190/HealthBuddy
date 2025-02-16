import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Flag,
  MessageCircle,
  Clock,
  Users,
  Flame,
  Layers,
} from "lucide-react";
import {
  Button,
  Textarea,
  Label,
  Checkbox,
  Accordion,
  Spinner,
} from "flowbite-react";
import { message } from "antd";
import { useParams } from "react-router-dom";

import StatCard from "../StatCard/StatCard";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import CommentCard from "../CommentCard/CommentCard";
import CommentAccordition from "../CommentAccordition/CommentAccordition";
import ShowImageModal from "../../../ShowImageModal/ShowImageModal";
import api from "../../../../features/AxiosInstance/AxiosInstance";

// const foodDetail = {
//   id: 1,
//   title: "Caesar Salad",
//   image: "https://placehold.co/50x50.png",
//   description:
//     "A classic Caesar salad with crisp romaine lettuce, homemade croutons, parmesan cheese, and a creamy Caesar dressing. Perfect as a side dish or light main course.",
//   healthBenefits: [
//     "Rich in vitamins A and K from fresh romaine lettuce",
//     "Good source of protein from eggs and cheese",
//     "Heart-healthy fats from olive oil",
//     "Low in calories and high in fiber",
//   ],
//   ingredients: [
//     { name: "Lettuce", amount: "2", unit: "cups" },
//     { name: "Tomato", amount: "1", unit: "pieces" },
//     { name: "Black Pepper", amount: "0.25", unit: "teaspoons" },
//     { name: "Eggs", amount: "1", unit: "pieces" },
//     { name: "Onion", amount: "0.5", unit: "pieces" },
//     { name: "Olive Oil", amount: "10", unit: "ml" },
//     { name: "Salt", amount: "0.5", unit: "teaspoons" },
//   ],
//   stats: {
//     time: 20,
//     servings: 2,
//     calories: 200,
//     difficulty: "Easy",
//   },
//   foodTypes: ["Salad", "Vegetarian", "Low-Calorie"], // Thêm thông tin loại món ăn
// };

const FoodMainBar = () => {
  const [showImageModal, setShowImageModal] = useState(false);

  const [foodDetail, setFoodDetail] = useState(null);
  const [isDataLoading, startDataTransition] = useTransition();

  const { postId } = useParams();

  const [isLiked, setIsLiked] = useState(false);

  const fetchFoodDetail = async () => {
    try {
      const response = await api.get("/api/Food/GetFoodById/" + postId);
      const mappedDetail = {
        id: response.data.foodId,
        title: response.data.foodName,
        image: response.data.imgUrl,
        description: response.data.description,
        healthBenefits: response.data.healthBenefits,
        ingredients: response.data.recipes.map((recipe) => ({
          name: recipe.ingredient.ingredientName,
          amount: recipe.quantity,
          unit: recipe.ingredient.measurementUnit,
        })),
        stats: {
          time: response.data.cookingTime,
          servings: response.data.portion,
          calories: response.data.calories,
          difficulty: response.data.difficultyLevel,
        },
        foodTypes: response.data.foodTypes.map((type) => type.foodTypeName),
        numberOfLikes: response.data.numberOfLikes,
        numberOfComments: response.data.numberOfComments,
      };
      setFoodDetail(mappedDetail);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch food detail" + error.message);
    }
  };

  useEffect(() => {
    startDataTransition(async () => {
      await fetchFoodDetail();
    });
  }, []);

  if (isDataLoading || !foodDetail) {
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
          src={foodDetail.image}
          alt="Food"
          className="cursor-pointer w-full h-64 object-cover rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Title and actions */}
        <div className="flex justify-between items-center mb-6">
          <Label className="text-3xl font-bold">{foodDetail.title}</Label>
          <button className="text-primary-light dark:text-primary-dark">
            <Flag className="size-7" />
          </button>
        </div>

        {/* Food Types */}
        <div className="mb-6">
          <Label className="text-xl font-semibold mb-4">Food Types</Label>
          <div className="flex flex-wrap gap-2 mt-4">
            {foodDetail.foodTypes.map((foodType, index) => (
              <span
                key={index}
                className="bg-primary-light dark:bg-primary-dark text-white py-1 px-3 rounded-full"
              >
                {foodType}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Clock}
            value={foodDetail.stats.time}
            label="Minutes"
          />
          <StatCard
            icon={Users}
            value={foodDetail.stats.servings}
            label="Servings"
          />
          <StatCard
            icon={Flame}
            value={foodDetail.stats.calories}
            label="Calories"
          />
          <StatCard
            icon={Layers}
            value={foodDetail.stats.difficulty}
            label="Difficulty"
          />
        </div>

        <Accordion className="mb-6 dark:border-bg_divide_dark border-bg_divide_light">
          <Accordion.Panel>
            <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg dark:hover:bg-primary-light dark:bg-primary-900">
              <Label className="text-xl font-semibold mb-2">Food Info</Label>
            </Accordion.Title>
            <Accordion.Content className="bg-transparent dark:bg-transparent ">
              {/* Description */}
              <DescriptionCard
                title="Description"
                description={foodDetail.description}
              />

              {/* Health Benefits */}
              <DescriptionCard
                title="Health Benefits"
                description={foodDetail.healthBenefits}
              />

              {/* Ingredients */}
              <Accordion className="mb-6 dark:border-bg_divide_dark border-bg_divide_light">
                <Accordion.Panel>
                  <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg dark:hover:bg-primary-light dark:bg-primary-900">
                    <Label className="text-xl font-semibold mb-2">
                      Ingredients
                    </Label>
                  </Accordion.Title>
                  <Accordion.Content className="bg-transparent dark:bg-transparent ">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {foodDetail.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`ingredient-${index}`} />
                          <Label htmlFor={`ingredient-${index}`}>
                            {ingredient.name} - {ingredient.amount}{" "}
                            {ingredient.unit}
                          </Label>
                        </div>
                      ))}
                    </motion.div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>

        <CommentCard
          isLiked={isLiked}
          numberOfLikes={foodDetail.numberOfLikes}
          numberOfComments={foodDetail.numberOfComments}
        ></CommentCard>
      </motion.div>

      <CommentAccordition></CommentAccordition>
      <ShowImageModal
        image={foodDetail.image}
        show={showImageModal}
        onCancel={() => setShowImageModal(false)}
      ></ShowImageModal>
    </div>
  );
};

export default FoodMainBar;
