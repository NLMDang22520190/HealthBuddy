import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import HomeMainBar from "../../../components/User/HomeMainBar/HomeMainBar";

const Home = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row mt-2 relative">
      {/* LeftSideBar: Di chuyển xuống khi màn hình nhỏ, sticky ở dưới */}
      <div className="order-2 md:order-1 w-full md:w-auto sticky bg-snow dark:bg-ebony justify-center flex bottom-0 z-10">
        <LeftSideBar />
      </div>

      {/* HomeMainBar */}
      <div className="order-1 md:order-2 mx-12 md:mx-auto w-10/12 md:w-6/12 h-fit bg-white dark:bg-gunmetal rounded-2xl">
        <HomeMainBar />
      </div>
    </div>
  );
};

export default Home;
