import cloudinary from "./cloudinaryConfig.js";
import axios from "axios";

export async function uploadInstagramMediaToCloudinary(instaUrl, publicId) {
  try {
    // Fetch media from Instagram
    const response = await axios.get(instaUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    // Detect type (image/video)
    const mimeType = response.headers["content-type"];
    let resourceType = "image";
    if (mimeType.startsWith("video/")) resourceType = "video";

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "instagram_posts",
          public_id: publicId,
          resource_type: resourceType,
          overwrite: false,
          quality: resourceType === "image" ? "auto:best" : undefined,
          fetch_format: resourceType === "image" ? "auto" : undefined,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      uploadStream.end(buffer);
    });
  } catch (err) {
    console.error("❌ Failed to upload Instagram media:", err.message);
    throw err;
  }
}

