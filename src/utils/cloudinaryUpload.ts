import cloudinary from "../config/cloudinary.js";
export const uploadToCloudinary = async (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "battle-op",
          transformation: [
            {
              width: 300,
              height: 300,
              crop: "fill",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      )
      .end(buffer);
  });
};
