'use client'

import { memo, useCallback } from 'react'
import { X, ArrowRight, ExternalLink, Award, Building2 } from 'lucide-react'
import Link from 'next/link'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

const WelcomeModal = memo(({ isOpen, onClose }: WelcomeModalProps) => {
  if (!isOpen) return null

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-[15vh] bg-black/60">
      <div className="relative w-full max-w-[95vw] sm:max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto mx-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-5 h-5 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors shadow-lg border border-gray-200"
        >
          <X className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
        </button>

        <div className="p-3 sm:p-6 text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Welcome to Annita!
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-2 sm:mb-4 text-xs sm:text-sm leading-relaxed">
            Africa's first all-in-one digital ecosystem. Explore our integrated solutions for e-commerce, fintech, AI, communication, marketing, logistics, and more.
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-2 sm:p-3 mb-2 sm:mb-4 border border-orange-200 dark:border-orange-800">
            <p className="text-orange-700 dark:text-orange-300 text-xs leading-relaxed">
              9 prestigious awards and $12,375 in non-dilutive funding from global competitions.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 sm:p-3 mb-3 sm:mb-6 border border-purple-200 dark:border-purple-800">
            <p className="text-purple-800 dark:text-purple-200 text-xs leading-relaxed">
              <strong>Need custom solutions?</strong> We design and deploy tailored digital infrastructure for MSMEs, governments, and strategic partners across Africa.
            </p>
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <Link
              href="/features"
              onClick={onClose}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center justify-center text-xs sm:text-sm"
            >
              <span className="mr-1.5 sm:mr-2">Explore Features</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>

            <Link
              href="/solutions"
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center justify-center text-xs sm:text-sm"
            >
              <span className="mr-1.5 sm:mr-2">Custom Solutions</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>

            <Link
              href="/awards"
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg flex items-center justify-center text-xs sm:text-sm"
            >
              <span className="mr-1.5 sm:mr-2">Awards & Recognition</span>
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>

            <Link
              href="/government-solutions"
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center justify-center text-xs sm:text-sm"
            >
              <span className="mr-1.5 sm:mr-2">Government Solutions</span>
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>

            <Link
              href="https://marketplace.an-nita.com"
              onClick={onClose}
              className="w-full border-2 border-orange-500 text-orange-600 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200 flex items-center justify-center text-xs sm:text-sm"
            >
              <span className="mr-1.5 sm:mr-2">Try V1.0 Now</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
})

export default WelcomeModal
