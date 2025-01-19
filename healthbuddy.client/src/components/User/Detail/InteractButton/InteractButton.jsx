import React from "react";
import { Heart, Flag } from "lucide-react";
import { Label } from "flowbite-react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "antd";

const InteractButton = ({ liked, onLikeClick, onCommentClick }) => {
  return (
    <div className="flex gap-2 p-4 ">
      <motion.div
        className="flex items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={onLikeClick}
          className={`text-primary-light dark:text-primary-dark ${
            liked ? "text-red-500 dark:text-red-500" : ""
          }`}
        >
          <Heart className={`size-7 ${liked ? "fill-current" : ""}`} />
        </button>
        <Label className="text-xs">333</Label>
      </motion.div>

      <motion.div
        className="flex items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={onCommentClick}
          className="text-primary-light dark:text-primary-dark"
        >
          <MessageCircle className="size-7" />
        </button>
        <Label className="text-xs">333</Label>
      </motion.div>
    </div>
  );
};

export default InteractButton;
