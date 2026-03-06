"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
// Routes for category management. GET is public for mobile app; create/update/delete require auth.
const router = (0, express_1.Router)();
router.get("/", categoryController_1.getAllCategories);
router.post("/", authMiddleware_1.protect, categoryController_1.createCategoryHandler);
router.put("/:id", authMiddleware_1.protect, categoryController_1.updateCategoryHandler);
router.delete("/:id", authMiddleware_1.protect, categoryController_1.deleteCategoryHandler);
exports.default = router;
