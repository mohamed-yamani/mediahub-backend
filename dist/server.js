"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const cloudinary_1 = require("./config/cloudinary");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// Load environment variables as early as possible.
dotenv_1.default.config();
const app = (0, express_1.default)();
// Core middlewares for security, logging, and JSON body parsing.
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
// Simple root endpoint and health check used by browsers and monitoring tools.
app.get("/", (_req, res) => {
    res.json({ message: "MediaHub API running" });
});
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// Mount feature routes under a common API prefix.
app.use("/auth", authRoutes_1.default);
app.use("/categories", categoryRoutes_1.default);
app.use("/posts", postRoutes_1.default);
// Global 404 and error handlers should be registered last.
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
// Bootstrap function that connects to MongoDB, configures Cloudinary,
// and starts the HTTP server.
const startServer = async () => {
    await (0, db_1.connectDB)();
    (0, cloudinary_1.configureCloudinary)();
    app.listen(PORT, () => {
        console.log(`🚀 MediaHub API running on port ${PORT}`);
    });
};
// Only start the server when this file is executed directly.
startServer().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
});
