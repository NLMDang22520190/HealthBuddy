import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import FoodMainBar from "../../../../components/User/Detail/FoodMainBar/FoodMainBar";

const Food = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <FoodMainBar />
      </div>
    </div>
  );
};

export default Food;
