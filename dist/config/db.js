"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Establishes a MongoDB connection using the connection string from the environment.
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        // Throwing here fails fast in case the environment is misconfigured.
        throw new Error("MONGODB_URI is not set in the environment variables");
    }
    try {
        await mongoose_1.default.connect(uri);
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        console.error("❌ MongoDB connection error", error);
        // Exit the process so container platforms can restart the service.
        process.exit(1);
    }
};
exports.connectDB = connectDB;
