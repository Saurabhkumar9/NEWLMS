const express = require('express');

const { requireAuth } = require("@clerk/express");
const { createCheckoutSession, verifyPaymentManually } = require('../controllers/payment.controller');
const { getEnrolledCourses, getUserPurchasedCourseDetail } = require('../controllers/enroll.controller');
const paymentRouter = express.Router();



paymentRouter.post('/payment', requireAuth(),createCheckoutSession);
paymentRouter.get('/verify-payment/:sessionId', verifyPaymentManually);

// by course
paymentRouter.get('/enrolled-courses', requireAuth(),getEnrolledCourses)
paymentRouter.get("/all-payments", getUserPurchasedCourseDetail);

module.exports = paymentRouter;