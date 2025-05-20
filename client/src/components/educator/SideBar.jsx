import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FiBook,
  FiUsers,
  FiDollarSign,
  FiPlusCircle,
  FiHome,
  FiMenu,
  FiX,
} from "react-icons/fi";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="w-64 bg-white shadow-md hidden sm:block">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <FiHome className="mr-3" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-course"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <FiPlusCircle className="mr-3" />
                Add Course
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/courses"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <FiBook className="mr-3" />
                My Courses
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/student-enroll"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <FiUsers className="mr-3" />
                Students Enrolled
              </Link>
              <Link
                to="/dashboard/subscibe-page"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <FiUsers className="mr-3" />
                User
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu button - positioned better */}
      <div className="md:hidden sm:hidden fixed top-30 right-0 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-700 rounded-md bg-white shadow hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`md:hidden sm:hidden lg:hidden  fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 bg-white shadow-md`}
      >
        <div className="h-full flex flex-col  sm:hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiHome className="mr-3" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-course"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiPlusCircle className="mr-3" />
                  Add Course
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/courses"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiBook className="mr-3" />
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/student-enroll"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUsers className="mr-3" />
                  Students Enrolled
                </Link>
                <Link
                  to="/dashboard/subscibe-page"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUsers className="mr-3" />
                  Users
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
