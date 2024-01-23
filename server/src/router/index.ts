import { Router } from "express";
import userRouter from "./user";

const router = Router();

const baseRouter = (): Router => {
  userRouter(router);

  return router;
};

export default baseRouter;
