import { Post, PostDocument } from "../models/Post";

interface ListPostsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
}

// Retrieves posts with optional pagination and category filtering.
export const listPosts = async ({
  page = 1,
  limit = 10,
  categoryId,
}: ListPostsParams): Promise<{
  posts: PostDocument[];
  total: number;
  page: number;
  pages: number;
}> => {
  const query: Record<string, unknown> = {};

  if (categoryId) {
    query.category = categoryId;
  }

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(query),
  ]);

  const pages = Math.ceil(total / limit) || 1;

  return {
    posts,
    total,
    page,
    pages,
  };
};

// Retrieves a single post by id.
export const getPostById = async (
  id: string
): Promise<PostDocument | null> => {
  return Post.findById(id).populate("category");
};

// Creates a new post from provided data.
export const createPost = async (data: {
  text?: string;
  images: string[];
  category: string;
}): Promise<PostDocument> => {
  const post = new Post(data);
  return post.save();
};

// Updates an existing post by id.
export const updatePost = async (
  id: string,
  data: { text?: string; images?: string[]; category?: string }
): Promise<PostDocument | null> => {
  const updateData: {
    text?: string;
    images?: string[];
    category?: string;
  } = {};

  if (data.text !== undefined) updateData.text = data.text;
  if (data.images !== undefined) updateData.images = data.images;
  if (data.category !== undefined) updateData.category = data.category;

  return Post.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// Deletes a post by id.
export const deletePost = async (
  id: string
): Promise<PostDocument | null> => {
  return Post.findByIdAndDelete(id);
};

