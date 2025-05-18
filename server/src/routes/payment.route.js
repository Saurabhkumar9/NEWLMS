const express = require('express');
const { createCheckoutSession } = require('../controllers/payment.controller');
const paymentRouter = express.Router();



// Protected routes
paymentRouter.post('/create-payment-intent', createCheckoutSession );
// paymentRouter.get('/:paymentId',  paymentController.getPaymentDetails);

// Webhook (no auth needed - handled by Stripe)
// paymentRouter.post('/webhook', express.raw({type: 'application/json'}), paymentController.stripeWebhook);

module.exports = paymentRouter;