/**
 * Creates a logger function for a specific namespace.
 * @param {string} namespace Namespace
 */

// Define the LogLevel enum to handle different levels of logging
enum LogLevel {
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Debug = 'debug',
}

/**
 * Logger class for logging various levels of messages.
 */
export class Logger {
  static isEnabled = true;
  constructor(private context: string) {}

  /**
   * Logs an info message.
   * @param message - The message to log.
   * @param data - Optional additional data to log.
   */
  public info(message: string, data?: any): void {
    this.log(LogLevel.Info, message, data);
  }

  /**
   * Logs a warning message.
   * @param message - The warning message to log.
   * @param data - Optional additional data to log.
   */
  public warn(message: string, data?: any): void {
    this.log(LogLevel.Warn, message, data);
  }

  /**
   * Logs an error message.
   * @param message - The error message to log.
   * @param data - Optional additional data to log.
   */
  public error(message: string, data?: any): void {
    this.log(LogLevel.Error, message, data);
  }

  /**
   * Logs a debug message.
   * @param message - The debug message to log.
   * @param data - Optional additional data to log.
   */
  public debug(message: string, data?: any): void {
    this.log(LogLevel.Debug, message, data);
  }

  /**
   * Logs a performance metric, calculating the time taken to execute a function.
   * @param label - A label for the performance metric.
   * @param fn - The function to measure performance for.
   * @returns The result of the function `fn`.
   */
  public performance<T>(label: string, fn: () => T): T {
    const start = performance.now();
    try {
      return fn();
    } finally {
      const duration = performance.now() - start;
      this.log(LogLevel.Info, `Performance: ${label}`, {
        duration: `${duration.toFixed(2)}ms`,
      });
    }
  }

  /**
   * The main log method that handles all log levels.
   * @param level - The level of the log (info, warn, error, debug).
   * @param message - The message to log.
   * @param data - Optional additional data to log.
   */
  private log(level: LogLevel, message: string, data?: any): void {

    const timestamp = new Date().toISOString();
    const contextMessage = `[${this.context}] ${message}`;

    // Format log entry with optional data
    const logEntry = data
      ? `${contextMessage} | Data: ${JSON.stringify(data)}`
      : contextMessage;

    switch (level) {
      case LogLevel.Info:
        console.info(`INFO [${timestamp}] ${logEntry}`);
        break;
      case LogLevel.Warn:
        console.warn(`WARN [${timestamp}] ${logEntry}`);
        break;
      case LogLevel.Error:
        console.error(`ERROR [${timestamp}] ${logEntry}`);
        break;
      case LogLevel.Debug:
        console.debug(`DEBUG [${timestamp}] ${logEntry}`);
        break;
      default:
        console.log(`LOG [${timestamp}] ${logEntry}`);
    }
  }
}
