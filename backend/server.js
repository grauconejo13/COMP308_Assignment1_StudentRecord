const mongoose = require('mongoose'); // Import mongoose at the top
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const cors = require('cors');
const path = require('path');
const express = require('express');

const cookieParser = require('cookie-parser');
const compression = require('compression');  // Import compression middleware
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

const http = require('http');

// Apply compression middleware to reduce response size
app.use(compression());

app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));

app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000',  // Set the correct frontend URL
  credentials: true
}));

app.use(express.json());

app.use('/api/admin', adminRoutesServer);  // Admin-specific routes
app.use('/api/students', studentRoutesServer);
app.use('/api/courses', courseRoutesServer);
app.use('/api/auth', authRoutesServer);

// Set strictQuery to true or false depending on your preference
mongoose.set('strictQuery', true);  //or 
//mongoose.set('strictQuery', false);

// Create HTTP server with custom maxHeaderSize
const server = http.createServer({ maxHeaderSize: 16384 }, app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));