import React, { useState } from "react";
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
import { Button, Textarea, Label, Checkbox, Accordion } from "flowbite-react";

import StatCard from "../StatCard/StatCard";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import CommentCard from "../CommentCard/CommentCard";
import AddCommentModal from "../AddCommentModal/AddCommentModal";

const FoodMainBar = () => {
  const [showCommentModal, setShowCommentModal] = useState(false);

  const ingredients = [
    { name: "Lettuce", amount: "2", unit: "cups" },
    { name: "Tomato", amount: "1", unit: "pieces" },
    { name: "Black Pepper", amount: "0.25", unit: "teaspoons" },
    { name: "Eggs", amount: "1", unit: "pieces" },
    { name: "Onion", amount: "0.5", unit: "pieces" },
    { name: "Olive Oil", amount: "10", unit: "ml" },
    { name: "Salt", amount: "0.5", unit: "teaspoons" },
  ];

  return (
    <div className="h-screen overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-3 md:p-6 mb-16"
      >
        {/* Main image */}
        <motion.img
          src="https://placehold.co/50x50.png"
          alt="Food"
          className="w-full h-64 object-cover rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Title and actions */}
        <div className="flex justify-between items-center mb-6">
          <Label className="text-3xl font-bold">Caesar Salad</Label>
          <button className="text-primary-light dark:text-primary-dark">
            <Flag className="size-7" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard icon={Clock} value={20} label="Minutes" />
          <StatCard icon={Users} value={2} label="Servings" />
          <StatCard icon={Flame} value={200} label="Calories" />
          <StatCard icon={Layers} value={"Easy"} label="Difficulty" />
        </div>

        <Accordion className="mb-6 dark:border-bg_divide_dark border-bg_divide_light">
          <Accordion.Panel>
            <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg dark:hover:bg-primary-light dark:bg-primary-900">
              {" "}
              <Label className="text-xl font-semibold mb-2">Food Info</Label>
            </Accordion.Title>
            <Accordion.Content className="bg-transparent dark:bg-transparent ">
              {/* Description */}
              <DescriptionCard
                title="Description"
                description=" A classic Caesar salad with crisp romaine lettuce, homemade
            croutons, parmesan cheese, and a creamy Caesar dressing. Perfect as
            a side dish or light main course."
              />

              {/* Health Benefits */}
              <DescriptionCard
                title="Health Benefits"
                description="- Rich in vitamins A and K from fresh romaine lettuce
- Good source of protein from eggs and cheese
- Heart-healthy fats from olive oil
- Low in calories and high in fiber"
              ></DescriptionCard>

              {/* Ingredients */}
              <Accordion className="mb-6 dark:border-bg_divide_dark border-bg_divide_light">
                <Accordion.Panel>
                  <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg dark:hover:bg-primary-light dark:bg-primary-900">
                    {" "}
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
                      {ingredients.map((ingredient, index) => (
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
          onCommentClick={() => setShowCommentModal(true)}
        ></CommentCard>
      </motion.div>
      <AddCommentModal
        open={showCommentModal}
        onCancel={() => setShowCommentModal(false)}
      ></AddCommentModal>
    </div>
  );
};

export default FoodMainBar;
