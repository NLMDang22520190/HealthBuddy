import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import PostManagement from "../pages/Admin/PostManagement/PostManagement";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";

import FoodManagement from "../pages/Admin/FoodManagement/FoodManagement";
import FoodTypeManagement from "../pages/Admin/FoodManagement/FoodTypeManagement";
import IngredientManagement from "../pages/Admin/FoodManagement/IngredientManagement";

const AllAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin/posts" element={<PostManagement />} />
      <Route path="/admin/users" element={<UserManagement />} />

      <Route path="/admin/food" element={<FoodManagement />} />
      <Route path="/admin/food-types" element={<FoodTypeManagement />} />
      <Route path="/admin/ingredients" element={<IngredientManagement />} />
    </Routes>
  );
};

export default AllAdminRoutes;
