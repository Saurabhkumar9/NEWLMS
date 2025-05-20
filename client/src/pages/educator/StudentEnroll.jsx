import React, { useState, useEffect } from 'react';
import { FiBook, FiUsers, FiDollarSign } from 'react-icons/fi';
import axios from 'axios';

const StudentEnroll = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEnrollments: 0,
    totalCourses: 0,
    totalEarnings: 0
  });

  const fetchCoursePurchaseData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/api/all-payments');
      const data = response.data;
      
      if (data && data.length > 0) {
        setPaymentData(data);
        
        // Calculate statistics
        const uniqueStudents = new Set(data.map(item => item.email)).size;
        const totalEarnings = data.reduce((sum, item) => sum + item.paymentDetails.amount, 0);
        
        setStats({
          totalStudents: uniqueStudents,
          totalEnrollments: data.length,
          totalCourses: data[0]?.totalcourse || 0, // Assuming all entries have same total courses
          totalEarnings: totalEarnings.toFixed(2)
        });
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  useEffect(() => {
    fetchCoursePurchaseData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Student Enrolled" 
          value={stats.totalStudents} 
          icon={<FiUsers className="text-blue-500" size={24} />}
          color="bg-blue-100"
        />
        <StatCard 
          title="Total Enrolments" 
          value={stats.totalEnrollments} 
          icon={<FiBook className="text-green-500" size={24} />}
          color="bg-green-100"
        />
        <StatCard 
          title="Total Courses" 
          value={stats.totalCourses} 
          icon={<FiBook className="text-purple-500" size={24} />}
          color="bg-purple-100"
        />
        <StatCard 
          title="Total Earnings" 
          value={`$${stats.totalEarnings}`} 
          icon={<FiDollarSign className="text-yellow-500" size={24} />}
          color="bg-yellow-100"
        />
      </div>

      {/* Payment Details Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Course Purchase Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md" src={item.courseThumbnail} alt={item.courseTitle} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.courseTitle}</div>
                        <div className="text-sm text-gray-500">${item.coursePrice}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.paymentDetails.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.paymentDetails.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.paymentDetails.purchasedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

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

export default StudentEnroll;