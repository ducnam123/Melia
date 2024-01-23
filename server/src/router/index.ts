import { Router } from "express";
import hotelRouter from "./hotel";
import userRouter from "./user";

const router = Router();

const baseRouter = (): Router => {
  hotelRouter(router);
  userRouter(router);

  return router;
};

export default baseRouter;
