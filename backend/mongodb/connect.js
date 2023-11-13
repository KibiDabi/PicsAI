import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    // Enforce stricter validation of query structures
    mongoose.set("strictQuery", true);

    // Connecting database
    await mongoose.connect(url);

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
