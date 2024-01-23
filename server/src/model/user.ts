import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      default: null,
    },
    image_url: {
      type: String,
      required: true,
    },
    primary_email_address_id: {
      type: String,
      required: true,
    },
    email_addresses: [
      {
        _id: {
          type: String,
          default: false,
        },
        email_address: {
          type: String,
          default: false,
        },
      },
    ],
    banned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = mongoose.model("User", userSchema);

export const getAllUsers = () => UserModel.find();
export const getOneUser = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((User) => User.toObject());
export const updateUser = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values, {
    new: true,
  });
