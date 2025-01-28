import React, { useState, useEffect } from "react";
import { Label } from "flowbite-react";
import { Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import api from "../../../features/AxiosInstance/AxiosInstance";

const UserAddNewPost = ({ onAddClick }) => {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("https://placehold.co/50x50.png");

  const handleUserNavigate = () => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await api.get("/api/User/GetUserById/" + userId);
        const avatar =
          response.data.avatar == null
            ? "https://placehold.co/1920x1080.png"
            : response.data.avatar;
        setAvatar(avatar);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
      message.error("Error fetching user data: " + error.message);
    }
  }, []);

  return (
    <div className="p-3 md:p-6 flex gap-3">
      <motion.div
        className="h-fit"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-px rounded-full bg-gradient-to-tr from-primary-dark to-secondary-dark">
          <Avatar
            onClick={() => handleUserNavigate()}
            className="cursor-pointer min-w-12 h-12 md:size-14"
            src={avatar}
          />
        </div>
      </motion.div>
      <div
        onClick={onAddClick}
        className="items-center cursor-pointer flex-1 flex justify-between"
      >
        <Label className="text-base font-light">What's new...</Label>
        <button
          onClick={onAddClick}
          className="rounded-xl max-w-32 bg-transparent flex items-center justify-center border-2 border-secondary-dark shadow-lg hover:bg-secondary-dark text-secondary-dark hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-5 py-2 uppercase"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default UserAddNewPost;
