import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AuthContext";
const URL=  import.meta.env.VITE_BASE_URL;
const Footer = () => {
  const { token } = useAppContext();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    setSubscribing(true);

    try {
      const response = await axios.post(`${URL}/v1/api/subscribe`, {
        email,
      });

      alert(response.data.message);
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleFeedback = async () => {
    if (!message) {
      alert("Please enter a message");
      return;
    }

    setSubmittingFeedback(true);

    try {
      const response = await axios.post(
        `${URL}/v1/api/add-feedback`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setMessage("");
    } catch (error) {
      alert(error.response?.data?.message || "Try again.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Info */}
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold mb-4">Edemy</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter feedback (min 20 and max 50 words)"
                className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleFeedback}
                disabled={submittingFeedback}
                className={`${
                  submittingFeedback
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } px-4 py-2 rounded font-medium transition-colors`}
              >
                {submittingFeedback ? "Submitting..." : "Feedback"}
              </button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-400 mb-4">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              />
              <button
                onClick={handleSubscribe}
                disabled={subscribing}
                className={`${
                  subscribing
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } px-6 py-2 rounded font-medium transition-colors`}
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>Copyright 2025 © . All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
