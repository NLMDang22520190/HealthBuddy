import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import AllPostMainBar from "../../../components/User/AllPostMainBar/AllPostMainBar";

const AllPost = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <AllPostMainBar />
      </div>
    </div>
  );
};

export default AllPost;
