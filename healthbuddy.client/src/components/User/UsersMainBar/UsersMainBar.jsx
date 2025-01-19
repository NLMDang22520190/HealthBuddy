import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, TextInput } from "flowbite-react";
import { Search } from "lucide-react";

import UserCard from "../UserCard/UserCard";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "user1@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 10,
    ExercisePosted: 5,
    WorkoutSchedulePosted: 3,
    MealSchedulePosted: 2,
    JoinDated: "2023-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "user2@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 8,
    ExercisePosted: 4,
    WorkoutSchedulePosted: 2,
    MealSchedulePosted: 3,
    JoinDated: "2023-11-20",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "user3@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 15,
    ExercisePosted: 6,
    WorkoutSchedulePosted: 5,
    MealSchedulePosted: 4,
    JoinDated: "2023-10-15",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "user4@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 5,
    ExercisePosted: 2,
    WorkoutSchedulePosted: 1,
    MealSchedulePosted: 1,
    JoinDated: "2023-09-10",
  },
  {
    id: 5,
    name: "Charlie Green",
    email: "user5@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 12,
    ExercisePosted: 7,
    WorkoutSchedulePosted: 3,
    MealSchedulePosted: 2,
    JoinDated: "2023-08-05",
  },
  {
    id: 6,
    name: "Diana White",
    email: "user6@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 20,
    ExercisePosted: 10,
    WorkoutSchedulePosted: 8,
    MealSchedulePosted: 5,
    JoinDated: "2023-07-01",
  },
  {
    id: 7,
    name: "Ethan Black",
    email: "user7@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 7,
    ExercisePosted: 3,
    WorkoutSchedulePosted: 2,
    MealSchedulePosted: 1,
    JoinDated: "2023-06-15",
  },
  {
    id: 8,
    name: "Fiona Blue",
    email: "user8@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 9,
    ExercisePosted: 5,
    WorkoutSchedulePosted: 4,
    MealSchedulePosted: 3,
    JoinDated: "2023-05-10",
  },
  {
    id: 9,
    name: "George Yellow",
    email: "user9@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 18,
    ExercisePosted: 8,
    WorkoutSchedulePosted: 6,
    MealSchedulePosted: 5,
    JoinDated: "2023-04-01",
  },
  {
    id: 10,
    name: "Hannah Purple",
    email: "user10@email.com",
    avatar: "https://placehold.co/50x50.png",
    FoodPosted: 11,
    ExercisePosted: 6,
    WorkoutSchedulePosted: 3,
    MealSchedulePosted: 2,
    JoinDated: "2023-03-20",
  },
];

const UsersMainBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-page-mainbar-content-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-3 md:p-6 gap-4 user-page-mainbar-content-marginbottom"
      >
        <div className="flex">
          <TextInput
            className="flex-1 "
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search user..."
          ></TextInput>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UsersMainBar;
