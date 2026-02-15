'use client'

import { useRef, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import MarketplaceFeature from './features/MarketplaceFeature'
import AnnitaPayFeature from './features/AnnitaPayFeature'
import LogisticsFeature from './features/LogisticsFeature'
import ConnectFeature from './features/ConnectFeature'
import AIFeature from './features/AIFeature'
import CustomSolutionsFeature from './features/CustomSolutionsFeature'
import GovernmentSolutionsFeature from './features/GovernmentSolutionsFeature'

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-600 mb-4 sm:mb-6">
            One <span className="text-orange-500">Ecosystem.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-4xl mx-auto">
            Endless innovative solutions for all MSMEs and individuals.
            <br />
            <span className="font-medium text-gray-700">
              Sell. Pay. Trade. Deliver. Market. Grow.
            </span>
            <br />
            Seamless online and offline experience.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="space-y-12 mb-20">
          <MarketplaceFeature />
          <AnnitaPayFeature />
          <LogisticsFeature />
          <ConnectFeature />
          <AIFeature />
          <CustomSolutionsFeature />
          <GovernmentSolutionsFeature />
        </div>
      </div>
    </section>
  )
}

export default memo(FeaturesSection)
