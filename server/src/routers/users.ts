import { Router } from "express";
import { create } from "../controllers/users";

const userRouter = (router: Router) => {
  router.get("/users", create);
};

export default userRouter;
