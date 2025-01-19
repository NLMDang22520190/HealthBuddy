import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import NewExerciseMainBar from "../../../../components/User/Add/NewExerciseMainBar/NewExerciseMainBar";

const NewFood = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <NewExerciseMainBar />
      </div>
    </div>
  );
};

export default NewFood;
