const User = require("../models/user.model");
const Payment = require("../models/payment.model");
const Course = require("../models/course.model");

const getEnrolledCourses = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;

    const user = await User.findOne({ clerkUserId: clerkUserId }).populate(
      "enrolledCourses"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      enrolledCourses: user.enrolledCourses || [],
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// controllers/paymentController.js

const getUserPurchasedCourseDetail = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "paid" });

    const courseDetails = await Promise.all(
      payments.map(async (payment) => {
        try {
          const course = await Course.findById(payment.courseId);
          const user = await User.findOne({ clerkUserId: payment.userId });

          return {
            name: user?.name || "Signout user delete our acount",
            email: user?.email,
            totalcourse: user?.enrolledCourses.length,
            courseTitle: course?.courseTitle,
            coursePrice: course?.coursePrice,
            courseThumbnail: course?.courseThumbnail,
            paymentDetails: {
              amount: payment?.amount,
              method: payment?.paymentMethod,
              transactionId: payment?.transactionId,
              purchasedAt: payment?.createdAt,
            },
          };
        } catch (innerErr) {
          console.error("Error in mapping payment:", innerErr);
          return null;
        }
      })
    );

    // Filter out nulls
    const filteredCourseDetails = courseDetails.filter((item) => item !== null);

    res.status(200).json({
      success: true,
      data: filteredCourseDetails,
    });
  } catch (error) {
    console.error("Error fetching purchased course details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getEnrolledCourses, getUserPurchasedCourseDetail };
