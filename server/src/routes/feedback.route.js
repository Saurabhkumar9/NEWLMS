const express = require("express");
const feedbackRouter = express.Router();
const { requireAuth } = require("@clerk/express");

const {
  addFeedback,
  getAllFeedback,
} = require("../controllers/feedback.controller");

feedbackRouter.post("/add-feedback", requireAuth(), addFeedback);
feedbackRouter.get("/fetch-feed", getAllFeedback);

module.exports = feedbackRouter;
