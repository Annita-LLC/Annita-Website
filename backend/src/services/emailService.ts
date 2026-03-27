/**
 * Email Service powered by Resend
 * Transactional email delivery with verified domains and rich templates
 */
import { Resend } from 'resend';

let resendClient: Resend | null = null;
let missingKeyLogged = false;

const DEFAULT_BRAND_LOGO =
  process.env.BRAND_LOGO_URL ||
  `${process.env.FRONTEND_URL || 'https://www.an-nita.com'}/images/logo/annita-real-logo.png`;

const wrapWithBrand = (content: string) => {
  const brandName = 'Annita';
  const sendTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media only screen and (max-width: 600px) {
          .email-container { 
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          .content-padding { 
            padding: 20px 16px !important; 
          }
          .footer-padding {
            padding: 20px 16px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 20px 16px;">
            <table class="email-container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff;">
              
              <!-- Header with brand badge -->
              <tr>
                <td style="padding: 24px 20px 16px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align: middle;">
                        <!-- Brand logo -->
                        <img src="${DEFAULT_BRAND_LOGO}" alt="${brandName}" style="height: 32px; width: auto; max-width: 120px;" />
                      </td>
                      <td align="right" style="vertical-align: middle;">
                        <span style="color: #65676B; font-size: 13px;">${sendTime}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td class="content-padding" style="padding: 0 20px 24px;">
                  ${content}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" class="footer-padding" style="padding: 24px 20px; border-top: 1px solid #E4E6EB; text-align: center;">
                  <!-- Email verification link -->
                  <p style="margin: 0 0 16px; color: #65676B; font-size: 13px; line-height: 1.5; text-align: center;">
                    Wondering if this email is really from us? Visit our website to confirm: <a href="https://www.an-nita.com/help/check-email" style="color: #1877F2; text-decoration: none;">www.an-nita.com/help/check-email</a>
                  </p>

                  <!-- Divider -->
                  <div style="border-top: 1px solid #E4E6EB; margin: 16px auto; max-width: 400px;"></div>

                  <!-- Copyright -->
                  <p style="margin: 0 0 12px; color: #65676B; font-size: 12px; line-height: 1.5; text-align: center;">
                    &copy; ${new Date().getFullYear()} All rights reserved. Monrovia, Liberia.
                  </p>

                  <!-- Contact -->
                  <p style="margin: 0 0 16px; color: #65676B; font-size: 12px; line-height: 1.5; text-align: center;">
                    Need help? <a href="mailto:admin@an-nita.com" style="color: #1877F2; text-decoration: none;">admin@an-nita.com</a> &nbsp;|&nbsp; <a href="https://www.an-nita.com" style="color: #1877F2; text-decoration: none;">www.an-nita.com</a>
                  </p>

                  <!-- Recipient info -->
                  <p style="margin: 0; color: #65676B; font-size: 12px; line-height: 1.5; text-align: center;">
                    To help keep your account secure, please don't forward this email. <a href="https://www.an-nita.com/help" style="color: #1877F2; text-decoration: none;">Learn more</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const getResendClient = (): Resend | null => {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      if (!missingKeyLogged) {
        console.error(' CRITICAL: RESEND_API_KEY is not configured. Email sending is DISABLED.');
        console.error(' Set RESEND_API_KEY in your environment (Resend dashboard → API Keys).');
        missingKeyLogged = true;
      }
      return null;
    }

    resendClient = new Resend(process.env.RESEND_API_KEY);
    console.log(' Resend email client initialized');
  }
  return resendClient;
};

export const isEmailServiceConfigured = (): boolean => {
  return getResendClient() !== null;
};

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

/**
 * Send an email using Resend
 * Handles transactional delivery with graceful error reporting
 */
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const resend = getResendClient();

  if (!resend) {
    const errorMsg = 'Email sending failed: RESEND_API_KEY not configured.';
    console.error(` ${errorMsg}`);
    throw new Error(errorMsg);
  }

  const toAddresses = Array.isArray(options.to) ? options.to : [options.to];
  const fromAddress = options.from || process.env.RESEND_FROM_EMAIL || 'noreply@an-nita.com';

  console.log(` Preparing to send email to: ${toAddresses.join(', ')}`);
  console.log(` From: ${fromAddress}`);
  console.log(` Subject: ${options.subject}`);

  try {
    const response = await resend.emails.send({
      from: fromAddress,
      to: toAddresses,
      subject: options.subject,
      html: wrapWithBrand(options.html),
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    });

    console.log(` Email queued via Resend for: ${toAddresses.join(', ')}`);
    const messageId = response?.data?.id;
    if (messageId) {
      console.log(` Resend Message ID: ${messageId}`);
    }

    console.log(` Email sent successfully - Subject: "${options.subject}"`);
  } catch (error: unknown) {
    console.error(' Failed to send email via Resend:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(` Email failed - Subject: "${options.subject}", Error: ${errorMessage}`);
    throw new Error(`Email sending failed: ${errorMessage}`);
  }
};

