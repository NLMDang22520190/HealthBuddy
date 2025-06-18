import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Avatar, Typography, Button, Badge } from "antd";
import { Spinner } from "flowbite-react";

const { Text } = Typography;

const ConversationSidebar = ({
  conversations,
  currentUserId,
  onConversationSelect,
  selectedConversationId,
  isLoading,
  error,
  onRefresh,
  isCollapsed,
  onToggleCollapse,
}) => {
  const getOtherParticipant = (participants, currentUserId) => {
    const currentUserIdNum = Number(currentUserId);
    return participants.find((p) => Number(p.userId) !== currentUserIdNum);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <Badge
            count={conversations.length}
            style={{
              backgroundColor: "#09FFB5",
              color: "#000",
            }}
          />
        )}

        <div className="flex items-center space-x-1 ml-auto">
          <Button
            type="text"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={onRefresh}
            loading={isLoading}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
            size="small"
          />
          <Button
            type="text"
            icon={
              isCollapsed ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            }
            onClick={onToggleCollapse}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
            size="small"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {isLoading && conversations.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <Spinner size="lg" color="info" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-32 text-red-500 px-4">
            <Text type="danger" className="text-center text-sm">
              {error}
            </Text>
            <Button
              type="link"
              onClick={onRefresh}
              size="small"
              className="mt-2"
            >
              Try again
            </Button>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 px-4">
            <MessageCircle className="w-8 h-8 mb-2" />
            {!isCollapsed && (
              <>
                <Text className="text-center text-sm">
                  No conversations yet
                </Text>
                <Text type="secondary" className="text-center text-xs">
                  Start a conversation with someone!
                </Text>
              </>
            )}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-2"
          >
            {conversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(
                conversation.participants,
                currentUserId
              );
              const isSelected =
                conversation.conversationId === selectedConversationId;

              if (isCollapsed) {
                return (
                  <motion.div
                    key={conversation.conversationId}
                    variants={itemVariants}
                    className={`flex justify-center py-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mb-2 ${
                      isSelected
                        ? "bg-gradient-to-r from-primary-dark/10 to-secondary-dark/10 ring-2 ring-primary-dark/20"
                        : ""
                    }`}
                    onClick={() => onConversationSelect(conversation)}
                    title={otherParticipant?.username || "Unknown User"}
                  >
                    <Avatar
                      src={otherParticipant?.avatar}
                      size={40}
                      className="ring-2 ring-white dark:ring-gray-800 shadow-sm"
                    />
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={conversation.conversationId}
                  variants={itemVariants}
                  className={`cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl p-3 mb-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-primary-dark/10 to-secondary-dark/10 ring-2 ring-primary-dark/20 shadow-md"
                      : "hover:shadow-sm"
                  }`}
                  onClick={() => onConversationSelect(conversation)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar
                        src={otherParticipant?.avatar}
                        size={48}
                        className="ring-2 ring-white dark:ring-gray-800 shadow-sm"
                      />
                      {/* Online indicator */}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Text
                          strong
                          className="text-gray-900 dark:text-gray-100 truncate"
                        >
                          {otherParticipant?.username || "Unknown User"}
                        </Text>
                        {/* Unread indicator */}
                        {conversation.unreadCount > 0 && (
                          <Badge
                            count={conversation.unreadCount}
                            size="small"
                            style={{
                              backgroundColor: "#09FFB5",
                              color: "#000",
                            }}
                          />
                        )}
                      </div>

                      <Text type="secondary" className="text-sm truncate mt-1">
                        {conversation.lastMessageContent || "No messages yet"}
                      </Text>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;
