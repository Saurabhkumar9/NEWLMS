const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('Subscribe', subscribeSchema);
