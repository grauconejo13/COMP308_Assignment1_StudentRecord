"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var studentSchema = new Schema({
  studentNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  favoriteTopic: {
    type: String,
    required: false
  },
  strongestSkill: {
    type: String,
    required: false
  }
});
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
//# sourceMappingURL=student-model.dev.js.map
