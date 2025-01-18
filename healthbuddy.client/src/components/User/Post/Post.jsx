import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import { vi } from "date-fns/locale";
import { Avatar } from "antd";
import { Label } from "flowbite-react";
import { motion } from "framer-motion";
const Post = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-3 md:px-6 py-4 flex gap-3"
    >
      <motion.div
        className="h-fit"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Avatar className="min-w-12 h-12 md:size-14" src={post.user.avatar} />
      </motion.div>

      <div className="flex gap-3 flex-col">
        <div className="flex gap-2 items-center">
          <Label className="text-sm font-bold">{post.user.name}</Label>
          <Label className="text-sm font-extralight ">
            {formatDistanceToNow(new Date(post.postDate), {
              addSuffix: true,
              locale: vi,
            })}
          </Label>
        </div>
        <Label className="text-base text-primary-light dark:text-primary-dark">
          {post.title}
        </Label>
        <Label className="text-xs">{post.content}</Label>

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-h-52 max-w-96 rounded-xl"
          src={post.image}
          alt="post"
        />

        <div className="flex gap-2">
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
            <Label className="text-xs flex items-center gap-1">
              <MessageCircle /> {post.numberOfComments}
            </Label>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default Post;
