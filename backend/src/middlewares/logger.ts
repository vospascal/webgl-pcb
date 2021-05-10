import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" })
);

const transports = [
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: winston.format.combine(
      winston.format.json(),
      winston.format.errors({ stack: true }),
      winston.format.splat()
    ),
  }),
  new winston.transports.File({
    filename: "logs/warning.log",
    level: "warning",
    format: winston.format.combine(
      winston.format.json(),
      winston.format.errors({ stack: true }),
      winston.format.splat()
    ),
  }),
  new winston.transports.File({
    filename: "logs/all.log",
    format: winston.format.combine(
      winston.format.json(),
      winston.format.errors({ stack: true }),
      winston.format.splat()
    ),
  }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// logging pretty to the console!!
if (process.env.NODE_ENV !== "production") {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ level: true }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  );
}

export default Logger;
