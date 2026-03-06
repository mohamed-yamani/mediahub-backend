import { Router } from "express";
import { login } from "../controllers/authController";

// Routes related to admin authentication.
const router = Router();

router.post("/login", login);

export default router;

