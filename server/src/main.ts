import path from "path";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import baseRouter from "./router";
import connect from "./database/mongoose";
import { limiter } from "./middleware/limiter";
import { errorHandler, notFoundRoute } from "./middleware/error";
import { morganLogger, winstonLogger } from "./middleware/logger";
import { errorResponse, successResponse } from "./config/response";

dotenv.config();

const app = express();

app.use(limiter);

connect();

if (process.env.NODE_PUBLIC_ENV === "development") {
  app.use(morganLogger());
}

app.use(cors());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

server.listen(process.env.NODE_PUBLIC_PORT || 8080, () => {
  winstonLogger.info(`Máy chủ đang chạy ${process.env.NODE_PUBLIC_ENV}!!!`);
});

app.get("/", (_req, res) => {
  try {
    res
      .status(200)
      .json(
        successResponse(
          200,
          "Success",
          "Chào mừng bạn đến với Hệ thống đặt phòng khách sạn ~ Melia"
        )
      );
  } catch (error) {
    res.status(500).json(errorResponse(500, "Internal Server Error", error));
  }
});

app.use("/api", baseRouter());

app.use(notFoundRoute);
app.use(errorHandler);
