// Minimal logger: timestamps, levels, never logs secrets (callers must not pass them).
const stamp = () => new Date().toISOString();
const logger = {
  info: (...args) => console.log(`[${stamp()}] INFO`, ...args),
  warn: (...args) => console.warn(`[${stamp()}] WARN`, ...args),
  error: (...args) => console.error(`[${stamp()}] ERROR`, ...args),
};
export default logger;
