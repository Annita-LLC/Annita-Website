import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../utils/logger';

const logger = createLogger();

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Add unique request ID
  req.headers['x-request-id'] = req.headers['x-request-id'] || uuidv4();

  const startTime = Date.now();
  const requestId = req.headers['x-request-id'] as string;

  // Log request
  logger.info({
    type: 'request',
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info({
      type: 'response',
      requestId,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  });

  next();
};
