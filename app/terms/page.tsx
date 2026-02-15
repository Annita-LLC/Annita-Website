"use client"

import SEOHead from '@/components/seo/SEOHead'
import HeroSection from '@/components/sections/terms/HeroSection'
import NavigationSection from '@/components/sections/terms/NavigationSection'
import ContentSections from '@/components/sections/terms/ContentSections'
import FAQSection from '@/components/sections/terms/FAQSection'
import ContactSection from '@/components/sections/terms/ContactSection'

const TermsPage = () => {
  const lastUpdated = "March 15, 2024"
  const effectiveDate = "March 15, 2024"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Annita",
    "description": "Terms of service for Annita's digital ecosystem. User rights, obligations, and legal agreements for MSMEs, governments, and strategic partners.",
    "url": "https://www.an-nita.com/terms",
    "mainEntity": {
      "@type": "Organization",
      "name": "Annita",
      "termsOfService": {
        "@type": "WebPage",
        "url": "https://www.an-nita.com/terms"
      }
    }
  }

  return (
    <>
      <SEOHead
        title="Terms of Service - Annita | User Rights & Legal Agreement"
        description="Terms of service for Annita's digital ecosystem. User rights, obligations, and legal agreements for MSMEs, governments, and strategic partners."
        keywords={[
          'terms of service',
          'terms and conditions',
          'user agreement',
          'legal terms',
          'service agreement',
          'user rights',
          'platform terms',
          'business terms',
          'digital terms',
          'legal agreement',
          'user obligations',
          'terms of use',
          'service conditions',
          'legal framework',
          'business agreement',
          'digital agreement',
          'platform agreement',
          'annita terms',
          'legal compliance',
          'user terms',
          'service terms',
          'online agreement'
        ]}
        canonical="/terms"
        ogImage="/images/terms-of-service.jpg"
        structuredData={structuredData}
      />

      <div className="min-h-screen">
        {/* Hero Section - Clear Terms & Legal Clarity */}
        <HeroSection />

        {/* Navigation Section - Easy Access to All Terms Sections */}
        <NavigationSection />

        {/* Content Sections - Detailed Terms Information */}
        <ContentSections />

        {/* FAQ Section - Common Terms Questions */}
        <FAQSection />

        {/* Contact Section - Legal Team & Dispute Resolution */}
        <ContactSection />
      </div>
    </>
  )
}

export default TermsPage
