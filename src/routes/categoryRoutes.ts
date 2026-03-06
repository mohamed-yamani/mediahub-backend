import { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getAllCategories,
  updateCategoryHandler,
} from "../controllers/categoryController";
import { protect } from "../middleware/authMiddleware";

// Routes for category management. All are protected.
const router = Router();

router.get("/", protect, getAllCategories);
router.post("/", protect, createCategoryHandler);
router.put("/:id", protect, updateCategoryHandler);
router.delete("/:id", protect, deleteCategoryHandler);

export default router;

