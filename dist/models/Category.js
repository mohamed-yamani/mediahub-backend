"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    icon: {
        type: String,
        required: false,
        trim: true,
    },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt.
});
exports.Category = (0, mongoose_1.model)("Category", CategorySchema);
