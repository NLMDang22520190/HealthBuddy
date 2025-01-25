import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { Card, TextInput, Spinner } from "flowbite-react";
import { Search } from "lucide-react";
import { message } from "antd";

import UserCard from "../UserCard/UserCard";
import api from "../../../features/AxiosInstance/AxiosInstance";
import { set } from "date-fns";

const UsersMainBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isPending, startTransition] = useTransition(); // Sử dụng useTransition

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/User");
      const mappedUsers = response.data.map((user) => {
        return {
          id: user.userId,
          name: user.username,
          email: user.email,
          avatar:
            user.avatar == null
              ? "https://placehold.co/50x50.png"
              : user.avatar,
          FoodPosted: user.numberOfFoodPosts,
          ExercisePosted: user.numberOfExercisePosts,
          WorkoutSchedulePosted: user.numberOfWorkoutPosts,
          MealSchedulePosted: user.numberOfMealPosts,
          JoinDated: user.createdDate,
          Provider: user.provider,
        };
      });
      setUsers(mappedUsers); // Sử dụng setUsers để cập nhật users
    } catch (error) {
      message.error("Error fetching users: " + error.message);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      await fetchUsers();
    });
  }, []);

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
        {isPending ? ( // Hiển thị spinner khi đang tải dữ liệu
          <div className="flex justify-center items-center">
            <Spinner size="xl" color="info" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UsersMainBar;
