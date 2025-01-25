import React, { useState, useTransition } from "react";
import { Card, Label, Spinner } from "flowbite-react";
import { message } from "antd";

import UserNotiSwitch from "../UserNotiSwitch/UserNotiSwitch";
import api from "../../../../features/AxiosInstance/AxiosInstance";

const UserNotificationProfileCard = ({ userNoti }) => {
  const [isSavePending, startSaveTransition] = useTransition();

  const [notifications, setNotifications] = useState({
    foodNoti: userNoti.foodNoti,
    exerciseNoti: userNoti.exerciseNoti,
    workoutScheduleNoti: userNoti.workoutScheduleNoti,
    mealScheduleNoti: userNoti.mealScheduleNoti,
  });

  // Hàm xử lý thay đổi trạng thái từng công tắc
  const handleSwitchChange = (key) => (event) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: event.target.checked,
    }));
  };

  const handleSave = async () => {
    startSaveTransition(async () => {
      try {
        await api.put("/api/User/UpdateUserNotificationPreference", {
          userId: userNoti.id,
          foodNoti: notifications.foodNoti,
          exerciseNoti: notifications.exerciseNoti,
          workoutScheduleNoti: notifications.workoutScheduleNoti,
          mealScheduleNoti: notifications.mealScheduleNoti,
        });
        message.success("User notification saved successfully");
      } catch (error) {
        message.error("Error saving user notification: " + error.message);
      }
    });
  };

  return (
    <Card>
      <Label className="text-lg font-bold ">Notifications</Label>
      <div className="grid grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label>Food Notification</Label>
          <UserNotiSwitch
            id="foodNoti"
            onChange={handleSwitchChange("foodNoti")}
            checked={notifications.foodNoti}
          />
        </div>
        <div className="flex gap-4 justify-end items-center">
          <Label>Exercise Notification</Label>
          <UserNotiSwitch
            id="exerciseNoti"
            onChange={handleSwitchChange("exerciseNoti")}
            checked={notifications.exerciseNoti}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label>Workout Notification</Label>
          <UserNotiSwitch
            id="workoutScheduleNoti"
            onChange={handleSwitchChange("workoutScheduleNoti")}
            checked={notifications.workoutScheduleNoti}
          />
        </div>
        <div className="flex gap-4 justify-end items-center">
          <Label>Meal Notification</Label>
          <UserNotiSwitch
            id="mealScheduleNoti"
            onChange={handleSwitchChange("mealScheduleNoti")}
            checked={notifications.mealScheduleNoti}
          />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button
          disabled={isSavePending}
          onClick={() => handleSave()}
          className={`items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white ${
            isSavePending
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
          }`}
        >
          {isSavePending ? (
            <span className="flex items-center justify-center">
              <Spinner color="info" aria-label="White spinner example" />
              <span className="ml-2">Saving...</span>
            </span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </Card>
  );
};

export default UserNotificationProfileCard;
