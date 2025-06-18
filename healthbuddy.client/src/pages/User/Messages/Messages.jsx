import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import NewMessagesMainBar from "../../../components/User/MessagesMainBar/NewMessagesMainBar";

const Messages = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <NewMessagesMainBar />
      </div>
    </div>
  );
};

export default Messages;
