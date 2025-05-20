const Subscribe = require("../models/subscrib.model");
const handleError = require("../services/handleErrors");

const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw handleError(400, "Email is required");
    }

    const existing = await Subscribe.findOne({ email });
    if (existing) {
      throw handleError(400, "Email is already subscribed");
    }

    const newSub = new Subscribe({ email });
    await newSub.save();

    res.status(201).json({ message: "Subscribed successfully", data: newSub });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Server error" });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscribe.find().sort({ createdAt: -1 });
    res.status(200).json({ count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addSubscriber, getAllSubscribers };
