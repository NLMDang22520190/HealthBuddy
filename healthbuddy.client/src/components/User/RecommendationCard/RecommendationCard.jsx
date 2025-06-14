import React, { useState } from "react";
import { Card, Button, message } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ClockCircleOutlined,
  FireOutlined,
  StarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { recommendationAPI } from "../../../features/RecommendationAPI/RecommendationAPI";
import { useSelector } from "react-redux";

const RecommendationCard = ({ recommendation, type = "food" }) => {
  const [isLiked, setIsLiked] = useState(recommendation.isLikedByUser);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  const handleFeedback = async (feedbackType) => {
    if (!userId) {
      message.warning("Please login to provide feedback");
      return;
    }

    setLoading(true);
    try {
      await recommendationAPI.recordFeedback({
        userId: userId,
        itemId: recommendation[type === "food" ? "foodId" : "exerciseId"],
        itemType: type,
        feedbackType: feedbackType,
        rating:
          feedbackType === "like" ? 5 : feedbackType === "dislike" ? 1 : 3,
      });

      if (feedbackType === "like") {
        setIsLiked(true);
        message.success("Thanks for your feedback!");
      } else if (feedbackType === "dislike") {
        setIsLiked(false);
        message.info("We'll improve our recommendations");
      }
    } catch (error) {
      message.error("Failed to record feedback");
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (score) => {
    return Math.round(score);
  };

  const renderFoodCard = () => (
    <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group">
      {/* Row 1: Why Recommended - Bo góc trên */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 rounded-t-2xl">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 dark:text-blue-400 text-lg">💡</span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
              Why recommended
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-300 leading-relaxed">
              {recommendation.recommendationReason}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Image + Content - Bo góc dưới */}
      <div className="flex items-center rounded-b-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
          <img
            alt={recommendation.foodName}
            src={recommendation.imgUrl || "https://placehold.co/300x200.png"}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                {formatScore(recommendation.recommendationScore)}%
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {recommendation.foodName}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <ClockCircleOutlined className="text-gray-400" />
                <span>{recommendation.cookingTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <StarOutlined className="text-yellow-500" />
                <span className="capitalize">
                  {recommendation.difficultyLevel}
                </span>
              </div>
              <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
                <FireOutlined />
                <span>{recommendation.calories} cal</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 leading-relaxed">
            {recommendation.description}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center">
            {/* Tags */}
            <div className="flex gap-2">
              {recommendation.foodTypes.slice(0, 2).map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md"
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                type="text"
                size="small"
                icon={
                  isLiked ? (
                    <HeartFilled style={{ color: "#ef4444" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={() => handleFeedback("like")}
                loading={loading}
                className="hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              />
              <Button
                type="text"
                size="small"
                icon={<InfoCircleOutlined />}
                onClick={() => handleFeedback("not_interested")}
                loading={loading}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderExerciseCard = () => (
    <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group">
      {/* Row 1: Why Recommended - Bo góc trên */}
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800 rounded-t-2xl">
        <div className="flex items-start gap-3">
          <span className="text-green-600 dark:text-green-400 text-lg">💪</span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
              Why recommended
            </div>
            <div className="text-sm text-green-600 dark:text-green-300 leading-relaxed">
              {recommendation.recommendationReason}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Image + Content - Bo góc dưới */}
      <div className="flex rounded-b-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
          <img
            alt={recommendation.exerciseName}
            src={recommendation.imgUrl || "https://placehold.co/300x200.png"}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
              <span className="text-xs font-bold text-green-600 dark:text-green-400">
                {formatScore(recommendation.recommendationScore)}%
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {recommendation.exerciseName}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span>{recommendation.numberOfSets || 0} sets</span>
              </div>
              <div className="flex items-center gap-1">
                <StarOutlined className="text-yellow-500" />
                <span className="capitalize">
                  {recommendation.difficultyLevel}
                </span>
              </div>
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                <FireOutlined />
                <span>{recommendation.caloriesBurned || 0} cal</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 leading-relaxed">
            {recommendation.description}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center">
            {/* Tags */}
            <div className="flex gap-2">
              {recommendation.exerciseTypes.slice(0, 1).map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300 text-xs font-medium rounded-md"
                >
                  {type}
                </span>
              ))}
              {recommendation.muscleTypes.slice(0, 1).map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-md"
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                type="text"
                size="small"
                icon={
                  isLiked ? (
                    <HeartFilled style={{ color: "#ef4444" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={() => handleFeedback("like")}
                loading={loading}
                className="hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              />
              <Button
                type="text"
                size="small"
                icon={<InfoCircleOutlined />}
                onClick={() => handleFeedback("not_interested")}
                loading={loading}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return type === "food" ? renderFoodCard() : renderExerciseCard();
};

export default RecommendationCard;
