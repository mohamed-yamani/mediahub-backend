import { Category, CategoryDocument } from "../models/Category";

// Returns all categories sorted by creation date (newest first).
export const getCategories = async (): Promise<CategoryDocument[]> => {
  return Category.find().sort({ createdAt: -1 });
};

// Creates a new category document.
export const createCategory = async (data: {
  name: string;
  icon?: string;
}): Promise<CategoryDocument> => {
  const category = new Category(data);
  return category.save();
};

// Updates an existing category document by id.
export const updateCategory = async (
  id: string,
  data: { name?: string; icon?: string }
): Promise<CategoryDocument | null> => {
  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Deletes a category by id.
export const deleteCategory = async (
  id: string
): Promise<CategoryDocument | null> => {
  return Category.findByIdAndDelete(id);
};

