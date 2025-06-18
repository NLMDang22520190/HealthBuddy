import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Users, ArrowLeft } from "lucide-react";
import { Button, Typography, Avatar } from "antd";
import { Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";

import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";
import DateSeparator from "./DateSeparator";
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
import { isSameDay } from "date-fns";

const { Title, Text } = Typography;

const ChatInterface = ({ conversation, onBack, onStartNewConversation }) => {
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

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentGroup = null;

    messages.forEach((message) => {
      const messageDate = new Date(message.sentAt);
      const isNewDay =
        !currentGroup || !isSameDay(messageDate, new Date(currentGroup.date));

      if (isNewDay) {
        currentGroup = {
          date: message.sentAt,
          messages: [message],
        };
        groups.push(currentGroup);
      } else {
        currentGroup.messages.push(message);
      }
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  // Get other participant
  const otherParticipant = conversation?.participants?.find(
    (p) => Number(p.userId) !== Number(currentUserId)
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

      if (messagesData.length < 20) {
        dispatch(setHasMoreMessages(false));
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      dispatch(setMessagesError("Failed to load messages"));
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
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  // Welcome Screen
  if (!conversation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full flex items-center justify-center"
      >
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-dark to-secondary-dark rounded-full flex items-center justify-center shadow-lg"
          >
            <MessageCircle className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Title level={3} className="text-gray-900 dark:text-gray-100 mb-2">
              Welcome to Messages
            </Title>
            <Text
              type="secondary"
              className="text-base text-gray-900 dark:text-gray-100"
            >
              Select a conversation to start messaging, or create a new chat
              with someone.
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Button
              type="primary"
              icon={<Users className="w-4 h-4" />}
              size="large"
              onClick={onStartNewConversation}
              className="bg-gradient-to-r from-primary-dark to-secondary-dark hover:from-secondary-dark hover:to-primary-dark border-0 shadow-lg"
            >
              Start New Conversation
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full flex flex-col  dark:bg-gray-800"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Button
            type="text"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={onBack}
            className="md:hidden"
          />
          <Avatar
            src={otherParticipant?.avatar}
            size={40}
            className="ring-2 ring-primary-dark/20"
          />
          <div>
            <Title level={5} className="mb-0">
              {otherParticipant?.username || "Unknown User"}
            </Title>
            <Text type="secondary" className="text-xs">
              Online
            </Text>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        {isMessagesLoading ? (
          <div className="h-full flex items-center justify-center">
            <Spinner size="xl" color="info" />
          </div>
        ) : (
          <div className="h-full overflow-y-auto no-scrollbar p-4 space-y-4">
            {/* Load More Button */}
            {hasMoreMessages && (
              <div className="text-center">
                <Button
                  type="text"
                  loading={isLoadingMore}
                  onClick={handleLoadMore}
                  className="text-primary-dark hover:text-secondary-dark"
                >
                  Load more messages
                </Button>
              </div>
            )}

            {/* Messages */}
            <AnimatePresence>
              {messageGroups.map((group, groupIndex) => (
                <div key={`group-${groupIndex}`}>
                  {/* Date Separator */}
                  <DateSeparator date={group.date} />

                  {/* Messages in this group */}
                  {group.messages.map((message, messageIndex) => (
                    <MessageBubble
                      key={message.messageId}
                      message={message}
                      currentUserId={currentUserId}
                      isLast={
                        groupIndex === messageGroups.length - 1 &&
                        messageIndex === group.messages.length - 1
                      }
                    />
                  ))}
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Message Composer */}
      <MessageComposer onSendMessage={handleSendMessage} disabled={isSending} />
    </motion.div>
  );
};

export default ChatInterface;
