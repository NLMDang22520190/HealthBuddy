import React from "react";
import { motion } from "framer-motion";
import Post from "../Post/Post";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PostList = ({ posts }) => {
  return (
    <motion.div
      className="divide-gray-500 divide-y"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </motion.div>
  );
};

export default PostList;
