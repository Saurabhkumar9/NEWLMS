const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    status: {
      type: String,
      
      default: 'pending',
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course ID is required'],
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    capturedAt: {
      type: Date,
    },
    userId:{
      type:String
    },
    transactionId:{
      type:String
    },
    paymentMethod:{
      type:String
    }
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
