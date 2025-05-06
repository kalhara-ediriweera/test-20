import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
