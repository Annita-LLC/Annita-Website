"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Phone, MessageSquare, Clock, MapPin } from 'lucide-react'

const ContactMethodsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with your account or technical issues',
      contact: 'info@an-nita.com',
      responseTime: 'Response within 24 hours',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+231 77 505 7227',
      responseTime: 'Available 8AM-6PM GMT',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Instant support through our chat system',
      contact: 'Available on website',
      responseTime: 'Real-time assistance',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section className="py-16 sm:py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Help?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your preferred contact method. We're here to assist you with any questions or support needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
              <div className="space-y-2">
                <div className="font-semibold text-gray-900">{method.contact}</div>
                <div className="text-sm text-gray-500">{method.responseTime}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactMethodsSection
