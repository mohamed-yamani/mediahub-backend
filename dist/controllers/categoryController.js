"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.createCategoryHandler = exports.getAllCategories = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const categoryService_1 = require("../services/categoryService");
// Returns the full list of categories.
exports.getAllCategories = (0, express_async_handler_1.default)(async (_req, res) => {
    const categories = await (0, categoryService_1.getCategories)();
    res.json(categories);
});
// Creates a new category.
exports.createCategoryHandler = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, icon } = req.body;
    if (!name) {
        res.status(400).json({ message: "Name is required" });
        return;
    }
    const category = await (0, categoryService_1.createCategory)({ name, icon });
    res.status(201).json(category);
});
// Updates an existing category by id.
exports.updateCategoryHandler = (0, express_async_handler_1.default)(async (req, res) => {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const { name, icon } = req.body;
    const updated = await (0, categoryService_1.updateCategory)(id, { name, icon });
    if (!updated) {
        res.status(404).json({ message: "Category not found" });
        return;
    }
    res.json(updated);
});
// Deletes a category by id.
exports.deleteCategoryHandler = (0, express_async_handler_1.default)(async (req, res) => {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const deleted = await (0, categoryService_1.deleteCategory)(id);
    if (!deleted) {
        res.status(404).json({ message: "Category not found" });
        return;
    }
    res.status(204).send();
});
