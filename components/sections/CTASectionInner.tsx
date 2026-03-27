"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Phone } from 'lucide-react'


const CTASectionInner = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl text-white max-w-full lg:max-w-none"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              🚨 Something BIG is Coming - Annita 3.0
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-orange-100 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              Experience our <strong>upgraded marketplace V1.0</strong> with new features - no longer in beta!
              Create your account today. When Annita 3.0 launches next year, existing v1.0 users will be automatically migrated -
              <strong>no re-onboarding required!</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
              <a
                href="https://marketplace.an-nita.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-orange-600 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="whitespace-nowrap">Create Account & Try V1.0 Now</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}

export default CTASectionInner

