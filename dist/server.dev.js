"use strict";

var express = require('express');

var dotenv = require('dotenv');

var cookieParser = require('cookie-parser');

var connectDB = require('./config/database');

var studentRoutes = require('./routes/studentRoutesServer');

var courseRoutes = require('./routes/courseRoutesServer');

dotenv.config();
connectDB();
var app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/students', studentRoutesServer);
app.use('/api/courses', courseRoutesServer);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
