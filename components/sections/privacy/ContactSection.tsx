"use client"

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  FileText,
  Send,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { useFormSubmission, formValidations } from '@/lib/hooks/useFormSubmission'

const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const { submitForm, isSubmitting, isSubmitted, error, success } = useFormSubmission({
    validateForm: formValidations.business,
    onSuccess: (data) => {
      console.log('Privacy inquiry submitted successfully:', data)
    },
    onError: (error) => {
      console.error('Privacy inquiry submission failed:', error)
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm('privacy', formData)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message about your privacy concern",
      contact: "info@an-nita.com",
      response: "Response within 24 hours",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our privacy team",
      contact: "+231 77 505 7227",
      response: "Available 9 AM - 5 PM GMT",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Meet our team in person",
      contact: "Monrovia, Liberia",
      response: "By appointment only",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const dataRights = [
    { icon: FileText, title: "Access Request", description: "Request a copy of your data" },
    { icon: CheckCircle, title: "Correction Request", description: "Update inaccurate information" },
    { icon: AlertTriangle, title: "Deletion Request", description: "Request data removal" },
    { icon: Shield, title: "Objection Request", description: "Object to data processing" }
  ]

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Our Privacy Team
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Need Help with{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Your Privacy?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our dedicated privacy team is here to help you understand your rights and address any concerns about your personal data.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${method.color} mb-4 shadow-lg`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-3 leading-relaxed">{method.description}</p>
                <div className="text-white font-medium mb-1">{method.contact}</div>
                <div className="text-sm text-gray-400 leading-relaxed">{method.response}</div>
              </motion.div>
            ))}
          </div>

          {/* Data Rights Request */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Exercise Your Data Rights</h3>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                You have several rights regarding your personal data. Click on any right below to learn more and submit a request.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dataRights.map((right, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                      <right.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{right.title}</h4>
                  </div>
                  <p className="text-sm text-blue-200 leading-relaxed">{right.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Response Time Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Our Response Commitment</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We take privacy inquiries seriously and commit to responding promptly:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300 mb-1">24 Hours</div>
                    <div className="text-sm text-blue-200">Initial Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-300 mb-1">30 Days</div>
                    <div className="text-sm text-cyan-200">Rights Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-300 mb-1">5 Days</div>
                    <div className="text-sm text-purple-200">Urgent Issues</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Have a privacy question or need to exercise your data rights? Fill out the form below and we'll get back to you promptly.
              </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="data-access">Data Access Request</option>
                    <option value="data-deletion">Data Deletion Request</option>
                    <option value="privacy-question">Privacy Question</option>
                    <option value="security-concern">Security Concern</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your privacy concern or request..."
                    required
                  ></textarea>
                </div>

                {/* Success/Error Messages */}
                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800">Your privacy inquiry has been submitted successfully! We'll get back to you within 24-48 hours.</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-red-800">{error}</span>
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 text-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <p className="text-blue-100 text-sm">
                <strong>Last Updated:</strong> March 15, 2024 • <strong>Effective Date:</strong> March 15, 2024
              </p>
              <p className="text-blue-200 text-xs mt-2">
                This privacy policy is reviewed regularly to ensure compliance with evolving privacy laws and regulations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
