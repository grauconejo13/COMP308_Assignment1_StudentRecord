const Student = require('../models/Student');
//const generateToken = require('../utils/generateToken');

// Register a new student
exports.registerStudent = async(req, res) => {
    const { studentNumber, password, firstName, lastName, email } = req.body;
    try {
        const studentExists = await Student.findOne({ studentNumber });
        if (studentExists) return res.status(400).json({ message: "Student already exists" });

        const student = await Student.create({ studentNumber, password, firstName, lastName, email });
        res.status(201).json({
            _id: student._id,
            studentNumber: student.studentNumber,
            token: generateToken(student._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Authenticate a student
exports.loginStudent = async(req, res) => {
    const { studentNumber, password } = req.body;
    try {
        const student = await Student.findOne({ studentNumber });
        if (student && (await student.matchPassword(password))) {
            res.cookie('token', generateToken(student._id), {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
            });
            res.json({ studentNumber: student.studentNumber });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a list of all students
exports.getAllStudents = async(req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Additional CRUD operations: update, delete, etc.