import { Request, Response } from "express";
import { errorResponse, successResponse } from "../configs/response";

export const create = (req: Request, res: Response) => {
  try {
    const user = {};

    return res
      .status(201)
      .json(
        successResponse(201, "Created", "Thêm mới người dùng thành công", user)
      );
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error));
  }
};
