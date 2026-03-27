import React from 'react'
import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  twitterImage?: string
  structuredData?: object
  noIndex?: boolean
  noFollow?: boolean
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Annita - Africa's First All-in-One Digital Ecosystem",
  description = "Annita is Africa's premier digital ecosystem, offering integrated e-commerce, fintech, AI, and logistics solutions. Empowering 450M+ African MSMEs with innovative technology.",
  keywords = [
    'Annita',
    'Africa',
    'digital ecosystem',
    'e-commerce',
    'fintech',
    'AI',
    'MSMEs',
    'logistics',
    'marketing',
    'communication',
    'African Continental Free Trade Area',
    'AfCFTA',
    'Liberia',
    'West Africa',
    'digital transformation',
    'business solutions',
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
    'economic growth'
  ],
  canonical,
  ogImage = '/og-image.jpg',
  twitterImage = '/twitter-image.jpg',
  structuredData,
  noIndex = false,
  noFollow = false,
  article
}) => {
  const fullTitle = title.includes('Annita') ? title : `${title} | Annita`
  const fullCanonical = canonical ? `https://www.an-nita.com${canonical}` : 'https://www.an-nita.com'
  
  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Annita",
    "url": "https://www.an-nita.com",
    "logo": "https://www.an-nita.com/logo.png",
    "description": "Africa's premier digital ecosystem, offering integrated e-commerce, fintech, AI, and logistics solutions.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Duazon",
      "addressRegion": "Monrovia",
      "addressCountry": "Liberia",
      "streetAddress": "Silver Beach Road"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+231-77-505-7227",
      "contactType": "customer service",
      "email": "annitallc@gmail.com",
      "availableLanguage": ["English", "French"]
    },
    "sameAs": [
      "https://facebook.com/annita.africa",
      "https://twitter.com/annita_africa",
      "https://instagram.com/annita.africa",
      "https://linkedin.com/company/annita-africa",
      "https://youtube.com/@annita.africa"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Annita Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AnnitaPay",
            "description": "Digital payment solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AnnitaShop",
            "description": "E-commerce platform"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AnnitaTech",
            "description": "AI and technology services"
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Liberia"
      },
      {
        "@type": "Country",
        "name": "Nigeria"
      },
      {
        "@type": "Country",
        "name": "Ghana"
      },
      {
        "@type": "Country",
        "name": "Kenya"
      },
      {
        "@type": "Country",
        "name": "South Africa"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 6.3004,
        "longitude": -10.7969
      },
      "geoRadius": "5000000"
    }
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Annita Team" />
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="LR" />
      <meta name="geo.country" content="Liberia" />
      <meta name="geo.placename" content="Duazon, Monrovia" />
      <meta name="geo.position" content="6.3004;-10.7969" />
      <meta name="ICBM" content="6.3004, -10.7969" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Annita" />
      <meta property="og:locale" content="en_US" />
             <meta property="og:image" content={`https://www.an-nita.com${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      
      {/* Article specific Open Graph tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@annita_africa" />
      <meta name="twitter:creator" content="@annita_africa" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
             <meta name="twitter:image" content={`https://www.an-nita.com${twitterImage}`} />
      <meta name="twitter:image:alt" content={fullTitle} />
      
      {/* Additional Social Media Meta Tags */}
      <meta name="facebook:app_id" content="your-facebook-app-id" />
      <meta name="facebook:pages" content="annita.africa" />
      
      {/* LinkedIn Meta Tags */}
      <meta property="linkedin:owner" content="annita-africa" />
      <meta property="linkedin:page_id" content="annita-africa" />
      
      {/* WhatsApp Meta Tags */}
      <meta property="og:image:type" content="image/jpeg" />
             <meta property="og:image:secure_url" content={`https://www.an-nita.com${ogImage}`} />
      
      {/* Business Meta Tags */}
      <meta name="business:contact_data:street_address" content="Duazon, Silver Beach Road" />
      <meta name="business:contact_data:locality" content="Monrovia" />
      <meta name="business:contact_data:region" content="Liberia" />
      <meta name="business:contact_data:postal_code" content="1000" />
      <meta name="business:contact_data:country_name" content="Liberia" />
      <meta name="business:contact_data:phone_number" content="+231-77-505-7227" />
      <meta name="business:contact_data:email" content="annitallc@gmail.com" />
             <meta name="business:contact_data:website" content="https://www.an-nita.com" />
      
      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Annita" />
      <meta name="application-name" content="Annita" />
      <meta name="theme-color" content="#003366" />
      <meta name="msapplication-TileColor" content="#003366" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* DNS Prefetch and Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || defaultStructuredData)
        }}
      />
      
      {/* Additional SEO Meta Tags */}
      <meta name="rating" content="General" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Security Meta Tags */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Verification Meta Tags */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      
      {/* Performance Meta Tags */}
      <meta name="generator" content="Next.js" />
      <meta name="framework" content="Next.js" />
      <meta name="build-time" content={new Date().toISOString()} />
    </Head>
  )
}

export default SEOHead
