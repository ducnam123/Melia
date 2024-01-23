import { Request, Response } from "express";
import { errorResponse, successResponse } from "../config/response";

export const create = async (req: Request, res: Response) => {
  try {
    const user = {};

    return res
      .status(201)
      .json(
        successResponse(201, "Created", "Thêm người dùng thành công!", user)
      );
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error));
  }
};
