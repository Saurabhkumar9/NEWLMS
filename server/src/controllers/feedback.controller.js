const Feedback = require('../models/feedback.model');
const User =require('../models/user.model')
const handleError = require("../services/handleErrors");

const addFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const clerkUserId=req.auth.userId

    
    if (!message || !clerkUserId) {
      return res.status(400).json({ message: "Message and  User ID are required to login." });
    }

    // Find the actual User using Clerk ID
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const feedback = new Feedback({
      message,
      userId: user._id,  // Store actual MongoDB _id
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted', data: feedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).populate(
      "userId",  'name email imageUrl '
    );
;
    res.status(200).json({ count: feedbacks.length, data: feedbacks });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { addFeedback, getAllFeedback };
