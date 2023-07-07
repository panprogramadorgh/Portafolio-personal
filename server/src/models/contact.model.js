import { model, Schema } from "mongoose";

const contactSchema = new Schema({
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

export default model("Contact", contactSchema, "contact requests");
