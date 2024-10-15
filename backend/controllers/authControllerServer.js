const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Setup multer for handling multipart/form-data
const upload = multer();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
exports.registerUser = async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      username,
      email,
      password,
      userType,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user in the database
    await user.save();

    // Generate a JWT token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        userType: user.userType,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ 
      token, 
      user: { username: user.username, userType: user.userType } 
    });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & return token
// @access  Public
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a JWT token
    const payload = {
      user: {
        id: user.id,
        username: user.username, // Include username in JWT
        userType: user.userType,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ 
          token, 
          user: { username: user.username, userType: user.userType } 
        });
      }
    );

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Login failed' });
  }
};
