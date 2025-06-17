import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import MessagesMainBar from "../../../components/User/MessagesMainBar/MessagesMainBar";

const Messages = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <MessagesMainBar />
      </div>
    </div>
  );
};

export default Messages;
