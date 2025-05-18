import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import { FiBook, FiUsers, FiDollarSign, FiPlusCircle, FiHome } from 'react-icons/fi';

const SideBar = () => {
  return (
   <>
   <div className="w-64 bg-white shadow-md">
           <div className="p-4 border-b">
             <h2 className="text-xl font-semibold">Dashboard</h2>
           </div>
           <nav className="p-4">
             <ul className="space-y-2">
               <li>
                 <Link to="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                   <FiHome className="mr-3" />
                   Home
                 </Link>
               </li>
               <li>
                 <Link to="/dashboard/add-course" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                   <FiPlusCircle className="mr-3" />
                   Add Course
                 </Link>
               </li>
               <li>
                 <Link to="/dashboard/courses" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                   <FiBook className="mr-3" />
                   My Courses
                 </Link>
               </li>
               <li>
                 <Link to="/dashboard/student-enroll" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                   <FiUsers className="mr-3" />
                   Students Enrolled
                 </Link>
               </li>
             </ul>
           </nav>
         </div>
   </>
  )
}

export default SideBar
