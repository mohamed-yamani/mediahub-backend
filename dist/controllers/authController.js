"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authService_1 = require("../services/authService");
const generateToken_1 = require("../utils/generateToken");
// Handles admin login and returns a JWT on successful authentication.
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    const isValid = await (0, authService_1.validateAdminCredentials)(email, password);
    if (!isValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    // For this simple setup we use the email as the admin identifier.
    const token = (0, generateToken_1.generateToken)(email);
    res.json({
        token,
    });
});
