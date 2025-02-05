import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Input as AntdInput,
  Button as AntdButton,
  Spin,
  message,
} from "antd";
import { Card, Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PostList from "../PostList/PostList";
import UserProfileCard from "./UserProfileCard/UserProfileCard";
import UserDetailProfileCard from "./UserDetailProfileCard/UserDetailProfileCard";
import UserNotificationProfileCard from "./UserNotificationProfileCard/UserNotificationProfileCard";
import FilterButtons from "../FilterButtons/FilterButtons";
import api from "../../../features/AxiosInstance/AxiosInstance";

const UserProfileMainBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const auth = useSelector((state) => state.auth);
  const { userId } = useParams();
  const currentUser = auth.userId;
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [user, setUser] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [userNotification, setUserNotification] = useState({});

  const [posts, setPosts] = useState([]);

  // const [isUserDataPending, startUserDataTransition] = useTransition();
  // const [isUserDetailPending, startUserDetailTransition] = useTransition();

  const [isUserDataPending, setIsUserDataPending] = useState(false);
  const [isUserDetailPending, setIsUserDetailPending] = useState(false);

  //#region fetch data
  const fetchUser = async (signal) => {
    try {
      const response = await api.get("/api/User/GetUserById/" + userId, {
        signal,
      });
      const mappedUser = {
        id: response.data.userId,
        name: response.data.username,
        email: response.data.email,
        avatar:
          response.data.avatar == null
            ? "https://placehold.co/1920x1080.png"
            : response.data.avatar,
        FoodPosted: response.data.numberOfFoodPosts,
        ExercisePosted: response.data.numberOfExercisePosts,
        WorkoutSchedulePosted: response.data.numberOfWorkoutPosts,
        MealSchedulePosted: response.data.numberOfMealPosts,
        JoinDated: response.data.createdDate,
        Provider: response.data.provider,
      };
      setUser(mappedUser);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      message.error("Error fetching user data: " + error.message);
    }
  };

  const fetchUserDetail = async (signal) => {
    try {
      const response = await api.get(
        "/api/User/GetUserDetailById/" + currentUser,
        {
          signal,
        }
      );
      const mappedUserDetail = {
        id: response.data.userId,
        height: response.data.height || 0,
        weight: response.data.weight || 0,
        healthCondition: response.data.healthCondition || "",
        allergies: response.data.allergies || "",
      };
      setUserDetail(mappedUserDetail);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      message.error("Error fetching user detail data: " + error.message);
    }
  };

  const fetchUserNotification = async (signal) => {
    try {
      const response = await api.get(
        "/api/User/GetUserNotificationPreferenceById/" + currentUser,
        {
          signal,
        }
      );
      const mappedUserNotification = {
        id: response.data.userId,
        foodNoti: response.data.foodNoti || false,
        exerciseNoti: response.data.exerciseNoti || false,
        workoutScheduleNoti: response.data.workoutScheduleNoti || false,
        mealScheduleNoti: response.data.mealScheduleNoti || false,
      };
      setUserNotification(mappedUserNotification);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      message.error("Error fetching user notification data: " + error.message);
    }
  };

  const fetchUserPosts = async (signal) => {
    try {
      const response = await api.get(
        "/api/Post/GetAllUserApprovedPosts/" + userId,
        {
          signal,
        }
      );
      const data = response.data;
      const mappedPosts = data.map((post) => ({
        id: post.postId,
        title: post.title,
        content: post.description,
        image: post.imgUrl,
        user: {
          id: post.uploader.userId,
          name: post.uploader.username,
          avatar: post.uploader.avatar,
        },
        numberOfLikes: post.numberOfLikes,
        numberOfComments: post.numberOfComments,
        postDate: post.createdDate,
        type: post.postType,
      }));

      setPosts(mappedPosts);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      console.log(error);
      message.error("Error fetching posts: " + error.message);
    }
  };

  useEffect(() => {
    setIsCurrentUser(currentUser == userId);
  }, [currentUser, userId]);

  useEffect(() => {
    const controller = new AbortController();
    try {
      setIsUserDataPending(true);
      const userResponse = fetchUser(controller.signal);
      const postResponse = fetchUserPosts(controller.signal);
      Promise.all([userResponse, postResponse]);
    } catch (error) {
      message.error("Error fetching user and post data: " + error.message);
    } finally {
      setIsUserDataPending(false);
    }

    if (isCurrentUser) {
      setIsUserDetailPending(true);
      try {
        const userDetailResponse = fetchUserDetail(controller.signal);
        const userNotificationResponse = fetchUserNotification(
          controller.signal
        );
        Promise.all([userDetailResponse, userNotificationResponse]);
      } catch (error) {
        message.error(
          "Error fetching user detail and notification data: " + error.message
        );
      } finally {
        setIsUserDetailPending(false);
      }
    }
  }, [userId, isCurrentUser]);
  //#endregion

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "all") return matchesSearch;

    const filterMapping = {
      dishes: "food",
      exercises: "exercise",
      "workout-plans": "workout",
      "meal-plans": "meal",
    };

    return matchesSearch && post.type === filterMapping[activeFilter];
  });

  return (
    <div className="user-page-mainbar-content-container">
      {isUserDataPending ||
      (JSON.stringify(user) === "{}" && posts.length == 0) ? (
        <div className="flex h-full justify-center items-center">
          <Spinner size="xl" color="info" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col p-3 md:p-6 gap-6 user-page-mainbar-content-marginbottom"
        >
          {/* User Info Section */}
          <UserProfileCard
            user={user}
            isCurrentUser={isCurrentUser}
            onUpdate={fetchUser}
          />

          {isCurrentUser && isUserDetailPending && (
            <div className="flex h-full justify-center items-center">
              <Spinner size="xl" color="info" />
            </div>
          )}

          {isCurrentUser && isUserDetailPending && (
            <div className="flex h-full justify-center items-center">
              <Spinner size="xl" color="info" />
            </div>
          )}

          {/* Chỉ hiển thị các component chi tiết và thông báo khi currentUser === userId và dữ liệu đã tải xong */}
          {isCurrentUser && !isUserDetailPending && (
            <>
              {/* User Detail Section */}
              <UserDetailProfileCard userDetail={userDetail} />

              {/* User Notification Section */}
              <UserNotificationProfileCard userNoti={userNotification} />
            </>
          )}

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
      )}
    </div>
  );
};

export default UserProfileMainBar;
