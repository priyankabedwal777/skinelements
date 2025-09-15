import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import LoginPage from "./components/auth/LoginPage";
import FileUpload from "./components/upload/FileUpload";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ProductDetails from "./components/product/ProductDetails";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage isRegisterModeDefault />} />
      <Route
        path="/fileupload"
        element={user ? <FileUpload /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={user ? <DashboardLayout /> : <Navigate to="/login" />}
      />
      <Route
        path="/product/:id"
        element={user ? <ProductDetails /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
