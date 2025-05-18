import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from "../../components/student/CourseCard";
import SearchBar from '../../components/student/SearchBar';
import { useAppContext } from '../../context/AuthContext';

const CourseList = () => {
  const {coursesData}=useAppContext()
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb and Title */}
      <div className="mb-6 md:mb-8">
        <div className="text-xs md:text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link> / Course List
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Course List</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6 md:mb-8">
        <div className="w-full max-w-md mx-auto md:mx-0">
          <SearchBar/>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {coursesData.map((item, index) => (
          <CourseCard key={index} item={item} />
        ))}
      </div>

      {/* Show More Button for Mobile */}
      <div className="mt-6 text-center md:hidden">
        <button className="text-gray-500 border border-gray-300 px-6 py-2 rounded-md text-sm">
          Show more courses
        </button>
      </div>
    </div>
  );
};

export default CourseList;