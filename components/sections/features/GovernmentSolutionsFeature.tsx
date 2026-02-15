'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import {
  Building,
  Zap,
  Users,
  FileText,
  Shield,
  Database
} from 'lucide-react'

const GovernmentSolutionsFeature = () => {

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
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6"
        >
          <Building className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl lg:text-3xl font-bold text-orange-600 mb-2"
        >
          Government Solutions
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg font-medium text-primary-600 mb-4 flex items-center"
        >
          Digital Transformation for Public Services
          <Zap className="w-5 h-5 ml-2 text-blue-500" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-600 mb-6 leading-relaxed"
        >
          Empower your government with <span className="text-orange-600 font-semibold">digital solutions</span> designed for public administration. From citizen portals and e-governance platforms to data management systems and compliance tools, we build secure, scalable solutions that enhance service delivery and transparency.
        </motion.p>


      </div>

      {/* Interactive Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-8 left-6 w-16 h-16 bg-indigo-200 rounded-full opacity-30 animate-pulse delay-1000"></div>

          {/* Government Solutions Showcase */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-200 relative z-10">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Government Solutions</h3>
              <p className="text-xs sm:text-sm text-gray-600">Digital Services</p>
            </div>

            {/* Government Services Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Citizen Portals</span>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">E-Governance</span>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <Database className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Data Management</span>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 sm:p-4 text-center text-white">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GovernmentSolutionsFeature
