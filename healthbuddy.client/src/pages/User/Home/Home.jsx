import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import HomeMainBar from "../../../components/User/HomeMainBar/HomeMainBar";

const Home = () => {
  return (
    <div className="h-screen flex flex-row mt-2 relative">
      <LeftSideBar />
      <div className="mx-12 md:mx-auto w-10/12 md:w-6/12 h-fit bg-white dark:bg-gunmetal rounded-2xl  ">
        <HomeMainBar />
      </div>
    </div>
  );
};

export default Home;
