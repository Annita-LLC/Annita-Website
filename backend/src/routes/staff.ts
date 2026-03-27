import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { createLogger } from '../utils/logger';
import { CustomError, asyncHandler } from '../middleware/errorHandler';

const router = Router();
const logger = createLogger();

// Staff authentication middleware
const authenticateStaff = async (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new CustomError('Access token required', 401);
    }

    const decoded = jwt.verify(token, process.env.STAFF_JWT_SECRET!) as { staffId: string };
    
    const query = 'SELECT * FROM staff_users WHERE id = $1 AND is_active = true';
    const result = await pool.query(query, [decoded.staffId]);
    
    if (result.rows.length === 0) {
      throw new CustomError('Invalid or expired token', 401);
    }

    req.staff = result.rows[0];
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new CustomError('Invalid token', 401);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new CustomError('Token expired', 401);
    }
    throw error;
  }
};

// Validation middleware
const handleValidationErrors = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Staff login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM staff_users WHERE email = $1 AND is_active = true';
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new CustomError('Invalid credentials', 401);
  }

  const staff = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, staff.password_hash);

  if (!isPasswordValid) {
    throw new CustomError('Invalid credentials', 401);
  }

  // Update last login
  await pool.query('UPDATE staff_users SET last_login = NOW() WHERE id = $1', [staff.id]);

  // Generate JWT token
  const token = jwt.sign(
    { staffId: staff.id },
    process.env.STAFF_JWT_SECRET!,
    { expiresIn: process.env.STAFF_SESSION_EXPIRES_IN || '24h' }
  );

  // Log activity
  await pool.query(
    'INSERT INTO staff_activity_logs (staff_id, action, ip_address, user_agent) VALUES ($1, $2, $3, $4)',
    [staff.id, 'login', req.ip, req.get('User-Agent')]
  );

  logger.info(`Staff login successful: ${email}`);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      staff: {
        id: staff.id,
        email: staff.email,
        firstName: staff.first_name,
        lastName: staff.last_name,
        role: staff.role,
        permissions: staff.permissions,
        lastLogin: staff.last_login
      }
    }
  });
}));

// Get staff profile
router.get('/profile', authenticateStaff, asyncHandler(async (req: Request, res: Response) => {
  const staff = req.staff;

  res.json({
    success: true,
    data: {
      id: staff.id,
      email: staff.email,
      firstName: staff.first_name,
      lastName: staff.last_name,
      role: staff.role,
      permissions: staff.permissions,
      lastLogin: staff.last_login,
      createdAt: staff.created_at
    }
  });
}));

// Get all submissions (for staff dashboard)
router.get('/submissions', authenticateStaff, asyncHandler(async (req: Request, res: Response) => {
  const { type, page = 1, limit = 20 } = req.query;
  
  let query = '';
  let countQuery = '';
  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  switch (type) {
    case 'contact':
      query = `
        SELECT * FROM contact_inquiries 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
      `;
      countQuery = 'SELECT COUNT(*) FROM contact_inquiries';
      break;
    case 'career':
      query = `
        SELECT * FROM career_applications 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
      `;
      countQuery = 'SELECT COUNT(*) FROM career_applications';
      break;
    case 'business':
      query = `
        SELECT * FROM business_inquiries 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
      `;
      countQuery = 'SELECT COUNT(*) FROM business_inquiries';
      break;
    case 'waitlist':
      query = `
        SELECT * FROM waitlist 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
      `;
      countQuery = 'SELECT COUNT(*) FROM waitlist';
      break;
    default:
      throw new CustomError('Invalid submission type', 400);
  }

  const [submissionsResult, countResult] = await Promise.all([
    pool.query(query, [parseInt(limit as string), offset]),
    pool.query(countQuery)
  ]);

  const totalCount = parseInt(countResult.rows[0].count);
  const totalPages = Math.ceil(totalCount / parseInt(limit as string));

  res.json({
    success: true,
    data: {
      submissions: submissionsResult.rows,
      pagination: {
        currentPage: parseInt(page as string),
        totalPages,
        totalCount,
        hasNext: parseInt(page as string) < totalPages,
        hasPrev: parseInt(page as string) > 1
      }
    }
  });
}));

