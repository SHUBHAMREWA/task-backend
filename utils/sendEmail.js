import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Intern Dashboard" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #4f46e5;">Password Reset Request</h2>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <a href="${options.url}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
        <p>Or copy paste this link in your browser:</p>
        <p style="background-color: #f3f4f6; padding: 10px; word-break: break-all;">${options.url}</p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  console.log("Attempting to send email with user:", process.env.EMAIL_USER);
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully. MessageId:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw to be caught by controller
  }
};


export default sendEmail;
