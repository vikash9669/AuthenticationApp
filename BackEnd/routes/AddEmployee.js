// const express = require("express");
// const bcrypt = require("bcryptjs");
// const Employee = require("../models/Employee");
// const router = express.Router();
// const { uploadFile } = require("../middleware/upload");

// // Register Employee
// const Avatar = uploadFile("uploads", ["image/png", "image/jpg", "image/jpeg"]);

// router.post("/add-employee", Avatar, async (req, res) => {
//   const { email, phone, name, password } = req.body;

//   try {
//     let employee = await Employee.findOne({ email });
//     if (employee) {
//       return res.status(400).json({ msg: "Employee already exists" });
//     }

//     const imgUrl = req.file ? `http://localhost:5000/${req.file.path}` : '';

//     employee = new Employee({
//       email,
//       name,
//       phone,
//       password,
//       imgUrl
//     });

//     const salt = await bcrypt.genSalt(10);
//     employee.password = await bcrypt.hash(password, salt);
//     await employee.save();

//     return res.status(200).json({ id: employee.id, msg: "Employee registered successfully" });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send("Server error");
//   }
// });

// module.exports = router;
