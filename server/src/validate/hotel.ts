import Joi from "joi";
import { validationErrors } from "./message";

const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;

export const hotelValidate = Joi.object({
  hotel_name: Joi.string()
    .required()
    .messages(validationErrors("Tên khách sạn")),
  hotel_address: Joi.string()
    .required()
    .messages(validationErrors("Địa chỉ khách sạn")),
  hotel_nation: Joi.string()
    .required()
    .messages(validationErrors("Quốc gia khách sạn")),
  hotel_description: Joi.string()
    .required()
    .messages(validationErrors("Mô tả khách sạn")),
  hotel_contacts: Joi.object({
    contact_email: Joi.string()
      .email()
      .required()
      .messages(validationErrors("Email khách sạn")),
    contact_phone: Joi.string()
      .required()
      .pattern(phoneRegex)
      .messages(validationErrors("Số điện thoại khách sạn")),
  }).messages(validationErrors("Hỗ trợ khách sạn")),
  hotel_highlights: Joi.array()
    .min(1)
    .required()
    .items(
      Joi.object({
        highlight_title: Joi.string()
          .required()
          .messages(validationErrors("Tiêu đề")),
        highlight_text: Joi.string()
          .required()
          .messages(validationErrors("Mô tả")),
      })
    )
    .messages(validationErrors("Điểm nổi bật khách sạn")),
  hotel_services: Joi.array()
    .min(1)
    .required()
    .items(
      Joi.object({
        service_name: Joi.string()
          .required()
          .messages(validationErrors("Tên dịch vụ")),
        service_icon: Joi.string()
          .required()
          .messages(validationErrors("Icon dịch vụ")),
      })
    )
    .messages(validationErrors("Dịch vụ khách sạn")),
  hotel_images: Joi.array()
    .min(1)
    .required()
    .items(
      Joi.object({
        image_id: Joi.string().required().messages(validationErrors("Id ảnh")),
        image_name: Joi.string()
          .required()
          .messages(validationErrors("Tên ảnh")),
        image_url: Joi.string()
          .required()
          .messages(validationErrors("Đường dẫn ảnh")),
      })
    )
    .messages(validationErrors("Hình ảnh khách sạn")),
});
