/**
 *  Utilidad para generar logs
 */
const logger = require("winston");
const { transports, format } = require("winston");
logger.configure({
  transports: [
    new transports.Console({
      handleExceptions: true,
      level: "debug",
      format: format.combine(format.colorize(), format.simple()),
    })
  ],
});

module.exports = logger;