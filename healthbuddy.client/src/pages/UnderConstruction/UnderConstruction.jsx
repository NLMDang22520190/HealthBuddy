import React from "react";
import { Link } from "react-router-dom";
import LeftSideBar from "../../components/User/LeftSideBar/LeftSideBar";
import { Cog, TrafficCone } from "lucide-react";
import { Label } from "flowbite-react";
import { motion } from "framer-motion";

const UnderConstruction = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-full p-4"
        >
          {/* Bánh răng xoay */}
          <div className="relative mb-8">
            <Cog
              className="size-32 text-gray-500 animate-spin-slow"
              strokeWidth={1.5}
            />
          </div>

          {/* Biển báo màu cam */}

          {/* Nội dung chữ */}
          <div className="flex gap-4 items-center">
            <TrafficCone
              className="h-16 w-16 text-orange-500 mb-6"
              strokeWidth={1.5}
            />
            <Label className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
              Page Under Construction
            </Label>
          </div>

          <Label className="text-gray-600 mb-8 text-center max-w-md">
            We're working hard to bring you something amazing. Please check back
            soon!
          </Label>

          {/* Nút quay về */}
          <Link
            to="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
          >
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default UnderConstruction;
