import fs from "fs";
import path from "path";
import appRoot from "app-root-path";
import rateLimit from "express-rate-limit";
import { getStream } from "file-stream-rotator";

import { winstonLogger } from "./logger";
import { currentDateTime } from "../lib/date";
import { errorResponse } from "../config/response";

export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
  message: {
    message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 60 giây",
  },
  handler: async (req, res, _next, options) => {
    try {
      if (process.env.NODE_PUBLIC_ENV === "development") {
        const LOGS_FOLDER = `${appRoot}/logs/limiter`;

        if (!fs.existsSync(`${appRoot}/logs`)) {
          fs.mkdirSync(`${appRoot}/logs`);
        }

        if (!fs.existsSync(LOGS_FOLDER)) {
          fs.mkdirSync(LOGS_FOLDER);
        }

        const apiLimiterRotator = getStream({
          date_format: "DD-MM-YYYY",
          filename: path.join(LOGS_FOLDER, "app-limiter-%DATE%.log"),
          frequency: "daily",
          verbose: false,
        });

        const logMessage = `[${currentDateTime()}]\tTITLE: TOO MANY REQUEST\tMETHOD: ${
          req.method
        }\tURL: ${req.url}\tCLIENT: ${req.headers["user-agent"]}\n`;

        apiLimiterRotator.write(logMessage, "utf8");
      }
    } catch (err) {
      winstonLogger.error("Giới hạn API: ", err);
    }

    res
      .status(options.statusCode)
      .send(
        errorResponse(
          options.statusCode,
          "Too Many Request",
          options.message.message
        )
      );
  },
  validate: { xForwardedForHeader: true },
  standardHeaders: true,
  legacyHeaders: false,
});
