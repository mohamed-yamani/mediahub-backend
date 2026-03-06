import mongoose from "mongoose";

// Establishes a MongoDB connection using the connection string from the environment.
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    // Throwing here fails fast in case the environment is misconfigured.
    throw new Error("MONGODB_URI is not set in the environment variables");
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
    // Exit the process so container platforms can restart the service.
    process.exit(1);
  }
};

