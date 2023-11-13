import mongoose from "mongoose";

// 1. Define a schema
const Schema = mongoose.Schema;

const Post = new Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

// 2. Compile model from schema
const PostModel = mongoose.model('Post', Post);

export default PostModel;


