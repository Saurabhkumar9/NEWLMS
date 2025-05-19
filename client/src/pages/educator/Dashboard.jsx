import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/educator/SideBar';

const Dashboard = () => {
  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Greeting */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {getGreeting()}, Welcome to your Dashboard!
            </h1>
          </div>

          {/* Outlet for nested routes */}
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
