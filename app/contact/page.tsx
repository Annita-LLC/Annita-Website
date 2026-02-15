"use client"

import SEOHead from '@/components/seo/SEOHead'
import HeroSection from '@/components/sections/contact/HeroSection'
import ContactMethodsSection from '@/components/sections/contact/ContactMethodsSection'
import ContactFormSection from '@/components/sections/contact/ContactFormSection'

const ContactPage = () => {

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Annita - Get Support and Assistance",
    "description": "Contact Annita for custom solutions and support. Reach out about our digital ecosystem for MSMEs, governments, and partners across Africa.",
    "url": "https://annita.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Annita",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "annitallc@gmail.com",
          "telephone": "+231 123 456 789",
          "availableLanguage": ["English", "French", "Portuguese"]
        }
      ]
    }
  }

  return (
    <>
      <SEOHead
        title="Contact Us - Get Support and Assistance | Annita"
        description="Contact Annita for custom solutions and support. Reach out about our digital ecosystem for MSMEs, governments, and partners across Africa."
        keywords={[
          'contact Annita',
          'Annita support',
          'customer service',
          'technical support',
          'business inquiry',
          'partnership contact',
          'help desk',
          'customer care',
          'support team',
          'contact information',
          'phone support',
          'email support',
          'live chat',
          'business hours',
          'response time',
          'customer assistance',
          'technical assistance',
          'business development',
          'partnership opportunities',
          'enterprise contact',
          'sales inquiry',
          'billing support',
          'account help',
          'platform support',
          'African support',
          'local support',
          'multilingual support',
          '24/7 support',
          'urgent support',
          'priority support'
        ]}
        canonical="/contact"
        ogImage="/contact-og-image.jpg"
        structuredData={contactStructuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <HeroSection />
        <ContactMethodsSection />
        <ContactFormSection />
      </div>
    </>
  )
}

export default ContactPage
