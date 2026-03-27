'use client'

import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle, Star, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const features = [
  { icon: CheckCircle, text: "KYC Verified Businesses" },
  { icon: CheckCircle, text: "Secure Escrow Payments" },
  { icon: CheckCircle, text: "Multi-Currency Support" },
  { icon: CheckCircle, text: "Verified African Suppliers" },
  { icon: CheckCircle, text: "RFQ Based Sourcing" },
  { icon: CheckCircle, text: "Real-time Tracking" }
]

const stats = [
  { number: "10,000+", label: "Active Users" },
  { number: "50+", label: "African Countries" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" }
]

export default function PromotionSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
            <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">🎉 NOW LIVE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Annita V1.0 is
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"> Live Now!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience Africa's premier digital marketplace today. Join thousands of businesses already using Annita to grow, connect, and thrive across the continent.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <feature.icon className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Start Your Journey Today
            </h3>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
              Join the digital revolution sweeping across Africa. Create your free account and access powerful tools designed for African businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://marketplace.an-nita.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg text-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Access Marketplace Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <div className="flex items-center space-x-1 text-orange-200">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-2 text-sm">4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trusted by leading businesses and organizations across Africa
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400 font-semibold">AfCFTA Compliant</div>
            <div className="text-gray-400 font-semibold">Bank-Level Security</div>
            <div className="text-gray-400 font-semibold">24/7 Support</div>
            <div className="text-gray-400 font-semibold">GDPR Compliant</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
