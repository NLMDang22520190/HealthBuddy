import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import PostManagement from "../pages/Admin/PostManagement/PostManagement";

const AllAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin/posts" element={<PostManagement />} />
    </Routes>
  );
};

export default AllAdminRoutes;
