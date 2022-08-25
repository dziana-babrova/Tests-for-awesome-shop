const winston = require("winston");

const todaysDate = new Date();
let newFilename =
  todaysDate.getFullYear() + "-" + (todaysDate.getMonth() + 1) + "-" + todaysDate.getDate() + "-" + ".log";

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.File({ filename: newFilename, level: "debug" }),
    new winston.transports.Console({ level: "info" }),
  ],
  format: winston.format.combine(winston.format.timestamp(), winston.format.simple())
});

module.exports = logger; 