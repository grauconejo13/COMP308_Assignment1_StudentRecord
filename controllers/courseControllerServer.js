const Course = require('../models/Course');
const Student = require('../models/Student');

// Add a course
exports.addCourse = async(req, res) => {
    const { courseCode, courseName, section, semester } = req.body;
    try {
        const courseExists = await Course.findOne({ courseCode });
        if (courseExists) return res.status(400).json({ message: "Course already exists" });

        const course = await Course.create({ courseCode, courseName, section, semester });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// List all courses
exports.getAllCourses = async(req, res) => {
    try {
        const courses = await Course.find().populate('students', 'firstName lastName');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Enroll a student in a course
exports.enrollStudent = async(req, res) => {
    const { studentId, courseId } = req.body;
    try {
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) return res.status(404).json({ message: 'Student or course not found' });

        course.students.push(student);
        await course.save();
        res.json({ message: 'Student enrolled in course' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};