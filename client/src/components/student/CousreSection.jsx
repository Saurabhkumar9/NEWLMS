import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useAppContext } from "../../context/AuthContext";

const CoursesSection = () => {
  const {coursesData}=useAppContext()

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  

  return (
    <>
      <div className="py-16 px-4 sm:px-8 md:px-20 lg:px-40">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-800">
            Learn from the best
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover our top-rated courses across various categories. From
            coding and design to business and wellness, our courses are crafted
            to deliver results.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid place-items-center sm:place-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {coursesData.slice(0,8).map((item, index) => (
            <CourseCard key={index} item={item} />
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <Link
            to="/course-list"
            onClick={scrollToTop}
            className="inline-block mt-6 text-gray-500 border border-gray-500/30 px-10 py-3 rounded hover:bg-gray-100 transition-colors duration-200"
          >
            Show all courses
          </Link>
        </div>
      </div>
    </>
  );
};

export default CoursesSection;
