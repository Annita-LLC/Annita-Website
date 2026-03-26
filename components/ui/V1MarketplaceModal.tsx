'use client'

import { memo, useCallback } from 'react'
import { X, ArrowRight, ExternalLink, CheckCircle, Star, Users, ShoppingBag } from 'lucide-react'

interface V1MarketplaceModalProps {
  isOpen: boolean
  onClose: () => void
}

const V1MarketplaceModal = memo(({ isOpen, onClose }: V1MarketplaceModalProps) => {
  if (!isOpen) return null

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }, [onClose])

  const handleUseNow = useCallback(() => {
    window.open('https://marketplace.an-nita.com', '_blank')
    onClose()
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60">
      <div className="relative w-full max-w-[95vw] sm:max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[80vh] sm:max-h-[90vh] overflow-y-auto mx-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-5 h-5 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors shadow-lg border border-gray-200"
        >
          <X className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
        </button>

        <div className="p-3 sm:p-6 text-center">
          {/* Success Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold mb-4">
            <CheckCircle className="w-3 h-3 mr-1.5" />
            NOW LIVE
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Annita V1.0 Marketplace
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
            Start trading, buying, and selling on Africa's premier digital marketplace. Join thousands of businesses already transforming their operations.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-blue-800 dark:text-blue-200">Buy & Sell</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-green-800 dark:text-green-200">Verified Traders</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
              <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-purple-800 dark:text-purple-200">Secure Payments</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleUseNow}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center text-sm sm:text-base mb-4"
          >
            <span className="mr-2">Use Marketplace Now</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Free to join • No setup fees • Start trading in minutes
          </p>
        </div>
      </div>
    </div>
  )
})

export default V1MarketplaceModal
