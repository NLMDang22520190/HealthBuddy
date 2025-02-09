import React from "react";
import { Avatar } from "antd";
import { Card, Label, Tooltip } from "flowbite-react";
import {
  Calendar,
  Dumbbell,
  Pizza,
  Beef,
  ScrollText,
  User,
  Mail,
  CircleUserRound,
  Flame,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const handleUserClick = (user) => {
    navigate(`/user/${user.id}`);
  };
  return (
    <Card
      onClick={() => handleUserClick(user)}
      className="overflow-hidden cursor-pointer hover:shadow-md hover:shadow-secondary-light dark:hover:shadow-md dark:hover:shadow-primary-dark transition-shadow"
    >
      <div className="flex gap-4 items-center">
        <div className="p-px rounded-full bg-gradient-to-tr from-primary-dark to-secondary-dark">
          <Avatar
            src={user.avatar}
            className="md:block lg:hidden xl:block size-12"
            icon={<User className="h-6 w-6" />}
          />
        </div>

        <div className="flex-1 flex flex-col items-start gap-2">
          <div className="flex gap-1 items-end ">
            <CircleUserRound className="text-bg_dark dark:text-bg_light size-4"></CircleUserRound>
            <Label
              className="text-sm font-bold truncate max-w-[100px]"
              title={user.name} // Hiển thị tooltip khi hover
            >
              {user.name}
            </Label>
          </div>

          <div className="flex gap-1 items-end">
            <Mail className="text-bg_dark dark:text-bg_light size-4" />
            <Label
              className="text-sm font-light truncate max-w-[100px]"
              title={user.email} // Hiển thị tooltip khi hover
            >
              {user.email}
            </Label>
          </div>

          <div className="flex gap-1 items-end">
            <Calendar className="text-bg_dark dark:text-bg_light size-4" />
            <Label
              className="text-xs font-extralight truncate max-w-[200px]"
              title={`Joined ${new Date(user.JoinDated).toLocaleDateString()}`} // Tooltip
            >
              Joined {new Date(user.JoinDated).toLocaleDateString()}
            </Label>
          </div>
        </div>

        <div className="grid grid-rows-4 gap-1">
          {/* <Tooltip content="Number of food posts">
            <Label className="text-sm font-semibold flex gap-2 items-center">
              <Beef className="size-4"></Beef> {user.FoodPosted}
            </Label>
          </Tooltip>
          <Tooltip content="Number of exercise posts">
            <Label className="text-sm font-semibold flex gap-2 items-center">
              <Dumbbell className="size-4"></Dumbbell> {user.ExercisePosted}
            </Label>
          </Tooltip>
          <Tooltip content="Number of workout schedules posted">
            <Label className="text-sm font-semibold flex gap-2 items-center">
              <Flame className="size-4"></Flame> {user.WorkoutSchedulePosted}
            </Label>
          </Tooltip>
          <Tooltip content="Number of meal schedules posted">
            <Label className="text-sm font-semibold flex gap-2 items-center">
              <UtensilsCrossed className="size-4"></UtensilsCrossed>{" "}
              {user.MealSchedulePosted}
            </Label>
          </Tooltip> */}

          <Label className="text-sm font-semibold flex gap-2 items-center">
            <Beef className="size-4"></Beef> {user.FoodPosted}
          </Label>
          <Label className="text-sm font-semibold flex gap-2 items-center">
            <Dumbbell className="size-4"></Dumbbell> {user.ExercisePosted}
          </Label>
          <Label className="text-sm font-semibold flex gap-2 items-center">
            <Flame className="size-4"></Flame> {user.WorkoutSchedulePosted}
          </Label>
          <Label className="text-sm font-semibold flex gap-2 items-center">
            <UtensilsCrossed className="size-4"></UtensilsCrossed>{" "}
            {user.MealSchedulePosted}
          </Label>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
