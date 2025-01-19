import React from "react";
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

import StatCard from "../Detail/StatCard/StatCard";

const UserProfileCard = ({ user }) => {
  return (
    <Card className="">
      <div className="flex flex-col  sm:flex-row items-center sm:items-start gap-6">
        <div className="grid relative">
          <Avatar
            className="size-40"
            src={user.avatar}
            icon={CircleUserRound}
          />
          <div className="absolute right-0 bottom-0 bg-white dark:bg-bg_card_flowbite_dark p-1 rounded-full">
            <button className="rounded-full border bg-gray-200 p-2">
              <Pencil className="size-6 fill-primary-dark dark:fill-white text-primary-light dark:text-primary-dark"></Pencil>
            </button>
          </div>
        </div>
        <div className="flex-1 flex-col flex text-center gap-4">
          <div className="flex flex-col sm:flex-row lg:flex-row md:flex-col items-center sm:items-baseline md:items-center lg:items-baseline justify-between gap-4">
            <Label className="text-2xl font-bold ">{user.name}</Label>
            <Label className="text-gray-500 font-semibold ">{user.email}</Label>
            <Label className="text-sm text-gray-500 font-light ">
              Joined {new Date(user.JoinDated).toLocaleDateString()}
            </Label>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>
    </Card>
  );
};

export default UserProfileCard;
