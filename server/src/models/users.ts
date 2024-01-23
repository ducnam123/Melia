import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = mongoose.model("User", userSchema);
