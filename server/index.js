// load env variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const { courseRouter } = require("./src/routes/course.route");
const paymentRouter = require("./src/routes/payment.route");
const { clerkWebhooks } = require("./src/controllers/webhooks.controller");
const connection = require("./src/db/db");
const subscibeRouter = require("./src/routes/subscribe.route");
const feedbackRouter = require("./src/routes/feedback.route");

const app = express();

// CORS setup
app.use(
  cors({
    origin: "*",       
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(clerkMiddleware());

// JSON parsing middleware
app.use(express.json());

// Basic route to test server
app.get("/", (req, res) => {
  res.json({ message: "Backend run successful." });
});

// Clerk webhook route
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);


// API routes
app.use("/v1/api", courseRouter);

// payment
app.use("/v1/api", paymentRouter);

app.use('/v1/api', subscibeRouter)


app.use('/v1/api', feedbackRouter)


// Error handling middleware




app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect to MongoDB and start server
connection()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!!", err);
  });
