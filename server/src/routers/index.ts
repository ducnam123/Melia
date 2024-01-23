import { Router } from "express";
import userRouter from "./users";

const router = Router();

const baseRouter = (): Router => {
  userRouter(router);

  return router;
};

export default baseRouter;
