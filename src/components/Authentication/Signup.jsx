import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaPhoneAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null); // Notification state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Auto-hide after 5 seconds
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        firstName,
        lastName,
        phone,
        email,
        password,
        confirmPassword,
      });
      setLoading(false);
      showNotification("Signup successful!", "success");
      navigate("/login"); // Redirect to login page after success
    } catch (err) {
      setLoading(false);
      showNotification(
        err.response?.data?.message || "Signup failed",
        "error"
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400">
      {/* Notification */}
      {notification && (
  <div
    className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${
      notification.type === "success"
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    {notification.type === "error" && (
      <BsFillExclamationCircleFill className="inline mr-2" />
    )}
    {notification.message}
  </div>
)}


      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-gray-300">
              <FaUserAlt className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border-none focus:outline-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-gray-300">
              <FaUserAlt className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border-none focus:outline-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-gray-300">
              <FaPhoneAlt className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 border-none focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border-b-2 border-gray-300">
              <FaEnvelope className="text-gray-500 mr-3" />
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
          <div className="mb-4">
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
          <div className="mb-6">
            <div className="flex items-center border-b-2 border-gray-300">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border-none focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;