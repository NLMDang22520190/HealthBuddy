import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Label, Spinner, Badge } from "flowbite-react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  User,
  Target,
  Trophy,
  Play,
  ChefHat,
  Dumbbell
} from "lucide-react";
import { message, Image } from "antd";
import { useSelector } from "react-redux";

import api from "../../../features/AxiosInstance/AxiosInstance";

const ScheduleTrackingDetail = () => {
  const { scheduleId, scheduleType } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const [trackingDetail, setTrackingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completingDay, setCompletingDay] = useState(null);

  useEffect(() => {
    if (userId && scheduleId && scheduleType) {
      fetchTrackingDetail();
    }
  }, [userId, scheduleId, scheduleType]);

  const fetchTrackingDetail = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/api/Schedule/GetUserScheduleTrackingDetail/${userId}/${scheduleId}/${scheduleType}`
      );
      setTrackingDetail(response.data);
    } catch (error) {
      console.error("Error fetching tracking detail:", error);
      message.error("Error fetching tracking detail: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteDay = async (dayNumber) => {
    try {
      setCompletingDay(dayNumber);

      const requestData = {
        userId: parseInt(userId),
        scheduleId: parseInt(scheduleId),
        dayNumber: dayNumber,
        scheduleType: scheduleType
      };

      await api.post("/api/Schedule/CompleteDay", requestData);

      message.success(`Day ${dayNumber} completed successfully!`);

      // Refresh data
      await fetchTrackingDetail();
    } catch (error) {
      console.error("Error completing day:", error);
      message.error("Error completing day: " + (error.response?.data?.detail || error.message));
    } finally {
      setCompletingDay(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getCompletedDaysCount = () => {
    return trackingDetail?.days?.filter(day => day.isCompleted).length || 0;
  };

  const getProgressPercentage = () => {
    if (!trackingDetail?.days?.length) return 0;
    return Math.round((getCompletedDaysCount() / trackingDetail.days.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" color="info" />
      </div>
    );
  }

  if (!trackingDetail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Label className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          Schedule tracking not found
        </Label>
        <Button onClick={() => navigate(-1)} color="gray">
          <ArrowLeft className="size-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => navigate(-1)}
          color="gray"
          size="sm"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <Badge color={trackingDetail.scheduleType === "meal" ? "success" : "info"}>
          {trackingDetail.scheduleType.toUpperCase()}
        </Badge>
      </div>

      {/* Schedule Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Image
              src={trackingDetail.imgUrl || "https://placehold.co/300x200.png"}
              alt={trackingDetail.scheduleName}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="md:w-2/3 space-y-4">
            <div>
              <Label className="text-2xl font-bold text-gray-900 dark:text-white">
                {trackingDetail.scheduleName}
              </Label>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {trackingDetail.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <User className="size-4" />
              <span>Created by {trackingDetail.uploader.username}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
                  <Target className="size-4" />
                  <span className="font-semibold">{trackingDetail.totalDays}</span>
                </div>
                <Label className="text-sm text-gray-500">Total Days</Label>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                  <Trophy className="size-4" />
                  <span className="font-semibold">{getCompletedDaysCount()}</span>
                </div>
                <Label className="text-sm text-gray-500">Completed</Label>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400">
                  <Calendar className="size-4" />
                  <span className="font-semibold">{formatDate(trackingDetail.startDate)}</span>
                </div>
                <Label className="text-sm text-gray-500">Start Date</Label>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400">
                  <span className="font-semibold">{getProgressPercentage()}%</span>
                </div>
                <Label className="text-sm text-gray-500">Progress</Label>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Days List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <Label className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Daily Progress
        </Label>

        <div className="grid gap-4">
          {trackingDetail.days.map((day) => (
            <DayCard
              key={day.dayNumber}
              day={day}
              onComplete={() => handleCompleteDay(day.dayNumber)}
              isCompleting={completingDay === day.dayNumber}
              scheduleType={trackingDetail.scheduleType}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DayCard = ({ day, onComplete, isCompleting, scheduleType }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const handleItemClick = (item) => {
    if (item.itemType === "food") {
      navigate(`/detail/food/${item.itemId}`);
    } else if (item.itemType === "exercise") {
      navigate(`/detail/exercise/${item.itemId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: day.dayNumber * 0.1 }}
      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
        day.isCompleted
          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
          : day.canComplete
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-300 bg-gray-50 dark:bg-gray-700"
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
              day.isCompleted
                ? "bg-green-500 text-white"
                : day.canComplete
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}>
              {day.isCompleted ? <CheckCircle className="size-6" /> : day.dayNumber}
            </div>

            <div>
              <Label className="font-semibold text-gray-900 dark:text-white">
                Day {day.dayNumber}
              </Label>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="size-4" />
                <span>Expected: {formatDate(day.expectedDate)}</span>
                {day.completionDate && (
                  <>
                    <span>•</span>
                    <span>Completed: {formatDate(day.completionDate)}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {day.isCompleted ? (
              <Badge color="success">
                <CheckCircle className="size-3 mr-1" />
                Completed
              </Badge>
            ) : day.canComplete ? (
              <Button
                onClick={onComplete}
                disabled={isCompleting}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="sm"
              >
                {isCompleting ? (
                  <Spinner size="sm" className="mr-2" />
                ) : (
                  <Play className="size-4 mr-2" />
                )}
                Complete
              </Button>
            ) : (
              <Badge color="gray">
                <Clock className="size-3 mr-1" />
                Pending
              </Badge>
            )}
          </div>
        </div>

        {/* Items List */}
        {day.items && day.items.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              {scheduleType === "meal" ? (
                <>
                  <ChefHat className="size-4" />
                  Foods for this day:
                </>
              ) : (
                <>
                  <Dumbbell className="size-4" />
                  Exercises for this day:
                </>
              )}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {day.items.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    {item.itemImage ? (
                      <img
                        src={item.itemImage}
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {item.itemType === "food" ? (
                          <ChefHat className="size-6 text-gray-400" />
                        ) : (
                          <Dumbbell className="size-6 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Label className="text-sm font-medium text-gray-900 dark:text-white truncate block">
                      {item.itemName}
                    </Label>
                    <Label className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {item.itemType}
                    </Label>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScheduleTrackingDetail;
