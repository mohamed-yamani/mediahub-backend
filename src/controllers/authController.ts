import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { validateAdminCredentials } from "../services/authService";
import { generateToken } from "../utils/generateToken";

// Handles admin login and returns a JWT on successful authentication.
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const isValid = await validateAdminCredentials(email, password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // For this simple setup we use the email as the admin identifier.
  const token = generateToken(email);

  res.json({
    token,
  });
});

