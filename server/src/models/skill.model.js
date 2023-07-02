import { model, Schema } from "mongoose";

const skillSchema = new Schema({
  data: {
    skillname: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      required: true,
      unique: false,
    },
    imageLogo: {
      type: String,
      required: true,
      unique: false,
    },
    onClickUrl: {
      type: String,
      required: false,
      unique: false,
    },
  },
});

export default model("Skill", skillSchema, "skills");
