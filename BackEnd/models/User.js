const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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

const User = mongoose.model("User", UserSchema);

module.exports = mongoose.model("User", UserSchema);
