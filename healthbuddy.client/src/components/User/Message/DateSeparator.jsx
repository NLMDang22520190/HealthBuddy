import React from "react";
import { motion } from "framer-motion";
import { format, isToday, isYesterday } from "date-fns";

const DateSeparator = ({ date }) => {
  const formatDate = (date) => {
    const messageDate = new Date(date);
    
    if (isToday(messageDate)) {
      return "Today";
    } else if (isYesterday(messageDate)) {
      return "Yesterday";
    } else {
      return format(messageDate, "MMMM d, yyyy");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center my-4"
    >
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        <div className="px-4 py-2 mx-4 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full shadow-sm">
          {formatDate(date)}
        </div>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </motion.div>
  );
};

export default DateSeparator;
