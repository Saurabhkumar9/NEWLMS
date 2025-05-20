import React, { useEffect, useState } from "react";
import CalltoAction from "../../components/student/CalltoAction";
import axios from "axios";
import { useParams } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;
const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/v1/api/course-details/${id}`);
      setCourse(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching course:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Course not found
        </h2>
        <p className="text-gray-500">
          The course you're looking for doesn't exist or may have been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Mobile: Pricing Card First */}
      <div className="block md:hidden mb-8">
        <CoursePricingCard course={course} />
      </div>
      <div class="hidden md:hidden sm:block lg:block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 mb-4 rounded">
        <div class="flex items-center">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <strong>Disclaimer:</strong> This course is intended solely for
          testing purposes in my own project. It may contain random video links
          used only for demonstration. This content is not authorized for sale
          or any commercial use.
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {course.courseTitle}
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              {course.courseDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm">(4.0)</span>
              </div>
              <span className="text-sm">
                • {course.enrolledStudents?.length || 0} students enrolled
              </span>
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Course Curriculum
              </h2>
            </div>

            {course.chapters?.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter._id || chapterIndex} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {chapterIndex + 1}. {chapter.chapterTitle}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {chapter.lectures?.length || 0} lectures
                      </span>
                    </div>

                    {chapter.lectures?.length > 0 ? (
                      <ul className="space-y-2">
                        {chapter.lectures.map((lecture, lectureIndex) => (
                          <LectureItem
                            key={lecture._id || lectureIndex}
                            index={lectureIndex + 1}
                            title={lecture.lectureTitle}
                            // You might want to add duration to your data model
                            isPreview={lecture.isPreviewFree}
                          />
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No lectures added yet
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No curriculum available yet</p>
              </div>
            )}
          </div>

          {/* Course Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              About This Course
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p>{course.courseDescription}</p>
              {/* You can add more detailed description here if available */}
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Card (Hidden on mobile) */}
        <div className="hidden md:block md:w-80 lg:w-96">
          <CoursePricingCard course={course} />
        </div>
      </div>
    </div>
  );
};

const CoursePricingCard = ({ course }) => {
  const originalPrice = course.coursePrice + (course.courseDiscount || 0);
  const discountPercentage = course.courseDiscount
    ? Math.round((course.courseDiscount / course.coursePrice) * 100)
    : 0;

  return (
    <div className="sticky top-4 border rounded-lg p-6 shadow-md bg-white">
      <div className="mt-6">
        <CalltoAction course={course} />
      </div>
    </div>
  );
};

const LectureItem = ({ index, title, isPreview }) => {
  return (
    <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
      <div className="flex items-center">
        <span className="text-gray-500 text-sm w-6">{index}.</span>
        <span className="text-gray-800">{title}</span>
        {isPreview && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
            Preview
          </span>
        )}
      </div>
    </li>
  );
};

export default CourseDetails;
