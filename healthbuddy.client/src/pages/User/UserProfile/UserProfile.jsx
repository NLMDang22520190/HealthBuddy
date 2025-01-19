import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import UserProfileMainBar from "../../../components/User/UserProfileMainBar/UserProfileMainBar";

const UserProfile = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <UserProfileMainBar />
      </div>
    </div>
  );
};

export default UserProfile;
