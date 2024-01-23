import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import baseRouter from "./router";
import connect from "./database/mongoose";
import { limiter } from "./middleware/limiter";
import { winstonLogger } from "./middleware/logger";
import { errorHandler, notFoundRoute } from "./middleware/error";

dotenv.config();

const app = express();

app.use(limiter);
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

connect();

app.use("/api", baseRouter());
app.use(notFoundRoute);
app.use(errorHandler);
