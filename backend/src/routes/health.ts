import { Router, Request, Response } from 'express';
import { testConnection } from '../config/database';
import { createLogger } from '../utils/logger';

const router = Router();
const logger = createLogger();

// Basic health check
router.get('/', async (req: Request, res: Response) => {
  try {
    const dbConnected = await testConnection();
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    res.status(200).json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100,
        external: Math.round(memoryUsage.external / 1024 / 1024 * 100) / 100
      },
      database: {
        connected: dbConnected,
        status: dbConnected ? 'connected' : 'disconnected'
      },
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '2.0.0'
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

// Detailed health check (for monitoring)
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    const dbConnected = await testConnection();
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    res.status(200).json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(uptime),
        human: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
      },
      memory: {
        rss: {
          value: memoryUsage.rss,
          human: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`
        },
        heapTotal: {
          value: memoryUsage.heapTotal,
          human: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
        },
        heapUsed: {
          value: memoryUsage.heapUsed,
          human: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`
        },
        external: {
          value: memoryUsage.external,
          human: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
        }
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      database: {
        connected: dbConnected,
        status: dbConnected ? 'connected' : 'disconnected'
      },
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '2.0.0',
      platform: process.platform,
      nodeVersion: process.version
    });
  } catch (error) {
    logger.error('Detailed health check failed:', error);
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Detailed health check failed'
    });
  }
});

export { router as healthRouter };
