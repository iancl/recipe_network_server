const winston = require('winston');


module.exports = function (config) {
  const logger = winston.createLogger({
    level: config.level,
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize({all: true}),
      winston.format.simple()
    )
  });

  return logger;
};

