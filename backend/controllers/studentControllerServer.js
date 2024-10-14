const Student = require('../models/Student');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
//const generateToken = require('../utils/generateToken');

//--------------------------------------------------------------------
// @desc    Add a new student
// @route   POST /api/students
// @access  Admin
exports.createStudent = async (req, res) => {
  const {
    studentNumber,
    password,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    email,
    program,
    favoriteTopic,
    strongestSkill
  } = req.body;

  try {
    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = new Student({
      studentNumber,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      city,
      phoneNumber,
      email,
      program,
      favoriteTopic,
      strongestSkill
    });

    await student.save();
    res.status(201).json({ message: 'Student created successfully!', student });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
//--------------------------------------------------------------------
// @desc    Update student details
// @route   PUT /api/students/:id
// @access  Admin
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', updatedStudent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

//--------------------------------------------------------------------
// @desc    Delete a student record
// @route   DELETE /api/students/:id
// @access  Admin
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.remove();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Admin
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

//--------------------------------------------------------------------
// @desc    Get all courses for a specific student
// @route   GET /api/students/:id/courses
// @access  Student/Admin
exports.getStudentCourses = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id).populate('courses');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const courses = await Course.find({ students: student._id });
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
