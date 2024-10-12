const express = require('express');
const { registerStudent, loginStudent, getAllStudents } = require('../controllers/studentControllerServer');
//const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
//router.get('/', protect, getAllStudents);

// Example: Get all courses
router.get('/', (req, res) => {
  res.send('All courses');
});

// Example: Add a new course
router.post('/add', (req, res) => {
  const newCourse = req.body;
  // Add logic to save the course to the database
  res.send('Course added successfully');
});

module.exports = router;