import { model, Schema } from "mongoose";

const verificationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: Number,
    required: true,
  },
});

export default model("Verification", verificationSchema, "email verifications");
