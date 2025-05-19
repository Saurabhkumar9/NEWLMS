import React, { useState, useEffect } from "react";
import {
  FiBook,
  FiUsers,
  FiDollarSign,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";
import axios from "axios";

const StudentEnroll = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEnrollments: 0,
    totalCourses: 0,
    totalEarnings: 0,
  });

  // Static data for demonstration
  const staticStats = {
    activeStudents: 42,
    completionRate: "78%",
    avgCourseRating: "4.5",
  };

  const fetchCoursePurchaseData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/v1/api/all-payments"
      );
      const data = response.data.data;

      if (data && data.length > 0) {
        setPaymentData(data);

        // Calculate statistics
        const uniqueStudents = new Set(data.map((item) => item.email)).size;
        const totalEarnings = data.reduce(
          (sum, item) => sum + item.paymentDetails.amount,
          0
        );

        setStats({
          totalStudents: uniqueStudents,
          totalEnrollments: data.length,
          totalCourses: data[0]?.totalcourse || 0,
          totalEarnings: totalEarnings.toFixed(2),
        });
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
      // Use mock data if API fails
      const mockData = [
        {
          coursePrice: 79.99,
          courseThumbnail:
            "https://www.excelptp.com/wp-content/uploads/2021/05/python-banner-img.jpg",
          courseTitle: "Advanced Python Programming",
          email: "student1@example.com",
          name: "John Doe",
          paymentDetails: {
            amount: 79.99,
            method: "card",
            transactionId: "pi_123",
            purchasedAt: "2025-05-19T11:20:40.244Z",
          },
          totalcourse: 4,
        },
        {
          coursePrice: 59.99,
          courseThumbnail:
            "https://www.classcentral.com/report/wp-content/uploads/2021/07/bootcamp-banner-6000.png",
          courseTitle: "Web Development Bootcamp",
          email: "student2@example.com",
          name: "Jane Smith",
          paymentDetails: {
            amount: 59.99,
            method: "card",
            transactionId: "pi_456",
            purchasedAt: "2025-05-20T10:15:30.000Z",
          },
          totalcourse: 4,
        },
      ];
      setPaymentData(mockData);
      setStats({
        totalStudents: 2,
        totalEnrollments: 2,
        totalCourses: 4,
        totalEarnings: (79.99 + 59.99).toFixed(2),
      });
    }
  };

  // Get unique students (no duplicates)
  const uniqueStudents = Array.from(
    new Set(paymentData.map((item) => item.email))
  ).map((email) => {
    return paymentData.find((item) => item.email === email);
  });

  useEffect(() => {
    fetchCoursePurchaseData();
  }, []);

  return (
    <div className="p-6">
      {/* Top Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<FiUsers className="text-blue-500" size={24} />}
          color="bg-blue-100"
        />
        <StatCard
          title="Total Enrollments"
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
          title="Total Revenue"
          value={`₹${stats.totalEarnings}`}
          icon={<FiDollarSign className="text-yellow-500" size={24} />}
          color="bg-yellow-100"
        />
      </div>

      {/* Additional Static Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Active Students"
          value={staticStats.activeStudents}
          icon={<FiUsers className="text-indigo-500" size={24} />}
          color="bg-indigo-100"
        />
        <StatCard
          title="Completion Rate"
          value={staticStats.completionRate}
          icon={<FiCalendar className="text-teal-500" size={24} />}
          color="bg-teal-100"
        />
        <StatCard
          title="Avg. Course Rating"
          value={staticStats.avgCourseRating}
          icon={<FiBook className="text-amber-500" size={24} />}
          color="bg-amber-100"
        />
      </div>

      {/* Student Enrollment Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Student Enrollments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses Enrolled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uniqueStudents.map((student, index) => {
                // Get all courses for this student
                const studentCourses = paymentData.filter(
                  (item) => item.email === student.email
                );

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {studentCourses.length} courses
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{studentCourses[0].paymentDetails.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiCreditCard className="mr-2 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {studentCourses[0].paymentDetails.method}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {paymentData.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b border-gray-100"
            >
              <div className="flex items-center">
                <img
                  src={item.courseThumbnail}
                  alt={item.courseTitle}
                  className="w-12 h-12 rounded-md object-cover mr-4"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.courseTitle}
                  </h3>
                  <p className="text-xs text-gray-500">{item.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ₹{item.paymentDetails.amount}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(
                    item.paymentDetails.purchasedAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
        <div className="p-2 rounded-full bg-white">{icon}</div>
      </div>
    </div>
  );
};

export default StudentEnroll;
