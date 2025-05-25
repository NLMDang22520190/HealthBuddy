import React, { useState } from "react";
import { Modal, DatePicker, message } from "antd";
import { Button, Label, Spinner } from "flowbite-react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const FollowMealScheduleModal = ({
  open,
  onCancel,
  onFollow,
  isLoading = false,
  mealScheduleName = "Meal Schedule"
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFollow = () => {
    if (!selectedDate) {
      message.error("Please select a start date");
      return;
    }

    const startDate = selectedDate.format("YYYY-MM-DDTHH:mm:ss");
    onFollow(startDate);
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < dayjs().startOf('day');
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-primary-light dark:text-primary-dark" />
          <span>Follow Meal Schedule</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      centered
      width={{
        xs: "90%",
        sm: "80%",
        md: "60%",
        lg: "50%",
        xl: "40%",
        xxl: "35%",
      }}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            color="gray"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            onClick={handleFollow}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>Following...</span>
              </div>
            ) : (
              "Follow Schedule"
            )}
          </Button>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 py-4"
      >
        <div className="text-center">
          <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            You are about to follow:
          </Label>
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Label className="text-xl font-bold text-primary-light dark:text-primary-dark">
              {mealScheduleName}
            </Label>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium text-gray-700 dark:text-gray-300">
            Select your start date:
          </Label>
          <div className="flex justify-center">
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              disabledDate={disabledDate}
              format="DD/MM/YYYY"
              placeholder="Select start date"
              size="large"
              className="w-full max-w-xs"
              showToday={true}
            />
          </div>
          <div className="text-center">
            <Label className="text-sm text-gray-500 dark:text-gray-400">
              You can start from today or any future date
            </Label>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <Label className="text-sm text-blue-700 dark:text-blue-300">
            💡 <strong>Note:</strong> Once you follow this meal schedule, tracking records will be automatically created for each day of the schedule.
          </Label>
        </div>
      </motion.div>
    </Modal>
  );
};

export default FollowMealScheduleModal;
