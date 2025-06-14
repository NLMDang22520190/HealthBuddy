import React, { useState } from "react";
import { Card, Button, Badge, Tooltip, message } from "antd";
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

const { Meta } = Card;

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

  const getScoreColor = (score) => {
    if (score >= 80) return "#52c41a"; // Green
    if (score >= 60) return "#faad14"; // Orange
    return "#ff4d4f"; // Red
  };

  const formatScore = (score) => {
    return Math.round(score);
  };

  const renderFoodCard = () => (
    <Card
      hoverable
      className="border-0 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
    >
      <div className="flex h-40">
        {/* Image Section */}
        <div className="relative w-40 flex-shrink-0 overflow-hidden">
          <img
            alt={recommendation.foodName}
            src={recommendation.imgUrl || "https://placehold.co/300x200.png"}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2">
            <Badge
              count={formatScore(recommendation.recommendationScore)}
              style={{
                backgroundColor: getScoreColor(
                  recommendation.recommendationScore
                ),
                fontSize: "11px",
                fontWeight: "bold",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              className="animate-pulse"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Title and Calories */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 flex-1 mr-2">
              {recommendation.foodName}
            </h3>
            <div className="flex items-center gap-1 text-sm font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-full flex-shrink-0">
              <FireOutlined />
              <span>{recommendation.calories}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {recommendation.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {recommendation.foodTypes.slice(0, 2).map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200"
              >
                {type}
              </span>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ClockCircleOutlined />
              <span>{recommendation.cookingTime}min</span>
              <StarOutlined className="ml-2 text-yellow-500" />
              <span className="capitalize">
                {recommendation.difficultyLevel}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-1">
              <Button
                type="text"
                size="small"
                icon={
                  isLiked ? (
                    <HeartFilled style={{ color: "#ff4d4f" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={() => handleFeedback("like")}
                loading={loading}
                className="hover:scale-110 transition-transform duration-200 hover:bg-red-50 dark:hover:bg-red-900/30"
              />
              <Button
                type="text"
                size="small"
                icon={<InfoCircleOutlined />}
                onClick={() => handleFeedback("not_interested")}
                loading={loading}
                className="hover:scale-110 transition-transform duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Reason */}
      <div className="px-4 pb-4">
        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-400 dark:border-blue-500">
          <div className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">
            💡 Why recommended:
          </div>
          <div className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            {recommendation.recommendationReason}
          </div>
        </div>
      </div>
    </Card>
  );

  const renderExerciseCard = () => (
    <Card
      hoverable
      className="border-0 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
    >
      <div className="flex h-40">
        {/* Image Section */}
        <div className="relative w-40 flex-shrink-0 overflow-hidden">
          <img
            alt={recommendation.exerciseName}
            src={recommendation.imgUrl || "https://placehold.co/300x200.png"}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2">
            <Badge
              count={formatScore(recommendation.recommendationScore)}
              style={{
                backgroundColor: getScoreColor(
                  recommendation.recommendationScore
                ),
                fontSize: "11px",
                fontWeight: "bold",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              className="animate-pulse"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Title and Calories */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 line-clamp-2 flex-1 mr-2">
              {recommendation.exerciseName}
            </h3>
            <div className="flex items-center gap-1 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-full flex-shrink-0">
              <FireOutlined />
              <span>{recommendation.caloriesBurned || 0}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {recommendation.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {recommendation.exerciseTypes.slice(0, 1).map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors duration-200"
              >
                {type}
              </span>
            ))}
            {recommendation.muscleTypes.slice(0, 1).map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-200"
              >
                {type}
              </span>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{recommendation.numberOfSets || 0} sets</span>
              <StarOutlined className="ml-2 text-yellow-500" />
              <span className="capitalize">
                {recommendation.difficultyLevel}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-1">
              <Button
                type="text"
                size="small"
                icon={
                  isLiked ? (
                    <HeartFilled style={{ color: "#ff4d4f" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={() => handleFeedback("like")}
                loading={loading}
                className="hover:scale-110 transition-transform duration-200 hover:bg-red-50 dark:hover:bg-red-900/30"
              />
              <Button
                type="text"
                size="small"
                icon={<InfoCircleOutlined />}
                onClick={() => handleFeedback("not_interested")}
                loading={loading}
                className="hover:scale-110 transition-transform duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Reason */}
      <div className="px-4 pb-4">
        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-l-4 border-green-400 dark:border-green-500">
          <div className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">
            💪 Why recommended:
          </div>
          <div className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
            {recommendation.recommendationReason}
          </div>
        </div>
      </div>
    </Card>
  );

  return type === "food" ? renderFoodCard() : renderExerciseCard();
};

export default RecommendationCard;
