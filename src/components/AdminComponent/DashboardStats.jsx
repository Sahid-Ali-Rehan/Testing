// DashboardStats.jsx
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const DashboardStats = () => {
  const donutData = {
    labels: ['Orders', 'Products', 'Users'],
    datasets: [
      {
        data: [120, 50, 300],
        backgroundColor: ['#4CAF50', '#FFC107', '#03A9F4'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [150, 200, 250, 300, 400, 500],
        borderColor: '#03A9F4',
        fill: true,
        backgroundColor: 'rgba(3, 169, 244, 0.2)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Statistics</h3>
        <Doughnut data={donutData} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Sales Trend</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default DashboardStats;
