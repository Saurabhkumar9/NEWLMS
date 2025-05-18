import React from 'react'
import { FiBook, FiUsers, FiDollarSign} from 'react-icons/fi';

const StudentEnroll = () => {
  return (
    <>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Student Enrolled" 
              value="5" 
              icon={<FiUsers className="text-blue-500" size={24} />}
              color="bg-blue-100"
            />
            <StatCard 
              title="Total Enrolments" 
              value="8" 
              icon={<FiBook className="text-green-500" size={24} />}
              color="bg-green-100"
            />
            <StatCard 
              title="Total Courses" 
              value="8" 
              icon={<FiBook className="text-purple-500" size={24} />}
              color="bg-purple-100"
            />
            <StatCard 
              title="Total Earnings" 
              value="$707.38" 
              icon={<FiDollarSign className="text-yellow-500" size={24} />}
              color="bg-yellow-100"
            />
          </div>
    </>
  )

  
}

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} p-6 rounded-lg shadow-sm`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-white">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StudentEnroll
