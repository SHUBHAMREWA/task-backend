import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const testEmail = async () => {
  console.log("Testing Email Config...");
  console.log("User:", process.env.EMAIL_USER);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("❌ Missing EMAIL_USER or EMAIL_PASS in .env file");
      return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // ensure this is App Password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self
      subject: "Test Email from Node",
      text: "If you see this, your email config is working!",
    });
    console.log("✅ Success! Email sent. ID:", info.messageId);
  } catch (err) {
    console.error("❌ Failed:", err.message);
    if (err.code === 'EAUTH') {
        console.log("\n");
        console.log("⚠️  AUTHENTICATION ERROR DETECTED");
        console.log("1. Check if EMAIL_USER is exactly your gmail address.");
        console.log("2. Check if EMAIL_PASS is an 'App Password'.");
        console.log("   --> You CANNOT use your normal Gmail password.");
        console.log("   --> Generate one here: https://myaccount.google.com/apppasswords");
    }
  }
};

testEmail();
