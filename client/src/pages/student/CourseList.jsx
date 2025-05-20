import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import SearchBar from "../../components/student/SearchBar";
import { useAppContext } from "../../context/AuthContext";

const CourseList = () => {
  const { coursesData } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on search term (case insensitive)
  const filteredCourses = coursesData.filter((course) =>
    course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb and Title */}
      <div class="   bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg text-center max-w-md mx-auto">
  <div
  class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-2 sm:p-3 md:p-4 text-sm sm:text-base leading-snug rounded-md max-w-full mx-auto"
  role="alert"
>
  <strong class="font-semibold block mb-1">⚠️ Warning:</strong>
  <span class="block">
    This course is intended solely for testing purposes in my own project.
  </span>
  <span class="block">
    It may contain random video links used only for demonstration.
  </span>
  <span class="block">
    This content is not authorized for sale or any commercial use.
  </span>
</div>

</div>
      <div className="mb-6 md:mb-8">
        <div className="text-xs md:text-sm text-gray-500 mb-2">
         
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Course List
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6 md:mb-8">
        <div className="w-full max-w-md mx-auto md:mx-0">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((item, index) => (
          <CourseCard key={index} item={item} />
        ))}
      </div>

      {/* Show empty state if no courses match */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm
              ? `No courses found matching "${searchTerm}"`
              : "No courses available"}
          </p>
        </div>
      )}

      {/* Show More Button for Mobile */}
      {filteredCourses.length > 0 && (
        <div className="mt-6 text-center md:hidden">
          <button className="text-gray-500 border border-gray-300 px-6 py-2 rounded-md text-sm">
            Show more courses
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
