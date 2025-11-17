const levels = ['debug', 'info', 'warn', 'error'];

const log = (level, message, meta = {}) => {
  if (!levels.includes(level)) {
    throw new Error(`Unsupported log level: ${level}`);
  }

  const payload = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString()
  };

  if (level === 'error') {
    console.error(payload);
  } else if (level === 'warn') {
    console.warn(payload);
  } else {
    console.log(payload);
  }
};

module.exports = {
  log,
  info: (message, meta) => log('info', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  error: (message, meta) => log('error', message, meta),
  debug: (message, meta) => log('debug', message, meta)
};

