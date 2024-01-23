import { Router } from "express";
import { create } from "../controller/user";

const UserRouter = (router: Router) => {
  router.post("/users", create);
};

export default UserRouter;
