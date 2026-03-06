"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminCredentials = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Validates admin credentials against environment variables.
// This keeps admin management simple without storing admins in MongoDB.
const validateAdminCredentials = async (email, password) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
        throw new Error("Admin credentials are not configured. Please set ADMIN_EMAIL and ADMIN_PASSWORD or ADMIN_PASSWORD_HASH.");
    }
    if (email !== adminEmail) {
        return false;
    }
    // Support either plain text or a pre-hashed password.
    if (adminPasswordHash) {
        const match = await bcryptjs_1.default.compare(password, adminPasswordHash);
        return match;
    }
    return password === adminPassword;
};
exports.validateAdminCredentials = validateAdminCredentials;
