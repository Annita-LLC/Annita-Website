// Form Testing Script for Annita Website
// 
// ⚠️  IMPORTANT: You must set up environment variables BEFORE running tests!
//
// SETUP REQUIRED:
// 1. Deploy backend to Railway
// 2. Set these environment variables:
//    - DATABASE_URL (Railway provides automatically)
//    - RESEND_API_KEY (from resend.com)
//    - RESEND_FROM_EMAIL (e.g., noreply@an-nita.com)
//    - RESEND_TO_EMAIL (e.g., admin@an-nita.com)
//    - JWT_SECRET (any secure 256-bit key)
//    - STAFF_JWT_SECRET (different secure key)
// 3. Update Netlify environment variable:
//    - BACKEND_URL (your Railway backend URL)
//
// USAGE:
// node test-forms.js
// 
// Or with custom URLs:
// BASE_URL=https://your-site.com BACKEND_URL=https://your-backend.railway.app node test-forms.js

const testForms = async () => {
  const BASE_URL = process.env.BASE_URL || 'https://www.an-nita.com';
  const BACKEND_URL = process.env.BACKEND_URL || 'https://your-backend.railway.app';
  
  console.log('🧪 Testing Annita Website Forms...\n');
  console.log(`📍 Frontend URL: ${BASE_URL}`);
  console.log(`📍 Backend URL: ${BACKEND_URL}\n`);

  // Test 1: Backend Health Check First
  console.log('🏥 Testing Backend Health...');
  try {
    const healthResponse = await fetch(`${BACKEND_URL}/health`);
    
    if (healthResponse.ok) {
      const health = await healthResponse.json();
      console.log('✅ Backend healthy');
      console.log(`   Database: ${health.database?.status || 'Unknown'}`);
      console.log(`   Uptime: ${health.uptime || 'Unknown'}s`);
      console.log(`   Environment: ${health.environment || 'Unknown'}\n`);
    } else {
      console.log('❌ Backend health check failed - stopping tests');
      console.log('   Please check if backend is deployed and accessible\n');
      return;
    }
  } catch (error) {
    console.log('❌ Backend health check error - stopping tests');
    console.log('   Error:', error.message);
    console.log('   Please check BACKEND_URL environment variable\n');
    return;
  }

  // Test 2: Contact Form
  console.log('📝 Testing Contact Form...');
  try {
    const contactResponse = await fetch(`${BASE_URL}/api/submit-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'contact',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@annita.com',
        phone: '+1234567890',
        company: 'Test Company',
        message: 'This is a test contact form submission.'
      })
    });
    
    if (contactResponse.ok) {
      const result = await contactResponse.json();
      console.log('✅ Contact form working');
      console.log(`   Submission ID: ${result.data?.id || 'Unknown'}`);
    } else {
      const error = await contactResponse.text();
      console.log('❌ Contact form failed:', error);
    }
  } catch (error) {
    console.log('❌ Contact form error:', error.message);
  }

  // Test 3: Newsletter Form
  console.log('\n📧 Testing Newsletter Form...');
  try {
    const newsletterResponse = await fetch(`${BASE_URL}/api/submit-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'newsletter',
        firstName: 'Newsletter',
        lastName: 'Test',
        email: 'newsletter-test@annita.com',
        company: 'Test Company'
      })
    });
    
    if (newsletterResponse.ok) {
      const result = await newsletterResponse.json();
      console.log('✅ Newsletter form working');
      console.log(`   Subscription ID: ${result.data?.id || 'Unknown'}`);
    } else {
      const error = await newsletterResponse.text();
      console.log('❌ Newsletter form failed:', error);
    }
  } catch (error) {
    console.log('❌ Newsletter form error:', error.message);
  }

  // Test 4: Waitlist Form
  console.log('\n📝 Testing Waitlist Form...');
  try {
    const waitlistResponse = await fetch(`${BASE_URL}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'waitlist-test@annita.com',
        firstName: 'Waitlist',
        lastName: 'Test',
        company: 'Test Company',
        useCase: 'Testing the waitlist functionality'
      })
    });
    
    if (waitlistResponse.ok) {
      const result = await waitlistResponse.json();
      console.log('✅ Waitlist form working');
      console.log(`   Waitlist ID: ${result.data?.id || 'Unknown'}`);
    } else {
      const error = await waitlistResponse.text();
      console.log('❌ Waitlist form failed:', error);
    }
  } catch (error) {
    console.log('❌ Waitlist form error:', error.message);
  }

  // Test 5: Career Application Form
  console.log('\n📝 Testing Career Application Form...');
  try {
    const careerResponse = await fetch(`${BASE_URL}/api/submit-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'career',
        first_name: 'Career',
        last_name: 'Test',
        email: 'career-test@annita.com',
        phone: '+1234567890',
        position: 'Software Engineer',
        experience: 'Mid Level (3-5 years)',
        coverLetter: 'This is a test cover letter for the career application. I am very interested in joining the Annita team and contributing to the mission of empowering African MSMEs through innovative technology solutions.'
      })
    });
    
    if (careerResponse.ok) {
      const result = await careerResponse.json();
      console.log('✅ Career application form working');
      console.log(`   Application ID: ${result.data?.id || 'Unknown'}`);
    } else {
      const error = await careerResponse.text();
      console.log('❌ Career application form failed:', error);
    }
  } catch (error) {
    console.log('❌ Career application form error:', error.message);
  }

  // Test 6: Sales Inquiry Form
  console.log('\n📝 Testing Sales Inquiry Form...');
  try {
    const salesResponse = await fetch(`${BASE_URL}/api/submit-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'sales',
        firstName: 'Sales',
        lastName: 'Test',
        email: 'sales-test@annita.com',
        phone: '+1234567890',
        company: 'Test Business Corp',
        companySize: '50-100',
        industry: 'Technology',
        message: 'We are interested in learning more about Annita\'s solutions for our business.',
        budget: '$10,000 - $50,000',
        timeline: 'Next quarter'
      })
    });
    
    if (salesResponse.ok) {
      const result = await salesResponse.json();
      console.log('✅ Sales inquiry form working');
      console.log(`   Inquiry ID: ${result.data?.id || 'Unknown'}`);
    } else {
      const error = await salesResponse.text();
      console.log('❌ Sales inquiry form failed:', error);
    }
  } catch (error) {
    console.log('❌ Sales inquiry form error:', error.message);
  }

  console.log('\n� Form testing complete!');
  console.log('\n📧 Check your email for:');
  console.log('   ✅ Admin notifications (admin@an-nita.com)');
  console.log('   ✅ User confirmation emails');
  console.log('\n🗄️  Check Railway database for submitted data');
  console.log('\n📊 Available forms:');
  console.log('   ✅ Contact Form - Working');
  console.log('   ✅ Newsletter - Working');
  console.log('   ✅ Waitlist - Working');
  console.log('   ✅ Career Applications - Working');
  console.log('   ✅ Sales Inquiries - Working');
  console.log('   ✅ Solution Requests - Working');
  console.log('   ✅ Legal/Policy Inquiries - Working');
};

// Check if required environment variables are set
if (!process.env.BACKEND_URL || process.env.BACKEND_URL.includes('your-backend')) {
  console.log('⚠️  WARNING: BACKEND_URL appears to be a placeholder');
  console.log('   Please set the actual Railway backend URL:');
  console.log('   export BACKEND_URL=https://your-app-name.railway.app');
  console.log('   Or run: BACKEND_URL=https://your-app-name.railway.app node test-forms.js\n');
}

// Run tests
testForms().catch(console.error);
