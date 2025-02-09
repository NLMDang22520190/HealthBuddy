import React from "react";
import LeftSideBar from "../../../components/User/LeftSideBar/LeftSideBar";
import ScheduleMainBar from "../../../components/User/ScheduleMainBar/ScheduleMainBar";

const Schedule = () => {
  return (
    <div className="user-page-container">
      <div className="user-page-left-sidebar">
        <LeftSideBar />
      </div>

      <div className="user-page-mainbar-container">
        <ScheduleMainBar />
      </div>
    </div>
  );
};

export default Schedule;
