import winston from 'winston';
import path from 'path';

// Create logger with different levels for different environments
const createLogger = () => {
  const logLevel = process.env.LOG_LEVEL || 'info';
  const logFilePath = process.env.LOG_FILE_PATH || './logs/app.log';

  const logFormat = winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.prettyPrint()
  );

  const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level}]: ${stack || message}`;
    })
  );

  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: consoleFormat,
      level: logLevel
    })
  ];

  // Add file logging in production
  if (process.env.NODE_ENV === 'production') {
    transports.push(
      new winston.transports.File({
        filename: path.resolve(logFilePath),
        format: logFormat,
        level: logLevel,
        maxsize: 5242880, // 5MB
        maxFiles: 5
      }),
      new winston.transports.File({
        filename: path.resolve('./logs/error.log'),
        level: 'error',
        format: logFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5
      })
    );
  }

  return winston.createLogger({
    level: logLevel,
    format: logFormat,
    transports,
    exitOnError: false
  });
};

export { createLogger };
