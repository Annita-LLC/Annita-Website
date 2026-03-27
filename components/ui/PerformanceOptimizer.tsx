'use client'

import { useEffect, useState } from 'react'

interface PerformanceOptimizerProps {
  children: React.ReactNode
}

const PerformanceOptimizer = ({ children }: PerformanceOptimizerProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    // Detect low-end devices
    const checkDevicePerformance = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const memory = (performance as any).memory
      
      // Check for slow connection
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.saveData
      )
      
      // Check for low memory
      const isLowMemory = memory && memory.jsHeapSizeLimit < 100000000 // Less than 100MB
      
      // Check for low-end device indicators
      const isLowEnd = isSlowConnection || isLowMemory || 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
      
      setIsLowEndDevice(isLowEnd)
    }

    checkDevicePerformance()

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Apply performance optimizations
  useEffect(() => {
    if (prefersReducedMotion || isLowEndDevice) {
      // Disable animations for better performance
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
      document.documentElement.style.setProperty('--animation-delay', '0.01ms')
      
      // Add class for CSS-based optimizations
      document.documentElement.classList.add('performance-optimized')
      
      // Optimize scrolling
      document.documentElement.style.scrollBehavior = 'auto'
    } else {
      document.documentElement.style.removeProperty('--animation-duration')
      document.documentElement.style.removeProperty('--animation-delay')
      document.documentElement.classList.remove('performance-optimized')
      document.documentElement.style.scrollBehavior = 'smooth'
    }
    
    // Additional performance optimizations
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalLinks = [
        { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
        { href: '/images/logo/annita-real-logo.png', as: 'image', type: 'image/png' }
      ]
      
      criticalLinks.forEach(link => {
        const linkElement = document.createElement('link')
        Object.entries(link).forEach(([key, value]) => {
          if (key !== 'href') linkElement.setAttribute(key, value)
        })
        document.head.appendChild(linkElement)
      })
    }
    
    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        img.loading = 'lazy'
        img.decoding = 'async'
        if (!img.alt) img.alt = 'Annita'
      })
    }
    
    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      const scripts = document.querySelectorAll('script:not([data-critical])') as NodeListOf<HTMLScriptElement>
      scripts.forEach(script => {
        script.defer = true
        script.async = true
      })
    }
    
    // Run optimizations after page load
    if (document.readyState === 'complete') {
      preloadCriticalResources()
      optimizeImages()
      deferNonCriticalJS()
    } else {
      window.addEventListener('load', () => {
        preloadCriticalResources()
        optimizeImages()
        deferNonCriticalJS()
      })
    }
    
    // Monitor performance
    const monitorPerformance = () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming & { 
          domContentLoadedEventEnd?: number; 
          loadEventEnd?: number; 
          responseStart?: number; 
          fetchStart?: number 
        }
        
        // Log performance metrics for debugging
        if (perfData.domContentLoadedEventEnd && perfData.fetchStart) {
          console.log('Performance Metrics:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
            loadComplete: perfData.loadEventEnd && perfData.fetchStart ? perfData.loadEventEnd - perfData.fetchStart : 0,
            firstPaint: perfData.responseStart && perfData.fetchStart ? perfData.responseStart - perfData.fetchStart : 0
          })
        }
      }
    }
    
    monitorPerformance()
  }, [prefersReducedMotion, isLowEndDevice])

  return <>{children}</>
}

export default PerformanceOptimizer
