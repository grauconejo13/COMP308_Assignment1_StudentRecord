const mongoose = require('mongoose');

// Create a User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
     unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure each email is unique
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['student', 'admin'],  // Only allow 'student' or 'admin'
    default: 'student',          // Default to 'student'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
