'use client'

import { useState, useEffect, useRef, memo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Sparkles,
  ExternalLink,
  Phone
} from 'lucide-react'
import Button from '@/components/ui/Button'

const HeroSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const videos = [
    {
      id: 1,
      title: "Annita 3.0 Preview",
      description: "See what's coming in our next major update",
      src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F1141319817913700%2F&show_text=false&width=560&t=0"
    },
    {
      id: 2,
      title: "Annita Platform Demo",
      description: "Experience our current marketplace features",
      src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fweb.facebook.com%2Fannitallc%2Fposts%2Fpfbid0w721YvqYafVyFfF1KRK3yqYwi3kA5m39B4uBt8S9vLHA878dHnyf6GuHDkpx8E37l&show_text=false&width=500"
    }
  ]

  const slides = [
    {
      id: 1,
      badge: "Digital Ecosystem",
      title: "Africa's First All-in-One",
      titleHighlight: "Digital Ecosystem",
      subtitle: "One Digital Ecosystem. Endless innovative solutions for MSMEs, governments, and strategic partners. Sell. Pay. Trade. Deliver. Market. Grow. Seamless online and offline experience.",
      background: "from-gray-50 via-white to-orange-50/30"
    },
    {
      id: 2,
      badge: "Custom Solutions",
      title: "Tailored Solutions for",
      titleHighlight: "MSMEs, Governments & Partners",
      subtitle: "Annita delivers custom-built solutions specifically designed for micro, small, and medium enterprises, government agencies, and strategic partners across Africa.",
      background: "from-blue-50 via-white to-purple-50/30"
    },
    {
      id: 3,
      badge: "Pan-African Network",
      title: "Connect Across All",
      titleHighlight: "54 African Countries",
      subtitle: "Access our digital ecosystem from all AfCFTA regions. Trade, communicate, and collaborate seamlessly with partners across the entire African continent.",
      background: "from-green-50 via-white to-teal-50/30"
    },
    {
      id: 4,
      badge: "Tailored Infrastructure",
      title: "Designed & Deployed",
      titleHighlight: "Digital Infrastructure",
      subtitle: "We design and deploy tailored digital infrastructure that empowers individuals and organizations with innovative tools, seamless connectivity, and real economic opportunity.",
      background: "from-purple-50 via-white to-pink-50/30"
    },
    {
      id: 5,
      badge: "AI-Powered",
      title: "Smart Business",
      titleHighlight: "Intelligence",
      subtitle: "AI-driven insights and automation within our integrated ecosystem to optimize your business operations and growth across all sectors.",
      background: "from-teal-50 via-white to-cyan-50/30"
    },
    {
      id: 6,
      badge: "Award-Winning",
      title: "Recognized Across",
      titleHighlight: "Africa & Globally",
      subtitle: "9 prestigious awards including African Startup Conference, Moonshot Borderless Awards, and $12,375 in non-dilutive funding from global competitions.",
      background: "from-yellow-50 via-white to-orange-50/30"
    }
  ]

  // Start/stop slide interval based on pause state and video playing state
  useEffect(() => {
    // Pause slides if manually paused OR if video is playing
    if (!isPaused && !isVideoPlaying) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 3000) // 3 seconds per slide
    } else {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
        slideIntervalRef.current = null
      }
    }
    
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
      }
    }
  }, [isPaused, isVideoPlaying, slides.length])

  // Start/stop video interval based on pause state - reduced frequency for better performance
  useEffect(() => {
    if (!isPaused) {
      videoIntervalRef.current = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % videos.length)
      }, 5000) // Increased from 3000ms to 5000ms
    } else {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current)
        videoIntervalRef.current = null
      }
    }
    
    return () => {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current)
      }
    }
  }, [isPaused, videos.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToVideo = (index: number) => {
    setCurrentVideo(index)
  }

  const handleVideoInteraction = () => {
    // When video is interacted with, assume it's playing
    setIsVideoPlaying(true)
    // Clear any existing resume timeout
    if (videoResumeTimeoutRef.current) {
      clearTimeout(videoResumeTimeoutRef.current)
    }
  }

  const handleVideoPause = () => {
    // When mouse leaves video area, wait a bit before assuming video is paused
    // This prevents false positives from quick mouse movements
    if (videoResumeTimeoutRef.current) {
      clearTimeout(videoResumeTimeoutRef.current)
    }
    videoResumeTimeoutRef.current = setTimeout(() => {
      setIsVideoPlaying(false)
    }, 1000) // Wait 1 second before assuming video is paused
  }

  // Handle scroll to resume slides
  useEffect(() => {
    const handleScroll = () => {
      // When user scrolls, pause video (resume slides)
      setIsVideoPlaying(false)
      if (videoResumeTimeoutRef.current) {
        clearTimeout(videoResumeTimeoutRef.current)
        videoResumeTimeoutRef.current = null
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (videoResumeTimeoutRef.current) {
        clearTimeout(videoResumeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].background}`}></div>
      
      {/* Minimal background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-100 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-16 lg:py-24">
          
          {/* Left Content - Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left lg:pr-16"
          >
            <div className="max-w-2xl mx-auto lg:mx-0">
              {/* Badge */}
              <AnimatePresence mode="wait">
              <motion.div
                  key={`badge-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                className="inline-flex items-center px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                  {slides[currentSlide].badge}
          </motion.div>
              </AnimatePresence>

              {/* Main Heading */}
              <AnimatePresence mode="wait">
              <motion.h1
                  key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6"
              >
                  {slides[currentSlide].title.split(slides[currentSlide].titleHighlight)[0]}
                <br />
                  <span className="text-orange-600">{slides[currentSlide].titleHighlight}</span>
              </motion.h1>
              </AnimatePresence>

              {/* Subtitle */}
              <AnimatePresence mode="wait">
              <motion.p
                  key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl lg:max-w-none"
              >
                  {slides[currentSlide].subtitle}
              </motion.p>
              </AnimatePresence>


              {/* CTA Buttons */}
              <AnimatePresence mode="wait">
          <motion.div
                  key={`cta-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                    <Button
                      variant="gradient"
                      size="lg"
                  icon={ExternalLink}
                      className="w-full sm:w-auto text-base font-semibold px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.open('/maintenance', '_blank')}
                    >
                  Try V1.0 Now
                  </Button>
                  
                    <Button
                      variant="outline"
                      size="lg"
                  icon={Phone}
                      className="w-full sm:w-auto text-base font-semibold px-8 py-4 border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.location.href = '/contact-sales'}
                >
                  Contact Sales
                  </Button>
              </motion.div>
              </AnimatePresence>

              {/* Slide Navigation Dots */}
              <div className="hidden lg:flex justify-center lg:justify-start space-x-3 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-orange-500 w-8'
                        : 'bg-orange-300 hover:bg-orange-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

        </div>
          </motion.div>

          {/* Right Content - Video Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end mt-8 sm:mt-12 lg:mt-0 w-full"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-white p-2 sm:p-3 md:p-4 lg:p-6 backdrop-blur-sm border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 rounded-2xl"></div>
                

                {/* Video Content */}
                <div className="relative z-10">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`video-${currentVideo}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-0 left-0 w-full h-full"
                        onMouseEnter={handleVideoInteraction}
                        onMouseLeave={handleVideoPause}
                        onClick={handleVideoInteraction}
                      >
                        <iframe 
                          src={videos[currentVideo].src}
                          className="w-full h-full rounded-xl"
                          style={{border:'none',overflow:'hidden'}} 
                          scrolling="no" 
                          frameBorder="0" 
                          allowFullScreen={true} 
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          onLoad={handleVideoInteraction}
                          onMouseEnter={handleVideoInteraction}
                          onFocus={handleVideoInteraction}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}

export default memo(HeroSection)
