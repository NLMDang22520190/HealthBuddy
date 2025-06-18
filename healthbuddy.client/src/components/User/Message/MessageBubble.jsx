import React from "react";
import { motion } from "framer-motion";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { format } from "date-fns";

const { Text } = Typography;

const MessageBubble = ({ message, currentUserId, isLast }) => {
  const isOwnMessage = Number(message.senderId) === Number(currentUserId);

  const formatMessageTime = (sentAt) => {
    try {
      return format(new Date(sentAt), "HH:mm");
    } catch (error) {
      return "";
    }
  };

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex mb-4 ${
        isOwnMessage ? "justify-end" : "justify-start"
      } group`}
    >
      <div
        className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
          isOwnMessage ? "flex-row-reverse space-x-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        {!isOwnMessage && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Avatar
              src={message.senderAvatar}
              icon={!message.senderAvatar && <UserOutlined />}
              size={32}
              className="ring-2 ring-white dark:ring-gray-800 shadow-sm"
            />
          </motion.div>
        )}

        <div
          className={`flex flex-col ${
            isOwnMessage ? "items-end" : "items-start"
          }`}
        >
          {/* Sender name for received messages */}
          {!isOwnMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-1 ml-2"
            >
              <Text type="secondary" className="text-xs font-medium">
                {message.senderUsername}
              </Text>
            </motion.div>
          )}

          {/* Message bubble */}
          <motion.div
            className={`relative px-4 py-3 rounded-2xl shadow-md ${
              isOwnMessage
                ? "bg-gradient-to-br from-primary-dark to-secondary-dark text-white rounded-br-md"
                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-200 dark:border-gray-600"
            } transition-all duration-200 hover:shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Message content */}
            <Text
              className={`${
                isOwnMessage ? "text-white" : "text-gray-900 dark:text-gray-100"
              } leading-relaxed break-words`}
            >
              {message.content}
            </Text>

            {/* Message tail */}
            <div
              className={`absolute bottom-0 ${
                isOwnMessage
                  ? "right-0 transform translate-x-1 translate-y-1"
                  : "left-0 transform -translate-x-1 translate-y-1"
              }`}
            >
              <div
                className={`w-3 h-3 ${
                  isOwnMessage
                    ? "bg-secondary-dark"
                    : "bg-white dark:bg-gray-700 border-r border-b border-gray-200 dark:border-gray-600"
                } rotate-45`}
              ></div>
            </div>
          </motion.div>

          {/* Timestamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`flex items-center mt-1 space-x-1 ${
              isOwnMessage ? "justify-end" : "justify-start"
            } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
          >
            <Text type="secondary" className="text-xs">
              {formatMessageTime(message.sentAt)}
            </Text>
            {isOwnMessage && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
