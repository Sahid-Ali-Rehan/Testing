import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ isAdminRoute }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const currentPath = window.location.pathname;

//   if (!token) {
//     return <Navigate to={`/login?redirect=${currentPath}`} replace />;
//   }

  if (isAdminRoute && userRole !== "admin") {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  isAdminRoute: PropTypes.bool.isRequired,
};

export default PrivateRoute;