// Get submission details
router.get('/submissions/:type/:id', authenticateStaff, asyncHandler(async (req: Request, res: Response) => {
  const { type, id } = req.params;

  let query = '';
  
  switch (type) {
    case 'contact':
      query = 'SELECT * FROM contact_inquiries WHERE id = $1';
      break;
    case 'career':
      query = 'SELECT * FROM career_applications WHERE id = $1';
      break;
    case 'business':
      query = 'SELECT * FROM business_inquiries WHERE id = $1';
      break;
    case 'waitlist':
      query = 'SELECT * FROM waitlist WHERE id = $1';
      break;
    default:
      throw new CustomError('Invalid submission type', 400);
  }

  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    throw new CustomError('Submission not found', 404);
  }

  res.json({
    success: true,
    data: result.rows[0]
  });
}));

// Get staff activity logs
router.get('/activity', authenticateStaff, asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 50 } = req.query;
  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  const query = `
    SELECT al.*, su.first_name, su.last_name, su.email
    FROM staff_activity_logs al
    LEFT JOIN staff_users su ON al.staff_id = su.id
    ORDER BY al.created_at DESC
    LIMIT $1 OFFSET $2
  `;

  const countQuery = 'SELECT COUNT(*) FROM staff_activity_logs';

  const [logsResult, countResult] = await Promise.all([
    pool.query(query, [parseInt(limit as string), offset]),
    pool.query(countQuery)
  ]);

  const totalCount = parseInt(countResult.rows[0].count);
  const totalPages = Math.ceil(totalCount / parseInt(limit as string));

  res.json({
    success: true,
    data: {
      logs: logsResult.rows,
      pagination: {
        currentPage: parseInt(page as string),
        totalPages,
        totalCount,
        hasNext: parseInt(page as string) < totalPages,
        hasPrev: parseInt(page as string) > 1
      }
    }
  });
}));

// Staff logout
router.post('/logout', authenticateStaff, asyncHandler(async (req: Request, res: Response) => {
  const staff = req.staff;

  // Log activity
  await pool.query(
    'INSERT INTO staff_activity_logs (staff_id, action, ip_address, user_agent) VALUES ($1, $2, $3, $4)',
    [staff.id, 'logout', req.ip, req.get('User-Agent')]
  );

  logger.info(`Staff logout: ${staff.email}`);

  res.json({
    success: true,
    message: 'Logout successful'
  });
}));

// Get dashboard stats
router.get('/dashboard/stats', authenticateStaff, asyncHandler(async (req: Request, res: Response) => {
  const queries = [
    'SELECT COUNT(*) FROM contact_inquiries WHERE created_at >= NOW() - INTERVAL \'30 days\'',
    'SELECT COUNT(*) FROM career_applications WHERE created_at >= NOW() - INTERVAL \'30 days\'',
    'SELECT COUNT(*) FROM business_inquiries WHERE created_at >= NOW() - INTERVAL \'30 days\'',
    'SELECT COUNT(*) FROM waitlist WHERE created_at >= NOW() - INTERVAL \'30 days\'',
    'SELECT COUNT(*) FROM staff_users WHERE is_active = true'
  ];

  const results = await Promise.all(queries.map(query => pool.query(query)));

  const stats = {
    contactInquiries: parseInt(results[0].rows[0].count),
    careerApplications: parseInt(results[1].rows[0].count),
    businessInquiries: parseInt(results[2].rows[0].count),
    waitlistSignups: parseInt(results[3].rows[0].count),
    activeStaff: parseInt(results[4].rows[0].count)
  };

  res.json({
    success: true,
    data: stats
  });
}));

export { router as staffRouter };
