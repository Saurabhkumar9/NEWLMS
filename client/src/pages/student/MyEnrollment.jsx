import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/AuthContext";
import { Rating } from 'react-simple-star-rating'; // Ensure this is installed
const URL=  import.meta.env.VITE_BASE_URL;



const MyEnrollment = () => {
  const navigate=useNavigate()
  const { token } = useAppContext();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${URL}/v1/api/enrolled-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEnrolledCourses(response.data.enrolledCourses || []);
    } catch (error) {
      console.error(error.response?.data || "Something went wrong");
      setEnrolledCourses([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb and Title */}
      <div className="mb-6 md:mb-8">
        <div className="text-xs md:text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link> / My Enrollments
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Enrollments</h1>
      </div>

      {/* Message or Courses Grid */}
      {enrolledCourses.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">You have not enrolled in any course yet.</p>
      ) : (
        <>
          <p className="text-green-600 font-medium mb-4">
            Welcome! Here are your enrolled courses:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enrolledCourses.map((item, index) => (
              <div
              onClick={()=>navigate(`/purces/course/details/${item._id}`)}
                key={index}
                className="w-full hover:cursor-pointer rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white transition-transform duration-200 hover:scale-[1.02] h-full flex flex-col"
              >
                {/* Top Image */}
                <div className="relative flex-grow">
                  <img
                    src={item.courseThumbnail}
                    alt="Course Thumbnail"
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                    <p className="text-black bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                      {item.category || item.courseTitle?.split(" ")[0]}
                    </p>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-4 h-40 sm:p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg sm:text-lg font-bold text-gray-800 line-clamp-2">
                      {item.courseTitle}
                    </h3>
                    <p className="text-sm sm:text-sm text-gray-500 mt-1 mb-2">
                      {item.educator}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm sm:text-sm mb-2">
                      <span className="text-black font-medium mr-2">
                        {item.rating || 4}
                      </span>
                      <Rating
                        size={16}
                        initialValue={item.rating || 4}
                        readonly
                        allowFraction
                        SVGstyle={{ display: "inline-block" }}
                      />
                      <span className="text-gray-500 ml-2">
                        ({item.reviews || 4})
                      </span>
                    </div>

                    <div className="text-blue-900 font-semibold text-base">
                      ₹{item.coursePrice}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyEnrollment;
