import { Request, Response } from "express";
import { createUser } from "../model/user";
import { userValidate } from "../validate/user";
import { errorResponse, successResponse } from "../config/response";

export const create = async (req: Request, res: Response) => {
  try {
    // const { error } = userValidate.validate(req.body, {
    //   abortEarly: false,
    // });

    // if (error) {
    //   const errors = error.details.map((err) => err.message);

    //   return res.status(404).json(errorResponse(404, "Not Found", errors));
    // }

    const user = await createUser(req.body);
    console.log(user);

    return res
      .status(201)
      .json(successResponse(201, "Created", "Đăng ký thành công", user))
      .end();
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse(500, "Internal Server Error", error));
  }
};
