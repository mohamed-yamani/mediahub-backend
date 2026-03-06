import { Schema, model, Document, Types } from "mongoose";

// Describes the shape of a Post document in MongoDB.
export interface PostDocument extends Document {
  text?: string;
  images: string[];
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<PostDocument>(
  {
    text: {
      type: String,
      required: false,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => Array.isArray(value) && value.length > 0,
        message: "At least one image URL is required",
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt.
  }
);

export const Post = model<PostDocument>("Post", PostSchema);

