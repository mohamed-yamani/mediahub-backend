import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createPost,
  deletePost,
  getPostById,
  listPosts,
  updatePost,
} from "../services/postService";
import { uploadImagesToCloudinary } from "../utils/cloudinaryUpload";

// Lists posts with optional pagination and category filtering.
export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const categoryId = req.query.category
    ? String(req.query.category)
    : undefined;

  const result = await listPosts({ page, limit, categoryId });
  res.json(result);
});

// Retrieves a single post by id.
export const getPostByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  }
);

// Creates a new post with one or more images uploaded to Cloudinary.
export const createPostHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { text, category } = req.body as {
      text?: string;
      category?: string;
    };

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const files = (req.files || []) as Express.Multer.File[];

    if (!files.length) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const imageUrls = await uploadImagesToCloudinary(files);

    const post = await createPost({
      text,
      category,
      images: imageUrls,
    });

    res.status(201).json(post);
  }
);

// Updates an existing post and optionally replaces its images.
export const updatePostHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text, category } = req.body as {
      text?: string;
      category?: string;
    };

    const files = (req.files || []) as Express.Multer.File[];

    let imageUrls: string[] | undefined;
    if (files.length) {
      imageUrls = await uploadImagesToCloudinary(files);
    }

    const updated = await updatePost(id, {
      text,
      category,
      images: imageUrls,
    });

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updated);
  }
);

// Deletes a post by id.
export const deletePostHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await deletePost(id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(204).send();
  }
);

