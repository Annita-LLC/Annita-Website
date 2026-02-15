"use client"

import SEOHead from '@/components/seo/SEOHead'
import HeroSection from '@/components/sections/cookies/HeroSection'
import NavigationSection from '@/components/sections/cookies/NavigationSection'
import ContentSections from '@/components/sections/cookies/ContentSections'
import FAQSection from '@/components/sections/cookies/FAQSection'
import ContactSection from '@/components/sections/cookies/ContactSection'

const CookiesPage = () => {
  const lastUpdated = "March 15, 2024"
  const effectiveDate = "March 15, 2024"

  const cookieCategories = [
    {
      category: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly and cannot be disabled.",
      examples: [
        "Authentication cookies to keep you logged in",
        "Security cookies to protect against fraud",
        "Session cookies to maintain your preferences",
        "Load balancing cookies for performance"
      ],
      duration: "Session to 1 year",
      canDisable: false
    },
    {
      category: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization.",
      examples: [
        "Language preference cookies",
        "Theme and layout preferences",
        "Form auto-fill cookies",
        "User interface customization"
      ],
      duration: "1 month to 1 year",
      canDisable: true
    },
    {
      category: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website.",
      examples: [
        "Google Analytics cookies",
        "Page view tracking",
        "User behavior analysis",
        "Performance monitoring"
      ],
      duration: "2 years",
      canDisable: true
    },
    {
      category: "Marketing Cookies",
      description: "These cookies are used to deliver relevant advertisements and track marketing campaigns.",
      examples: [
        "Social media tracking cookies",
        "Advertising network cookies",
        "Campaign performance tracking",
        "Retargeting cookies"
      ],
      duration: "1 month to 2 years",
      canDisable: true
    },
    {
      category: "Third-Party Cookies",
      description: "These cookies are set by third-party services integrated into our website.",
      examples: [
        "Payment processor cookies",
        "Social media plugin cookies",
        "Video player cookies",
        "Chat widget cookies"
      ],
      duration: "Varies by service",
      canDisable: true
    }
  ]

  const specificCookies = [
    {
      name: "_ga",
      purpose: "Google Analytics - Used to distinguish users",
      duration: "2 years",
      type: "Analytics"
    },
    {
      name: "_gid",
      purpose: "Google Analytics - Used to distinguish users",
      duration: "24 hours",
      type: "Analytics"
    },
    {
      name: "_gat",
      purpose: "Google Analytics - Used to throttle request rate",
      duration: "1 minute",
      type: "Analytics"
    },
    {
      name: "annita_session",
      purpose: "Maintains your session and login status",
      duration: "Session",
      type: "Essential"
    },
    {
      name: "annita_preferences",
      purpose: "Stores your language and theme preferences",
      duration: "1 year",
      type: "Functional"
    },
    {
      name: "annita_cart",
      purpose: "Stores items in your shopping cart",
      duration: "30 days",
      type: "Functional"
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - Annita",
    "description": "Cookie policy for Annita's digital ecosystem. User control and privacy protection for MSMEs, governments, and partners.",
    "url": "https://www.an-nita.com/cookies",
    "mainEntity": {
      "@type": "Organization",
      "name": "Annita",
      "privacyPolicy": {
        "@type": "WebPage",
        "url": "https://www.an-nita.com/privacy"
      }
    }
  }

  return (
    <>
      <SEOHead
        title="Cookie Policy - Annita | Transparent Cookie Management & Privacy Control"
        description="Cookie policy for Annita's digital ecosystem. User control and privacy protection for MSMEs, governments, and partners."
        keywords={[
          'cookie policy',
          'cookie management',
          'cookie settings',
          'privacy control',
          'tracking technologies',
          'cookie preferences',
          'data privacy',
          'cookie consent',
          'annita cookies',
          'privacy protection',
          'cookie control',
          'user privacy',
          'tracking cookies',
          'analytics cookies',
          'functional cookies',
          'essential cookies',
          'cookie opt-out',
          'privacy settings',
          'data control',
          'cookie notice',
          'cookie information',
          'cookie usage',
          'cookie types',
          'cookie categories',
          'cookie duration',
          'cookie storage',
          'cookie deletion',
          'cookie blocking',
          'cookie acceptance',
          'cookie rejection',
          'cookie compliance'
        ]}
        canonical="/cookies"
        ogImage="/images/cookie-policy.jpg"
        structuredData={structuredData}
      />

      <div className="min-h-screen">
        {/* Hero Section - Cookie Transparency & Control */}
        <HeroSection />

        {/* Navigation Section - Easy Access to Cookie Information */}
        <NavigationSection />

        {/* Content Sections - Detailed Cookie Information */}
        <ContentSections />

        {/* FAQ Section - Common Cookie Questions */}
        <FAQSection />

        {/* Contact Section - Cookie Support & Privacy Help */}
        <ContactSection />
      </div>
    </>
  )
}

export default CookiesPage
