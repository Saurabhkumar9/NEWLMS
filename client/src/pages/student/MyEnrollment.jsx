import React from 'react';
import { FiBook } from 'react-icons/fi';

const MyEnrollment = () => {
  // Sample data - replace with your actual data
  const enrollments = [
    {
      id: 1,
      courseTitle: "Text Course Title",
      duration: "20 minutes",
      completedLectures: 1,
      totalLectures: 1,
      status: "Completed",
      thumbnail: "https://via.placeholder.com/80" // Replace with actual image
    },
    // Add more enrollment objects as needed
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">My Enrollments</h1>
      
      {enrollments.length === 0 ? (
        <div className="text-center py-8">
          <FiBook className="mx-auto text-gray-400 text-4xl mb-4" />
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Course Thumbnail */}
                <div className="flex-shrink-0">
                  <img 
                    src={enrollment.thumbnail} 
                    alt={enrollment.courseTitle}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                
                {/* Course Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-gray-800 mb-1">{enrollment.courseTitle}</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">{enrollment.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Completed</p>
                      <p className="font-medium">{enrollment.completedLectures} / {enrollment.totalLectures} Lectures</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className={`font-medium ${
                        enrollment.status === "Completed" ? "text-green-600" : 
                        enrollment.status === "In Progress" ? "text-blue-600" : 
                        "text-gray-600"
                      }`}>
                        {enrollment.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollment;