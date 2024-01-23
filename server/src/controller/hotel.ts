import { Request, Response } from "express";
import { createHotel } from "../model/hotel";
import { hotelValidate } from "../validate/hotel";
import { removeImageToCloudinary } from "../lib/upload";
import { errorResponse, successResponse } from "../config/response";

type IImageUpload = {
  filename: string;
  originalname: string;
  path: string;
};

export const create = async (req: Request, res: Response) => {
  try {
    const hotel_images = (req.files as any).map((file: IImageUpload) => ({
      image_id: file.filename,
      image_name: file.originalname,
      image_url: file.path,
    }));

    const hotelData = { ...req.body, hotel_images };

    const { error } = hotelValidate.validate(hotelData, {
      abortEarly: false,
    });

    if (error) {
      await removeImageToCloudinary(hotel_images);
      const errors = error.details.map((err) => err.message);

      return res.status(404).json(errorResponse(404, "Not Found", errors));
    }

    const hotel = await createHotel(hotelData);

    return res
      .status(201)
      .json(
        successResponse(201, "Created", "Thêm mới khách sạn thành công", hotel)
      )
      .end();
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error));
  }
};
