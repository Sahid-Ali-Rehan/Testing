import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaPhoneAlt, FaEnvelope, FaPowerOff, FaBoxOpen, FaEdit } from 'react-icons/fa';

const MyProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    oldPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile(token);
    }
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: "********"
        });
      } else {
        console.error("Error fetching user details:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          password: profile.newPassword || profile.password,
          oldPassword: profile.oldPassword
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert(data.message || "Error updating profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg space-y-6 transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-800">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your profile settings</p>
        </div>

        {/* Profile Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaUserEdit className="text-gray-500 text-lg" />
              <span className="font-semibold text-gray-700">First Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="border-b-2 border-gray-300 bg-transparent outline-none text-gray-700 p-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-600">{profile.firstName}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <FaUserEdit className="text-gray-500 text-lg" />
              <span className="font-semibold text-gray-700">Last Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="border-b-2 border-gray-300 bg-transparent outline-none text-gray-700 p-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-600">{profile.lastName}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-500 text-lg" />
              <span className="font-semibold text-gray-700">Email:</span>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="border-b-2 border-gray-300 bg-transparent outline-none text-gray-700 p-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-600">{profile.email}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-gray-500 text-lg" />
              <span className="font-semibold text-gray-700">Phone:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="border-b-2 border-gray-300 bg-transparent outline-none text-gray-700 p-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-600">{profile.phone}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Password:</span>
              {isEditing ? (
                <>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={profile.oldPassword}
                    onChange={(e) => setProfile({ ...profile, oldPassword: e.target.value })}
                    className="border-b-2 border-gray-300 bg-transparent outline-none text-gray-700 p-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    className="border-b-2 border-gray-300 bg-transparent outline-none text-gray-700 p-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                <span className="text-gray-600">********</span>
              )}
            </div>

            <div className="flex justify-end items-center space-x-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-4 py-3 bg-gray-400 text-white  hover:bg-gray-500 transition-all duration-300"
                >
                  Save Changes
                </button>
              ) : (
                <button
                onClick={handleEdit}
                className="px-4 py-3 bg-gray-400 text-white hover:bg-gray-500 transition-all duration-300 flex items-center space-x-2"
              >
                <FaEdit className="h-5 w-5 text-white" />  {/* Font Awesome edit icon */}
                <span>Edit Profile</span>
              </button>
          
              )}
            </div>
          </div>
        </div>

        {/* My Orders Button */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => navigate("/my-orders")}
            className="px-6 py-3 bg-teal-500 text-white hover:bg-teal-600 transition-all duration-300 flex items-center"
          >
            <FaBoxOpen className="inline mr-2" />
            My Orders
          </button>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
          >
            <FaPowerOff className="inline mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
