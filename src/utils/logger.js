// src/utils/logger.js
const logger = {
  info: (event, data) => console.log(`[INFO] ${event}`, data),
  warn: (event, data) => console.warn(`[WARN] ${event}`, data),
  error: (event, data) => console.error(`[ERROR] ${event}`, data),
};

module.exports = logger;
