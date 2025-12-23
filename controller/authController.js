
import User from "../model/User.js";
import mongoose from "mongoose";
import genToken from "../utils/genToken.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";

// signup Controller
export const signUp = async (req, res) => {
  const { name, email, password, role, course } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are Required"
    });
  }

  if (validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    console.log("✅ Strong password");
  } else {
    return res.status(400).json({
      message: "Weak password. Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol",
      success: false
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Invalid Email",
      success: false
    });
  }

  let isEmailExits = await User.findOne({ email: email });

  if (isEmailExits) {
    return res.status(409).json({
      success: false,
      message: "User Email Already Exists"
    });
  }

  let hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role,
    course: course || "MERN Bootcamp"
  });

  if (!user) {
    return res.status(400).json({
      message: "User not created",
      success: false
    });
  }

  const token = await genToken({
    userId: user._id,
  });

  console.log("Token generated:", token);

  res.cookie("Logintoken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      course: user.course,
      enrollmentDate: user.enrollmentDate
    }
  });
};

// login controller 
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are Required",
      success: false
    });
  }

  let user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    return res.status(401).json({
      message: "User not Found",
      success: false
    });
  }

  if (user.password === null) {
    return res.status(401).json({
      message: "Password is Not Set",
      success: false
    });
  }

  let isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(401).json({
      message: "Incorrect Password",
      success: false
    });
  }

  const token = await genToken({
    userId: user._id,
  });

  console.log("Token generated:", token);

  res.cookie("Logintoken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    success: true,
    message: "Successfully Login",
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      course: user.course,
      enrollmentDate: user.enrollmentDate
    }
  });
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire time (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Create reset url
    // NOTE: In production, change localhost:5173 to your frontend domain
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    console.log("------------------------------------------");
    console.log("🔑 PASSWORD RESET LINK (Simulated Email):");
    console.log(resetUrl);
    console.log("------------------------------------------");

    // Since we don't have email setup, we just return success
    // In real app, send email here
    
    res.status(200).json({
      success: true,
      message: "Email sent (Check server console for link)"
    });

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(500).json({ success: false, message: "Email could not be sent" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Hash token to verify
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Set new password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Password (Authenticated)
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.userId).select('+password');

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect current password" });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
