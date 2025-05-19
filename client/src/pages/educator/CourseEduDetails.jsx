import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import { useAppContext } from "../../context/AuthContext";
import { FiTrash2 } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CourseEduDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAppContext();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [showAddChapter, setShowAddChapter] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/v1/api/course-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourse(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch course details");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, [token, id]);

  const toggleChapter = (chapterIndex) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex],
    }));
  };

  const onSubmitChapter = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/v1/api/add-new-chapter/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      fetchCourse();
      reset();
      setShowAddChapter(false);
    } catch (err) {
      console.log(
        err.response?.data?.message || "Failed to add chapter details"
      );
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    const isVerify = window.confirm(
      "Are you sure you want to delete this chapter?"
    );
    if (!isVerify) return;

    try {
      console.log(token, id, chapterId);
      const response = await axios.delete(
        `http://localhost:4000/v1/api/course/${id}/chapter/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        fetchCourse();
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete chapter");
    }
  };

  const handleDeleteLecture = async (chapterId, lectureId) => {
    const isVerify = window.confirm("you want to delete lecture.");
    if (!isVerify) return;
    try {
      // console.log(id, chapterId,lectureId)
      const response = await axios.delete(
        `http://localhost:4000/v1/api/course/${id}/chapter/${chapterId}/lecture/${lectureId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      fetchCourse();
    } catch (err) {
      console.log(err || "Failed to delete chapter details");
    }
  };
  const handleDeleteCourse = async (chapterId, lectureId) => {
    const isVerify = window.confirm("you want to delete Course.");
    if (!isVerify) return;
    try {
      // console.log(id, chapterId,lectureId)
      const response = await axios.delete(
        `http://localhost:4000/v1/api/course-delete/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      navigate(-1)
    } catch (err) {
      console.log(err || "Failed to delete chapter details");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 p-4">
        Error: {error}
      </div>
    );

  if (!course)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Course not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Course Header - Mobile Optimized */}
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
                    <span className="text-base font-semibold text-gray-800 ">
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

                {/* Add Chapter Button */}
                <button
                  onClick={() => setShowAddChapter(!showAddChapter)}
                  className="flex items-center justify-center md:justify-start px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Chapter
                </button>
              </div>

              {/* Add Chapter Form */}
              {showAddChapter && (
                <form
                  onSubmit={handleSubmit(onSubmitChapter)}
                  className="mt-4 p-3 bg-gray-50 rounded-md"
                >
                  <h3 className="font-medium text-gray-800 mb-2 text-sm md:text-base">
                    Add New Chapter
                  </h3>
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      {...register("chapterTitle", { required: true })}
                      type="text"
                      placeholder="Chapter Title"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm md:text-base"
                    />
                    <input
                      {...register("chapterOrder", { required: true, min: 0 })}
                      type="number"
                      min={0}
                      placeholder="Order"
                      className="w-full md:w-24 px-3 py-2 border border-gray-300 rounded-md no-spinner text-sm md:text-base"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm md:text-base"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Chapters and Lectures - Scrollable on Mobile */}
          <div className="divide-y divide-gray-200 max-h-[calc(500vh-300px)] overflow-y-auto">
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
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                    )}
                    <h3 className="text-base md:text-lg font-medium text-gray-800 break-words">
                      Chapter {chapter.chapterOrder}: {chapter.chapterTitle}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between md:justify-end mt-2 md:mt-0">
                    <span className="text-xs md:text-sm text-gray-500 mr-2 md:mr-4">
                      {chapter.lectures?.length || 0} lecture
                      {chapter.lectures?.length !== 1 ? "s" : ""}
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/add-lecture/${id}/${chapter._id}`)
                      }
                      className="flex items-center px-2 py-1 bg-blue-600 text-white text-xs md:text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Add Lecture
                    </button>
                  </div>
                </div>

                {expandedChapters[chapterIndex] &&
                  chapter.lectures?.length >= 0 && (
                    <div className="mt-2 ml-8 md:ml-10 space-y-2">
                      {chapter.lectures.map((lecture, lectureIndex) => (
                        <div
                          key={`${chapterIndex}-${lectureIndex}-${lecture.lectureTitle}`}
                          className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <PlayIcon
                            onClick={() =>
                              window.open(lecture.lectureUrl, "_blank")
                            }
                            className="h-4 w-4 text-gray-500 mr-3 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              Lecture {lecture.lectureOrder}:{" "}
                              {lecture.lectureTitle}
                            </p>

                            <p className="text-xs text-gray-500 truncate">
                              {lecture.lectureUrl &&
                                lecture.lectureUrl.replace(/^https?:\/\//, "")}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteLecture(chapter._id, lecture._id)
                            }
                            className="p-1 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white transition"
                            title="Delete Chapter"
                          >
                            <FaDeleteLeft />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => handleDeleteChapter(chapter._id)}
                        className="p-1 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white transition"
                        title="Delete Chapter"
                      >
                        Delete Chap
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
          onClick={handleDeleteCourse}
          disabled={loading}
          className={`flex  gap-2 mt-20 px-3 py-1 text-sm rounded-md 
              ${
                loading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              } 
              text-white transition duration-200`}
          title="Delete Course"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <FiTrash2 />
              Delete
            </>
          )}
        </button>
        </div>
      </div>
    </div>
  );
};

export default CourseEduDetails;
