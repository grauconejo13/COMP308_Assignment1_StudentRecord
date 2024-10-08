"use strict";

var express = require('express');

var _require = require('../controllers/studentControllerServer'),
    registerStudent = _require.registerStudent,
    loginStudent = _require.loginStudent,
    getAllStudents = _require.getAllStudents;

var _require2 = require('../middleware/authMiddleware'),
    protect = _require2.protect;

var router = express.Router();
router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/', protect, getAllStudents);
module.exports = router;
//# sourceMappingURL=courseRoutesServer.dev.js.map
