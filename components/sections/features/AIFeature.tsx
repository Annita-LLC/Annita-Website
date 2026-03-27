'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Target, 
  CheckCircle,
  Activity,
  TrendingUp,
  Globe,
  Shield,
  Lightbulb,
  Cpu,
  Network,
  Database,
  BarChart3,
  Users,
  Clock,
  Star,
  Eye,
  Heart,
  MessageSquare,
  Search,
  Filter,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

const AIFeature = () => {
  const [aiProcessing, setAiProcessing] = useState(false)
  const [currentTask, setCurrentTask] = useState('')
  const [processingProgress, setProcessingProgress] = useState(0)
  const [aiInsights, setAiInsights] = useState([
    'Analyzing customer behavior patterns...',
    'Optimizing inventory levels...',
    'Predicting market trends...',
    'Generating personalized recommendations...',
    'Detecting fraud patterns...',
    'Automating customer support...'
  ])
  const [currentInsight, setCurrentInsight] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % aiInsights.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [aiInsights.length])

  const startAIProcessing = () => {
    setAiProcessing(true)
    setCurrentTask('Initializing AI models...')
    setProcessingProgress(0)
    
    const tasks = [
      'Loading neural networks...',
      'Processing data streams...',
      'Running predictive algorithms...',
      'Generating insights...',
      'Optimizing results...',
      'AI analysis complete!'
    ]
    
    let taskIndex = 0
    const taskInterval = setInterval(() => {
      if (taskIndex < tasks.length) {
        setCurrentTask(tasks[taskIndex])
        setProcessingProgress((taskIndex + 1) * (100 / tasks.length))
        taskIndex++
      } else {
        clearInterval(taskInterval)
        setTimeout(() => {
          setAiProcessing(false)
          setProcessingProgress(0)
        }, 1000)
      }
    }, 800)
  }


  const aiCapabilities = [
    { name: 'Natural Language Processing', icon: MessageSquare, status: 'active', efficiency: 98.5 },
    { name: 'Computer Vision', icon: Eye, status: 'active', efficiency: 97.2 },
    { name: 'Predictive Analytics', icon: TrendingUp, status: 'active', efficiency: 99.1 },
    { name: 'Machine Learning', icon: Brain, status: 'active', efficiency: 96.8 }
  ]

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
          className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl lg:text-3xl font-bold text-[var(--brand-primary)] mb-2"
        >
          Annita AI
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg font-medium text-[var(--brand-primary)] mb-4 flex items-center"
        >
          Artificial Intelligence Platform
          <Sparkles className="w-5 h-5 ml-2 text-orange-500 animate-pulse" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[var(--text-secondary)] mb-6 leading-relaxed"
        >
          Intelligent automation and AI-powered insights to optimize business operations 
          and drive growth for MSMEs with <span className="text-[var(--brand-primary)] font-semibold">real-time learning and adaptation</span>.
        </motion.p>



      </div>

      {/* Interactive AI Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-8 left-6 w-16 h-16 bg-cyan-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
          
          {/* Neural network background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-500"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1500"></div>
          </div>
          
          {/* Demo Image Interface */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-200 dark:border-gray-700 relative z-10">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--text-primary)] mb-1 sm:mb-2">Annita AI Demo</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Intelligent Assistant</p>
                </div>
            
            {/* Large Demo Image */}
            <div className="relative mx-auto group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-2">
                <Image
                  src="/images/DEMO-Images/Annita AI.jpg"
                  alt="Annita AI Demo"
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

        {/* Floating AI elements */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center"
        >
          <Brain className="w-4 h-4 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [10, -10, 10],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-3 h-3 text-white" />
        </motion.div>

        {/* Additional floating elements */}
        <motion.div
          animate={{ 
            x: [-5, 5, -5],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -right-2 w-4 h-4 bg-purple-400 rounded-full opacity-60"
        />
        
        <motion.div
          animate={{ 
            x: [5, -5, 5],
            y: [5, -5, 5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/2 -left-2 w-3 h-3 bg-pink-400 rounded-full opacity-60"
        />
      </motion.div>
    </motion.div>
  )
}

export default AIFeature
