"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: false,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: (value) => Array.isArray(value) && value.length > 0,
            message: "At least one image URL is required",
        },
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt.
});
exports.Post = (0, mongoose_1.model)("Post", PostSchema);
