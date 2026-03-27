'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { 
  MessageSquare, 
  Target, 
  CheckCircle,
  Activity,
  TrendingUp,
  Heart
} from 'lucide-react'

const ConnectFeature = () => {


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
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6"
        >
          <MessageSquare className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl lg:text-3xl font-bold text-[var(--brand-primary)] mb-2"
        >
          Annita Connect
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg font-medium text-[var(--brand-primary)] mb-4 flex items-center"
        >
          Communication & Marketing Suite
          <Target className="w-5 h-5 ml-2 text-purple-500" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[var(--text-secondary)] mb-6 leading-relaxed"
        >
          Lowers customer acquisition costs through affordable, data-backed marketing 
          and customer engagement tools with <span className="text-[var(--brand-primary)] font-semibold">AI-powered audience targeting</span>.
        </motion.p>



      </div>

      {/* Interactive Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-8 left-6 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
          
          {/* Demo Image Interface */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-200 dark:border-gray-700 relative z-10">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--text-primary)] mb-1 sm:mb-2">Annita Connect Demo</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Marketing Dashboard</p>
                </div>
            
            {/* Large Demo Image */}
            <div className="relative mx-auto group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-2">
                <Image
                  src="/images/DEMO-Images/Annita Connect.webp"
                  alt="Annita Connect Demo"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-xl pointer-events-none"></div>
                </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-sm -z-10"></div>
            </div>

          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
        >
          <Target className="w-4 h-4 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center"
        >
          <MessageSquare className="w-3 h-3 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ConnectFeature
