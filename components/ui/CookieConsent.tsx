'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Cookie, 
  X
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import CookieSettingsManager from '@/components/ui/CookieSettingsManager'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

interface CookieConsentProps {
  onPreferencesChange?: (preferences: CookiePreferences) => void
}

const CookieConsent = ({ onPreferencesChange }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check for existing consent in localStorage (persistent)
    const existingConsent = localStorage.getItem('annita-cookie-consent')
    
    // Check if popup has been shown in this session (new website load)
    const hasShownInSession = sessionStorage.getItem('annita-cookie-shown')
    
    if (existingConsent) {
      // Load and apply existing preferences
      try {
        const savedPreferences = JSON.parse(existingConsent)
        setPreferences(savedPreferences)
        
        // Apply preferences to tracking
        applyCookiePreferences(savedPreferences)
      } catch (error) {
        console.error('Error parsing saved cookie preferences:', error)
      }
    }

    // Show once per new visit/session (even if consent already exists)
    // For testing: always show the cookie banner
    const timer = setTimeout(() => {
      setIsVisible(true)
      sessionStorage.setItem('annita-cookie-shown', 'true')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Apply analytics tracking based on preferences
    if (prefs.analytics) {
      // Enable Google Analytics
      if (typeof window !== 'undefined') {
        (window as any).gtag = (window as any).gtag || function() {
          ((window as any).gtag as any).q = ((window as any).gtag as any).q || []
          ;((window as any).gtag as any).q.push(arguments)
        }
        // Initialize GA if not already done
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            'analytics_storage': 'granted'
          })
        }
      }
    } else {
      // Disable analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'denied'
        })
      }
    }

    // Apply marketing tracking
    if (prefs.marketing) {
      // Enable marketing cookies
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        })
      }
    } else {
      // Disable marketing cookies
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        })
      }
    }

    // Call callback if provided
    if (onPreferencesChange) {
      onPreferencesChange(prefs)
    }
  }

  const savePreferences = (newPreferences: CookiePreferences) => {
    const consentData = {
      preferences: newPreferences,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    
    localStorage.setItem('annita-cookie-consent', JSON.stringify(newPreferences))
    localStorage.setItem('annita-cookie-consent-date', new Date().toISOString())
    localStorage.setItem('annita-cookie-consent-full', JSON.stringify(consentData))
    
    setPreferences(newPreferences)
    applyCookiePreferences(newPreferences)
    setIsVisible(false)
    setIsSettingsOpen(false)
  }

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    savePreferences(allAccepted)
  }

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    savePreferences(essentialOnly)
  }

  const decline = () => {
    const declined = {
      essential: true, // Essential cookies cannot be declined
      analytics: false,
      marketing: false,
      functional: false
    }
    savePreferences(declined)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Bottom banner (offline-banner style) */}
      <AnimatePresence>
        {!isSettingsOpen && isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-0 right-0 z-[70] bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-orange-200" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      We use cookies to improve your experience.
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      You can accept all cookies or customize your choices.{' '}
                      <Link href="/cookies" className="underline underline-offset-2 hover:text-white">
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                  <div className="flex gap-2">
                    <button
                      onClick={acceptEssential}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-xs sm:text-sm font-medium"
                    >
                      Essential Only
                    </button>
                    <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-xs sm:text-sm font-medium"
                    >
                      Customize
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors text-xs sm:text-sm font-semibold"
                    >
                      Accept All
                    </button>
                  </div>

                  <button
                    onClick={acceptEssential}
                    aria-label="Close cookie banner"
                    className="self-end sm:self-auto w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-200" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookieSettingsManager
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false)
          // After closing, pull any saved preferences (CookieSettingsManager saves to localStorage)
          const existingConsent = localStorage.getItem('annita-cookie-consent')
          if (existingConsent) {
            try {
              const saved = JSON.parse(existingConsent)
              setPreferences(saved)
              applyCookiePreferences(saved)
            } catch {
              // ignore parse issues
            }
          }
          setIsVisible(false)
        }}
        onPreferencesChange={onPreferencesChange}
      />
    </>
  )
}

export default CookieConsent
