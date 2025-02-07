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

import NewFood from "../pages/User/Add/NewFood/NewFood";
import NewExercise from "../pages/User/Add/NewExercise/NewExercise";

import Food from "../pages/User/Detail/Food/Food";
import Exercise from "../pages/User/Detail/Exercise/Exercise";

import UnderConstruction from "../pages/UnderConstruction/UnderConstruction";

const AllUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="all-post" element={<AllPost />} />
      <Route path="chatBot" element={<ChatBot />} />
      <Route path="users" element={<Users />} />
      <Route path="user/:userId" element={<UserProfile />} />

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

      {/* Detail */}
      <Route path="detail/food/:postId" element={<Food />} />
      <Route path="detail/exercise/:postId" element={<Exercise />} />

      <Route path="*" element={<UnderConstruction />} />
    </Routes>
  );
};

export default AllUserRoutes;
