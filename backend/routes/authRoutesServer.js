const express = require('express');
const { registerUser, loginUser } = require('../controllers/authControllerServer');
const router = express.Router();

// Registration route for both students and admins
router.post('/register', registerUser);

// Login route for both students and admins
router.post('/login', loginUser);

module.exports = router;


