import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useAppContext } from "../../context/AuthContext";
import axios from "axios";

const AddCourseDetails = () => {
  const { token } = useAppContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      courseData: {
        course_id: "",
        courseTitle: "",
        courseDescription: "",
        coursePrice: "",
        courseDiscount: "",
        chapters: [],
      },
    },
  });

  const {
    fields: chapters,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    control,
    name: "courseData.chapters",
  });

  const [expandedChapter, setExpandedChapter] = React.useState(null);
  const [thumbnailFile, setThumbnailFile] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const toggleChapter = (chapterIndex) => {
    setExpandedChapter(expandedChapter === chapterIndex ? null : chapterIndex);
  };

  const addChapter = () => {
    const newChapter = {
      chapterOrder: chapters.length + 1,
      chapterTitle: "",
      lectures: [],
    };
    appendChapter(newChapter);
    setExpandedChapter(chapters.length);
  };

  const addLecture = (chapterIndex) => {
    const currentLectures =
      watch(`courseData.chapters.${chapterIndex}.lectures`) || [];
    const newLecture = {
      lectureOrder: currentLectures.length + 1,
      lectureTitle: "",
      lectureUrl: "",
    };

    const updatedChapters = [...watch("courseData.chapters")];
    updatedChapters[chapterIndex].lectures = [...currentLectures, newLecture];
    setValue("courseData.chapters", updatedChapters);
  };

  const deleteLecture = (chapterIndex, lectureIndex) => {
    const updatedChapters = [...watch("courseData.chapters")];
    updatedChapters[chapterIndex].lectures.splice(lectureIndex, 1);
    // Recalculate lecture orders
    updatedChapters[chapterIndex].lectures = updatedChapters[
      chapterIndex
    ].lectures.map((lecture, idx) => ({
      ...lecture,
      lectureOrder: idx + 1,
    }));
    setValue("courseData.chapters", updatedChapters);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        alert("Please select an image file (jpg, jpeg, png)");
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setThumbnailFile(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Append course data as JSON
    formData.append("courseData", JSON.stringify(data.courseData));

    // Append thumbnail file if exists
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/v1/api/create-course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      // Reset form after successful submission
      setValue("courseData", {
        course_id: "",
        courseTitle: "",
        courseDescription: "",
        coursePrice: "",
        courseDiscount: "",
        chapters: [],
      });
      setThumbnailFile(null);
      setExpandedChapter(null);
    } catch (error) {
      console.error(
        "Error creating course:",
        error.response?.data.message || error.message
      );
      alert(
        `Error: ${error.response?.data?.message || "Failed to create course"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Course Info */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course ID
            </label>
            <input
              type="text"
              {...register("courseData.course_id", {
                required: "Course ID is required",
              })}
              placeholder=" id like e.g., reactjs2035 "
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.courseData?.course_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseData.course_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              {...register("courseData.courseTitle", {
                required: "Course title is required",
              })}
              placeholder="e.g., React JS Mastery"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.courseData?.courseTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseData.courseTitle.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Description
            </label>
            <textarea
              {...register("courseData.courseDescription", {
                required: "Course description is required",
              })}
              placeholder="Learn React from basics to advanced with real projects."
              className="w-full p-2 border border-gray-300 rounded-md h-24"
            />
            {errors.courseData?.courseDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseData.courseDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Price (₹)
              </label>
              <input
                type="number"
                min={0}
                placeholder="enter amount"
                {...register("courseData.coursePrice", {
                  required: "Price is required",
                  valueAsNumber: true, // Converts string input to number
                  min: {
                    value: 0,
                    message: "Price must be a positive number",
                  },
                })}
                className="w-full p-2 border border-gray-300 rounded-md no-spinner"
              />

              {errors.courseData?.coursePrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.courseData.coursePrice.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (₹)
              </label>
              <input
                type="number"
                min={0}
                {...register("courseData.courseDiscount", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Discount cannot be less than 0%",
                  },
                })}
                placeholder="Enter discount "
                className="w-full p-2 border border-gray-300 rounded-md  no-spinner"
              />

              {errors.courseData?.courseDiscount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.courseData.courseDiscount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Thumbnail
              </label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {thumbnailFile && (
                <p className="text-sm text-green-600 mt-1">
                  {thumbnailFile.name} selected
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Chapters and Lectures */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>

          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className="mb-4 border border-gray-200 rounded-md overflow-hidden"
            >
              <div className="flex justify-between items-center bg-gray-50 p-3">
                <div className="flex items-center w-full">
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapterIndex)}
                    className="mr-2 text-gray-500 hover:text-gray-700"
                  >
                    {expandedChapter === chapterIndex ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                  <input
                    type="text"
                    {...register(
                      `courseData.chapters.${chapterIndex}.chapterTitle`,
                      {
                        required: "Chapter title is required",
                      }
                    )}
                    placeholder="Chapter name"
                    className="flex-1 p-2 bg-transparent font-medium"
                  />
                  <span className="text-sm text-gray-500 ml-2">
                    {watch(`courseData.chapters.${chapterIndex}.lectures`)
                      ?.length || 0}{" "}
                    Lectures
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeChapter(chapterIndex)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <FiTrash2 />
                </button>
              </div>

              {expandedChapter === chapterIndex && (
                <div className="p-4 bg-white">
                  {watch(`courseData.chapters.${chapterIndex}.lectures`)?.map(
                    (lecture, lectureIndex) => (
                      <div
                        key={lectureIndex}
                        className="mb-4 pl-6 border-l-2 border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <input
                            type="text"
                            {...register(
                              `courseData.chapters.${chapterIndex}.lectures.${lectureIndex}.lectureTitle`,
                              {
                                required: "Lecture title is required",
                              }
                            )}
                            placeholder="Lecture title"
                            className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              deleteLecture(chapterIndex, lectureIndex)
                            }
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <input
                          type="url"
                          {...register(
                            `courseData.chapters.${chapterIndex}.lectures.${lectureIndex}.lectureUrl`,
                            {
                              required: "Video URL is required",
                              pattern: {
                                value: /^(https?:\/\/).+/,
                                message:
                                  "Must be a valid URL starting with http:// or https://",
                              },
                            }
                          )}
                          placeholder="Video URL"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.courseData?.chapters?.[chapterIndex]
                          ?.lectures?.[lectureIndex]?.lectureUrl && (
                          <p className="text-red-500 text-sm mt-1">
                            {
                              errors.courseData.chapters[chapterIndex].lectures[
                                lectureIndex
                              ].lectureUrl.message
                            }
                          </p>
                        )}
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => addLecture(chapterIndex)}
                    className="flex items-center text-blue-500 hover:text-blue-700 mt-2 ml-6"
                  >
                    <FiPlus className="mr-1" /> Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addChapter}
            className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md"
          >
            <FiPlus className="mr-2" /> Add Chapter
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseDetails;