/**
 * Send email notification to admin
 */
export const sendEmailNotification = async (
  subject: string,
  data: any,
  template: string
): Promise<void> => {
  try {
    const templates: { [key: string]: string } = {
      contact: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">📬</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">New Contact Inquiry</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Someone wants to connect with Annita</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 16px;color:#0c4a6e;font-size:18px;">Contact Information</h3>
            <div style="color:#475569;font-size:14px;line-height:1.8;">
              <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
            </div>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#475569;font-size:16px;">Message</h3>
            <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Reply to Email
            </a>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}
            </p>
          </div>
        </div>
      `,
      career: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">💼</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">New Career Application - Potential Team Member!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Someone wants to join the Annita mission</p>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">🎯 Candidate Priority Information</h3>
            <div style="color:#92400e;font-size:14px;line-height:1.8;">
              <div><strong>Position:</strong> ${data.position}</div>
              <div><strong>Name:</strong> ${data.first_name} ${data.last_name}</div>
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
              ${data.experience ? `<div><strong>Experience Level:</strong> ${data.experience}</div>` : ''}
              ${data.company ? `<div><strong>Current Company:</strong> ${data.company}</div>` : ''}
              ${data.education ? `<div><strong>Education:</strong> ${data.education}</div>` : ''}
              <div><strong>Application ID:</strong> #${Date.now().toString().slice(-6)}</div>
            </div>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">📋 Professional Links</h3>
            <div style="color:#0c4a6e;font-size:14px;line-height:1.8;">
              ${data.linkedinUrl ? `<div><strong>LinkedIn:</strong> <a href="${data.linkedinUrl}" style="color:#1877F2;text-decoration:none;">View Profile</a></div>` : ''}
              ${data.portfolioUrl ? `<div><strong>Portfolio:</strong> <a href="${data.portfolioUrl}" style="color:#1877F2;text-decoration:none;">View Portfolio</a></div>` : ''}
              ${data.resumeUrl ? `<div><strong>Resume:</strong> <a href="${data.resumeUrl}" style="color:#1877F2;text-decoration:none;">Download Resume</a></div>` : ''}
            </div>
          </div>

          ${data.coverLetter ? `
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
              <h3 style="margin:0 0 12px;color:#475569;font-size:16px;">📝 Cover Letter</h3>
              <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.coverLetter}</p>
            </div>
          ` : ''}

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🚀 Recruitment Process Timeline</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Send acknowledgment and application confirmation</li>
              <li><strong>24-48 hours:</strong> Initial screening and qualification review</li>
              <li><strong>Week 1:</strong> Technical assessment and first interview</li>
              <li><strong>Week 2:</strong> Team interviews and cultural fit assessment</li>
              <li><strong>Week 3:</strong> Final interview with leadership team</li>
              <li><strong>Week 4:</strong> Offer decision and onboarding preparation</li>
            </ul>
          </div>

          <div style="background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#075985;font-size:16px;">👥 Interview Team Structure</h3>
            <div style="color:#075985;font-size:14px;line-height:1.8;">
              <div><strong>HR Coordinator:</strong> Initial screening and process management</div>
              <div><strong>Hiring Manager:</strong> Technical assessment and team fit</div>
              <div><strong>Team Lead:</strong> Day-to-day collaboration evaluation</div>
              <div><strong>Senior Developer:</strong> Technical skills validation</div>
              <div><strong>CEO/CTO:</strong> Final cultural fit and vision alignment</div>
            </div>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              📧 Contact Candidate
            </a>
            <a href="tel:${data.phone}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              📞 Schedule Interview
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">📊 Candidate Evaluation Checklist:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              [ ] Technical skills assessment completed<br>
              [ ] Cultural fit evaluation conducted<br>
              [ ] Reference checks performed<br>
              [ ] Portfolio/work samples reviewed<br>
              [ ] Salary expectations aligned<br>
              [ ] Availability confirmed<br>
              [ ] Vision alignment verified<br>
              [ ] Team compatibility assessed
            </div>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}<br>
              Application ID: #${Date.now().toString().slice(-6)}<br>
              Follow-up required: YES - Priority recruitment
            </p>
          </div>
        </div>
      `,
      newsletter: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">📧</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">New Newsletter Subscription</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Someone subscribed to Annita updates</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 16px;color:#0c4a6e;font-size:18px;">Subscriber Information</h3>
            <div style="color:#475569;font-size:14px;line-height:1.8;">
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.firstName ? `<div><strong>Name:</strong> ${data.firstName} ${data.lastName || ''}</div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
            </div>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">Subscription Details</h3>
            <div style="color:#166534;font-size:14px;line-height:1.8;">
              <div><strong>Type:</strong> Newsletter Subscription</div>
              <div><strong>Status:</strong> ✅ Active</div>
              <div><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</div>
            </div>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Subscribed at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}
            </p>
          </div>
        </div>
      `,
      waitlist: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">⏳</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">New Waitlist Signup!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Someone joined the Annita waitlist</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 16px;color:#0c4a6e;font-size:18px;">Waitlist Information</h3>
            <div style="color:#475569;font-size:14px;line-height:1.8;">
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.firstName ? `<div><strong>Name:</strong> ${data.firstName} ${data.lastName || ''}</div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
              ${data.useCase ? `<div><strong>Use Case:</strong> ${data.useCase}</div>` : ''}
            </div>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">Waitlist Stats</h3>
            <div style="color:#166534;font-size:14px;line-height:1.8;">
              <div><strong>Status:</strong> ✅ Active</div>
              <div><strong>Joined at:</strong> ${new Date().toLocaleString()}</div>
              <div><strong>Priority:</strong> Standard</div>
            </div>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              📧 Contact Waitlist Member
            </a>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Joined at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}
            </p>
          </div>
        </div>
      `,
      ideas: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">💡</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">New Idea Submission - Innovation Alert!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Someone shared an innovative idea for Annita</p>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">🚀 Innovation Priority Information</h3>
            <div style="color:#92400e;font-size:14px;line-height:1.8;">
              <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
              <div><strong>Idea ID:</strong> #${Date.now().toString().slice(-6)}</div>
            </div>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">💡 The Innovation</h3>
            <p style="margin:0;color:#0c4a6e;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🎯 Innovation Evaluation Process</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Idea receipt and acknowledgment</li>
              <li><strong>24 hours:</strong> Initial feasibility assessment</li>
              <li><strong>Week 1:</strong> Innovation team review and scoring</li>
              <li><strong>Week 2:</strong> Market research and validation</li>
              <li><strong>Week 3:</strong> Technical feasibility analysis</li>
              <li><strong>Week 4:</strong> Innovation decision and feedback</li>
            </ul>
          </div>

          <div style="background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#075985;font-size:16px;">👥 Innovation Review Team</h3>
            <div style="color:#075985;font-size:14px;line-height:1.8;">
              <div><strong>Innovation Lead:</strong> Primary evaluation and coordination</div>
              <div><strong>Product Manager:</strong> Market fit and user impact assessment</div>
              <div><strong>Technical Lead:</strong> Feasibility and implementation review</div>
              <div><strong>Business Analyst:</strong> ROI and business model evaluation</div>
              <div><strong>UX Designer:</strong> User experience and interface assessment</div>
            </div>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              📧 Contact Innovator
            </a>
            <a href="tel:${data.phone}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              📞 Discuss Idea
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">📊 Innovation Evaluation Criteria:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              [ ] Market demand and user need assessment<br>
              [ ] Technical feasibility and complexity evaluation<br>
              [ ] Business model and revenue potential analysis<br>
              [ ] Competitive landscape and differentiation review<br>
              [ ] Resource requirements and timeline estimation<br>
              [ ] Strategic alignment with Annita mission<br>
              [ ] Scalability and growth potential assessment<br>
              [ ] Innovation score and priority ranking
            </div>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}<br>
              Idea ID: #${Date.now().toString().slice(-6)}<br>
              Follow-up required: YES - Innovation review
            </p>
          </div>
        </div>
      `,
      tips: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">📝</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">New Tip Submission - Community Insight!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Someone shared valuable feedback for Annita</p>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">🎯 Community Insight Information</h3>
            <div style="color:#92400e;font-size:14px;line-height:1.8;">
              <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
              <div><strong>Tip ID:</strong> #${Date.now().toString().slice(-6)}</div>
            </div>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">💡 The Community Tip</h3>
            <p style="margin:0;color:#0c4a6e;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🔄 Tip Review Process</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Tip receipt and acknowledgment</li>
              <li><strong>24 hours:</strong> Initial relevance assessment</li>
              <li><strong>Week 1:</strong> Community value evaluation</li>
              <li><strong>Week 2:</strong> Implementation feasibility review</li>
              <li><strong>Week 3:</strong> Priority ranking and planning</li>
              <li><strong>Week 4:</strong> Integration decision and feedback</li>
            </ul>
          </div>

          <div style="background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#075985;font-size:16px;">👥 Tip Review Team</h3>
            <div style="color:#075985;font-size:14px;line-height:1.8;">
              <div><strong>Community Lead:</strong> User feedback coordination</div>
              <div><strong>Product Manager:</strong> Feature relevance assessment</div>
              <div><strong>UX Researcher:</strong> User experience impact evaluation</div>
              <div><strong>Developer:</strong> Technical feasibility review</div>
              <div><strong>Support Lead:</strong> Customer service impact analysis</div>
            </div>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              📧 Thank Contributor
            </a>
            <a href="tel:${data.phone}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              📞 Discuss Feedback
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">📊 Tip Evaluation Criteria:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              [ ] Community value and impact assessment<br>
              [ ] Implementation feasibility and complexity review<br>
              [ ] User experience improvement evaluation<br>
              [ ] Strategic alignment with product roadmap<br>
              [ ] Resource requirements and timeline estimation<br>
              [ ] Priority ranking and urgency assessment<br>
              [ ] Integration with existing features review<br>
              [ ] Feedback score and community benefit analysis
            </div>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}<br>
              Tip ID: #${Date.now().toString().slice(-6)}<br>
              Follow-up required: YES - Community feedback
            </p>
          </div>
        </div>
      `,
      sales: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">💰</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">New Sales Inquiry - High Priority Lead!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Business opportunity from ${data.company}</p>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">🚀 Priority Information</h3>
            <div style="color:#92400e;font-size:14px;line-height:1.8;">
              <div><strong>Company:</strong> ${data.company}</div>
              ${data.companySize ? `<div><strong>Size:</strong> ${data.companySize}</div>` : ''}
              ${data.industry ? `<div><strong>Industry:</strong> ${data.industry}</div>` : ''}
              ${data.budget ? `<div><strong>Budget:</strong> ${data.budget}</div>` : ''}
              ${data.timeline ? `<div><strong>Timeline:</strong> ${data.timeline}</div>` : ''}
              <div><strong>Contact:</strong> ${data.firstName} ${data.lastName} - ${data.email}</div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
            </div>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">📋 Project Requirements</h3>
            <p style="margin:0;color:#0c4a6e;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🎯 Recommended Next Steps</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Send acknowledgment email (template ready)</li>
              <li><strong>Within 2 hours:</strong> Schedule discovery call</li>
              <li><strong>Before call:</strong> Research company and industry</li>
              <li><strong>During call:</strong> Identify specific pain points and requirements</li>
              <li><strong>After call:</strong> Send customized proposal within 48 hours</li>
              <li><strong>Ongoing:</strong> Weekly follow-ups until conversion</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              📧 Contact Client
            </a>
            <a href="tel:${data.phone}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              📞 Call Client
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">📊 Lead Qualification Checklist:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              [ ] Budget confirmed and sufficient<br>
              [ ] Decision-maker identified<br>
              [ ] Timeline established<br>
              [ ] Pain points clearly defined<br>
              [ ] Technical requirements understood<br>
              [ ] Stakeholder map created<br>
              [ ] Competitive analysis completed<br>
              [ ] ROI calculation prepared
            </div>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}<br>
              Lead ID: #${Date.now().toString().slice(-6)}<br>
              Follow-up required: YES
            </p>
          </div>
        </div>
      `,
      solution: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">🔧</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Custom Solution Request - Strategic Opportunity!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">High-value custom project from ${data.company}</p>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">🎯 Strategic Opportunity Details</h3>
            <div style="color:#92400e;font-size:14px;line-height:1.8;">
              <div><strong>Company:</strong> ${data.company}</div>
              ${data.companySize ? `<div><strong>Size:</strong> ${data.companySize}</div>` : ''}
              ${data.industry ? `<div><strong>Industry:</strong> ${data.industry}</div>` : ''}
              ${data.budget ? `<div><strong>Investment:</strong> ${data.budget}</div>` : ''}
              ${data.timeline ? `<div><strong>Deadline:</strong> ${data.timeline}</div>` : ''}
              <div><strong>Contact:</strong> ${data.firstName} ${data.lastName} - ${data.email}</div>
              ${data.phone ? `<div><strong>Direct Line:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
            </div>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">📋 Custom Requirements</h3>
            <p style="margin:0;color:#0c4a6e;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🚀 Custom Solution Development Process</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Phase 1 - Discovery (Week 1):</strong> Technical consultation, requirements gathering</li>
              <li><strong>Phase 2 - Architecture (Week 2):</strong> Custom solution design, technical specifications</li>
              <li><strong>Phase 3 - Development (Weeks 3-8):</strong> Build, test, iterate based on feedback</li>
              <li><strong>Phase 4 - Deployment (Week 9):</strong> Implementation, training, handover</li>
              <li><strong>Phase 5 - Support (Ongoing):</strong> Maintenance, updates, enhancements</li>
            </ul>
          </div>

          <div style="background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#075985;font-size:16px;">💡 Revenue Potential Analysis</h3>
            <div style="color:#075985;font-size:14px;line-height:1.8;">
              <div><strong>Estimated Project Value:</strong> ${data.budget || 'To be determined'}</div>
              <div><strong>Implementation Timeline:</strong> ${data.timeline || 'To be determined'}</div>
              <div><strong>Long-term Partnership Potential:</strong> HIGH</div>
              <div><strong>Referral Opportunities:</strong> Excellent (Industry leader)</div>
              <div><strong>Case Study Potential:</strong> Very High</div>
            </div>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              📧 Schedule Technical Call
            </a>
            <a href="tel:${data.phone}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              📞 Immediate Contact
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">🔍 Technical Assessment Checklist:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              [ ] Technical feasibility assessment<br>
              [ ] Resource requirements calculated<br>
              [ ] Integration complexity evaluated<br>
              [ ] Scalability considerations addressed<br>
              [ ] Security requirements identified<br>
              [ ] Performance benchmarks defined<br>
              [ ] Maintenance plan outlined<br>
              [ ] Success metrics established
            </div>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}<br>
              Project ID: #${Date.now().toString().slice(-6)}<br>
              Priority: HIGH - Custom Solution<br>
              Follow-up frequency: Weekly minimum
            </p>
          </div>
        </div>
      `,
      cookie: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">🍪</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Cookie Policy Inquiry</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Question about our cookie policy</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 16px;color:#0c4a6e;font-size:18px;">Contact Information</h3>
            <div style="color:#475569;font-size:14px;line-height:1.8;">
              <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
            </div>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#475569;font-size:16px;">Inquiry</h3>
            <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Respond to Inquiry
            </a>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}
            </p>
          </div>
        </div>
      `,
      privacy: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">🔒</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Privacy Policy Inquiry</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Question about our privacy policy</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 16px;color:#0c4a6e;font-size:18px;">Contact Information</h3>
            <div style="color:#475569;font-size:14px;line-height:1.8;">
              <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
            </div>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#475569;font-size:16px;">Inquiry</h3>
            <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Respond to Inquiry
            </a>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}
            </p>
          </div>
        </div>
      `,
      legal: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">⚖️</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Legal/Terms Inquiry</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Question about our terms of service</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 16px;color:#0c4a6e;font-size:18px;">Contact Information</h3>
            <div style="color:#475569;font-size:14px;line-height:1.8;">
              <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
              <div><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#1877F2;text-decoration:none;">${data.email}</a></div>
              ${data.phone ? `<div><strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#1877F2;text-decoration:none;">${data.phone}</a></div>` : ''}
              ${data.company ? `<div><strong>Company:</strong> ${data.company}</div>` : ''}
            </div>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#475569;font-size:16px;">Inquiry</h3>
            <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Respond to Inquiry
            </a>
          </div>

          <div style="border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px;">
            <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
              Submitted at: ${new Date().toLocaleString()}<br>
              IP Address: ${data.ip || 'Not recorded'}
            </p>
          </div>
        </div>
      `
    };

    const htmlContent = templates[template] || templates.contact;

    await sendEmail({
      to: process.env.RESEND_TO_EMAIL || 'admin@an-nita.com',
      subject: subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Don't throw error to avoid breaking form submission
  }
};

/**
 * Send confirmation email to user
 */
export const sendUserConfirmationEmail = async (
  userEmail: string,
  subject: string,
  template: string,
  data: any
): Promise<void> => {
  try {
    const confirmationTemplates: { [key: string]: string } = {
      waitlist: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
        </div>
      </div>
            <p style="margin:0;color:#64748b;font-size:16px;">Thank you for subscribing to our updates</p>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">What to Expect</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li>Weekly updates on our digital ecosystem</li>
              <li>Insights on African digital transformation</li>
              <li>Exclusive content and early access to features</li>
              <li>Success stories from MSMEs we're empowering</li>
              <li>Tips for growing your business in the digital age</li>
            </ul>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">Stay Connected</h3>
            <p style="margin:0;color:#92400e;font-size:14px;line-height:1.6;">
              Follow us on social media for real-time updates and join our community of forward-thinking African entrepreneurs and innovators.
            </p>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Explore Annita
            </a>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Want to customize your preferences? <a href="mailto:admin@an-nita.com" style="color:#1877F2;text-decoration:none;">Let us know</a>
          </p>
        </div>
      `,
      career: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">💼</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Welcome to the Annita Team Journey!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Thank you for applying for ${data.position}</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">📋 Application Details</h3>
            <div style="color:#475569;font-size:14px;line-height:1.8;">
              <div><strong>Position:</strong> ${data.position}</div>
              <div><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</div>
              <div><strong>Application ID:</strong> #${Date.now().toString().slice(-6)}</div>
              <div><strong>Status:</strong> Under Review</div>
            </div>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🚀 Your Recruitment Journey</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Application confirmation and receipt</li>
              <li><strong>24-48 hours:</strong> Initial screening notification</li>
              <li><strong>Week 1:</strong> Technical assessment invitation (if qualified)</li>
              <li><strong>Week 2:</strong> Team interviews and cultural fit discussions</li>
              <li><strong>Week 3:</strong> Final interview with leadership team</li>
              <li><strong>Week 4:</strong> Decision and offer communication</li>
            </ul>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">🎯 What We're Looking For</h3>
            <ul style="margin:0;padding-left:20px;color:#92400e;font-size:14px;line-height:1.8;">
              <li><strong>Technical Excellence:</strong> Proven skills in your domain</li>
              <li><strong>Cultural Alignment:</strong> Passion for African digital transformation</li>
              <li><strong>Innovation Mindset:</strong> Creative problem-solving abilities</li>
              <li><strong>Team Collaboration:</strong> Strong interpersonal skills</li>
              <li><strong>Growth Mindset:</strong> Continuous learning and improvement</li>
              <li><strong>Leadership Potential:</strong> Ability to take initiative and inspire others</li>
            </ul>
          </div>

          <div style="background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#075985;font-size:16px;">🌟 Why Join Annita</h3>
            <ul style="margin:0;padding-left:20px;color:#075985;font-size:14px;line-height:1.8;">
              <li><strong>Mission-Driven Work:</strong> Empower African MSMEs through technology</li>
              <li><strong>Innovation Culture:</strong> Cutting-edge technology and creative solutions</li>
              <li><strong>Growth Opportunities:</strong> Professional development and career advancement</li>
              <li><strong>Competitive Benefits:</strong> Comprehensive package and work-life balance</li>
              <li><strong>Global Impact:</strong> Work that matters across the African continent</li>
              <li><strong>Learning Environment:</strong> Collaborative team and knowledge sharing</li>
            </ul>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#475569;font-size:16px;">📞 Stay Connected</h3>
            <div style="color:#64748b;font-size:14px;line-height:1.8;">
              <div><strong>HR Contact:</strong> hr@an-nita.com</div>
              <div><strong>Response Time:</strong> Within 48 hours for qualified candidates</div>
              <div><strong>Interview Format:</strong> Virtual and in-person options available</div>
              <div><strong>Documentation:</strong> Keep your resume and portfolio updated</div>
            </div>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/careers" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              🚀 View More Opportunities
            </a>
            <a href="https://www.an-nita.com/about" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              🌍 Learn About Our Mission
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">💡 Interview Preparation Tips:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              <strong>Research:</strong> Learn about our mission and current projects<br>
              <strong>Prepare:</strong> Review your portfolio and key achievements<br>
              <strong>Questions:</strong> Prepare thoughtful questions about our team and culture<br>
              <strong>Technical:</strong> Be ready for practical assessments relevant to your role<br>
              <strong>Culture:</strong> Think about how you'll contribute to our mission<br>
              <strong>Availability:</strong> Confirm your interview availability and preferences
            </div>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Questions about your application? <a href="mailto:hr@an-nita.com" style="color:#1877F2;text-decoration:none;">Contact our HR team</a>
          </p>
        </div>
      `,
      ideas: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">💡</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Thank You for Your Innovation!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Your idea could transform African digital transformation</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">🚀 Your Innovation Journey</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Innovation receipt and confirmation</li>
              <li><strong>24 hours:</strong> Initial feasibility assessment notification</li>
              <li><strong>Week 1:</strong> Innovation team review and scoring</li>
              <li><strong>Week 2:</strong> Market research and validation process</li>
              <li><strong>Week 3:</strong> Technical feasibility analysis</li>
              <li><strong>Week 4:</strong> Innovation decision and detailed feedback</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🎯 What We Look For</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Market Demand:</strong> Real user needs and market opportunities</li>
              <li><strong>Technical Feasibility:</strong> Practical implementation possibilities</li>
              <li><strong>Business Model:</strong> Sustainable revenue and growth potential</li>
              <li><strong>Strategic Alignment:</strong> Fit with Annita's mission and vision</li>
              <li><strong>Scalability:</strong> Growth potential and expansion opportunities</li>
              <li><strong>Innovation Score:</strong> Originality and competitive advantage</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/innovation" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              🚀 View Innovation Hub
            </a>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Questions about your innovation? <a href="mailto:innovations@an-nita.com" style="color:#1877F2;text-decoration:none;">Contact our innovation team</a>
          </p>
        </div>
      `,
      tips: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">📝</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Thank You for Your Community Insight!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Your feedback helps us build better solutions for Africa</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">🔄 Your Feedback Journey</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Tip receipt and acknowledgment</li>
              <li><strong>24 hours:</strong> Initial relevance assessment notification</li>
              <li><strong>Week 1:</strong> Community value and impact evaluation</li>
              <li><strong>Week 2:</strong> Implementation feasibility and complexity review</li>
              <li><strong>Week 3:</strong> Priority ranking and development planning</li>
              <li><strong>Week 4:</strong> Integration decision and detailed feedback</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🎯 What Makes Great Feedback</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li><strong>Specific:</strong> Clear, detailed observations and suggestions</li>
              <li><strong>Actionable:</strong> Practical recommendations we can implement</li>
              <li><strong>User-Focused:</strong> Centered on improving user experience</li>
              <li><strong>Constructive:</strong> Balanced perspective with improvement ideas</li>
              <li><strong>Contextual:</strong> Relevant to specific features or use cases</li>
              <li><strong>Innovative:</strong> Fresh perspectives and creative solutions</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/community" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              👥 Join Community Forum
            </a>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Want to share more feedback? <a href="mailto:community@an-nita.com" style="color:#1877F2;text-decoration:none;">Contact our community team</a>
          </p>
        </div>
      `,
      contact: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">✉️</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Thank You for Contacting Us!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">We've received your message and will get back to you soon</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">What to Expect</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li>Our team will review your message within 24 hours</li>
              <li>You'll receive a personalized response</li>
              <li>We'll address your inquiry or connect you with the right team</li>
              <li>If needed, we'll schedule a call to discuss your needs in detail</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">While You Wait</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li>Explore our digital ecosystem features</li>
              <li>Learn about our mission to empower African MSMEs</li>
              <li>Read success stories from businesses like yours</li>
              <li>Connect with us on social media for updates</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Explore Annita
            </a>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Urgent inquiry? <a href="mailto:admin@an-nita.com" style="color:#1877F2;text-decoration:none;">Call us directly</a>
          </p>
        </div>
      `,
      sales: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">💰</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Thank You for Your Sales Inquiry!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">We're excited about partnering with ${data.company}</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">🚀 Your Partnership Journey</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li><strong>Immediate:</strong> Personalized acknowledgment from our sales team</li>
              <li><strong>Within 2 hours:</strong> Discovery call scheduling</li>
              <li><strong>24-48 hours:</strong> Customized proposal delivery</li>
              <li><strong>Week 1:</strong> Solution architecture presentation</li>
              <li><strong>Week 2:</strong> Detailed implementation roadmap</li>
              <li><strong>Ongoing:</strong> Dedicated account manager assignment</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">📋 What to Prepare</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li>Your specific business requirements and pain points</li>
              <li>Technical specifications and existing systems</li>
              <li>Decision-making timeline and key stakeholders</li>
              <li>Budget approval process and constraints</li>
              <li>Expected outcomes and success metrics</li>
              <li>Integration requirements with current tools</li>
            </ul>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">💡 Why Choose Annita for ${data.company}</h3>
            <ul style="margin:0;padding-left:20px;color:#92400e;font-size:14px;line-height:1.8;">
              <li>Tailored solutions for African business challenges</li>
              <li>Local expertise with global standards</li>
              <li>Comprehensive support and training</li>
              <li>Scalable architecture that grows with you</li>
              <li>Transparent pricing and no hidden costs</li>
              <li>Proven track record with similar businesses</li>
            </ul>
          </div>

          <div style="background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#075985;font-size:16px;">📊 Your Dedicated Partnership Team</h3>
            <div style="color:#075985;font-size:14px;line-height:1.8;">
              <div><strong>Sales Executive:</strong> Your primary point of contact</div>
              <div><strong>Solution Architect:</strong> Technical expert for your project</div>
              <div><strong>Project Manager:</strong> Oversees implementation timeline</div>
              <div><strong>Support Specialist:</strong> Ongoing assistance and training</div>
              <div><strong>Account Manager:</strong> Long-term relationship management</div>
            </div>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/solutions" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              🚀 Explore Our Solutions
            </a>
            <a href="https://www.an-nita.com/case-studies" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              📈 View Success Stories
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">📞 Stay Connected:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              <strong>Your Sales Executive:</strong> Will contact you within 2 hours<br>
              <strong>Direct Line:</strong> +231 (XXX) XXX-XXXX (provided in follow-up)<br>
              <strong>Email:</strong> sales@an-nita.com<br>
              <strong>Response Time:</strong> Always within 2 business hours<br>
              <strong>Support:</strong> 24/7 for active partners
            </div>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Questions about your partnership? <a href="mailto:sales@an-nita.com" style="color:#1877F2;text-decoration:none;">sales@an-nita.com</a>
          </p>
        </div>
      `,
      solution: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">🔧</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Your Custom Solution Journey Begins!</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">We're ready to build something amazing for ${data.company}</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">🎯 Your Custom Solution Development Timeline</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li><strong>Week 1 - Discovery:</strong> Deep dive into requirements, stakeholder interviews</li>
              <li><strong>Week 2 - Architecture:</strong> Technical design, solution blueprint creation</li>
              <li><strong>Weeks 3-4 - Prototyping:</strong> Proof of concept, user feedback integration</li>
              <li><strong>Weeks 5-7 - Development:</strong> Full build, testing, quality assurance</li>
              <li><strong>Week 8 - Integration:</strong> Deployment, data migration, system testing</li>
              <li><strong>Week 9 - Training:</strong> Team training, documentation, handover</li>
              <li><strong>Ongoing:</strong> Support, maintenance, enhancements</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">🛠️ What Makes Our Custom Solutions Special</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li>Built specifically for African business contexts</li>
              <li>Scalable architecture that grows with your success</li>
              <li>Integration with existing systems and workflows</li>
              <li>Comprehensive training and knowledge transfer</li>
              <li>Ongoing support and continuous improvement</li>
              <li>Local technical expertise and understanding</li>
            </ul>
          </div>

          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#92400e;font-size:16px;">👥 Your Custom Solution Team</h3>
            <div style="color:#92400e;font-size:14px;line-height:1.8;">
              <div><strong>Technical Lead:</strong> Senior architect overseeing your project</div>
              <div><strong>Project Manager:</strong> Day-to-day coordination and communication</div>
              <div><strong>Development Team:</strong> Expert developers specialized in your needs</div>
              <div><strong>QA Specialist:</strong> Quality assurance and testing</div>
              <div><strong>DevOps Engineer:</strong> Deployment and infrastructure</div>
              <div><strong>Support Engineer:</strong> Post-launch support and maintenance</div>
            </div>
          </div>

          <div style="background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#075985;font-size:16px;">📊 Success Metrics & KPIs</h3>
            <ul style="margin:0;padding-left:20px;color:#075985;font-size:14px;line-height:1.8;">
              <li>Performance benchmarks and uptime guarantees</li>
              <li>User adoption and satisfaction metrics</li>
              <li>ROI measurement and business impact analysis</li>
              <li>System performance and optimization tracking</li>
              <li>Regular progress reports and reviews</li>
              <li>Continuous improvement recommendations</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/portfolio" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;margin-right:10px;">
              🎨 View Our Portfolio
            </a>
            <a href="https://www.an-nita.com/technology" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              ⚙️ Our Technology Stack
            </a>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0;">
            <h4 style="margin:0 0 8px;color:#475569;font-size:14px;">🔄 Communication & Updates:</h4>
            <div style="color:#64748b;font-size:12px;line-height:1.6;">
              <strong>Weekly Progress Reports:</strong> Detailed updates every Friday<br>
              <strong>Sprint Reviews:</strong> Bi-weekly demo and feedback sessions<br>
              <strong>Direct Access:</strong> Slack/Teams channel for real-time communication<br>
              <strong>Stakeholder Updates:</strong> Monthly executive summaries<br>
              <strong>Emergency Support:</strong> 24/7 for critical issues<br>
              <strong>Documentation:</strong> Comprehensive technical and user documentation
            </div>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Technical questions? <a href="mailto:solutions@an-nita.com" style="color:#1877F2;text-decoration:none;">solutions@an-nita.com</a>
          </p>
        </div>
      `,
      cookie: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">🍪</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Cookie Policy Inquiry Received</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">We'll address your cookie policy questions promptly</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">What We'll Cover</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li>How we use cookies on our website</li>
              <li>Types of cookies we employ</li>
              <li>Your cookie preferences and controls</li>
              <li>Third-party cookie practices</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">Your Privacy Rights</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li>Control over cookie preferences</li>
              <li>Right to withdraw consent</li>
              <li>Transparent data practices</li>
              <li>GDPR and privacy law compliance</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/cookies" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Review Cookie Policy
            </a>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Privacy concerns? <a href="mailto:admin@an-nita.com" style="color:#1877F2;text-decoration:none;">Contact our privacy team</a>
          </p>
        </div>
      `,
      privacy: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">🔒</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Privacy Policy Inquiry Received</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">We take your privacy questions seriously</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">Our Privacy Commitment</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li>Transparent data collection practices</li>
              <li>Secure data storage and processing</li>
              <li>Limited data retention periods</li>
              <li>Your rights to access and delete data</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">Data Protection</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li>Encryption and security measures</li>
              <li>Regular security audits</li>
              <li>Compliance with privacy regulations</li>
              <li>Staff training on data protection</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/privacy" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Review Privacy Policy
            </a>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Privacy concerns? <a href="mailto:admin@an-nita.com" style="color:#1877F2;text-decoration:none;">Contact our privacy officer</a>
          </p>
        </div>
      `,
      legal: `
        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:8px;padding:24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:16px;">⚖️</div>
            <h1 style="margin:0 0 12px;color:#050505;font-size:24px;font-weight:700;">Legal Inquiry Received</h1>
            <p style="margin:0;color:#64748b;font-size:16px;">Our legal team will review your questions carefully</p>
          </div>

          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#0c4a6e;font-size:16px;">Legal Areas We Cover</h3>
            <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:14px;line-height:1.8;">
              <li>Terms of Service compliance</li>
              <li>User agreements and contracts</li>
              <li>Intellectual property matters</li>
              <li>Regulatory compliance</li>
            </ul>
          </div>

          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#166534;font-size:16px;">Our Legal Commitment</h3>
            <ul style="margin:0;padding-left:20px;color:#166534;font-size:14px;line-height:1.8;">
              <li>Clear and fair terms</li>
              <li>Transparent policies</li>
              <li>Regulatory compliance</li>
              <li>Professional legal counsel</li>
            </ul>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="https://www.an-nita.com/terms" style="display:inline-block;background:#1877F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 20px;border-radius:6px;">
              Review Terms of Service
            </a>
          </div>

          <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.5;text-align:center;">
            Legal questions? <a href="mailto:admin@an-nita.com" style="color:#1877F2;text-decoration:none;">Contact our legal team</a>
          </p>
        </div>
      `
    };

    const htmlContent = confirmationTemplates[template] || confirmationTemplates.contact;

    await sendEmail({
      to: userEmail,
      subject: subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Failed to send user confirmation email:', error);
    // Don't throw error to avoid breaking form submission
  }
};
