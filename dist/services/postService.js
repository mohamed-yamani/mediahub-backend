"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.listPosts = void 0;
const Post_1 = require("../models/Post");
// Retrieves posts with optional pagination and category filtering.
const listPosts = async ({ page = 1, limit = 10, categoryId, }) => {
    const query = {};
    if (categoryId) {
        query.category = categoryId;
    }
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
        Post_1.Post.find(query)
            .populate("category")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Post_1.Post.countDocuments(query),
    ]);
    const pages = Math.ceil(total / limit) || 1;
    return {
        posts,
        total,
        page,
        pages,
    };
};
exports.listPosts = listPosts;
// Retrieves a single post by id.
const getPostById = async (id) => {
    return Post_1.Post.findById(id).populate("category");
};
exports.getPostById = getPostById;
// Creates a new post from provided data.
const createPost = async (data) => {
    const post = new Post_1.Post(data);
    return post.save();
};
exports.createPost = createPost;
// Updates an existing post by id.
const updatePost = async (id, data) => {
    const updateData = {};
    if (data.text !== undefined)
        updateData.text = data.text;
    if (data.images !== undefined)
        updateData.images = data.images;
    if (data.category !== undefined)
        updateData.category = data.category;
    return Post_1.Post.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};
exports.updatePost = updatePost;
// Deletes a post by id.
const deletePost = async (id) => {
    return Post_1.Post.findByIdAndDelete(id);
};
exports.deletePost = deletePost;
