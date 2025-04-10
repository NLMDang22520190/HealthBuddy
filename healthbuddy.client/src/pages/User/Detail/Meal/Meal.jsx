import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import MealMainBar from "../../../../components/User/Detail/MealMainBar/MealMainBar";

const Meal = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <MealMainBar />
      </div>
    </div>
  );
};

export default Meal;
