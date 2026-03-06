"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
// Routes for category management. All are protected.
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.protect, categoryController_1.getAllCategories);
router.post("/", authMiddleware_1.protect, categoryController_1.createCategoryHandler);
router.put("/:id", authMiddleware_1.protect, categoryController_1.updateCategoryHandler);
router.delete("/:id", authMiddleware_1.protect, categoryController_1.deleteCategoryHandler);
exports.default = router;
