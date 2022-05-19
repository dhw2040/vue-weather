import mongoose from "mongoose";

var commentSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
