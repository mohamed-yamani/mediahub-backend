"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Verifies the JWT in the Authorization header and attaches the admin payload to the request.
const protect = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.admin = { id: decoded.id };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Not authorized, token invalid" });
    }
};
exports.protect = protect;
