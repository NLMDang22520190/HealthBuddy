import React, { useState, useEffect } from "react";
import { Typography, Avatar, Button, Spin, message } from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { MessageCircle } from "lucide-react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessagesLoading,
  setMessages,
  appendMessages,
  addMessage,
  setMessagesError,
  setCurrentPage,
  setHasMoreMessages,
} from "../../../features/Message/messageSlice";
import messageAPI from "../../../features/MessageAPI/MessageAPI";

const { Title, Text } = Typography;

const ChatWindow = ({ conversation, onBack }) => {
  const dispatch = useDispatch();
  const {
    messages,
    isMessagesLoading,
    messagesError,
    currentPage,
    hasMoreMessages,
  } = useSelector((state) => state.message);
  const { userId: currentUserId } = useSelector((state) => state.auth);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Get other participant
  const otherParticipant = conversation?.participants?.find(
    (p) => p.userId !== currentUserId
  );

  // Load initial messages
  useEffect(() => {
    if (conversation?.conversationId) {
      loadMessages(1, true);
    }
  }, [conversation?.conversationId]);

  const loadMessages = async (page = 1, isInitial = false) => {
    if (isInitial) {
      dispatch(setMessagesLoading(true));
    } else {
      setIsLoadingMore(true);
    }

    try {
      const messagesData = await messageAPI.getConversationMessages(
        conversation.conversationId,
        currentUserId,
        page,
        20
      );

      if (isInitial) {
        dispatch(setMessages(messagesData));
        dispatch(setCurrentPage(1));
      } else {
        dispatch(appendMessages(messagesData));
        dispatch(setCurrentPage(page));
      }

      // Check if there are more messages
      if (messagesData.length < 20) {
        dispatch(setHasMoreMessages(false));
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      dispatch(setMessagesError("Failed to load messages"));
      message.error("Failed to load messages");
    } finally {
      if (isInitial) {
        dispatch(setMessagesLoading(false));
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMoreMessages) {
      loadMessages(currentPage + 1, false);
    }
  };

  const handleSendMessage = async (content) => {
    setIsSending(true);
    try {
      const newMessage = await messageAPI.sendMessage(
        conversation.conversationId,
        content,
        currentUserId
      );

      dispatch(addMessage(newMessage));
    } catch (error) {
      console.error("Error sending message:", error);
      message.error("Failed to send message");
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  const handleRefresh = () => {
    loadMessages(1, true);
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4 max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
            <MessageCircle className="w-12 h-12 text-blue-500" />
          </div>
          <div>
            <Title level={4} className="text-gray-900 dark:text-gray-100 mb-2">
              No conversation selected
            </Title>
            <Text type="secondary" className="text-base">
              Choose a conversation from the sidebar to start messaging
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        {messagesError ? (
          <div className="flex flex-col items-center justify-center h-full text-red-500">
            <Text type="danger">{messagesError}</Text>
            <Button type="link" onClick={handleRefresh} className="mt-2">
              Try again
            </Button>
          </div>
        ) : (
          <MessageList
            messages={messages}
            currentUserId={currentUserId}
            isLoading={isMessagesLoading}
            hasMoreMessages={hasMoreMessages}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
          />
        )}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isSending} />
    </div>
  );
};

export default ChatWindow;
