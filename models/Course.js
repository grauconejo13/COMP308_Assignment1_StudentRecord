const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    section: { type: String, required: true },
    semester: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Course', courseSchema);