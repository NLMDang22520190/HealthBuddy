import React from "react";
import LeftSideBar from "../../../../components/User/LeftSideBar/LeftSideBar";
import NewWorkoutMainBar from "../../../../components/User/Add/NewWorkoutMainBar/NewWorkoutMainbar";

const NewWorkout = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <NewWorkoutMainBar />
      </div>
    </div>
  );
};

export default NewWorkout;
