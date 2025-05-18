const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment.model');
const Course = require('../models/course.model');

// Create Stripe Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;
   

    // Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: course.courseTitle,
            description: course.courseDescription.substring(0, 200),
            images: [course.courseThumbnail],
          },
          unit_amount: course.coursePrice * 100, // Amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        courseId: courseId.toString(),
       
      },
    });

    // Create payment record in database
    const payment = await Payment.create({
      amount: course.coursePrice,
      status: 'pending',
      courseId,
      orderId: session.id,
      
    });

    res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      paymentId: payment._id
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Checkout session creation failed'
    });
  }
};

// Webhook for payment confirmation
const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Update payment status in database
      await Payment.findOneAndUpdate(
        { orderId: session.id },
        { 
          status: 'completed',
          capturedAt: new Date()
        }
      );

      // Here you would typically also enroll the user in the course
      // await Enrollment.create({
      //   userId: session.metadata.userId,
      //   courseId: session.metadata.courseId
      // });

    } catch (err) {
      console.error('Database update error:', err);
    }
  }

  res.status(200).json({ received: true });
};

module.exports = {
  createCheckoutSession,
  stripeWebhook
};