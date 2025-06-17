import React, { useEffect, useRef } from "react";
import { List, Avatar, Typography, Spin, Button } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { format } from "date-fns";

const { Text } = Typography;

const MessageList = ({
  messages,
  currentUserId,
  isLoading,
  hasMoreMessages,
  onLoadMore,
  isLoadingMore,
}) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll to bottom when new messages are added (not when loading more)
    if (!isLoadingMore && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, isLoadingMore]);

  const formatMessageTime = (sentAt) => {
    try {
      return format(new Date(sentAt), "HH:mm");
    } catch (error) {
      return "";
    }
  };

  const formatMessageDate = (sentAt) => {
    try {
      const messageDate = new Date(sentAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (messageDate.toDateString() === today.toDateString()) {
        return "Today";
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return format(messageDate, "MMM dd, yyyy");
      }
    } catch (error) {
      return "";
    }
  };

  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;

    const currentDate = new Date(currentMessage.sentAt).toDateString();
    const previousDate = new Date(previousMessage.sentAt).toDateString();

    return currentDate !== previousDate;
  };

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Load More Button */}
      {hasMoreMessages && (
        <div className="text-center p-4">
          <Button
            type="link"
            onClick={onLoadMore}
            loading={isLoadingMore}
            icon={isLoadingMore ? <LoadingOutlined /> : null}
          >
            {isLoadingMore ? "Loading..." : "Load more messages"}
          </Button>
        </div>
      )}

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 pb-4"
      >
        {messages.map((message, index) => {
          const isOwnMessage = message.senderId === currentUserId;
          const previousMessage = index > 0 ? messages[index - 1] : null;
          const showDateSeparator = shouldShowDateSeparator(
            message,
            previousMessage
          );

          return (
            <div key={message.messageId}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="text-center my-4">
                  <Text
                    type="secondary"
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs"
                  >
                    {formatMessageDate(message.sentAt)}
                  </Text>
                </div>
              )}

              {/* Message */}
              <div
                className={`flex mb-6 ${
                  isOwnMessage ? "justify-end" : "justify-start"
                } group`}
              >
                {!isOwnMessage && (
                  <Avatar
                    src={message.senderAvatar}
                    icon={!message.senderAvatar && <UserOutlined />}
                    size={32}
                    className="mr-3 mt-1 ring-2 ring-white dark:ring-gray-800 shadow-sm"
                  />
                )}

                <div
                  className={`max-w-xs lg:max-w-md ${
                    isOwnMessage ? "order-1" : "order-2"
                  }`}
                >
                  {!isOwnMessage && (
                    <Text
                      type="secondary"
                      className="text-xs block mb-1 ml-1 font-medium"
                    >
                      {message.senderUsername}
                    </Text>
                  )}

                  <div
                    className={`px-4 py-3 relative ${
                      isOwnMessage
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md shadow-lg"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md shadow-md border border-gray-200 dark:border-gray-600"
                    } transition-all duration-200 hover:shadow-lg`}
                  >
                    <Text
                      className={`${
                        isOwnMessage
                          ? "text-white"
                          : "text-gray-900 dark:text-gray-100"
                      } leading-relaxed`}
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
                            ? "bg-blue-600"
                            : "bg-white dark:bg-gray-700 border-r border-b border-gray-200 dark:border-gray-600"
                        } rotate-45`}
                      ></div>
                    </div>
                  </div>

                  <div
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
