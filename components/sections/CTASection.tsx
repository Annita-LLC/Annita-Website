import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Phone } from 'lucide-react'

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonLink?: string
  backgroundClass?: string
  textColor?: string
  showSecondaryButton?: boolean
}

export default function CTASection({
  title = "Ready to Transform Your Business?",
  subtitle = "Join thousands of MSMEs already using Annita to grow their revenue, reach new customers, and streamline their operations across Africa.",
  primaryButtonText = "Try V1.0 Now",
  secondaryButtonText = "Contact Sales",
  primaryButtonLink = "https://marketplace.an-nita.com",
  secondaryButtonLink = "/contact-sales",
  backgroundClass = "from-orange-500 to-orange-600",
  textColor = "text-white",
  showSecondaryButton = true
}: CTASectionProps) {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`text-center p-6 sm:p-8 lg:p-12 bg-gradient-to-r ${backgroundClass} rounded-2xl ${textColor} shadow-2xl`}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              {title}
            </h3>
            <p className="text-orange-100 dark:text-orange-200 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href={primaryButtonLink}
                className="inline-flex items-center justify-center bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 shadow-lg text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {primaryButtonText}
              </Link>
              {showSecondaryButton && (
                <Link
                  href={secondaryButtonLink}
                  className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 dark:hover:text-gray-800 transition-colors duration-200 text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}