"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
// Handles routes that are not found and returns a consistent 404 response.
const notFound = (req, res, _next) => {
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`,
    });
};
exports.notFound = notFound;
// Centralized error handler that formats and returns error responses.
// This should be the last middleware registered on the app.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal server error",
    });
};
exports.errorHandler = errorHandler;
