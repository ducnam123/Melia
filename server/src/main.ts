import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

import baseRouter from "./routers";
import connect from "./database/mongoose";
import { limiter } from "./middlewares/limiter";
import { winstonLogger, morganLogger } from "./middlewares/logger";

dotenv.config();

const app = express();

app.use(limiter);

if (process.env.NODE_PUBLIC_ENV === "development") {
  app.use(morganLogger());
}

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.NODE_PUBLIC_PORT || 5000, () => {
  winstonLogger.info(`Máy chủ đang chạy ${process.env.NODE_PUBLIC_ENV}!!!`);
});

connect();

app.use("/api", baseRouter());
