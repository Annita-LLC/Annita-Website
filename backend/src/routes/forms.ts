import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { pool } from '../config/database';
import { createLogger } from '../utils/logger';
import { CustomError, asyncHandler } from '../middleware/errorHandler';
import { sendEmailNotification, sendUserConfirmationEmail } from '../services/emailService';

const router = Router();
const logger = createLogger();

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

// Submit any form type
router.post('/submit', [
  body('formType').isIn(['contact', 'career', 'sales', 'solution', 'cookie', 'privacy', 'legal', 'newsletter']).withMessage('Invalid form type'),
  body('firstName').trim().isLength({ min: 2, max: 100 }).withMessage('First name must be 2-100 characters'),
  body('lastName').trim().isLength({ min: 2, max: 100 }).withMessage('Last name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('message').optional().trim().isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters'),
  body('phone').optional().trim().isMobilePhone('any').withMessage('Valid phone number required'),
  body('company').optional().trim().isLength({ max: 255 }).withMessage('Company name too long'),
  body('position').optional().trim().isLength({ max: 100 }).withMessage('Position too long'),
  body('department').optional().trim().isLength({ max: 100 }).withMessage('Department too long'),
  body('experienceLevel').optional().isIn(['entry', 'mid', 'senior', 'lead', 'executive']).withMessage('Invalid experience level'),
  body('coverLetter').optional().trim().isLength({ min: 50, max: 10000 }).withMessage('Cover letter must be 50-10000 characters'),
  body('resumeUrl').optional().isURL().withMessage('Valid resume URL required'),
  body('linkedinUrl').optional().isURL().withMessage('Valid LinkedIn URL required'),
  body('portfolioUrl').optional().isURL().withMessage('Valid portfolio URL required'),
  body('salaryExpectations').optional().trim().isLength({ max: 100 }).withMessage('Salary expectations too long'),
  body('availability').optional().trim().isLength({ max: 100 }).withMessage('Availability too long'),
  body('companySize').optional().trim().isLength({ max: 50 }).withMessage('Company size too long'),
  body('industry').optional().trim().isLength({ max: 100 }).withMessage('Industry too long'),
  body('budget').optional().trim().isLength({ max: 100 }).withMessage('Budget too long'),
  body('timeline').optional().trim().isLength({ max: 100 }).withMessage('Timeline too long')
], handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const { formType, ...formData } = req.body;

  let query = '';
  let values: any[] = [];
  let emailSubject = '';
  let emailTemplate = '';

  switch (formType) {
    case 'contact':
      query = `
        INSERT INTO contact_inquiries (first_name, last_name, email, phone, company, message, inquiry_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, created_at
      `;
      values = [
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone || null,
        formData.company || null,
        formData.message,
        'general'
      ];
      emailSubject = 'New Contact Inquiry from Annita Website';
      emailTemplate = 'contact';
      break;

    case 'career':
      query = `
        INSERT INTO career_applications (
          first_name, last_name, email, phone, position, department, experience_level,
          cover_letter, resume_url, linkedin_url, portfolio_url, salary_expectations, availability
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, created_at
      `;
      values = [
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone || null,
        formData.position,
        formData.department || null,
        formData.experienceLevel || null,
        formData.coverLetter || null,
        formData.resumeUrl || null,
        formData.linkedinUrl || null,
        formData.portfolioUrl || null,
        formData.salaryExpectations || null,
        formData.availability || null
      ];
      emailSubject = `New Career Application: ${formData.position}`;
      emailTemplate = 'career';
      break;

    case 'sales':
    case 'solution':
      query = `
        INSERT INTO business_inquiries (
          first_name, last_name, email, phone, company, company_size, industry,
          inquiry_type, message, budget, timeline
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id, created_at
      `;
      values = [
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone || null,
        formData.company,
        formData.companySize || null,
        formData.industry || null,
        formType,
        formData.message,
        formData.budget || null,
        formData.timeline || null
      ];
      emailSubject = `New ${formType === 'sales' ? 'Sales' : 'Solution'} Inquiry`;
      emailTemplate = formType;
      break;

    case 'cookie':
    case 'privacy':
      query = `
        INSERT INTO contact_inquiries (first_name, last_name, email, phone, company, message, inquiry_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, created_at
      `;
      values = [
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone || null,
        formData.company || null,
        formData.message,
        formType
      ];
      emailSubject = `New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Inquiry`;
      emailTemplate = formType;
      break;

    case 'newsletter':
      query = `
        INSERT INTO waitlist (email, first_name, last_name, company, use_case)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (email) DO UPDATE SET
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          company = EXCLUDED.company,
          use_case = EXCLUDED.use_case,
          updated_at = NOW()
        RETURNING id, created_at, updated_at
      `;
      values = [
        formData.email,
        formData.firstName || null,
        formData.lastName || null,
        formData.company || null,
        'Newsletter subscription'
      ];
      emailSubject = 'New Newsletter Subscription';
      emailTemplate = 'newsletter';
      break;

    default:
      throw new CustomError('Invalid form type', 400);
  }

  const client = await pool.connect();
  
  try {
    const result = await client.query(query, values);
    const submission = result.rows[0];

    // Send email notification (non-blocking)
    sendEmailNotification(emailSubject, formData, emailTemplate)
      .catch(error => logger.error('Failed to send email notification:', error));

    // Send user confirmation email (non-blocking)
    const confirmationSubject = formType === 'career' 
      ? 'Thank You for Your Application'
      : 'Thank You for Contacting Annita';
    
    sendUserConfirmationEmail(
      formData.email,
      confirmationSubject,
      formType,
      formData
    ).catch(error => logger.error('Failed to send user confirmation email:', error));

    logger.info(`Form submitted successfully: ${formType} - ID: ${submission.id}`);

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        id: submission.id,
        formType,
        submittedAt: submission.created_at
      }
    });

  } catch (error) {
    logger.error('Database error during form submission:', error);
    throw new CustomError('Failed to submit form', 500);
  } finally {
    client.release();
  }
}));

