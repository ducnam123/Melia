import { Router } from "express";
import { create } from "../controller/hotel";
import { uploadConfig } from "../config/cloudinary";

const hotelRouter = (router: Router) => {
  router.post("/hotels", uploadConfig.array("hotel_images"), create);
};

export default hotelRouter;
