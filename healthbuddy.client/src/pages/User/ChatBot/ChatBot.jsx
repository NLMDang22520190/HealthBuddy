import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import ChatBotMainBar from "../../../components/User/ChatBotMainBar/ChatBotMainBar";

const ChatBot = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <ChatBotMainBar />
      </div>
    </div>
  );
};

export default ChatBot;
