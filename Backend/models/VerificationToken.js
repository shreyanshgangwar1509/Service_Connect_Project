import mongoose from "mongoose";

const VerificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10000,
  },
});

const VerificationToken = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema
);
export default VerificationToken;
