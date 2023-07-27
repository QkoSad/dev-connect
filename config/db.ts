import mongoose from "mongoose";
import config from 'config'

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    if (typeof db === 'string')
      await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch (err: unknown) {
    if (typeof err === 'string')
      console.error(err)
    else if (err instanceof Error)
      console.error(err.message);
    process.exit(1);
  }
};

export default connectDB
