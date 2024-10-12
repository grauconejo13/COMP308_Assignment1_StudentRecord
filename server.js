const mongoose = require('mongoose'); // Import mongoose at the top
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const studentRoutesServer = require('./routes/studentRoutesServer');
const courseRoutesServer = require('./routes/courseRoutesServer');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/students', studentRoutesServer);
app.use('/api/courses', courseRoutesServer);

// Set strictQuery to true or false depending on your preference
mongoose.set('strictQuery', true);  //or 
//mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));