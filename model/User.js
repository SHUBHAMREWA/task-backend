import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },
  course: {
    type: String,
    default: "MERN Bootcamp"
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;
