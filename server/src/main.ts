import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import favicon from "serve-favicon";
import appRoot from "app-root-path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import baseRouter from "./router";
import connect from "./database/mongoose";
import { winstonLogger } from "./middleware/logger";
import { errorHandler, notFoundRoute } from "./middleware/error";

dotenv.config();

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(favicon(`${appRoot}/public/logo.svg`));

const server = http.createServer(app);

server.listen(process.env.NODE_PUBLIC_PORT || 8080, () => {
  winstonLogger.info(`Máy chủ đang chạy ${process.env.NODE_PUBLIC_ENV}!!!`);
});

connect();
app.use("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", baseRouter());
app.use(notFoundRoute);
app.use(errorHandler);
