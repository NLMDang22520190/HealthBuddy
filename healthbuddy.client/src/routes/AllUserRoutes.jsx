import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/User/Home/Home";
import Login from "../pages/Auth/Login/Login";

const AllUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth/login" element={<Login />} />
    </Routes>
  );
};

export default AllUserRoutes;
