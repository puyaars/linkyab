import { Schema, model } from "mongoose";

const linkSchema = new Schema({
  adress: String,
  title: String,
  username: String,
  extra: String,
  description: String,
  pic: String,
  topic: { type: Schema.Types.ObjectId, ref: "Topic" },
  type: String,
  members: Number,
  clicks: {
    type: Number,
    default: 0,
  },
});

linkSchema.index(
  { description: "text", username: "text", title: "text" },
  { default_language: "none" }
);

const Link = model("Link", linkSchema);

export default Link;
