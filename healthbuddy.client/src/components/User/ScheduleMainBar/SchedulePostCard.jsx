import { useState } from "react";
import { format } from "date-fns";
import { Badge, Label } from "flowbite-react";
import { Avatar } from "antd";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

const SchedulePostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full relative aspect-[3/4] overflow-hidden hover:shadow-md hover:shadow-secondary-light dark:hover:shadow-sm dark:hover:shadow-primary-dark transition-shadow">
      {/* Image Section (50% height) */}
      <div className="relative h-1/2 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full hover:scale-105 object-cover transition-transform duration-300 `}
        />
        <Badge color="info" className="absolute top-3 right-3 ">
          {post.type}
        </Badge>
      </div>
      {/* Content Section (50% height) */}
      <div className="h-1/2 p-4 flex flex-col gap-0.5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className=" p-px rounded-full bg-gradient-to-tr from-primary-dark to-secondary-dark">
            <Avatar
              //   onClick={() => handleUserNavigate(post.user)}
              className="cursor-pointer size-8"
              src={post.user.avatar}
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-sm font-medium  cursor-pointer">
              {post.user.name}
            </Label>
            <Label className="text-xs text-muted-foreground font-normal">
              {format(new Date(post.postDate), "dd/MM/yyyy")}
            </Label>
          </div>
        </div>
        {/* Title */}
        <Label className="font-bold text-base truncate">{post.title}</Label>
        {/* Description */}
        <Label className="text-sm font-normal text-muted-foreground line-clamp-1 sm:line-clamp-2 ">
          {post.content}
        </Label>
        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="text-black dark:text-white">
                <Heart />
              </button>
              <Label className="text-xs">{post.numberOfLikes}</Label>
            </motion.div>

            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="text-black dark:text-white">
                <MessageCircle />
              </button>
              <Label className="text-xs">{post.numberOfComments}</Label>
            </motion.div>
          </div>
          <Badge className="text-xs">{post.totalDays} days</Badge>
        </div>
      </div>
    </div>
  );
};

export default SchedulePostCard;
