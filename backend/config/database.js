const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error('MongoDB URI is not defined in the environment variables');
    process.exit(1);  // Exit the process if URI is missing
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);  // Exit the process with failure
  }
};

module.exports = connectDB;
