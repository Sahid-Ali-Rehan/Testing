import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/AdminComponent/Sidebar';
import DashboardStats from '../../components/AdminComponent/DashboardStats';
import ExtraWidgets from '../../components/AdminComponent/ExtraWidgets';

const Admin = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');  // Get role from localStorage

  useEffect(() => {
    // Check if the user is an admin
    if (role !== 'admin') {
      // Redirect to home page if not an admin
      navigate('/');
    }
  }, [role, navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
        <DashboardStats />
        <ExtraWidgets />
      </div>
    </div>
  );
};

export default Admin;
