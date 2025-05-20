import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const URL=  import.meta.env.VITE_BASE_URL;
const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/v1/api/fetch-feed`
      );
      setFeedbacks(response.data?.data || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to fetch feedback");
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div className="text-center py-12">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (feedbacks.length === 0) {
    return <div className="text-center py-12">No feedback available</div>;
  }

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Feedback</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from our learners as they share their journeys of transformation,
          success, and how our platform has made a difference in their lives.
        </p>
      </div>

      {/* Mobile View - Single Card with Arrows */}
      <div className="md:hidden relative ">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={feedbacks[currentIndex].userId.imageUrl}
              alt={feedbacks[currentIndex].userId.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">
                {feedbacks[currentIndex].userId.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {feedbacks[currentIndex].userId.email}
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            {feedbacks[currentIndex].message}
          </p>
          {/* <button className="text-blue-600 font-medium">Read more</button> */}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white shadow-md"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white shadow-md"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop View - All Cards */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {feedbacks.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.userId?.imageUrl}
                alt={testimonial.userId?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {testimonial.userId?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {testimonial.userId?.email}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-3">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
