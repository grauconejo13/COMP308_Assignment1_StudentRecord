"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var courseSchema = new Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});
var Course = mongoose.model('Course', courseSchema);
module.exports = Course;
//# sourceMappingURL=course-model.dev.js.map
