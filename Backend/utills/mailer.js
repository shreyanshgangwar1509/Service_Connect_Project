import nodemailer from "nodemailer";

export async function sendOtpEmail(recipientEmail, otp) {
  if (!recipientEmail) {
    throw new Error("Recipient email is required");
  }

  // Check environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing email credentials in environment variables");
    throw new Error("Email configuration error");
  }

  // Configure SMTP settings
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email service if different
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Your OTP for Email Verification",
    text: `Your OTP for verification is: ${otp}`,
    html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${recipientEmail}`);
    
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}
