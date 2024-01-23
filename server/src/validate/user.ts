import Joi from "joi";
import { validationErrors } from "./message";

export const userValidate = Joi.object({
  _id: Joi.string().required().messages(validationErrors("ID người dùng")),
  username: Joi.string().required().messages(validationErrors("Tên đăng nhập")),
  first_name: Joi.string().required().messages(validationErrors("Họ")),
  last_name: Joi.string().optional().messages(validationErrors("Tên")),
  image_url: Joi.string().required().messages(validationErrors("Ảnh")),
  primary_email_address_id: Joi.string()
    .required()
    .messages(validationErrors("ID email chính")),
  email_addresses: Joi.array()
    .min(1)
    .required()
    .items(
      Joi.object({
        _id: Joi.string().required().messages(validationErrors("ID email")),
        email_address: Joi.string()
          .required()
          .messages(validationErrors("Địa chỉ email")),
      })
    )
    .messages(validationErrors("Danh sách địa chỉ email")),
  banned: Joi.boolean().optional().messages(validationErrors("Trạng thái")),
});
