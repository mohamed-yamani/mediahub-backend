"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const Category_1 = require("../models/Category");
// Returns all categories sorted by creation date (newest first).
const getCategories = async () => {
    return Category_1.Category.find().sort({ createdAt: -1 });
};
exports.getCategories = getCategories;
// Creates a new category document.
const createCategory = async (data) => {
    const category = new Category_1.Category(data);
    return category.save();
};
exports.createCategory = createCategory;
// Updates an existing category document by id.
const updateCategory = async (id, data) => {
    return Category_1.Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};
exports.updateCategory = updateCategory;
// Deletes a category by id.
const deleteCategory = async (id) => {
    return Category_1.Category.findByIdAndDelete(id);
};
exports.deleteCategory = deleteCategory;
