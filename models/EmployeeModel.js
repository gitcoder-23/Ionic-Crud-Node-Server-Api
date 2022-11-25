/* eslint-disable no-undef */
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      // unique: true,
    },
    phone: {
      type: String,
    },
    picture: {
      type: String,
    },
    salary: {
      type: String,
    },
    position: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('employee', EmployeeSchema);
