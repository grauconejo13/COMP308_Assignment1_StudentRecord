const express = require('express');
const { registerStudent, loginStudent, getAllStudents } = require('../controllers/studentControllerServer');
//const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
//router.get('/', protect, getAllStudents);

// Example: Get all students
router.get('/', (req, res) => {
  res.send('All students');
});

// Example: Add a new student
router.post('/add', (req, res) => {
  const newStudent = req.body;
  // Add logic to save the student to the database
  res.send('Student added successfully');
});

module.exports = router;