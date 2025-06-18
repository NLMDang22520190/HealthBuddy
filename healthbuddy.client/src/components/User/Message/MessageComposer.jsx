import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Textarea } from "flowbite-react";
import { message } from "antd";

const MessageComposer = ({ onSendMessage, disabled = false }) => {
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      message.warning("Please enter a message");
      return;
    }

    if (trimmedMessage.length > 1000) {
      message.error("Message is too long (max 1000 characters)");
      return;
    }

    setIsSending(true);
    try {
      await onSendMessage(trimmedMessage);
      setMessageText("");
    } catch (error) {
      message.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
    >
      <form onSubmit={handleSend} className="flex items-end space-x-3">
        {/* Message input */}
        <div className="flex-1 relative">
          <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-primary-dark to-secondary-dark">
            <Textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              disabled={disabled || isSending}
              className="focus:ring-transparent dark:focus:ring-transparent rounded-2xl dark:bg-bg_content_dark bg-bg_light dark:border-transparent border-transparent resize-none"
              rows={1}
              maxLength={1000}
              style={{
                minHeight: "44px",
                maxHeight: "120px",
              }}
            />
          </div>

          {/* Character counter */}
          <div className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none">
            {messageText.length}/1000
          </div>
        </div>

        {/* Send button */}
        <motion.button
          type="submit"
          disabled={disabled || !messageText.trim() || isSending}
          whileHover={{ scale: messageText.trim() ? 1.05 : 1 }}
          whileTap={{ scale: messageText.trim() ? 0.95 : 1 }}
          className={`p-3 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            messageText.trim()
              ? "bg-gradient-to-br from-primary-dark to-secondary-dark hover:from-secondary-dark hover:to-primary-dark text-white shadow-primary-dark/25"
              : "bg-gray-400 cursor-not-allowed text-gray-600"
          }`}
        >
          {isSending ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </form>

      {/* Helper text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center"
      >
        Press Enter to send, Shift+Enter for new line
      </motion.div>
    </motion.div>
  );
};

export default MessageComposer;
