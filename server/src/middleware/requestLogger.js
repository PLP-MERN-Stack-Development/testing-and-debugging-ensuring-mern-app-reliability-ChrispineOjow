const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const duration = Number(process.hrtime.bigint() - start) / 1e6;
    logger.info('request_completed', {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: duration.toFixed(2)
    });
  });
  next();
};

module.exports = requestLogger;

