import bcrypt from "bcryptjs";

// Validates admin credentials against environment variables.
// This keeps admin management simple without storing admins in MongoDB.
export const validateAdminCredentials = async (
  email: string,
  password: string
) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
    throw new Error(
      "Admin credentials are not configured. Please set ADMIN_EMAIL and ADMIN_PASSWORD or ADMIN_PASSWORD_HASH."
    );
  }

  if (email !== adminEmail) {
    return false;
  }

  // Support either plain text or a pre-hashed password.
  if (adminPasswordHash) {
    const match = await bcrypt.compare(password, adminPasswordHash);
    return match;
  }

  return password === adminPassword;
};

