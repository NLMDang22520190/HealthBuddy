import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { TextInput, Spinner, Label } from "flowbite-react";
import { Search } from "lucide-react";
import { message } from "antd";

import SchedulePostList from "./SchedulePostList";
import SortFilterBar from "../AllPostMainBar/SortFilterBar";
import api from "../../../features/AxiosInstance/AxiosInstance";

const samplePosts = [
  {
    id: "1",
    title:
      "Healthy Meal PlanHealthy Meal PlanHealthy Meal PlanHealthy Meal Plan",
    content:
      "A balanced meal plan to keep you energized.A balanced meal plan to keep you energized.A balanced meal plan to keep you energized.A balanced meal plan to keep you energized.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "101",
      name: "Alice Johnson",
      avatar: "https://source.unsplash.com/50x50/?woman,avatar",
    },
    numberOfLikes: 120,
    numberOfComments: 30,
    postDate: "2024-02-01",
    type: "Meal",
    totalDays: 5,
  },
  {
    id: "2",
    title: "Morning Workout Routine",
    content: "Start your day with a great workout.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "102",
      name: "Bob Smith",
      avatar: "https://source.unsplash.com/50x50/?man,avatar",
    },
    numberOfLikes: 95,
    numberOfComments: 22,
    postDate: "2024-02-02",
    type: "Workout",
    totalDays: 3,
  },
  {
    id: "3",
    title: "Delicious Vegan Recipes",
    content: "Try these amazing vegan recipes today!",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "103",
      name: "Charlie Green",
      avatar: "https://source.unsplash.com/50x50/?chef,avatar",
    },
    numberOfLikes: 150,
    numberOfComments: 40,
    postDate: "2024-02-03",
    type: "Meal",
    totalDays: 7,
  },
  {
    id: "4",
    title: "Best Cardio Exercises",
    content: "Boost your stamina with these cardio workouts.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "104",
      name: "David Brown",
      avatar: "https://source.unsplash.com/50x50/?athlete,avatar",
    },
    numberOfLikes: 110,
    numberOfComments: 18,
    postDate: "2024-02-04",
    type: "Workout",
    totalDays: 4,
  },
  {
    id: "5",
    title: "10-Minute Home Workouts",
    content: "Quick workouts you can do at home.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "105",
      name: "Emma Davis",
      avatar: "https://source.unsplash.com/50x50/?trainer,avatar",
    },
    numberOfLikes: 80,
    numberOfComments: 15,
    postDate: "2024-02-05",
    type: "Workout",
    totalDays: 2,
  },
  {
    id: "6",
    title: "Keto Diet Tips",
    content: "Everything you need to know about keto.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "106",
      name: "Frank Wilson",
      avatar: "https://source.unsplash.com/50x50/?doctor,avatar",
    },
    numberOfLikes: 125,
    numberOfComments: 27,
    postDate: "2024-02-06",
    type: "Meal",
    totalDays: 6,
  },
  {
    id: "7",
    title: "Best Yoga Poses for Relaxation",
    content: "Calm your mind with these yoga poses.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "107",
      name: "Grace Lee",
      avatar: "https://source.unsplash.com/50x50/?yogi,avatar",
    },
    numberOfLikes: 140,
    numberOfComments: 35,
    postDate: "2024-02-07",
    type: "Workout",
    totalDays: 8,
  },
  {
    id: "8",
    title: "Protein-Rich Diet Guide",
    content: "Boost your protein intake with these foods.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "108",
      name: "Henry Martin",
      avatar: "https://source.unsplash.com/50x50/?nutritionist,avatar",
    },
    numberOfLikes: 105,
    numberOfComments: 20,
    postDate: "2024-02-08",
    type: "Meal",
    totalDays: 5,
  },
  {
    id: "9",
    title: "HIIT Workouts for Fat Burn",
    content: "Burn calories fast with HIIT training.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "109",
      name: "Ivy Carter",
      avatar: "https://source.unsplash.com/50x50/?coach,avatar",
    },
    numberOfLikes: 130,
    numberOfComments: 29,
    postDate: "2024-02-09",
    type: "Workout",
    totalDays: 7,
  },
  {
    id: "10",
    title: "Meditation for Beginners",
    content: "Start your meditation journey today.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    user: {
      id: "110",
      name: "Jack White",
      avatar: "https://source.unsplash.com/50x50/?meditation,avatar",
    },
    numberOfLikes: 90,
    numberOfComments: 17,
    postDate: "2024-02-10",
    type: "Workout",
    totalDays: 3,
  },
];

const AllSchedule = ({ type }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [isDataFetching, startTransition] = useTransition();

  const fetchSchedule = async () => {
    try {
      const response = await api.get("/api/Schedule/GetAllSchedules");
      const mappedData = response.data.map((item) => ({
        id: item.postId,
        title: item.title,
        content: item.description,
        image: item.imgUrl,
        user: {
          id: item.uploader.userId,
          name: item.uploader.username,
          avatar: item.uploader.avatar,
        },
        numberOfLikes: item.numberOfLikes,
        numberOfComments: item.numberOfComments,
        postDate: item.createdDate,
        type: item.postType.toUpperCase(),
        totalDays: item.totalDays,
      }));
      setSchedule(mappedData);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      message.error("Error fetching schedule: " + error.message);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      await fetchSchedule();
    });
  }, []);

  const filteredPosts = schedule
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col py-6 gap-4 user-page-mainbar-content-marginbottom"
    >
      {isDataFetching || schedule.length === 0 ? ( // Hiển thị spinner khi đang tải dữ liệu
        <div className="flex justify-center items-center">
          <Spinner size="xl" color="info" />
        </div>
      ) : (
        <>
          <div className="flex px-6">
            <TextInput
              className="flex-1 "
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schedule..."
            ></TextInput>
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

          <SchedulePostList type={type} posts={filteredPosts} />
        </>
      )}
    </motion.div>
  );
};

export default AllSchedule;
