import { Router } from "express";
import { create } from "../controllers/users";

const userRouter = (router: Router) => {
  router.post("/users", create);
};

export default userRouter;
