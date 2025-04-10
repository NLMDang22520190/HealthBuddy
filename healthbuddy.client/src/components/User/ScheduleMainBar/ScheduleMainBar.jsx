import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import AllSchedule from "./AllSchedule";
import ScheduleTracking from "./ScheduleTracking";

const ScheduleMainBar = () => {
  const { TabPane } = Tabs;
  return (
    <div className="user-page-mainbar-content-container">
      <Tabs centered defaultActiveKey="1">
        <TabPane tabKey="1" tab="All Schedule">
          <AllSchedule type="all" />
        </TabPane>
        <TabPane tab="Schedule Tracking" key="2">
          <ScheduleTracking type="tracking" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ScheduleMainBar;
