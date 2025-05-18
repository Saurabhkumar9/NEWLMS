const express = require("express");
const cors = require("cors");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const { courseRouter } = require("./src/routes/course.route");
const paymentRouter = require("./src/routes/payment.route");
const { clerkWebhooks } = require("./src/controllers/webhooks.controller");

const app = express();


app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(clerkMiddleware());


app.use(express.json());


app.get('/',  (req, res) => {
  res.json({ message: 'Backend run successfull.' });
});

app.post('/clerk', clerkWebhooks)

app.use('/v1/api', courseRouter);


// payment

app.use('/v1/api',paymentRouter)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = { app };
