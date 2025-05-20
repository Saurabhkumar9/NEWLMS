import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import CalltoAction from "../../components/student/CalltoAction";
import YouTube from "react-youtube"; // ✅ Import react-youtube
const URL=  import.meta.env.VITE_BASE_URL;
const PurchesCourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [selectedVideoId, setSelectedVideoId] = useState(null); // ✅ New State
  const { id } = useParams();

  const fetchPurchesCourseDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/v1/api/course-details/${id}`
      );
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
    fetchPurchesCourseDetail();
  }, [id]);

  const toggleChapter = (chapterIndex) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex],
    }));
  };

  // ✅ Extract YouTube video ID
  const extractYouTubeId = (url) => {
    const regExp = /^.*(?:youtu\.be\/|v=|\/embed\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {/* ...Thumbnail and course details... */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row items-start">
              {/* Thumbnail */}
              <div className="w-full md:w-56 h-40 bg-gray-200 rounded-md overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                {course.courseThumbnail ? (
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/224x160?text=No+Thumbnail";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Thumbnail
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 break-words">
                      {course.courseTitle}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm md:text-base line-clamp-2">
                      {course.courseDescription}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-gray-800">
                        ₹{course.coursePrice}
                      </span>
                      <span className="text-base font-semibold text-red-600 line-through">
                        ₹{course.coursePrice + course.courseDiscount}
                      </span>
                      {course.courseDiscount >= 0 && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          {Math.round(
                            (course.courseDiscount / course.coursePrice) * 100
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* ✅ YouTube Player Section */}
          {selectedVideoId && (
            <div className="mb-6 bg-white shadow rounded p-4">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-2">Now Playing</h2>
                <CiCircleRemove
                  onClick={() => setSelectedVideoId(false)}
                  size={28} 
                  className="bg-red-100 p-1 rounded-full font-bold text-black cursor-pointer"
                />
              </div>
              <YouTube
                videoId={selectedVideoId}
                opts={{
                  width: "100%",
                  height: "390",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                className="w-full"
              />
            </div>
          )}
          {/* Chapters and Lectures */}
          <div className="divide-y divide-gray-200">
            {course.chapters?.map((chapter, chapterIndex) => (
              <div
                key={`${chapterIndex}-${chapter.chapterTitle}`}
                className="p-3 md:p-4"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded flex-1"
                    onClick={() => toggleChapter(chapterIndex)}
                  >
                    {expandedChapters[chapterIndex] ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 mr-2" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-500 mr-2" />
                    )}
                    <h3 className="text-base md:text-lg font-medium text-gray-800">
                      Chapter {chapter.chapterOrder}: {chapter.chapterTitle}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-500">
                    {chapter.lectures?.length || 0} lecture
                    {chapter.lectures?.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {expandedChapters[chapterIndex] &&
                  chapter.lectures?.map((lecture, lectureIndex) => (
                    <div
                      key={`${chapterIndex}-${lectureIndex}-${lecture.lectureTitle}`}
                      className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => {
                        const videoId = extractYouTubeId(lecture.lectureUrl);
                        if (videoId) {
                          setSelectedVideoId(videoId); // ✅ Set selected video ID
                        }
                      }}
                    >
                      <PlayIcon size={28} className="h-4 w-4 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Lecture {lecture.lectureOrder}: {lecture.lectureTitle}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {lecture.lectureUrl?.replace(/^https?:\/\//, "")}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchesCourseDetail;
