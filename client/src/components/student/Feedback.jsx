import React from "react";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Feedback = () => {
  const Feedback = [
    {
      name: "Donald Jackman",
      position: "SWE 1 @ Amazon",
      rating: 5,
      review:
        "I've been using imggify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
    {
      name: "Richard Nelson",
      position: "SWE 2 @ Samsung",
      rating: 4,
      review:
        "I've been using imggify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
    {
      name: "James Washington",
      position: "SWE 2 @ Google",
      rating: 4,
      review:
        "I've been using imggify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Feedback.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Feedback.length - 1 : prevIndex - 1
    );
  };

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
      <div className="md:hidden relative">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">
              {Feedback[currentIndex].name}
            </h3>
            <p className="text-gray-500 text-sm">
              {Feedback[currentIndex].position}
            </p>
          </div>
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xl ${
                  i < Feedback[currentIndex].rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-700 mb-4">{Feedback[currentIndex].review}</p>
          <button className="text-blue-600 font-medium">Read more</button>
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
        {Feedback.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6"
          >
            {/* Top Section with Image, Name, Role */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Donald Jackman"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex text-orange-500 mb-3"></div>

            {/* Testimonial Text */}
            <p className="text-gray-700 text-sm mb-3">{testimonial.review}</p>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
