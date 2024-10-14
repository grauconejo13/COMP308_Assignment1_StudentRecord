const express = require('express');
const {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentCourses
} = require('../controllers/studentControllerServer');

const router = express.Router();

// Student CRUD routes
router.post('/', createStudent); // Add student
router.get('/', getAllStudents); // List all students
router.put('/:id', updateStudent); // Update student
router.delete('/:id', deleteStudent); // Delete student
router.get('/:id/courses', getStudentCourses); // Get student's courses

module.exports = router;
