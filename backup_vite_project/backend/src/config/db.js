import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Assuming local MongoDB or passed via environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kridha-store');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
