import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import UsersMainBar from "../../../components/User/UsersMainBar/UsersMainBar";

const Users = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <UsersMainBar />
      </div>
    </div>
  );
};

export default Users;
