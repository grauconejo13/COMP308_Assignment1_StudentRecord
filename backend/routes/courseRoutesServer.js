const express = require('express');
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseStudents
} = require('../controllers/courseControllerServer');

const router = express.Router();

// Course CRUD routes
router.post('/', createCourse); // Add a course
router.get('/', getAllCourses); // List all courses
router.put('/:id', updateCourse); // Update course
router.delete('/:id', deleteCourse); // Delete course
router.get('/:id/students', getCourseStudents); // Get students in a course

module.exports = router;
