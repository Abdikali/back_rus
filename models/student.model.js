const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const validator = require('validator');

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate:{
      validator: email => validator.isEmail(email)
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, {timestamps: true});

const Student = model("Student", studentSchema);

module.exports = Student;
