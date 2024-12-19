import VerificationToken from "../models/VerificationToken.js";
import { sendOtpEmail } from "./mailer.js";

export default async function sendVerificationEmail(req, email) {
  try {
    // Check for existing verification token and delete it
    const existingToken = await VerificationToken.findOne({ email });
    if (existingToken) {
      await existingToken.deleteOne(); // Await the deletion
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create a new verification token
    
    const newToken = new VerificationToken({
      email: email,
      token: otp,
    });
    await newToken.save(); // Save the new token to the database

    // Store the OTP and email in the session
    // req.session.otp = otp; // Store the OTP in session
    // req.session.email = email; // Store the email in session
    // req.session.expiration = Date.now() + 5 * 60 * 1000; // 5 minutes expiration

    // Send OTP email
    await sendOtpEmail(email, otp);
    console.log(`OTP ${otp} sent to ${email}`); // Log for debugging
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error); // Log error for debugging
    throw new Error("Failed to send verification email"); // Throw an error to be handled in the calling function
  }
}
