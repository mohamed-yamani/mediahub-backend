import jwt from "jsonwebtoken";

// Generates a signed JWT for the admin user.
export const generateToken = (adminId: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }

  // The payload can be extended later (e.g., to include roles).
  return jwt.sign({ id: adminId }, secret, {
    expiresIn: "7d",
  });
};

