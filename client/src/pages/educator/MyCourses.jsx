import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { token } = useAppContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/v1/api/fetch-eductor-course",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handler for clicking 'View Details' button
  const handleViewDetails = (courseId) => {
    navigate(`/dashboard/courses/details/${courseId}`);
  };

  // Image error handler to avoid infinite loop on broken images
  const handleImageError = (e) => {
    // If current src is NOT already the fallback image, replace it
    if (
      e.target.src !==
      "https://via.placeholder.com/300x200?text=No+Thumbnail"
    ) {
      e.target.onerror = null; // Remove error handler to prevent loop
      e.target.src = "https://via.placeholder.com/300x200?text=No+Thumbnail";
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading courses...
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  // Main render
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Courses</h1>

      {courses.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-500">
          No courses found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {course.courseThumbnail ? (
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="text-gray-500">No Thumbnail</div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.courseTitle}
                </h3>
                <p className="text-gray-600 mb-4">
                  {course.courseDescription.length > 100
                    ? `${course.courseDescription.substring(0, 100)}...`
                    : course.courseDescription}
                </p>

                <div className="flex items-center mb-4">
                  <span
                    className='text-blue-900 font-semibold text-base'
                  >
                    ₹{course.coursePrice}
                  </span>
                 
                </div>

                <button
                  onClick={() => handleViewDetails(course._id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
