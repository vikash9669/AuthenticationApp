const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamp: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = mongoose.model("Employee", EmployeeSchema);
