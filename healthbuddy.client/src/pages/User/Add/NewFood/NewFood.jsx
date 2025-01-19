import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import NewFoodMainBar from "../../../../components/User/Add/NewFoodMainBar/NewFoodMainBar";

const NewFood = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <NewFoodMainBar />
      </div>
    </div>
  );
};

export default NewFood;
