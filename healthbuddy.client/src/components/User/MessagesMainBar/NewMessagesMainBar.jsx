import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { Button, Typography, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import ChatInterface from "../Message/ChatInterface";
import ConversationSidebar from "../Message/ConversationSidebar";
import UserSearch from "../Message/UserSearch";
import {
  setConversationsLoading,
  setConversations,
  setConversationsError,
  setCurrentConversation,
  addConversation,
  clearMessages,
} from "../../../features/Message/messageSlice";
import messageAPI from "../../../features/MessageAPI/MessageAPI";

const { Title } = Typography;

const NewMessagesMainBar = () => {
  const dispatch = useDispatch();
  const { conversations, currentConversation, isLoading, error } = useSelector(
    (state) => state.message
  );
  const { userId: currentUserId } = useSelector((state) => state.auth);

  const [showUserSearch, setShowUserSearch] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (currentUserId) {
      loadConversations();
    }

    return () => {
      dispatch(clearMessages());
    };
  }, [currentUserId]);

  const loadConversations = async () => {
    dispatch(setConversationsLoading(true));
    try {
      const conversationsData = await messageAPI.getUserConversations(
        currentUserId
      );
      dispatch(setConversations(conversationsData));
    } catch (error) {
      console.error("Error loading conversations:", error);
      dispatch(setConversationsError("Failed to load conversations"));
      message.error("Failed to load conversations");
    }
  };

  const handleConversationSelect = (conversation) => {
    dispatch(setCurrentConversation(conversation));
  };

  const handleBackToList = () => {
    dispatch(setCurrentConversation(null));
  };

  const handleUserSelect = async (user) => {
    try {
      const conversation = await messageAPI.createConversation(
        currentUserId,
        user.userId
      );
      dispatch(addConversation(conversation));
      dispatch(setCurrentConversation(conversation));
      message.success(`Started conversation with ${user.username}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
      message.error("Failed to start conversation");
    }
  };

  const handleRefresh = () => {
    loadConversations();
  };

  return (
    <div className="user-page-mainbar-content-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-3 md:p-6 user-page-mainbar-content-marginbottom"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary-dark to-secondary-dark rounded-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <Title
              level={3}
              className="mb-0 mt-2 text-gray-900 dark:text-gray-100"
            >
              Messages
            </Title>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setShowUserSearch(true)}
              className="bg-gradient-to-r from-primary-dark to-secondary-dark hover:from-secondary-dark hover:to-primary-dark border-0 shadow-lg"
            >
              New Chat
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex gap-4 h-[calc(100vh-225px)]"
        >
          {/* Chat Area */}
          <div className="flex-1 min-w-0">
            <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <ChatInterface
                conversation={currentConversation}
                onBack={handleBackToList}
                onStartNewConversation={() => setShowUserSearch(true)}
              />
            </div>
          </div>

          {/* Conversations Sidebar */}
          <div
            className={`transition-all duration-300 flex-shrink-0 ${
              isSidebarCollapsed ? "w-16" : "w-64"
            }`}
          >
            <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <ConversationSidebar
                conversations={conversations}
                currentUserId={currentUserId}
                onConversationSelect={handleConversationSelect}
                selectedConversationId={currentConversation?.conversationId}
                isLoading={isLoading}
                error={error}
                onRefresh={handleRefresh}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() =>
                  setIsSidebarCollapsed(!isSidebarCollapsed)
                }
              />
            </div>
          </div>
        </motion.div>

        {/* User Search Modal */}
        <UserSearch
          visible={showUserSearch}
          onClose={() => setShowUserSearch(false)}
          onUserSelect={handleUserSelect}
          currentUserId={currentUserId}
        />
      </motion.div>
    </div>
  );
};

export default NewMessagesMainBar;
