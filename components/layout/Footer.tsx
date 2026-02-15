'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Facebook, 
  MessageCircle, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  Link as LinkIcon,
  ExternalLink,
  Globe,
  Building,
  Users,
  Briefcase,
  Award,
  Download,
} from 'lucide-react'
import DownloadChoiceModal from '@/components/ui/DownloadChoiceModal'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [tapCount, setTapCount] = useState(0)
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Features & Solutions', href: '/features' },
        { name: 'Custom Solutions', href: '/solutions' },
        { name: 'Government Solutions', href: '/government-solutions' },
        { name: 'Careers', href: '/careers' },
        { name: 'Partners', href: '/partners' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Contact Sales', href: '/contact-sales' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Awards', href: '/awards' },
        { name: 'Ideas & Tips', href: '/ideas' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Linktree', icon: LinkIcon, href: 'https://linktr.ee/annitallc?utm_source=linktree_profile_share&ltsid=8fd79e3c-4d54-433d-a569-ba89a939e506' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/annitallc' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/annitallc' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/annitallc' },
    { name: 'TikTok', icon: ExternalLink, href: 'https://www.tiktok.com/@annitallc' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@annitallc' }
  ]

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'annitallc@gmail.com', href: 'mailto:annitallc@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+231 77 505 7227', href: 'tel:+231 77 505 7227' },
    { icon: MapPin, label: 'Address', value: 'Monrovia, Liberia', href: '#' }
  ]

  const handleSecretTap = () => {
    // Clear existing timeout
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current)
    }

    const newTapCount = tapCount + 1
    setTapCount(newTapCount)

    // If 3 taps, navigate to staff login
    if (newTapCount >= 3) {
      router.push('/staff/login')
      setTapCount(0)
    } else {
      // Reset tap count after 2 seconds of inactivity
      tapTimeoutRef.current = setTimeout(() => {
        setTapCount(0)
      }, 2000)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current)
      }
    }
  }, [])

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="xl:col-span-2">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 group">
              {/* Gradient border container */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-[2px] flex-shrink-0">
                {/* White inner container */}
                <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
              Annita is Africa's first all-in-one digital ecosystem—integrating e-commerce, fintech, AI, communication, marketing, logistics, and more into a single, connected system. Built for both online and offline access, Annita delivers custom-built solutions for MSMEs, governments, and strategic partners across the continent.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {contactInfo.map((contact) => (
                                  <div key={contact.label} className="flex items-center space-x-2 sm:space-x-3">
                    <contact.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400" />
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400">{contact.label}</div>
                      <a 
                        href={contact.href} 
                        className="text-white hover:text-primary-400 transition-colors duration-200 text-sm sm:text-base"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-sm font-semibold text-orange-500 mb-3">Connect</h4>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {socialLinks.slice(0, 6).map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-200 group"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Try V1.0 Button removed per request */}
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base sm:text-lg font-semibold text-orange-500 dark:text-orange-400 mb-3 sm:mb-4">{section.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {'isExternal' in link && link.isExternal ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        href={link.href}
                        className="footer-link text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>



      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                      <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
            <span>&copy; {currentYear} Annita. All rights reserved.</span>
          </div>
            
            <div 
              className="flex items-center space-x-2 text-sm text-gray-400 cursor-pointer select-none"
              onClick={handleSecretTap}
              title="Tap 3 times for staff access"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>in Liberia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Choice Modal */}
      <DownloadChoiceModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </footer>
  )
}

export default Footer
