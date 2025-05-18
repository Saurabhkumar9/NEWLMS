import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiBook, FiUsers, FiDollarSign, FiPlusCircle, FiHome } from 'react-icons/fi';
import SideBar from '../../components/educator/SideBar';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Stats Cards */}
          

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