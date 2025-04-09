import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import NewMealMainBar from "../../../../components/User/Add/NewMealMainBar/NewMealMainBar";

const NewMeal = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <NewMealMainBar />
      </div>
    </div>
  );
};

export default NewMeal;
