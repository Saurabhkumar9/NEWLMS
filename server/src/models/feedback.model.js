const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 24 * 60 * 60  
  },
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
}, {
  versionKey: false
});

module.exports = mongoose.model('Feedback', feedbackSchema);
