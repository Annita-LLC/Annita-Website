'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import {
  Code,
  Zap,
  Smartphone,
  Monitor,
  Cloud,
  Settings
} from 'lucide-react'

const CustomSolutionsFeature = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      {/* Content */}
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6"
        >
          <Code className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl lg:text-3xl font-bold text-[var(--brand-primary)] mb-2"
        >
          Custom Solutions
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg font-medium text-[var(--brand-primary)] mb-4 flex items-center"
        >
          Tailored Technology for Your Business
          <Zap className="w-5 h-5 ml-2 text-emerald-500" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[var(--text-secondary)] mb-6 leading-relaxed"
        >
          Need something unique? Our expert developers build <span className="text-[var(--brand-primary)] font-semibold">custom software solutions</span> from web apps to mobile platforms, system integrations, and enterprise applications tailored to your specific business needs.
        </motion.p>


      </div>

      {/* Interactive Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-8 left-6 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-pulse delay-1000"></div>

          {/* Tech Stack Showcase */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-200 dark:border-gray-700 relative z-10">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--text-primary)] mb-1 sm:mb-2">Custom Solutions</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Technology Stack</p>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <Monitor className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Web Apps</span>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Mobile Apps</span>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <Cloud className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Cloud Solutions</span>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Integrations</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CustomSolutionsFeature
