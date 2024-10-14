
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration logic for both admin and student
exports.registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, role, studentNumber, program } = req.body;

  try {
    // Check if the user already exists based on email
    let user;
    if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else if (role === 'student') {
      user = await Student.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new instance based on the role
    if (role === 'admin') {
      user = new Admin({ username, email, password, firstName, lastName });
    } else if (role === 'student') {
      user = new Student({ studentNumber, username, email, password, firstName, lastName, program });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the new user in the database
    await user.save();

    // Generate JWT token
    const payload = {
      userId: user._id,
      role: role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login logic for both admin and student
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user exists based on the role
    let user;
    if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else if (role === 'student') {
      user = await Student.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      userId: user._id,
      role: role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




/*const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Student login
exports.login = async (req, res) => {
  const { studentNumber, password } = req.body;
  const student = await Student.findOne({ studentNumber });
  if (!student) return res.status(400).json({ error: 'Invalid credentials' });
  
  const validPassword = await bcrypt.compare(password, student.password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
  
  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true }).json({ success: true });
};*/
