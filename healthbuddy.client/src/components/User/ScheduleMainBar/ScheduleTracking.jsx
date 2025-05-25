import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { TextInput, Spinner, Label } from "flowbite-react";
import { Search, Heart, Calendar } from "lucide-react";
import { message } from "antd";
import { useSelector } from "react-redux";

import SchedulePostList from "./SchedulePostList";
import SortFilterBar from "../AllPostMainBar/SortFilterBar";
import api from "../../../features/AxiosInstance/AxiosInstance";

const ScheduleTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [trackingSchedules, setTrackingSchedules] = useState([]);

  const [isDataFetching, startTransition] = useTransition();
  const userId = useSelector((state) => state.auth.userId);

  const fetchTrackingSchedules = async () => {
    try {
      if (!userId) {
        message.error("Please login to view your tracking schedules");
        return;
      }

      const response = await api.get(`/api/Schedule/GetUserTrackingSchedules/${userId}`);
      const mappedData = response.data.map((item) => ({
        id: item.postId,
        title: item.title,
        content: item.description,
        image: item.imgUrl,
        user: {
          id: item.uploader.userId,
          name: item.uploader.username,
          avatar: item.uploader.avatar || "https://placehold.co/50x50.png",
        },
        numberOfLikes: item.numberOfLikes,
        numberOfComments: item.numberOfComments,
        postDate: item.createdDate,
        type: item.postType.toUpperCase(),
        totalDays: item.totalDays,
      }));
      setTrackingSchedules(mappedData);
    } catch (error) {
      console.error("Error fetching tracking schedules:", error);
      message.error("Error fetching tracking schedules: " + error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      startTransition(async () => {
        await fetchTrackingSchedules();
      });
    }
  }, [userId]);

  const filteredPosts = trackingSchedules
    .filter((post) => {
      // 🔹 Lọc theo danh mục (selectedFilters)
      const matchesFilter =
        selectedFilters.length === 0 ||
        selectedFilters.includes(post.type.toLowerCase());

      // 🔹 Lọc theo search query (tìm trong title và content)
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (activeSort === "Most Recent") {
        return new Date(b.postDate) - new Date(a.postDate);
      }
      if (activeSort === "Most Likes") {
        return b.numberOfLikes - a.numberOfLikes;
      }
      if (activeSort === "Most Comments") {
        return b.numberOfComments - a.numberOfComments;
      }
      return 0;
    });

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
        <Heart className="size-12 text-gray-400 dark:text-gray-500" />
      </div>
      <Label className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
        No Tracking Schedules Yet
      </Label>
      <Label className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        You haven't followed any meal or workout schedules yet. Start exploring and follow schedules to track your progress!
      </Label>
      <div className="flex items-center gap-2 text-primary-light dark:text-primary-dark">
        <Calendar className="size-5" />
        <Label className="text-sm font-medium">
          Follow schedules to see them here
        </Label>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col py-6 gap-4 user-page-mainbar-content-marginbottom"
    >
      {!userId ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 px-6"
        >
          <Label className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            Please login to view your tracking schedules
          </Label>
        </motion.div>
      ) : isDataFetching ? (
        <div className="flex justify-center items-center py-16">
          <Spinner size="xl" color="info" />
        </div>
      ) : trackingSchedules.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex px-6">
            <TextInput
              className="flex-1"
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your tracking schedules..."
            />
          </div>

          <SortFilterBar
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            filterOptions={[
              { id: "workout", label: "Workout" },
              { id: "meal", label: "Meal" },
            ]}
            onClearClick={() => setSearchQuery("")}
          />

          <SchedulePostList type="tracking" posts={filteredPosts} />
        </>
      )}
    </motion.div>
  );
};

export default ScheduleTracking;
