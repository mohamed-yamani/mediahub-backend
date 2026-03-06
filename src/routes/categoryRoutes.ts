import { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getAllCategories,
  updateCategoryHandler,
} from "../controllers/categoryController";
import { protect } from "../middleware/authMiddleware";

// Routes for category management. GET is public for mobile app; create/update/delete require auth.
const router = Router();

router.get("/", getAllCategories);
router.post("/", protect, createCategoryHandler);
router.put("/:id", protect, updateCategoryHandler);
router.delete("/:id", protect, deleteCategoryHandler);

export default router;

