import { Router } from "express";
import { create } from "../controller/user";

const userRouter = (router: Router) => {
  router.post("/users", create);
};

export default userRouter;
