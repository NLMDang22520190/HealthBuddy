import React, { useState } from "react";
import { Card, Label, Tooltip } from "flowbite-react";
import { Avatar } from "antd";
import {
  CircleUserRound,
  Beef,
  Dumbbell,
  Flame,
  UtensilsCrossed,
  Pencil,
} from "lucide-react";

import StatCard from "../../Detail/StatCard/StatCard";
import UpdateUserInfoModal from "../UpdateUserInfoModal/UpdateUserInfoModal";

const UserProfileCard = ({ user, isCurrentUser, onUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getProviderIcon = (provider) => {
    switch (provider?.toLowerCase()) {
      case "github":
        return (
          <button class="relative size-10 rounded-full group">
            <div class="floater w-full h-full absolute top-0 left-0 bg-black rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"></div>
            <div class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-black rounded-full">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="group-hover:fill-[#171543] dark:group-hover:fill-white fill-white duration-300"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.481.5.092.683-.217.683-.481 0-.237-.009-.866-.013-1.699-2.782.603-3.37-1.338-3.37-1.338-.454-1.15-1.11-1.458-1.11-1.458-.906-.619.069-.606.069-.606 1.002.071 1.527 1.03 1.527 1.03.89 1.529 2.34 1.087 2.911.831.091-.645.348-1.087.634-1.338-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.986 1.028-2.682-.103-.252-.446-1.268.098-2.642 0 0 .837-.268 2.75 1.024a9.563 9.563 0 012.496-.335 9.58 9.58 0 012.496.335c1.913-1.292 2.75-1.024 2.75-1.024.544 1.374.202 2.39.1 2.642.64.696 1.027 1.592 1.027 2.682 0 3.839-2.338 4.685-4.567 4.933.358.309.678.916.678 1.847 0 1.334-.012 2.412-.012 2.74 0 .267.18.577.688.481A12.01 12.01 0 0022 12c0-5.523-4.477-10-10-10z"
                  fill="#FFFFFF"
                ></path>
              </svg>
            </div>
          </button>
        );
      case "google-oauth2":
        return (
          <button class="relative size-10 rounded-full group">
            <div class="floater w-full h-full absolute top-0 left-0 bg-gradient-to-tr from-[#d20404] to-[#ea8d84] rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"></div>
            <div class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-red-400 rounded-full">
              <svg
                className="text-white group-hover:text-bg_divide_dark dark:group-hover:text-bg_divide_light duration-300"
                height="32"
                width="32"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path d="M17.788 5.108A9 9 0 1021 12h-8" />
              </svg>
            </div>
          </button>
        );
      case "emailandpassword":
        return (
          <button class="relative size-10 rounded-full group">
            <div class="floater w-full h-full absolute top-0 left-0 bg-secondary-dark rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"></div>
            <div class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-secondary-dark rounded-full">
              <svg
                height="32"
                width="32"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="group-hover:fill-[#171543] dark:group-hover:fill-bg_divide_light fill-white duration-300"
                  d="M28 5H4c-1.104 0-2 .896-2 2v18c0 1.104.896 2 2 2h24c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2zm0 4.879L16 18 4 9.879V7l12 8 12-8v2.879zM4 23V11.885l11.446 7.63c.269.18.594.274.921.274s.652-.094.92-.274L28 11.885V23H4z"
                  fill="#FFFFFF"
                ></path>
              </svg>
            </div>
          </button>
        );
      default:
        return <CircleUserRound className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <Card className="">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-center md:justify-between md-lg:justify-center lg:justify-between items-center">
          <div className="grid relative">
            <Avatar className="size-40" src={user.avatar} />
            {isCurrentUser && (
              <div className="absolute right-0 bottom-0 bg-white dark:bg-bg_card_flowbite_dark p-1 rounded-full">
                <button
                  onClick={() => setIsModalVisible(true)}
                  className="rounded-full border bg-gray-200 p-2"
                >
                  <Pencil className="size-6 fill-primary-dark dark:fill-white text-primary-light dark:text-primary-dark"></Pencil>
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 md-lg:grid-cols-2 lg:grid-cols-4 gap-2">
            <StatCard
              icon={Beef}
              value={user.FoodPosted}
              label={"Food "}
            ></StatCard>
            <StatCard
              icon={Dumbbell}
              value={user.ExercisePosted}
              label={"Exercise"}
            ></StatCard>
            <StatCard
              icon={Flame}
              value={user.WorkoutSchedulePosted}
              label={"Schedule"}
            ></StatCard>
            <StatCard
              label={"Meal"}
              icon={UtensilsCrossed}
              value={user.MealSchedulePosted}
            ></StatCard>
          </div>
        </div>
        <div className="flex flex-col px- gap-4">
          <div className="flex gap-2 flex-col md:flex-row md-lg:flex-col lg:flex-row justify-between items-center md:items-baseline md-lg:items-center lg:items-baseline w-full">
            <Label className="text-2xl font-bold ">{user.name}</Label>
            <Label className="text-sm text-gray-500 font-normal ">
              Joined in {new Date(user.JoinDated).toLocaleDateString()}
            </Label>
          </div>
          <div className="flex gap-2 flex-col md:flex-row md-lg:flex-col lg:flex-row justify-between items-center md:items-baseline md-lg:items-center lg:items-baseline w-full">
            <Label className="text-gray-500 font-semibold ">{user.email}</Label>
            <div className="flex gap-2 items-center">
              <Label className="text-sm text-gray-500 font-light flex gap-2 items-center">
                Authorized with
              </Label>
              {getProviderIcon(user.Provider)}
            </div>
          </div>
        </div>
      </div>
      <UpdateUserInfoModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        user={user}
        onUpdate={onUpdate}
      ></UpdateUserInfoModal>
    </Card>
  );
};

export default UserProfileCard;
