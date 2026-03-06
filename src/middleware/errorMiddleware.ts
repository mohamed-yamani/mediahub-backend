import { NextFunction, Request, Response } from "express";

// Handles routes that are not found and returns a consistent 404 response.
export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
};

// Centralized error handler that formats and returns error responses.
// This should be the last middleware registered on the app.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Unhandled error:", err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};

