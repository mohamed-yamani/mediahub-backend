import { Router } from "express";
import {
  createPostHandler,
  deletePostHandler,
  getPostByIdHandler,
  getPosts,
  updatePostHandler,
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

// Routes for post management. GET is public for mobile app; create/update/delete require auth.
const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostByIdHandler);
router.post("/", protect, upload.array("images", 10), createPostHandler);
router.put("/:id", protect, upload.array("images", 10), updatePostHandler);
router.delete("/:id", protect, deletePostHandler);

export default router;

