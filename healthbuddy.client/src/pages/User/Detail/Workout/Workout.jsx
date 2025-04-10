import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import WorkoutMainBar from "../../../../components/User/Detail/WorkoutMainBar/WorkoutMainBar";

const Workout = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <WorkoutMainBar />
      </div>
    </div>
  );
};

export default Workout;
