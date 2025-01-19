import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import ExerciseMainBar from "../../../../components/User/Detail/ExerciseMainBar/ExerciseMainBar";

const Exercise = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <ExerciseMainBar />
      </div>
    </div>
  );
};

export default Exercise;
