import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to the login page after logout
    navigate("/login");
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Logout;
