import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import HomeMainBar from "../../../components/User/HomeMainBar/HomeMainBar";

const Home = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <HomeMainBar />
      </div>
    </div>
  );
};

export default Home;
