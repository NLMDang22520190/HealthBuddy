import React, { useState } from "react";
import { Card, Label } from "flowbite-react";

import UserNotiSwitch from "../UserNotiSwitch/UserNotiSwitch";

const UserNotificationProfileCard = ({ userNoti }) => {
  const [notifications, setNotifications] = useState({
    foodNoti: false,
    exerciseNoti: false,
    workoutScheduleNoti: false,
    mealScheduleNoti: false,
  });

  // Hàm xử lý thay đổi trạng thái từng công tắc
  const handleSwitchChange = (key) => (event) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: event.target.checked,
    }));
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
            checked={notifications.foodNoti}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label>Workout Notification</Label>
          <UserNotiSwitch
            id="workoutScheduleNoti"
            onChange={handleSwitchChange("workoutScheduleNoti")}
            checked={notifications.foodNoti}
          />
        </div>
        <div className="flex gap-4 justify-end items-center">
          <Label>Meal Notification</Label>
          <UserNotiSwitch
            id="mealScheduleNoti"
            onChange={handleSwitchChange("mealScheduleNoti")}
            checked={notifications.foodNoti}
          />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button className=" items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark">
          Save
        </button>
      </div>
    </Card>
  );
};

export default UserNotificationProfileCard;
