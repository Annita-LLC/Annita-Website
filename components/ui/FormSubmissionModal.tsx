'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Wifi, WifiOff, Database, RefreshCw } from 'lucide-react'

interface FormSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  status: 'success' | 'error' | 'network' | 'database'
  formType: string
  message?: string
  onRetry?: () => void
}

export default function FormSubmissionModal({
  isOpen,
  onClose,
  status,
  formType,
  message,
  onRetry
}: FormSubmissionModalProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-500" />
      case 'network':
        return <WifiOff className="w-12 h-12 text-orange-500" />
      case 'database':
        return <Database className="w-12 h-12 text-red-500" />
      default:
        return <AlertCircle className="w-12 h-12 text-red-500" />
    }
  }

  const getStatusTitle = () => {
    switch (status) {
      case 'success':
        return `${formType} Submitted Successfully!`
      case 'network':
        return 'Network Connection Issue'
      case 'database':
        return 'Database Connection Problem'
      default:
        return 'Submission Failed'
    }
  }

  const getStatusMessage = () => {
    if (message) return message

    switch (status) {
      case 'success':
        return `Thank you for your ${formType.toLowerCase()}. We've received your submission and will get back to you soon.`
      case 'network':
        return 'We couldn\'t connect to our servers. Please check your internet connection and try again.'
      case 'database':
        return 'Our database is temporarily unavailable. Please try again in a few minutes.'
      default:
        return 'An unexpected error occurred. Please try again or contact support if the problem persists.'
    }
  }

  const getActionButton = () => {
    switch (status) {
      case 'success':
        return (
          <button
            onClick={onClose}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Got it
          </button>
        )
      case 'network':
      case 'database':
        return (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            )}
          </div>
        )
      default:
        return (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={() => window.location.href = 'mailto:support@an-nita.com'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact Support
            </button>
          </div>
        )
    }
  }

  const getSecondaryInfo = () => {
    switch (status) {
      case 'network':
        return (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-1">Network Troubleshooting:</p>
                <ul className="space-y-1 text-orange-700">
                  <li>• Check your internet connection</li>
                  <li>• Try switching to a different network</li>
                  <li>• Refresh the page and try again</li>
                  <li>• Contact your network provider if issues persist</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'database':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Database Information:</p>
                <ul className="space-y-1 text-red-700">
                  <li>• Our team has been notified of the issue</li>
                  <li>• We're working to resolve it as quickly as possible</li>
                  <li>• Your data is safe and hasn't been lost</li>
                  <li>• Try again in 5-10 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'success':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">What happens next:</p>
                <ul className="space-y-1 text-green-700">
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• Our team will review your submission</li>
                  <li>• We'll respond within 24-48 hours</li>
                  <li>• You can track your submission status via email</li>
                </ul>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-800">
                <p className="font-medium mb-1">Need help?</p>
                <ul className="space-y-1 text-gray-700">
                  <li>• Contact our support team at support@an-nita.com</li>
                  <li>• Call us at +231 777 123 456</li>
                  <li>• Check our FAQ section for common issues</li>
                  <li>• Try submitting the form again later</li>
                </ul>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Icon and Title */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {getStatusIcon()}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {getStatusTitle()}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {getStatusMessage()}
                </p>
              </div>

              {/* Secondary Information */}
              <div className="mb-6">
                {getSecondaryInfo()}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center">
                {getActionButton()}
              </div>

              {/* Additional Info for Success */}
              {status === 'success' && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Reference ID: #{Date.now().toString().slice(-6)}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Keep this reference for your records
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
