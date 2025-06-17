import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
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
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <TextArea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={disabled || isSending}
            className="resize-none border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
            maxLength={1000}
            style={{
              borderRadius: "20px",
              paddingRight: "48px",
            }}
          />
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {messageText.length}/1000
          </div>
        </div>
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={isSending}
          disabled={disabled || !messageText.trim()}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          size="large"
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
};

export default MessageInput;
