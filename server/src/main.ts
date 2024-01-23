import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import baseRouter from "./router";
import corsOptions from "./config/cors";
import connect from "./database/mongoose";
import { limiter } from "./middleware/limiter";
import { errorHandler, notFoundRoute } from "./middleware/error";
import { morganLogger, winstonLogger } from "./middleware/logger";

dotenv.config();

const app = express();
app.use(limiter);
if (process.env.NODE_PUBLIC_ENV === "development") {
  app.use(morganLogger());
}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
server.listen(process.env.NODE_PUBLIC_PORT || 8080, () => {
  winstonLogger.info(
    `Server chạy trên cổng ${process.env.NODE_PUBLIC_PORT}!!!`
  );
});

connect();

app.use("/api", baseRouter());

app.use(notFoundRoute);
app.use(errorHandler);
