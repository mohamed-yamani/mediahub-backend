"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImagesToCloudinary = void 0;
const cloudinary_1 = require("../config/cloudinary");
// Uploads an array of files from Multer's memory storage to Cloudinary and
// returns their secure URLs.
const uploadImagesToCloudinary = async (files) => {
    const uploadSingle = (file) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.cloudinary.uploader.upload_stream({
                folder: "mediahub/posts",
                resource_type: "image",
            }, (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Failed to upload image"));
                }
                resolve(result.secure_url);
            });
            stream.end(file.buffer);
        });
    };
    const uploads = files.map((file) => uploadSingle(file));
    return Promise.all(uploads);
};
exports.uploadImagesToCloudinary = uploadImagesToCloudinary;
