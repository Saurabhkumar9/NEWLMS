import axios from "axios";
import React from "react";
import { useAppContext } from "../../context/AuthContext";
import { useState } from "react";
const URL = import.meta.env.VITE_BASE_URL;
const CalltoAction = ({ course }) => {
  const { token } = useAppContext();

  const [loading, setLoading] = useState(false);
  const buyCourse = async () => {
    if (!token) {
      return alert("Please login before buying the course.");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${URL}/v1/api/payment`,
        {
          courseId: course._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.success && response.data.checkoutUrl) {
        setTimeout(() => {
          window.location.href = response.data.checkoutUrl;
        }, 1000);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error while buying course:", error);
      alert(error.response?.data?.message || "Failed to initiate payment.");
    } finally {
      setLoading(false); // Step 3: Stop loading
    }
  };

  return (
    <>
      <div className="relative">
        <div class=" md:hidden sm:hidden lg:hidden bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 mb-4 rounded">
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
            <strong>Disclaimer:</strong>    This course is intended solely for testing purposes in my own project. {" "}
             It may contain random video links used only for demonstration. This content is not authorized for sale or any commercial use.
          </div>
        </div>
        <img
          src={
            course.courseThumbnail ||
            "https://via.placeholder.com/500x300?text=No+Thumbnail"
          }
          alt={course.courseTitle}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </div>
      <div className="mb-4"></div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-2">
          This course includes:
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {course.chapters?.reduce(
              (total, chapter) => total + (chapter.lectures?.length || 0),
              0
            )}{" "}
            on-demand videos
          </li>
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Full lifetime access
          </li>
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Certificate of completion
          </li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 sticky top-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ₹{course.coursePrice}
            </p>
            <p className="text-lg text-red-500 line-through">
              {course.coursePrice + course.courseDiscount}
            </p>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
            {Math.floor((course.courseDiscount / course.coursePrice) * 100) ||
              0}{" "}
            % off
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm  mb-6">
          <span className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span> 4
          </span>
          <span>|</span>
          <div class=" bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800  flex  justify-center ">
           
              <div class="text-red-600 font-bold text-lg mb-2">⚠️ Warning</div>
              <p class="mb-4">
                This is a <strong>demo payment gateway</strong>.
                <span class="block">No real transactions will occur.</span>
              </p>
            
          </div>
        </div>

        <button
          onClick={() => buyCourse()}
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-medium py-3 px-4 rounded-lg transition-colors`}
        >
          {loading ? "Processing..." : "Enroll Now"}
        </button>
      </div>
    </>
  );
};

export default CalltoAction;
