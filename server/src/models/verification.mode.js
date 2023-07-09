import { mopdel, Schema } from "mongoose";

const verificationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    unique: false,
  },
});

export default mopdel(
  "Verification",
  verificationSchema,
  "email verifications"
);
