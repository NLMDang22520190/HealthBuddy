import React from "react";
import { Heart, Flag } from "lucide-react";
import { Label } from "flowbite-react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { message } from "antd";
import SharePopover from "../../../SharePopover/SharePopover";

const InteractButton = ({
  liked,
  onLikeClick,
  numberOfLikes,
  numberOfComments,
}) => {
  const onShareClick = () => {
    const currentUrl = window.location.href; // Lấy URL hiện tại
    navigator.clipboard
      .writeText(currentUrl) // Sao chép URL vào clipboard
      .then(() => {
        message.success("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  return (
    <div className="gap-2 grid grid-cols-3">
      <motion.div
        className="cursor-pointer flex p-3 items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLikeClick}
      >
        <button
          onClick={onLikeClick}
          className={`text-primary-light dark:text-primary-dark ${
            liked ? "text-red-500 dark:text-red-500" : ""
          }`}
        >
          <Heart className={`size-7 ${liked ? "fill-current" : ""}`} />
        </button>
        <Label className="text-sm cursor-pointer">{numberOfLikes} Likes</Label>
      </motion.div>

      <motion.div
        className="flex p-3 items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button className="text-primary-light dark:text-primary-dark">
          <MessageCircle className="size-7" />
        </button>
        <Label className="text-sm">{numberOfComments} Comments</Label>
      </motion.div>

      <motion.div
        className="flex p-3 items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SharePopover
          iconSize="size-7"
          iconColor="text-primary-light dark:text-primary-dark"
          onShareClick={onShareClick}
        />
        <Label className="text-sm">Share</Label>
      </motion.div>
    </div>
  );
};

export default InteractButton;
