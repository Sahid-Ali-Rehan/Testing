import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BsFillExclamationCircleFill } from "react-icons/bs"; // For error icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // Notification state
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Auto-hide after 5 seconds
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
  
      // Save the token and role from the response to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); // Save the role here

      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      
      console.log("Token:", token);
      console.log("User Role:", userRole);  // Check if the role is stored correctly
      
      // Check if user is a master admin, redirect to /admin
      if (response.data.role === "admin" && email === 'masteradmin@example.com') {
        navigate("/admin"); // Redirect to the admin page if it's the master admin
      } else {
        navigate("/"); // Redirect to home page for normal users
      }
  
      setLoading(false);
    } catch (err) {
      setLoading(false);
      showNotification(
        err.response?.data?.message || "Login failed",
        "error"
      );
    }
  };
  
  

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.type === "error" ? (
            <BsFillExclamationCircleFill className="inline mr-2" />
          ) : null}
          {notification.message}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-gray-300">
              <FaUserAlt className="text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border-none focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border-b-2 border-gray-300">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border-none focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
