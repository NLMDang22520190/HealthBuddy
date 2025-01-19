import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Ellipsis } from "lucide-react";
import { Card, Textarea } from "flowbite-react";
import { Avatar } from "antd";

import logo from "../../../assets/logo.png";

const ChatBotMainBar = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "I'm a demo bot. In a real application, I would process your message and provide a meaningful response.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="user-page-mainbar-content-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-3 md:p-6 user-page-mainbar-content-marginbottom "
      >
        <Card className="flex-1 p-0 mb-4">
          <div className="overflow-y-auto no-scrollbar h-[calc(100vh-250px)] space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className={`rounded-full `}>
                    {message.sender === "user" ? (
                      <Avatar
                        className="size-10"
                        src="https://placehold.co/50x50.png"
                      />
                    ) : (
                      <Avatar className="size-10 bg-white" src={logo} />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-tr from-primary-dark to-10%  to-secondary-dark text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Textarea
            value={newMessage}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-10"
          />
          <button
            className={`px-5 rounded-xl flex items-center justify-center border-2 shadow-lg text-white transition duration-300 cursor-pointer active:scale-[0.98] uppercase ${
              newMessage.trim()
                ? "bg-primary-dark hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!newMessage.trim()} // Disable button when there's no input
          >
            {newMessage.trim() ? (
              <ArrowUp className="size-5" />
            ) : (
              <Ellipsis className="size-5" />
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatBotMainBar;
