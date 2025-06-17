import React, { useState, useEffect } from "react";
import { Button, Typography, message, Spin } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { MessageCircle, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import ConversationList from "../Message/ConversationList";
import ChatWindow from "../Message/ChatWindow";
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

const MessagesMainBar = () => {
  const dispatch = useDispatch();
  const { conversations, currentConversation, isLoading, error } = useSelector(
    (state) => state.message
  );
  const { userId: currentUserId } = useSelector((state) => state.auth);

  const [showUserSearch, setShowUserSearch] = useState(false);
  const [isConversationsPanelCollapsed, setIsConversationsPanelCollapsed] =
    useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      // Auto collapse on mobile
      if (window.innerWidth < 768) {
        setIsConversationsPanelCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentUserId) {
      loadConversations();
    }

    // Cleanup when component unmounts
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
    // Auto collapse on mobile when conversation is selected
    if (isMobileView) {
      setIsConversationsPanelCollapsed(true);
    }
  };

  const handleBackToList = () => {
    dispatch(setCurrentConversation(null));
    // Show conversations panel when going back
    if (isMobileView) {
      setIsConversationsPanelCollapsed(false);
    }
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
      // Auto collapse after creating conversation
      if (isMobileView) {
        setIsConversationsPanelCollapsed(true);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      message.error("Failed to start conversation");
    }
  };

  const handleRefresh = () => {
    loadConversations();
  };

  const toggleConversationsPanel = () => {
    setIsConversationsPanelCollapsed(!isConversationsPanelCollapsed);
  };

  return (
    <div className="user-page-mainbar-content-container">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                <Title
                  level={4}
                  className="mb-0 text-gray-900 dark:text-gray-100"
                >
                  Messages
                </Title>
              </div>
              {currentConversation && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>•</span>
                  <span>
                    {currentConversation.participants?.find(
                      (p) => Number(p.userId) !== Number(currentUserId)
                    )?.username || "Unknown User"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                type="text"
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={isLoading}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Refresh conversations"
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowUserSearch(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-md"
              >
                New Chat
              </Button>
              <Button
                type="text"
                icon={
                  isConversationsPanelCollapsed ? (
                    <ChevronLeft />
                  ) : (
                    <ChevronRight />
                  )
                }
                onClick={toggleConversationsPanel}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                title={
                  isConversationsPanelCollapsed
                    ? "Show conversations"
                    : "Hide conversations"
                }
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
              isConversationsPanelCollapsed ? "" : "mr-4"
            }`}
          >
            {currentConversation ? (
              <ChatWindow
                conversation={currentConversation}
                onBack={handleBackToList}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center space-y-4 max-w-md mx-auto px-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-12 h-12 text-blue-500" />
                  </div>
                  <div>
                    <Title
                      level={3}
                      className="text-gray-900 dark:text-gray-100 mb-2"
                    >
                      Welcome to Messages
                    </Title>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Select a conversation to start messaging, or create a new
                      chat with someone.
                    </p>
                    <Button
                      type="primary"
                      icon={<Users />}
                      onClick={() => setShowUserSearch(true)}
                      size="large"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg"
                    >
                      Start New Conversation
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Conversations Panel - Right Side */}
          <div
            className={`bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out ${
              isConversationsPanelCollapsed ? "w-16" : "w-80"
            }`}
          >
            <div className="h-full flex flex-col">
              {/* Conversations Header */}
              <div
                className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                  isConversationsPanelCollapsed ? "px-2" : "px-4"
                }`}
              >
                {!isConversationsPanelCollapsed && (
                  <div className="flex items-center justify-between">
                    <Title
                      level={5}
                      className="mb-0 text-gray-900 dark:text-gray-100"
                    >
                      Conversations
                    </Title>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {conversations.length}
                    </span>
                  </div>
                )}
                {isConversationsPanelCollapsed && (
                  <div className="flex justify-center">
                    <MessageCircle className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-hidden">
                {error ? (
                  <div
                    className={`flex flex-col items-center justify-center h-full text-red-500 ${
                      isConversationsPanelCollapsed ? "px-2" : "px-4"
                    }`}
                  >
                    {!isConversationsPanelCollapsed && (
                      <>
                        <p className="text-center text-sm">{error}</p>
                        <Button
                          type="link"
                          onClick={handleRefresh}
                          className="mt-2"
                          size="small"
                        >
                          Try again
                        </Button>
                      </>
                    )}
                    {isConversationsPanelCollapsed && (
                      <Button
                        type="text"
                        icon={<ReloadOutlined />}
                        onClick={handleRefresh}
                        className="text-red-500"
                      />
                    )}
                  </div>
                ) : (
                  <ConversationList
                    conversations={conversations}
                    currentUserId={currentUserId}
                    onConversationSelect={handleConversationSelect}
                    selectedConversationId={currentConversation?.conversationId}
                    isLoading={isLoading}
                    isCollapsed={isConversationsPanelCollapsed}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Search Modal */}
        <UserSearch
          visible={showUserSearch}
          onClose={() => setShowUserSearch(false)}
          onUserSelect={handleUserSelect}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
};

export default MessagesMainBar;
