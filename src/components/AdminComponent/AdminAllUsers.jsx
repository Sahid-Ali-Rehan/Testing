import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaUserShield } from 'react-icons/fa'; // Font Awesome Icons

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetching all users from the API or mock data
  useEffect(() => {
    // Mock fetch for users
    const fetchUsers = async () => {
      // Replace this with your API call
      const data = [
        { id: 1, username: 'john_doe', email: 'john@example.com', role: 'customer' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'customer' },
        { id: 3, username: 'admin_user', email: 'admin@example.com', role: 'admin' },
      ];
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    // Add your delete logic here
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleRoleChange = (id) => {
    // Logic to toggle user role to admin (or vice versa)
    setUsers(users.map((user) => {
      if (user.id === id) {
        user.role = user.role === 'customer' ? 'admin' : 'customer'; // Toggle role
      }
      return user;
    }));
  };

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h2 className="text-3xl font-semibold mb-6">All Users</h2>

      {/* Table for displaying users */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link to={`/admin/edit-user/${user.id}`} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleRoleChange(user.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaUserShield />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New User Button */}
      <div className="mt-6">
        <Link to="/admin/add-user">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminAllUsers;
