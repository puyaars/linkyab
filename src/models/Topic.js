import { Schema, model } from "mongoose";

const TopicSchema = new Schema({
  title: String,
  description: String,
  pic: String,
});

const Topic = model("Topic", TopicSchema);

export default Topic