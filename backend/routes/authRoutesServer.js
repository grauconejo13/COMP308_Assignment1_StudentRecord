const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllerServer');
const multer = require('multer');
const upload = multer();  // Setup multer for handling multipart requests

// Login route for both students and admins
console.log(loginUser); 
router.post('/login', upload.none(), loginUser);

// Registration route for both students and admins
console.log(registerUser); 
router.post('/register', upload.none(), registerUser);

module.exports = router;
