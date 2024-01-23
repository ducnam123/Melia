import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    res.send("123");
  } catch (error) {}
};
