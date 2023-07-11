import { model, Schema } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
});

export default model("Contact", contactSchema, "contact requests");