// Add email to waitlist
router.post('/waitlist', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('firstName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('First name must be 2-100 characters'),
  body('lastName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Last name must be 2-100 characters'),
  body('company').optional().trim().isLength({ max: 255 }).withMessage('Company name too long'),
  body('useCase').optional().trim().isLength({ max: 1000 }).withMessage('Use case too long')
], handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const { email, firstName, lastName, company, useCase } = req.body;

  const query = `
    INSERT INTO waitlist (email, first_name, last_name, company, use_case)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (email) DO UPDATE SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      company = EXCLUDED.company,
      use_case = EXCLUDED.use_case,
      updated_at = NOW()
    RETURNING id, created_at, updated_at
  `;

  const client = await pool.connect();
  
  try {
    const result = await client.query(query, [email, firstName, lastName, company, useCase]);
    const waitlistEntry = result.rows[0];

    // Send email notification (non-blocking)
    sendEmailNotification('New Waitlist Signup', { email, firstName, lastName, company, useCase }, 'waitlist')
      .catch(error => logger.error('Failed to send waitlist email:', error));

    // Send user confirmation email (non-blocking)
    sendUserConfirmationEmail(
      email,
      'Welcome to the Annita Waitlist!',
      'waitlist',
      { email, firstName, lastName, company, useCase }
    ).catch(error => logger.error('Failed to send user confirmation email:', error));

    logger.info(`Waitlist signup successful: ${email} - ID: ${waitlistEntry.id}`);

    res.status(201).json({
      success: true,
      message: 'Successfully added to waitlist',
      data: {
        id: waitlistEntry.id,
        email,
        isUpdate: waitlistEntry.created_at !== waitlistEntry.updated_at
      }
    });

  } catch (error) {
    logger.error('Database error during waitlist signup:', error);
    throw new CustomError('Failed to add to waitlist', 500);
  } finally {
    client.release();
  }
}));

export { router as formsRouter };
