const Stripe = require("stripe");
const Payment = require("../models/payment.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.auth.userId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Create Stripe Checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: course.courseTitle,
              description: course.courseDescription?.substring(0, 200),
              images: [course.courseThumbnail || ""],
            },
            unit_amount: Math.round(course.coursePrice * 100), // Amount in paisa
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
    });

   

    res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      transactionId: session.id, 
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Checkout session creation failed",
    });
  }
};


const verifyPaymentManually = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    const session = await stripeInstance.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "payment_intent.last_payment_error"],
    });

    console.log(session)
    switch (session.payment_status) {
      case "paid":
       
        const existingPayment = await Payment.findOne({ orderId: session.id });
        if (existingPayment) {
          return res.status(200).json({
            success: true,
            status: "already_processed",
            message: `Payment was ${session.status}`,
            payment: existingPayment,
          });
        }

        
        const payment = await Payment.create({
          amount: session.amount_total / 100 ,
          status: session.payment_status,
          orderId: session.id,
          transactionId: session.payment_intent?.id,
          paymentMethod: session.payment_method_types?.[0],
          courseId: session.metadata?.courseId,
          userId: session.metadata?.userId,
         
        });

        
        const userData = await User.findOne({ clerkUserId: session.metadata?.userId });

        if (userData && session.metadata?.courseId) {
          // Avoid duplicate enrollment
          const courseId = session.metadata.courseId;
          if (!userData.enrolledCourses.includes(courseId)) {
            userData.enrolledCourses.push(courseId);
            await userData.save({ validateBeforeSave: false });
          }
        }

        return res.status(200).json({
          success: true,
          status: "success",
          message: "Payment verified and course enrolled successfully",
          payment,
        });

      case "unpaid":
        const failureReason =
          session.payment_intent?.last_payment_error?.message || "Payment failed";

        return res.status(402).json({
          success: false,
          status: session.payment_status,
          message: "Payment failed",
          reason: failureReason,
          payment_intent: session.payment_intent,
        });

      case "no_payment_required":
        return res.status(400).json({
          success: false,
          status: "invalid",
          message: "This session does not require payment",
        });

      default:
        return res.status(400).json({
          success: false,
          status: "unknown",
          message: "Payment status is unknown or pending",
        });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      status: "verification_error",
      message: error.message || "Internal Server Error during payment verification",
    });
  }
};



module.exports = {
  createCheckoutSession,
  verifyPaymentManually,
};
