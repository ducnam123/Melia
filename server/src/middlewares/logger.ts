import fs from "fs";
import path from "path";
import morgan from "morgan";
import winston from "winston";
import appRoot from "app-root-path";
import { getStream } from "file-stream-rotator";

const { combine, timestamp, printf, colorize } = winston.format;

export const winstonLogger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "DD-MM-YYYY hh:mm:ss A",
    }),
    printf((level) => `[${level.timestamp}] ${level.level}: ${level.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export const morganLogger = () => {
  const LOGS_FOLDER = `${appRoot}/logs/access`;

  if (!fs.existsSync(`${appRoot}/logs`)) {
    fs.mkdirSync(`${appRoot}/logs`);
  }

  if (!fs.existsSync(LOGS_FOLDER)) {
    fs.mkdirSync(LOGS_FOLDER);
  }

  const accessLogStream: any = getStream({
    date_format: "DD-MM-YYYY",
    filename: path.join(LOGS_FOLDER, "access-%DATE%.log"),
    frequency: "daily",
    verbose: false,
  });

  return morgan("combined", { stream: accessLogStream });
};
