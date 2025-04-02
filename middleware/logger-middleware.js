import morgan from "morgan";
import fs from "fs";
import path from "path";
import { format } from "date-fns";


// Create a write stream (append mode) for logging
const logStream = fs.createWriteStream(path.join("logs", "server.log"), { flags: "a" });

// Custom token for timestamp
morgan.token("timestamp", () => format(new Date(), "yyyy-MM-dd HH:mm:ss"));

// Middleware to log requests
const requestLogger = morgan(
  ':timestamp 📤 [Request] :method :url | Status: :status | IP: :remote-addr',
  { stream: logStream }
);

// Middleware to log only response message
const responseLogger = (req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    const message = data?.message || "No message";
    logStream.write(
      `${format(new Date(), "yyyy-MM-dd HH:mm:ss")} 📥 [Response] ${req.method} ${
        req.originalUrl
      } | Status: ${res.statusCode} | Message: ${message}\n`
    );
    oldJson.apply(res, arguments);
  };
  next();
};

export { requestLogger, responseLogger };
