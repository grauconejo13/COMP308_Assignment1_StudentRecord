const Course = require('../models/Course');
const Student = require('../models/Student');

//-----------------------------------------------------------------
// @desc    Add a new course
// @route   POST /api/courses
// @access  Admin
exports.createCourse = async (req, res) => {
  const { courseCode, courseName, section, semester } = req.body;

  try {
    const course = new Course({
      courseCode,
      courseName,
      section,
      semester,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully!', course });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
//-----------------------------------------------------------------------
// @desc    Update course details
// @route   PUT /api/courses/:id
// @access  Admin
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course updated successfully', updatedCourse });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
//------------------------------------------------------------------------------
// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Admin
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

//-----------------------------------------------------------------------------------
// @desc    Get all courses
// @route   GET /api/courses
// @access  Public/Admin
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

//----------------------------------------------------------------------------------
// @desc    Get all students enrolled in a specific course
// @route   GET /api/courses/:id/students
// @access  Admin
exports.getCourseStudents = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the course by ID and populate the students field
    const course = await Course.findById(id).populate('students');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course.students);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
