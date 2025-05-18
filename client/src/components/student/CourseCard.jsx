import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const CourseCard = ({ item }) => {
  const navigate=useNavigate()
  return (
    <div 
    onClick={()=>navigate(`/course-details/${item._id}`)}
    className="w-full hover:cursor-pointer rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white transition-transform duration-200 hover:scale-[1.02] h-full flex flex-col">
      {/* Top Image Section - Increased height on mobile */}
      <div className="relative flex-grow">
        <img
          src={item.courseThumbnail}
          alt="Course Thumbnail"
          className="w-full h-40 sm:h-48 object-cover" // Increased from h-32 to h-40 on mobile
        />
        
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
          <p className="text-black bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
            {item.category || item.courseTitle.split(' ')[0]}
          </p>
        </div>
      </div>

      {/* Course Info Section - More padding on mobile */}
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
          {/* Rating - Slightly larger on mobile */}
          <div className="flex items-center text-sm sm:text-sm mb-2">
            <span className="text-black font-medium mr-2">
              {item.rating || 4}
            </span>
            <Rating
              size={16} // Increased from 14 to 16
              className="sm:scale-100"
              initialValue={item.rating || 4}
              readonly
              allowFraction
              SVGstyle={{ display: 'inline-block' }}
            />
            <span className="text-gray-500 ml-2">
              ({item.reviews || 4})
            </span>
          </div>

          {/* Price */}
          <div className="text-blue-900 font-semibold text-base">
            ₹{item.coursePrice}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CourseCard;