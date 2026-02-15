"use client"

import { motion } from 'framer-motion'
import {
  Shield,
  Lock,
  Eye,
  CheckCircle
} from 'lucide-react'

const HeroSection = () => {
  const stats = [
    { number: "GDPR", label: "Compliant", icon: Shield },
    { number: "256-bit", label: "Encryption", icon: Lock },
    { number: "Full", label: "User Control", icon: Eye },
    { number: "100%", label: "Transparent", icon: CheckCircle }
  ]

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-600 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Privacy <span className="text-blue-200">Policy</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Learn how Annita collects, uses, and protects your personal information with bank-grade security, GDPR compliance, and transparent data practices.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <stat.icon className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection