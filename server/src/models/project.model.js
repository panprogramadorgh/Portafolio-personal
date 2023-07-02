import { model, Schema } from "mongoose";

const projectSchema = new Schema({
  data: {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
});

export default model('Project', projectSchema, 'projects');
