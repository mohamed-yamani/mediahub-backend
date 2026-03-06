import { Schema, model, Document } from "mongoose";

// Describes the shape of a Category document in MongoDB.
export interface CategoryDocument extends Document {
  name: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
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
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt.
  }
);

export const Category = model<CategoryDocument>("Category", CategorySchema);

