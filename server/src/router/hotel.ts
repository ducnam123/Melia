import { Router } from "express";
import { create } from "../controller/hotel";

const hotelRouter = (router: Router) => {
  router.get("/hotels", create);
};

export default hotelRouter;
