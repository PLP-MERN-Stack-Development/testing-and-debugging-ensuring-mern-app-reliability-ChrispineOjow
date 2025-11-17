const { monitorEventLoopDelay } = require('perf_hooks');
const logger = require('./logger');

let histogram;

const startMonitoring = () => {
  if (histogram) return;
  histogram = monitorEventLoopDelay({ resolution: 20 });
  histogram.enable();
  setInterval(() => {
    const ms = Number(histogram.mean / 1e6).toFixed(2);
    logger.debug('Event loop delay', { meanMs: ms });
    histogram.reset();
  }, 60_000).unref();
};

module.exports = { startMonitoring };

