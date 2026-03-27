# Annita Website Deployment Guide

This guide covers the complete deployment setup for the Annita website with the new Fortune 500 level backend.

## Overview

- **Frontend**: Next.js application hosted on Netlify
- **Backend**: Node.js/TypeScript API hosted on Railway with PostgreSQL
- **Database**: Railway PostgreSQL (managed)
- **Email**: Resend for transactional emails

## Recent Changes Made

### ✅ SEO Updates
- Changed all "digital platform" references to "digital ecosystem" across the site
- Updated SEOHead component defaults
- Updated homepage structured data and keywords
- Updated career page SEO

### ✅ Career Page Vacancies
- Added "Open Positions" section with detailed job listings
- Frontend Developer position with optional degree requirement
- DevOps Engineer position with optional degree requirement
- Salary disclosure note ("disclosed after first interview phase")
- Application buttons for each position
- Professional styling with company branding

### ✅ Favicon Updates
- Created favicon files referencing company logo
- Updated favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
- All favicon files now use the company logo at `/images/logo/annita-real-logo.png`

### ✅ Backend Replacement
- Deleted old backend directory completely
- Created new Fortune 500 level backend with:
  - TypeScript for type safety
  - Railway PostgreSQL integration
  - Enterprise security (JWT, rate limiting, CORS, helmet)
  - Comprehensive form handling for all site forms
  - Staff portal with authentication and dashboard
  - Email notifications via Resend
  - Winston logging with structured output
  - Health check endpoints
  - Error handling and validation
  - Connection pooling and performance optimization

### ✅ Staff Portal SEO Hiding
- Staff portal routes are configured for noindex
- Proper authentication and access control
- Activity logging and audit trails

## Frontend Deployment (Netlify)

The frontend is already configured for Netlify deployment. No changes needed.

## Backend Deployment (Railway)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Implement Fortune 500 level backend with Railway integration"
git push origin main
```

### Step 2: Railway Setup

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up and connect your GitHub account

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your Annita repository
   - Railway will detect the Node.js application

3. **Add PostgreSQL Plugin**
   - In your Railway project, click "Add Plugin"
   - Select "PostgreSQL" from the marketplace
   - This will create a managed PostgreSQL database

4. **Configure Environment Variables**
   
   Set these in Railway project settings:

   **Database** (Railway provides automatically):
   - `DATABASE_URL` - Auto-populated by Railway PostgreSQL plugin

   **Security**:
   - `JWT_SECRET` - Generate a secure 256-bit key
   - `STAFF_JWT_SECRET` - Generate a different secure key
   - `BCRYPT_ROUNDS` - `12`

   **Server**:
   - `NODE_ENV` - `production`
   - `PORT` - `3001`
   - `CORS_ORIGIN` - `https://www.an-nita.com`
   - `CORS_CREDENTIALS` - `true`

   **Email** (Resend):
   - `RESEND_API_KEY` - Get from [resend.com](https://resend.com)
   - `RESEND_FROM_EMAIL` - `noreply@an-nita.com`
   - `RESEND_TO_EMAIL` - `admin@an-nita.com`
   - `APP_NAME` - `Annita`

   **Rate Limiting**:
   - `RATE_LIMIT_WINDOW_MS` - `900000` (15 minutes)
   - `RATE_LIMIT_MAX_REQUESTS` - `100`

   **Logging**:
   - `LOG_LEVEL` - `info`
   - `LOG_FILE_PATH` - `./logs/app.log`

5. **Deploy**
   - Railway will automatically deploy when you save the environment variables
   - Monitor the deployment logs for any issues

6. **Get Backend URL**
   - Once deployed, Railway will provide a URL like: `https://your-app-name.railway.app`
   - This is your `BACKEND_URL`

### Step 3: Update Frontend Environment

In Netlify, set the environment variable:
- `BACKEND_URL` - Your Railway backend URL

### Step 4: Test Integration

1. **Health Check**: Visit `https://your-backend-url.railway.app/health`
2. **Form Submission**: Test a contact form on the website
3. **Email Notifications**: Verify emails are being sent
4. **Staff Portal**: Test staff login (create staff user in database first)

## Staff Portal Setup

### Create First Staff User

Connect to your Railway PostgreSQL database and run:

```sql
INSERT INTO staff_users (
  email,
  password_hash,
  first_name,
  last_name,
  role,
  permissions,
  is_active
) VALUES (
  'admin@an-nita.com',
  '$2a$12$your-bcrypt-hashed-password',
  'Admin',
  'User',
  'admin',
  '["read", "write", "delete", "admin"]',
  true
);
```

To generate a bcrypt hash, you can use an online tool or Node.js:
```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('your-password', 12).then(console.log);
```

### Access Staff Portal

1. Login at: `POST /api/staff/login`
2. Access dashboard with JWT token
3. View submissions, activity logs, and statistics

## Monitoring

### Health Checks
- Basic: `/health`
- Detailed: `/health/detailed`

### Logs
- Check Railway deployment logs
- Application logs in `/logs` directory
- Error tracking with structured logging

### Performance
- Monitor response times
- Check database connection pool status
- Review rate limiting metrics

## Security Considerations

### Production Checklist
- [ ] JWT secrets are secure (256-bit minimum)
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] SSL certificates are valid
- [ ] Database access is restricted
- [ ] API keys are not exposed
- [ ] Staff portal is not indexed by search engines

### Backup Strategy
- Railway provides automatic database backups
- Consider additional backup strategy for critical data
- Test backup restoration process

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL environment variable
   - Verify PostgreSQL plugin is running
   - Check SSL configuration

2. **Email Not Sending**
   - Verify RESEND_API_KEY is valid
   - Check email configuration
   - Review email logs

3. **CORS Errors**
   - Verify CORS_ORIGIN matches frontend URL
   - Check if frontend is using HTTPS

4. **Staff Login Failed**
   - Verify JWT secrets match
   - Check if staff user exists in database
   - Review password hashing

### Debug Mode
Set `NODE_ENV=development` and `LOG_LEVEL=debug` for detailed logging.

## Performance Optimization

### Backend
- Connection pooling is configured (max 20 connections)
- Request compression enabled
- Rate limiting prevents abuse
- Health checks for monitoring

### Frontend
- Images are optimized
- Code splitting implemented
- Caching headers configured
- CDN ready

## Scaling

The architecture is designed for horizontal scaling:
- Backend is stateless
- Database handles concurrent connections
- Load balancer ready
- Health checks for orchestration

## Support

For deployment issues:
1. Check Railway documentation
2. Review application logs
3. Test health check endpoints
4. Verify environment variables
5. Contact support if needed

## Next Steps

After successful deployment:

1. **Monitor Performance**: Set up monitoring alerts
2. **Test All Forms**: Verify all form submissions work
3. **Staff Training**: Train staff on portal usage
4. **Security Audit**: Conduct security review
5. **Backup Testing**: Test backup restoration
6. **Documentation**: Update internal documentation

The website is now ready with enterprise-grade backend infrastructure!
