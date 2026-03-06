import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categoryService";

// Returns the full list of categories.
export const getAllCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await getCategories();
    res.json(categories);
  }
);

// Creates a new category.
export const createCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, icon } = req.body as { name?: string; icon?: string };

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const category = await createCategory({ name, icon });
    res.status(201).json(category);
  }
);

// Updates an existing category by id.
export const updateCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const { name, icon } = req.body as { name?: string; icon?: string };

    const updated = await updateCategory(id, { name, icon });

    if (!updated) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(updated);
  }
);

// Deletes a category by id.
export const deleteCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";

    const deleted = await deleteCategory(id);

    if (!deleted) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(204).send();
  }
);

