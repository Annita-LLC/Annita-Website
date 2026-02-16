import type { Metadata, Viewport } from 'next'
import { Zen_Dots, Lora } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import SiteChrome from '@/components/layout/SiteChrome'
import CookieConsent from '@/components/ui/CookieConsent'
import OfflineBanner from '@/components/ui/OfflineBanner'
import PerformanceOptimizer from '@/components/ui/PerformanceOptimizer'
import PerformanceMonitor from '@/components/ui/PerformanceMonitor'
import { ThemeProvider } from '@/lib/theme'

const zenDots = Zen_Dots({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-zen-dots',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
  preload: false, // Only preload critical fonts
  fallback: ['Georgia', 'serif']
})

export const metadata: Metadata = {
  title: {
    default: 'Annita - Africa\'s First All-in-One Digital Platform',
    template: '%s | Annita'
  },
  description: "Annita is Africa’s first all-in-one digital ecosystem—integrating e-commerce, fintech, AI, communication, marketing, logistics, and more into a single, connected system. Built for both online and offline access, Annita delivers custom-built solutions for MSMEs, governments, and strategic partners across the continent. We design and deploy tailored digital infrastructure that empowers individuals and organizations with innovative tools, seamless connectivity, and real economic opportunity.",
  keywords: [
    'Annita',
    'Annita Africa',
    'Annita digital ecosystem',
    'Annita platform',
    'Annita fintech',
    'Annita e-commerce',
    'Annita AI',
    'Annita communication',
    'Annita marketing',
    'Annita logistics',
    'Africa',
    'digital platform',
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
    'economic growth',
    'African tech',
    'digital payments',
    'mobile money',
    'business automation',
    'supply chain',
    'cross-border trade',
    'African innovation',
    'tech startup',
    'digital economy'
  ],
  authors: [{ name: 'Annita Team' }],
  creator: 'Annita',
  publisher: 'Annita',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.an-nita.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.an-nita.com',
    title: 'Annita - Africa\'s First All-in-One Digital Platform',
    description: 'Africa\'s first all-in-one digital ecosystem integrating e-commerce, fintech, AI, communication, marketing, logistics, and more.',
    siteName: 'Annita',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Annita - Africa\'s Digital Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annita - Africa\'s First All-in-One Digital Platform',
    description: 'Africa\'s first all-in-one digital ecosystem integrating e-commerce, fintech, AI, communication, marketing, logistics, and more.',
    images: ['/twitter-image.jpg'],
    creator: '@annita_africa',
    site: '@annita_africa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Business',
  other: {
    'msapplication-TileColor': '#0ea5e9',
    'theme-color': '#0ea5e9',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Annita',
    'application-name': 'Annita',
    'mobile-web-app-capable': 'yes',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: ['/favicon.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${zenDots.variable} ${lora.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="theme-color" content="#0ea5e9" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Annita",
                             "url": "https://www.an-nita.com",
               "logo": "https://www.an-nita.com/logo.png",
              "description": "Annita is Africa's first all-in-one digital ecosystem—integrating e-commerce, fintech, AI, communication, marketing, logistics, and more into a single, connected system. Built for both online and offline access, Annita delivers custom-built solutions for MSMEs, governments, and strategic partners across the continent. We design and deploy tailored digital infrastructure that empowers individuals and organizations with innovative tools, seamless connectivity, and real economic opportunity.",
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
                "description": "All-in-one digital platform for MSMEs",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={`${zenDots.variable} ${lora.variable} antialiased`}>
        <ThemeProvider>
          <PerformanceOptimizer>
            <SiteChrome>{children}</SiteChrome>
          </PerformanceOptimizer>
          <Analytics />
          <CookieConsent />
          <OfflineBanner />
          <PerformanceMonitor />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
