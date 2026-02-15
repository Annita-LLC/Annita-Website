'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import SEOHead from '@/components/seo/SEOHead'
import HeroSection from '@/components/sections/hero/HeroSection'
import WelcomeModal from '@/components/ui/WelcomeModal'

// Lazy-load below-the-fold sections to reduce initial payload
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), { ssr: false })
const V3AnnouncementSection = dynamic(() => import('@/components/sections/V3AnnouncementSection'), { ssr: false })
const V1MarketplaceSection = dynamic(() => import('@/components/sections/V1MarketplaceSection'), { ssr: false })
const TrustedPartnersSection = dynamic(() => import('@/components/sections/TrustedPartnersSection'), { ssr: false })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false })

// Home page specific CTA content
const homeCTAProps = {
  title: "Ready to Join Africa's Digital Ecosystem?",
  subtitle: "Access custom-built solutions tailored for MSMEs, governments, and strategic partners. Integrate e-commerce, fintech, AI, communication, marketing, logistics, and more into your operations."
}

export default function HomePage() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('annita-welcome-seen')

    if (!hasSeenWelcome) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsWelcomeModalOpen(true)
      }, 2000) // Show after 2 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Annita - Africa's First AI-Powered All-in-One Digital Platform",
    "description": "Annita is Africa's first all-in-one digital platform, combining e-commerce, fintech, Artificial Intelligence, communication, marketing, logistics, and more into a single ecosystem. We empower MSMEs and individuals with innovative AI-powered solutions, connectivity, and convenience.",
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
        "email": "annitallc@gmail.com"
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
          'Africa digital platform',
          'all-in-one platform',
          'e-commerce platform',
          'fintech solutions',
          'AI services',
          'MSME empowerment',
          'African business platform',
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
          'small business platform',
          'micro-enterprises',
          'digital commerce',
          'mobile payments',
          'cross-border trade',
          'African innovation',
          'technology platform',
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
          'African-focused platform',
          'continental integration',
          'African trade platform'
        ]}
        canonical="/"
        ogImage="/home-og-image.jpg"
        structuredData={homeStructuredData}
      />
        <HeroSection />
        <FeaturesSection />
        <V3AnnouncementSection />
        <V1MarketplaceSection />
        <TrustedPartnersSection />
        <CTASection {...homeCTAProps} />

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={isWelcomeModalOpen}
          onClose={() => setIsWelcomeModalOpen(false)}
        />
    </>
  )
}
