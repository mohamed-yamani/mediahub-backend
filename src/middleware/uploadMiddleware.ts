import multer from "multer";

// Uses memory storage so files can be streamed directly to Cloudinary.
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10, // Maximum 10 images per request
  },
});

