// ExtraWidgets.jsx
import React from 'react';

const ExtraWidgets = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {/* Server Status */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Server Status</h3>
        <p className="text-green-600 font-bold">All Systems Operational</p>
      </div>
      
      {/* Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Notifications</h3>
        <ul>
          <li className="text-gray-600 mb-2">New user signed up!</li>
          <li className="text-gray-600 mb-2">Order #12345 shipped.</li>
          <li className="text-gray-600">Payment received from John.</li>
        </ul>
      </div>
      
      {/* Activity Feed */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Activity Feed</h3>
        <ul>
          <li className="text-gray-600 mb-2">Product Sneakers updated.</li>
          <li className="text-gray-600 mb-2">Discount code SUMMER21 added.</li>
          <li className="text-gray-600">User Jane became Admin.</li>
        </ul>
      </div>
    </div>
  );
};

export default ExtraWidgets;
