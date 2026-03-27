# Annita Backend API - Fortune 500 Level

Enterprise-grade backend API for Annita Website with Railway PostgreSQL integration.

## Features

- **🚀 Railway Integration**: Optimized for Railway cloud platform with PostgreSQL
- **🔒 Enterprise Security**: JWT authentication, rate limiting, CORS, helmet security
- **📝 Comprehensive Form Handling**: Contact, career, sales, solution inquiries
- **👥 Staff Portal**: Secure staff authentication and dashboard
- **📧 Email Notifications**: Resend integration for automated emails
- **📊 Logging & Monitoring**: Winston logging with structured output
- **🛡️ Error Handling**: Comprehensive error handling with proper HTTP status codes
- **⚡ Performance**: Connection pooling, compression, caching
- **🔍 Health Checks**: Built-in health monitoring endpoints

## Architecture

```
src/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── models/         # Data models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
├── utils/          # Utility functions
├── validators/     # Input validation
└── database/       # Database migrations
```

## Railway Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Set up these environment variables in Railway:

#### Database (Railway provides automatically)
- `DATABASE_URL` - Railway PostgreSQL connection string

#### Security
- `JWT_SECRET` - JWT secret key (minimum 256 bits)
- `STAFF_JWT_SECRET` - Staff portal JWT secret (different from main)
- `BCRYPT_ROUNDS` - Password hashing rounds (default: 12)

#### Server Configuration
- `NODE_ENV` - Set to "production"
- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - Frontend URL (https://www.an-nita.com)

#### Email (Resend)
- `RESEND_API_KEY` - Resend API key
- `RESEND_FROM_EMAIL` - From email address
- `RESEND_TO_EMAIL` - Admin notification email
- `APP_NAME` - Application name (Annita)

#### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 900000ms)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

### 3. Deploy to Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Node.js application
3. Add PostgreSQL plugin from Railway marketplace
4. Set environment variables
5. Deploy!

### 4. Database Initialization

The backend automatically creates all necessary tables on first startup:

- `contact_inquiries` - Contact form submissions
- `career_applications` - Job applications
- `business_inquiries` - Sales and solution inquiries
- `waitlist` - Email waitlist
- `staff_users` - Staff authentication
- `staff_sessions` - Staff session management
- `staff_activity_logs` - Activity auditing

## API Endpoints

### Health Checks
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system metrics

### Forms
- `POST /api/forms/submit` - Submit any form type
- `POST /api/forms/waitlist` - Add to waitlist

### Staff Portal
- `POST /api/staff/login` - Staff authentication
- `GET /api/staff/profile` - Get staff profile
- `GET /api/staff/submissions` - Get all submissions
- `GET /api/staff/submissions/:type/:id` - Get submission details
- `GET /api/staff/activity` - Get activity logs
- `GET /api/staff/dashboard/stats` - Dashboard statistics
- `POST /api/staff/logout` - Staff logout

## Form Types Supported

- `contact` - General contact inquiries
- `career` - Job applications
- `sales` - Sales inquiries
- `solution` - Custom solution requests
- `cookie` - Cookie policy inquiries
- `privacy` - Privacy policy inquiries
- `legal` - Legal/terms inquiries

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for frontend domain
- **Helmet Security**: Security headers and CSP
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Parameterized queries
- **Authentication**: JWT-based staff authentication
- **Activity Logging**: Complete audit trail

## Error Handling

All errors return consistent JSON format:
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "requestId": "uuid"
}
```

## Monitoring

### Health Check Response
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "used": 45.2,
    "total": 128.0,
    "external": 12.5
  },
  "database": {
    "connected": true,
    "status": "connected"
  },
  "environment": "production",
  "version": "2.0.0"
}
```

## Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Environment Setup
Copy `.env.example` to `.env` and configure for local development.

## Performance

- **Connection Pooling**: 20 max connections
- **Request Compression**: Gzip compression enabled
- **Response Caching**: Built-in caching headers
- **Database Indexing**: Optimized queries with indexes
- **Memory Management**: Efficient memory usage monitoring

## Scaling

The backend is designed to scale horizontally:
- Stateless architecture
- Database connection pooling
- Load balancer ready
- Health check endpoints
- Graceful shutdown handling

## Support

For issues and support:
- Check Railway logs for deployment issues
- Review application logs in `/logs` directory
- Monitor health check endpoint
- Check database connection status
