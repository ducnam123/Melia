import cloudinary from "../config/cloudinary";

type IImageUpload = {
  image_id: string;
  image_name: string;
  image_url: string;
};

export const removeImageToCloudinary = async (images: IImageUpload[]) => {
  try {
    images.map((file: IImageUpload) => {
      cloudinary.uploader.destroy(file.image_id);
    });
  } catch (error) {
    throw error;
  }
};
