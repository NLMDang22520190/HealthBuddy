import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import VerifyCode from "../pages/Auth/VerifyCode/VerifyCode";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import Callback from "../pages/Auth/CallBack/CallBack";
import ErrorHandle from "../pages/ErrorHandle/ErrorHandle";

import Home from "../pages/User/Home/Home";
import ChatBot from "../pages/User/ChatBot/ChatBot";
import Users from "../pages/User/Users/Users";
import UserProfile from "../pages/User/UserProfile/UserProfile";
import AllPost from "../pages/User/AllPost/AllPost";
import PostByKeyword from "../pages/User/PostByKeyword/PostByKeyword";
import Schedule from "../pages/User/Schedule/Schedule";
import Messages from "../pages/User/Messages/Messages";

import NewFood from "../pages/User/Add/NewFood/NewFood";
import NewExercise from "../pages/User/Add/NewExercise/NewExercise";
import NewWorkout from "../pages/User/Add/NewWorkout/NewWorkout";
import NewMeal from "../pages/User/Add/NewMeal/NewMeal";

import Food from "../pages/User/Detail/Food/Food";
import Exercise from "../pages/User/Detail/Exercise/Exercise";
import Workout from "../pages/User/Detail/Workout/Workout";
import Meal from "../pages/User/Detail/Meal/Meal";

import ScheduleTrackingDetail from "../components/User/ScheduleTracking/ScheduleTrackingDetail";

import UnderConstruction from "../pages/UnderConstruction/UnderConstruction";

const AllUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="all-post" element={<AllPost />} />
      <Route path="all-post/keyword/:keyword" element={<PostByKeyword />} />
      <Route path="chatBot" element={<ChatBot />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="users" element={<Users />} />
      <Route path="user/:userId" element={<UserProfile />} />
      <Route path="messages" element={<Messages />} />

      {/* Auth */}
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/signup" element={<SignUp />} />
      <Route path="auth/verify-code" element={<VerifyCode />} />
      <Route path="auth/forgot-password" element={<ForgotPassword />} />
      <Route path="auth/reset-password" element={<ResetPassword />} />
      <Route path="callback" element={<Callback />} />
      <Route path="error/:message" element={<ErrorHandle />} />

      {/* Add  */}
      <Route path="add/new-food" element={<NewFood />} />
      <Route path="add/new-exercise" element={<NewExercise />} />
      <Route path="add/new-workout" element={<NewWorkout />} />
      <Route path="add/new-meal" element={<NewMeal />} />

      {/* Detail */}
      <Route path="detail/food/:postId" element={<Food />} />
      <Route path="detail/exercise/:postId" element={<Exercise />} />
      <Route path="detail/workoutSchedule/:postId" element={<Workout />} />
      <Route path="detail/mealSchedule/:postId" element={<Meal />} />

      {/* Schedule Tracking */}
      <Route
        path="schedule-tracking/:scheduleId/:scheduleType"
        element={<ScheduleTrackingDetail />}
      />

      {/* Under Construction */}

      <Route path="*" element={<UnderConstruction />} />
    </Routes>
  );
};

export default AllUserRoutes;
