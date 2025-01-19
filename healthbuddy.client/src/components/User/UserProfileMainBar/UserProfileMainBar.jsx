import React, { useState } from "react";
import { motion } from "framer-motion";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input as AntdInput, Button as AntdButton } from "antd";
import { Card } from "flowbite-react";

import PostList from "../PostList/PostList";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import FilterButtons from "../FilterButtons/FilterButtons";

const user = {
  id: 1,
  name: "John Doe",
  email: "user1@email.com",
  avatar: "https://placehold.co/1920x1080.png",
  FoodPosted: 10,
  ExercisePosted: 5,
  WorkoutSchedulePosted: 3,
  MealSchedulePosted: 2,
  JoinDated: "2023-12-01",
};

const UserProfileMainBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock posts data
  const posts = [
    {
      id: 1,
      title: "10 mẹo chăm sóc sức khỏe mỗi ngày",
      content:
        "Cùng khám phá những thói quen đơn giản nhưng giúp bạn cải thiện sức khỏe hàng ngày.",
      image: "https://placehold.co/300x600.png",
      user: {
        id: 1,
        name: "Nguyễn Văn A",
        avatar: "https://placehold.co/50x50.png",
      },
      numberOfLikes: 120,
      numberOfComments: 45,
      postDate: "2023-12-01",
      type: "food",
    },
    {
      id: 2,
      title: "Lợi ích của việc tập yoga mỗi sáng",
      content:
        "Tập yoga buổi sáng không chỉ giúp thư giãn mà còn cải thiện sức khỏe tinh thần và thể chất.",
      image: "https://placehold.co/900x300.png",
      user: {
        id: 2,
        name: "Lê Thị Bích",
        avatar: "https://placehold.co/50x50.png",
      },
      numberOfLikes: 95,
      numberOfComments: 30,
      postDate: "2023-11-30",
      type: "exercise",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="user-page-mainbar-content-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-3 md:p-6 gap-6 user-page-mainbar-content-marginbottom"
      >
        {/* User Info Section */}
        <UserProfileCard user={user} />

        {/* Search and Filter Section */}
        <Card className="mb-6 space-y-4">
          <div className="relative">
            <AntdInput
              placeholder="Search posts..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <FilterButtons
            filters={[
              "all",
              "dishes",
              "exercises",
              "workout-plans",
              "meal-plans",
            ]}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          {/* Posts Section */}
          <PostList posts={filteredPosts} />
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfileMainBar;
