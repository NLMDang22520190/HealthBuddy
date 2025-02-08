import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import PostByKeywordMainBar from "../../../components/User/AllPostMainBar/PostByKeywordMainBar";

const PostByKeyword = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <PostByKeywordMainBar />
      </div>
    </div>
  );
};

export default PostByKeyword;
