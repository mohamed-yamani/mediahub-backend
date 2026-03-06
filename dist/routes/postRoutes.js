"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
// Routes for post management. All are protected.
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.protect, postController_1.getPosts);
router.get("/:id", authMiddleware_1.protect, postController_1.getPostByIdHandler);
router.post("/", authMiddleware_1.protect, uploadMiddleware_1.upload.array("images", 10), postController_1.createPostHandler);
router.put("/:id", authMiddleware_1.protect, uploadMiddleware_1.upload.array("images", 10), postController_1.updatePostHandler);
router.delete("/:id", authMiddleware_1.protect, postController_1.deletePostHandler);
exports.default = router;
