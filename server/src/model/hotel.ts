import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    hotel_name: {
      type: String,
      required: true,
    },
    hotel_address: {
      type: String,
      required: true,
    },
    hotel_nation: {
      type: String,
      required: true,
    },
    hotel_description: {
      type: String,
      required: true,
    },
    hotel_contacts: {
      _id: false,
      contact_email: {
        type: String,
        required: true,
      },
      contact_phone: {
        type: String,
        required: true,
      },
    },
    hotel_highlights: [
      {
        _id: false,
        highlight_title: {
          type: String,
          required: true,
        },
        highlight_text: {
          type: String,
          required: true,
        },
      },
    ],
    hotel_services: [
      {
        _id: false,
        service_name: {
          type: String,
          required: true,
        },
        service_icon: {
          type: String,
          required: false,
        },
      },
    ],
    hotel_images: [
      {
        _id: false,
        image_id: {
          type: String,
          required: true,
        },
        image_name: {
          type: String,
          required: true,
        },
        image_url: {
          type: String,
          required: true,
        },
      },
    ],
    room_lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
        required: false,
      },
    ],
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true, versionKey: false }
);

export const HotelModel = mongoose.model("Hotel", hotelSchema);

export const getAllHotels = () => HotelModel.find();
export const getOneHotel = (id: string) => HotelModel.findById(id);
export const createHotel = (values: Record<string, any>) =>
  new HotelModel(values).save().then((hotel) => hotel.toObject());
export const updateHotel = (id: string, values: Record<string, any>) =>
  HotelModel.findByIdAndUpdate(id, values, {
    new: true,
  });
