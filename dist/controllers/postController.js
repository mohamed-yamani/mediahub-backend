"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.updatePostHandler = exports.createPostHandler = exports.getPostByIdHandler = exports.getPosts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const postService_1 = require("../services/postService");
const cloudinaryUpload_1 = require("../utils/cloudinaryUpload");
// Lists posts with optional pagination and category filtering.
exports.getPosts = (0, express_async_handler_1.default)(async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const categoryId = req.query.category
        ? String(req.query.category)
        : undefined;
    const result = await (0, postService_1.listPosts)({ page, limit, categoryId });
    res.json(result);
});
// Retrieves a single post by id.
exports.getPostByIdHandler = (0, express_async_handler_1.default)(async (req, res) => {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const post = await (0, postService_1.getPostById)(id);
    if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
    }
    res.json(post);
});
// Creates a new post with one or more images uploaded to Cloudinary.
exports.createPostHandler = (0, express_async_handler_1.default)(async (req, res) => {
    const { text, category } = req.body;
    if (!category) {
        res.status(400).json({ message: "Category is required" });
        return;
    }
    const files = (req.files || []);
    if (!files.length) {
        res.status(400).json({ message: "At least one image is required" });
        return;
    }
    const imageUrls = await (0, cloudinaryUpload_1.uploadImagesToCloudinary)(files);
    const post = await (0, postService_1.createPost)({
        text,
        category,
        images: imageUrls,
    });
    res.status(201).json(post);
});
// Updates an existing post and optionally replaces its images.
exports.updatePostHandler = (0, express_async_handler_1.default)(async (req, res) => {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const { text, category } = req.body;
    const files = (req.files || []);
    let imageUrls;
    if (files.length) {
        imageUrls = await (0, cloudinaryUpload_1.uploadImagesToCloudinary)(files);
    }
    const updated = await (0, postService_1.updatePost)(id, {
        text,
        category,
        images: imageUrls,
    });
    if (!updated) {
        res.status(404).json({ message: "Post not found" });
        return;
    }
    res.json(updated);
});
// Deletes a post by id.
exports.deletePostHandler = (0, express_async_handler_1.default)(async (req, res) => {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const deleted = await (0, postService_1.deletePost)(id);
    if (!deleted) {
        res.status(404).json({ message: "Post not found" });
        return;
    }
    res.status(204).send();
});
