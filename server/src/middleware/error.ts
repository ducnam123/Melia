import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../config/response";

export const notFoundRoute = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res
    .status(404)
    .json(
      errorResponse(
        404,
        "Not Found",
        "Xin lỗi! Không tìm thấy đường dẫn yêu cầu của bạn."
      )
    );
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next("Đã xảy ra lỗi. Lỗi máy chủ ứng dụng!");
  }
  if (err.message) {
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", err.message));
  } else {
    res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", "Có ít nhất một lỗi"));
  }
};
