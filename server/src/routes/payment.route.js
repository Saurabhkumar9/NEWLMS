const express = require('express');

const { requireAuth } = require("@clerk/express");
const { createCheckoutSession, verifyPaymentManually } = require('../controllers/payment.controller');
const paymentRouter = express.Router();



paymentRouter.post('/payment', requireAuth(),createCheckoutSession);
paymentRouter.get('/verify-payment/:sessionId', verifyPaymentManually);

module.exports = paymentRouter;