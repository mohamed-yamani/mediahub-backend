import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  admin?: {
    id: string;
  };
}

// Verifies the JWT in the Authorization header and attaches the admin payload to the request.
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res
      .status(500)
      .json({ message: "JWT_SECRET is not configured on the server" });
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: string };
    req.admin = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

