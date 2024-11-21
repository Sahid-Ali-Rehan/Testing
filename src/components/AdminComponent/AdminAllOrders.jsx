import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'; // Font Awesome Icons

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetching all orders from the API or mock data
  useEffect(() => {
    // Mock fetch for orders
    const fetchOrders = async () => {
      // Replace this with your API call
      const data = [
        { id: 1, customerName: 'John Doe', total: 120, status: 'Pending' },
        { id: 2, customerName: 'Jane Smith', total: 75, status: 'Shipped' },
        { id: 3, customerName: 'Mike Johnson', total: 50, status: 'Delivered' },
      ];
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    // Add your delete logic here
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h2 className="text-3xl font-semibold mb-6">All Orders</h2>

      {/* Table for displaying orders */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">${order.total}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link to={`/admin/view-order/${order.id}`} className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </Link>
                  <Link to={`/admin/edit-order/${order.id}`} className="text-yellow-500 hover:text-yellow-700">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(order.id)}
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

      {/* Add New Order Button */}
      <div className="mt-6">
        <Link to="/admin/add-order">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminAllOrders;
