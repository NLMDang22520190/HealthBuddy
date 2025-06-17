import React from "react";
import { List, Avatar, Typography, Badge, Spin } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";

const { Text } = Typography;

const ConversationList = ({
  conversations,
  currentUserId,
  onConversationSelect,
  selectedConversationId,
  isLoading,
  isCollapsed = false,
}) => {
  const getOtherParticipant = (participants, currentUserId) => {
    // Fix: Find the participant who is NOT the current user
    // Convert to numbers to ensure proper comparison
    const currentUserIdNum = Number(currentUserId);
    console.log(
      "Debug - currentUserId:",
      currentUserId,
      "as number:",
      currentUserIdNum
    );
    console.log("Debug - participants:", participants);

    const otherParticipant = participants.find(
      (p) => Number(p.userId) !== currentUserIdNum
    );
    console.log("Debug - otherParticipant:", otherParticipant);
    return otherParticipant;
  };

  const formatLastMessageTime = (lastMessageAt) => {
    if (!lastMessageAt) return "";
    try {
      return formatDistanceToNow(new Date(lastMessageAt), { addSuffix: true });
    } catch (error) {
      return "";
    }
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center ${
          isCollapsed ? "h-32" : "h-64"
        }`}
      >
        <Spin size={isCollapsed ? "default" : "large"} />
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    if (isCollapsed) {
      return (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <MessageOutlined className="text-2xl" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 px-4">
        <MessageOutlined className="text-4xl mb-4" />
        <Text className="text-center">No conversations yet</Text>
        <Text type="secondary" className="text-center text-xs">
          Start a conversation with someone!
        </Text>
      </div>
    );
  }

  return (
    <div className={`conversation-list ${isCollapsed ? "px-1" : "px-0"}`}>
      <List
        className="h-full"
        dataSource={conversations}
        renderItem={(conversation) => {
          const otherParticipant = getOtherParticipant(
            conversation.participants,
            currentUserId
          );
          const isSelected =
            conversation.conversationId === selectedConversationId;

          if (isCollapsed) {
            // Collapsed view - only show avatars
            return (
              <div
                key={conversation.conversationId}
                className={`flex justify-center py-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mx-1 mb-2 ${
                  isSelected
                    ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => onConversationSelect(conversation)}
                title={otherParticipant?.username || "Unknown User"}
              >
                <Badge dot={false} className="relative">
                  <Avatar
                    src={otherParticipant?.avatar}
                    icon={!otherParticipant?.avatar && <UserOutlined />}
                    size={40}
                    className="ring-2 ring-white dark:ring-gray-800 shadow-md"
                  />
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </Badge>
              </div>
            );
          }

          // Full view
          return (
            <List.Item
              key={conversation.conversationId}
              className={`cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg mx-2 mb-1 px-3 py-2 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-l-4 border-blue-500 shadow-md"
                  : "hover:shadow-sm"
              }`}
              onClick={() => onConversationSelect(conversation)}
            >
              <List.Item.Meta
                avatar={
                  <div className="relative">
                    <Avatar
                      src={otherParticipant?.avatar}
                      icon={!otherParticipant?.avatar && <UserOutlined />}
                      size={48}
                      className="ring-2 ring-white dark:ring-gray-800 shadow-sm"
                    />
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                }
                title={
                  <div className="flex justify-between items-start">
                    <Text
                      strong
                      className="text-gray-900 dark:text-gray-100 text-sm"
                      ellipsis
                    >
                      {otherParticipant?.username || "Unknown User"}
                    </Text>
                    <Text
                      type="secondary"
                      className="text-xs whitespace-nowrap ml-2"
                    >
                      {formatLastMessageTime(conversation.lastMessageAt)}
                    </Text>
                  </div>
                }
                description={
                  <div className="mt-1">
                    <Text
                      type="secondary"
                      ellipsis
                      className="text-xs block max-w-full"
                    >
                      {conversation.lastMessageSenderId === currentUserId
                        ? "You: "
                        : ""}
                      {conversation.lastMessageContent || "No messages yet"}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default ConversationList;
