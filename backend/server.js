const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const path = require('path');
const mongoose = require('mongoose'); // Import mongoose at the top
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./config/database');  // Import the database connection
const adminRoutesServer = require('./routes/adminRoutesServer');
const studentRoutesServer = require('./routes/studentRoutesServer');
const courseRoutesServer = require('./routes/courseRoutesServer');
const authRoutesServer = require('./routes/authRoutesServer');

const app = express();
     
// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB URI is not defined in environment variables.');
  process.exit(1);
}

connectDB();


app.use(express.json());


app.use('/api/admin', adminRoutesServer);  // Admin-specific routes
app.use('/api/students', studentRoutesServer);
app.use('/api/courses', courseRoutesServer);
app.use('/api/auth', authRoutesServer);

// Serve static files from the React frontend build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

// For any route that doesn't match an API route, serve the React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));

// Set strictQuery to true or false depending on your preference
mongoose.set('strictQuery', false);  //or 
//mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));