'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Smartphone, Globe, ArrowRight, ExternalLink } from 'lucide-react'
import Button from './Button'

interface DownloadChoiceModalProps {
  isOpen: boolean
  onClose: () => void
}

const DownloadChoiceModal = ({ isOpen, onClose }: DownloadChoiceModalProps) => {
  const handleVisitV1 = () => {
    window.location.href = '/maintenance'
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95vw] sm:max-w-lg lg:max-w-xl mx-2 sm:mx-4 overflow-hidden pointer-events-auto max-h-[80vh] sm:max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 sm:px-6 py-4 sm:py-5 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold">Choose Your Experience</h2>
                <button
                  onClick={onClose}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <p className="text-orange-100 mt-2 text-sm sm:text-base">
                Select how you'd like to experience Annita
              </p>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(80vh-120px)] sm:max-h-[calc(90vh-140px)]">
              {/* V1.0 Marketplace Option */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer"
                onClick={handleVisitV1}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-xl flex-shrink-0">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Visit Upgraded Marketplace V1.0</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 leading-relaxed">
                      This is our <strong>upgraded version</strong> with new features - no longer in beta! 
                      Create your account today. When Annita 3.0 launches next year, existing users won't need re-onboarding.
                    </p>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">
                      <span>Try it now</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                Both options are free to use. Choose what works best for you!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DownloadChoiceModal
