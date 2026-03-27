'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeModal from '@/components/ui/WelcomeModal'
import ModernToggle from '@/components/ui/ModernToggle'
import {
  Menu,
  X,
  ShoppingCart,
  CreditCard,
  Truck,
  MessageSquare,
  BarChart3,
  Globe,
  Users,
  ChevronDown,
  ChevronRight,
  Award,
  Briefcase,
  UserPlus,
  FileText,
  HelpCircle,
  Play,
  Zap,
  Target,
  Database,
  Activity,
  Image,
  Rocket,
  FileBarChart,
  Wallet,
  Send,
  Shield,
  Smartphone,
  FileText as FileTextIcon,
  Package,
  Clock,
  TrendingUp as TrendingUpIcon,
  BarChart3 as BarChart3Icon,
  FolderOpen,
  Megaphone,
  Store,
  UserCheck,
  Eye,
  Scale,
  FileCheck,
  Gavel,
  Wifi,
  WifiOff,
  Languages,
  Monitor,
  Fingerprint,
  AlertTriangle,
  Lock,
  MapPin,
  Signal,
  Radio,
  Palette,
  Landmark,
  Link as LinkIcon,
  UserCheck as UserCheckIcon,
  BookOpen,
  Cookie,
  Building,
  Phone
} from 'lucide-react'
import dynamic from 'next/dynamic'
const DownloadChoiceModal = dynamic(() => import('@/components/ui/DownloadChoiceModal'), {
  ssr: false,
  loading: () => null,
})

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Company',
      href: '#',
      dropdown: [
        { name: 'About Us', href: '/about', icon: Users, description: 'Our story and mission' },
        { name: 'Features & Solutions', href: '/features', icon: Zap, description: 'Everything Annita offers' },
        { name: 'Custom Solutions', href: '/solutions', icon: FileText, description: 'Bespoke tech development' },
        { name: 'Government Solutions', href: '/government-solutions', icon: Building, description: 'Digital solutions for governments' },
        { name: 'Ideas & Tips', href: '/ideas', icon: HelpCircle, description: 'Share ideas and feedback' },
        { name: 'Become a Partner', href: '/partners', icon: Users, description: 'Partner with Annita' },
        { name: 'Partner Application', href: '/partners/apply', icon: UserCheckIcon, description: 'Apply to become a partner' },
        { name: 'Awards & Recognition', href: '/awards', icon: Award, description: 'Our achievements and recognition' },
        { name: 'Careers', href: '/careers', icon: Briefcase, description: 'Join our team' },
        { name: 'Apply Now', href: '/careers/apply', icon: UserPlus, description: 'Submit your application' },
      ]
    },
    {
      name: 'Support',
      href: '#',
      dropdown: [
        { name: 'Contact Us', href: '/contact', icon: MessageSquare, description: 'Get in touch with our team' },
        { name: 'Contact Sales', href: '/contact-sales', icon: Phone, description: 'Talk to our business development team' },
        { name: 'Privacy Policy', href: '/privacy', icon: Shield, description: 'How we handle your data' },
        { name: 'Terms of Service', href: '/terms', icon: FileCheck, description: 'Our terms and conditions' },
        { name: 'Cookie Policy', href: '/cookies', icon: Cookie, description: 'Learn about cookies' },
      ]
    },
  ]

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const handleDropdownMouseEnter = (name: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setActiveDropdown(name)
  }

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 300)
    setDropdownTimeout(timeout)
  }



  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-md border-b border-gray-200 dark:border-gray-700' 
          : 'bg-white/90 dark:bg-gray-900/90'
      }`}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 text-gray-900 dark:text-white hover:opacity-90 transition">
              {/* Gradient border container */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-[2px] flex-shrink-0">
                {/* White inner container */}
                <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center">
                  {/* Logo image */}
                  <img
                    src="/images/logo/annita-real-logo.png"
                    alt="Annita Logo"
                    width={28}
                    height={28}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-lg transition-all duration-300 select-none"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    draggable="false"
                  />
                </div>
              </div>
              {/* Brand text */}
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-500 dark:text-orange-400">
                  Annita
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <div className="flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => handleDropdownMouseEnter(item.name)}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="nav-link flex items-center space-x-1"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-large border border-gray-200 dark:border-gray-700"
                          >
                            <div className="max-h-96 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                              <div className="grid gap-3">
                                {item.dropdown.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <dropdownItem.icon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-gray-900 dark:text-white">{dropdownItem.name}</div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">{dropdownItem.description}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    'isExternal' in item && item.isExternal ? (
                      <a 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="nav-link"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link href={item.href} className="nav-link">
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Modern Theme Toggle */}
              <ModernToggle />
              
              {/* CTA Button */}
              <button 
                onClick={() => setIsWelcomeModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Try V1.0 Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ModernToggle />
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isOpen ? <X className="w-5 h-5 dark:text-white" /> : <Menu className="w-5 h-5 dark:text-white" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Clean Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Menu Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <Link href="/" className="flex items-center gap-2.5 text-gray-900 dark:text-white hover:opacity-90 transition" onClick={() => setIsOpen(false)}>
                    {/* Gradient border container */}
                    <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-[2px] flex-shrink-0">
                      {/* White inner container */}
                      <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center">
                        {/* Logo image */}
                        <img
                          src="/images/logo/annita-real-logo.png"
                          alt="Annita Logo"
                          width={28}
                          height={28}
                          className="w-5 h-5 object-contain rounded-lg transition-all duration-300 select-none"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          draggable="false"
                        />
                      </div>
                    </div>
                    {/* Brand text */}
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold leading-tight text-orange-500 dark:text-orange-400">
                        Annita
                      </span>
                    </div>
                  </Link>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-6 overflow-y-auto">
                  <div className="px-6 space-y-2 pb-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.dropdown ? (
                          <div>
                            <button
                              onClick={() => toggleDropdown(item.name)}
                              className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${
                                activeDropdown === item.name ? 'rotate-180' : ''
                              }`} />
                            </button>
                            
                                                            <AnimatePresence>
                              {activeDropdown === item.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-4 mt-2 space-y-1 max-h-64 overflow-y-auto"
                                >
                                  {item.dropdown.map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.name}
                                      href={dropdownItem.href}
                                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                      onClick={() => {
                                        setIsOpen(false)
                                        setActiveDropdown(null)
                                      }}
                                    >
                                      <dropdownItem.icon className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                                      <div>
                                        <div className="font-medium text-gray-900 dark:text-white">{dropdownItem.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{dropdownItem.description}</div>
                                      </div>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          'isExternal' in item && item.isExternal ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="block p-3 font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setIsWelcomeModalOpen(true)
                      setIsOpen(false)
                    }}
                    className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Try V1.0 Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Choice Modal */}
      <DownloadChoiceModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
      />
    </>
  )
}

export default Navigation
