import winston from "winston";

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
