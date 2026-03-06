import { cloudinary } from "../config/cloudinary";

// Uploads an array of files from Multer's memory storage to Cloudinary and
// returns their secure URLs.
export const uploadImagesToCloudinary = async (
  files: Express.Multer.File[]
): Promise<string[]> => {
  const uploadSingle = (file: Express.Multer.File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "mediahub/posts",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Failed to upload image"));
          }
          resolve(result.secure_url);
        }
      );

      stream.end(file.buffer);
    });
  };

  const uploads = files.map((file) => uploadSingle(file));
  return Promise.all(uploads);
};

