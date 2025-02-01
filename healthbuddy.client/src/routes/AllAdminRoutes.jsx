import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Admin/Dashboard/Dashboard";

const AllAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default AllAdminRoutes;
