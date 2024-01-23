import { Router } from "express";
import hotelRouter from "./hotel";

const router = Router();

const baseRouter = (): Router => {
  hotelRouter(router);

  return router;
};

export default baseRouter;
