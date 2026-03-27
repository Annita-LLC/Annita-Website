'use client'

import { useState, useEffect } from 'react'
import SEOHead from '@/components/seo/SEOHead'
import HeroSection from '@/components/sections/hero/HeroSection'
import WelcomeModal from '@/components/ui/WelcomeModal'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import FeaturesSection from '@/components/sections/FeaturesSection'
import CountdownSection from '@/components/sections/CountdownSection'
import V3AnnouncementSection from '@/components/sections/V3AnnouncementSection'
import V1MarketplaceSection from '@/components/sections/V1MarketplaceSection'
import TrustedPartnersSection from '@/components/sections/TrustedPartnersSection'
import CTASection from '@/components/sections/CTASection'

// Home page specific CTA content
const homeCTAProps = {
  title: "Ready to Join Africa's Digital Ecosystem?",
  subtitle: "Access custom-built solutions tailored for MSMEs, governments, and strategic partners. Integrate e-commerce, fintech, AI, communication, marketing, logistics, and more into your operations."
}

export default function HomePage() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)
  
  useEffect(() => {
    // Show welcome modal after a short delay for better UX
    const timer = setTimeout(() => {
      setIsWelcomeModalOpen(true)
    }, 2000) // Show after 2 seconds

    return () => clearTimeout(timer)
  }, [])

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Annita - Africa's First AI-Powered All-in-One Digital Ecosystem",
    "description": "Annita is Africa's first all-in-one digital ecosystem, combining e-commerce, fintech, Artificial Intelligence, communication, marketing, logistics, and more into a single ecosystem. We empower MSMEs and individuals with innovative AI-powered solutions, connectivity, and convenience.",
    "url": "https://annita.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://annita.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Annita",
      "logo": {
        "@type": "ImageObject",
        "url": "https://annita.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Annita",
      "description": "Africa's first all-in-one digital ecosystem empowering MSMEs, governments, and strategic partners",
      "url": "https://annita.com",
      "logo": "https://annita.com/logo.png",
      "foundingDate": "2021",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Liberia",
        "addressRegion": "West Africa"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@an-nita.com"
      },
      "sameAs": [
        "https://twitter.com/annita_africa",
        "https://facebook.com/annita.africa",
        "https://linkedin.com/company/annita-africa",
        "https://instagram.com/annita_africa"
      ],
      "offers": {
        "@type": "Offer",
        "description": "All-in-one digital ecosystem for MSMEs, governments, and strategic partners",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  }

  return (
    <>
      <SEOHead
        title="Annita - Africa's First All-in-One Digital Ecosystem"
        description="Africa's first all-in-one digital ecosystem. Custom-built solutions for MSMEs, governments, and partners. Integrating e-commerce, fintech, AI, communication, marketing, logistics, and more."
        keywords={[
          'Annita',
          'Africa digital ecosystem',
          'all-in-one ecosystem',
          'e-commerce ecosystem',
          'fintech solutions',
          'AI services',
          'MSME empowerment',
          'African business ecosystem',
          'digital transformation',
          'payment gateway',
          'escrow services',
          'digital wallet',
          'on-demand delivery',
          'multivendor marketplace',
          'financial inclusion',
          'rural development',
          'women empowerment',
          'sustainable development',
          'job creation',
          'economic growth',
          'African Continental Free Trade Area',
          'AfCFTA',
          'Liberia',
          'West Africa',
          'business solutions',
          'logistics',
          'marketing',
          'communication',
          'African startups',
          'small business ecosystem',
          'micro-enterprises',
          'digital commerce',
          'mobile payments',
          'cross-border trade',
          'African innovation',
          'technology ecosystem',
          'business growth',
          'digital economy',
          'African entrepreneurship',
          'business tools',
          'digital services',
          'KYC verified businesses',
          'Smile ID verification',
          'escrow payment protection',
          'RFQ based sourcing',
          'multi-currency support',
          'African currencies',
          'pan-African network',
          'AfCFTA regions',
          'institutional backing',
          'African bank partnerships',
          'trade finance',
          'connected ecosystem',
          'continental trade tools',
          'verified suppliers',
          'authentic African suppliers',
          'quality assurance',
          'comprehensive certifications',
          'real-time conversion tracking',
          'integrated financing solutions',
          'African marketplace',
          'cross-border trade facilitation',
          'African business ecosystem',
          'verified users',
          'due diligence',
          'secure transactions',
          'African business features',
          'generic marketplace alternative',
          'African-focused ecosystem',
          'continental integration',
          'African trade ecosystem'
        ]}
        canonical="/"
        ogImage="/home-og-image.jpg"
        structuredData={homeStructuredData}
      />
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <FeaturesSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <CountdownSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <V3AnnouncementSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <V1MarketplaceSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <TrustedPartnersSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <CTASection {...homeCTAProps} />
        </ErrorBoundary>

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={isWelcomeModalOpen}
          onClose={() => {
            setIsWelcomeModalOpen(false)
          }}
        />

    </>
  )
}
