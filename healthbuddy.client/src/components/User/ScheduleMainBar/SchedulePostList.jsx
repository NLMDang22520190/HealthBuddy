import React from "react";
import { motion } from "framer-motion";

import SchedulePostCard from "./SchedulePostCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const SchedulePostList = ({ posts }) => {
  return (
    <motion.div
      className="grid px-6 gap-6 grid-cols-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map((post) => (
        <SchedulePostCard key={post.id} post={post} />
      ))}
    </motion.div>
  );
};

export default SchedulePostList;
