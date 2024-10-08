const express = require('express');
const { registerStudent, loginStudent, getAllStudents } = require('../controllers/studentControllerServer');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/', protect, getAllStudents);

module.exports = router;