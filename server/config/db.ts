import mongoose from "mongoose";
// import config from "config";
const { MONGO_URL } = require("./config");

// const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    if (typeof MONGO_URL === "string") await mongoose.connect(MONGO_URL);

    console.log("MongoDB Connected...");
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) {
      console.error(err.message);
      console.log(MONGO_URL);
    }
    process.exit(1);
  }
};

export default connectDB;
