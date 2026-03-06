import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { configureCloudinary } from "./config/cloudinary";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import postRoutes from "./routes/postRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

// Load environment variables as early as possible.
dotenv.config();

const app = express();

// Core middlewares for security, logging, and JSON body parsing.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Simple root endpoint and health check used by browsers and monitoring tools.
app.get("/", (_req, res) => {
  res.json({ message: "MediaHub API running" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount feature routes under a common API prefix.
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/posts", postRoutes);

// Global 404 and error handlers should be registered last.
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Bootstrap function that connects to MongoDB, configures Cloudinary,
// and starts the HTTP server.
const startServer = async () => {
  await connectDB();
  configureCloudinary();

  app.listen(PORT, () => {
    console.log(`🚀 MediaHub API running on port ${PORT}`);
  });
};

// Only start the server when this file is executed directly.
startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});

