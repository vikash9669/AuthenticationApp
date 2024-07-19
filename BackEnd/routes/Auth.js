const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const { uploadFile } = require("../middleware/upload");

const Avatar = uploadFile("uploads", [
  "image/png",
  "image/jpg",
  "image/jpeg",
]);

//hello

const dotenv = require("dotenv");
dotenv.config();

// Register
router.post("/register", async (req, res) => {
  const { email, phone, name, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      email,
      name,
      phone,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token, id: user.id, msg: "User registered successfully" });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, id: user.id, msg: "Login successful" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Protected route example
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update avatar
router.put("/update-avatar", Avatar, async (req, res) => {
  const { userId } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) {
      console.log(user)
      return res.status(404).json({ msg: "User not found" });
    }

    if (req.file) {
      user.imgUrl = `${process.env.ASSEST_URL}/${req.file.path}`;
      console.log(user.imgUrl,req.file.path,"++++++++++++++++++++++++++++")
      await user.save();
      return res.status(200).json({ imgUrl: user.imgUrl, msg: "Profile updated successfully" });
    } else {
      return res.status(400).json({ msg: "No file selected" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Update profile
router.patch("/update-profile/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    let updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ user: updatedUser, msg: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

  
});


// Change password
router.put("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// add employee
router.post("/add-employee", Avatar, async (req, res) => {
  const { email, phone, name, password } = req.body;

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ msg: "Employee already exists" });
    }

    const imgUrl = req.file ? `${process.env.ASSEST_URL}/${req.file.path}` : '';

    employee = new Employee({
      email,
      name,
      phone,
      password,
      imgUrl
    });

    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(password, salt);
    await employee.save();

    return res.status(200).json({ employee, id: employee.id, msg: "Employee registered successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find().select("-password");
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;
