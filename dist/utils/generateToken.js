"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generates a signed JWT for the admin user.
const generateToken = (adminId) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not set in environment variables");
    }
    // The payload can be extended later (e.g., to include roles).
    return jsonwebtoken_1.default.sign({ id: adminId }, secret, {
        expiresIn: "7d",
    });
};
exports.generateToken = generateToken;
