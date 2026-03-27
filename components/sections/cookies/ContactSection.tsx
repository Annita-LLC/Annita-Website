"use client"

import React, { useState } from 'react'
import { MessageSquare, Mail, Phone, MapPin, Clock, Cookie, Send, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { useFormSubmission, formValidations } from '@/lib/hooks/useFormSubmission'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    subject: '',
    message: ''
  })

  const { submitForm, isSubmitting, isSubmitted, error, success } = useFormSubmission({
    validateForm: formValidations.business,
    onSuccess: (data) => {
      console.log('Cookie inquiry submitted successfully:', data)
    },
    onError: (error) => {
      console.error('Cookie inquiry submission failed:', error)
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
    await submitForm('cookie', formData)
  }
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6">
              <Cookie className="w-4 h-4 mr-2" />
              Cookie Support
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Questions About{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Cookies & Privacy?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our privacy team specializes in cookies and data protection. Get expert help understanding your options and managing your privacy preferences.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-2 bg-blue-500/20 rounded-lg w-fit mb-4">
                <Mail className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cookie Inquiries</h3>
              <p className="text-gray-400 mb-3 leading-relaxed">Questions about cookie usage and preferences</p>
              <div className="text-white font-medium mb-1">info@an-nita.com</div>
              <div className="text-sm text-blue-300">Response within 24 hours</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-2 bg-green-500/20 rounded-lg w-fit mb-4">
                <Phone className="w-6 h-6 text-green-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Privacy Support</h3>
              <p className="text-gray-400 mb-3 leading-relaxed">Direct support for privacy and cookie concerns</p>
              <div className="text-white font-medium mb-1">+231 77 505 7227</div>
              <div className="text-sm text-blue-300">Mon-Fri, 9 AM - 5 PM GMT</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-2 bg-purple-500/20 rounded-lg w-fit mb-4">
                <MapPin className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Data Protection Office</h3>
              <p className="text-gray-400 mb-3 leading-relaxed">Visit our data protection team in person</p>
              <div className="text-white font-medium mb-1">Monrovia, Liberia</div>
              <div className="text-sm text-blue-300">By appointment only</div>
            </div>
          </div>

          {/* Cookie-Specific Support */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Cookie-Specific Support</h3>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Specialized assistance for cookie-related privacy concerns and technical issues.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                <Cookie className="w-10 h-10 text-yellow-300 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Cookie Management</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Help configuring your cookie preferences</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                <Shield className="w-10 h-10 text-green-300 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Privacy Rights</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Assistance with data protection rights</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                <AlertTriangle className="w-10 h-10 text-orange-300 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Technical Issues</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Problems with cookie settings or functionality</p>
              </div>
            </div>
          </div>

          {/* Response Time Commitment */}
          <div className="mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Our Response Commitment</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We prioritize privacy and cookie-related inquiries with dedicated response times:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300 mb-1">24 Hours</div>
                    <div className="text-sm text-blue-200">Cookie Configuration Help</div>
                  </div>
                  <div className="text-2xl font-bold text-cyan-300 mb-1">48 Hours</div>
                    <div className="text-sm text-cyan-200">Privacy Rights Requests</div>
                  <div className="text-2xl font-bold text-purple-300 mb-1">1 Week</div>
                    <div className="text-sm text-purple-200">Complex Technical Issues</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Submit a Cookie Inquiry</h3>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Have questions about cookies, need help managing your preferences, or want to exercise your privacy rights? Fill out the form below.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select inquiry type</option>
                  <option value="cookie-management">Cookie management help</option>
                  <option value="privacy-rights">Privacy rights request</option>
                  <option value="opt-out-assistance">Opt-out assistance</option>
                  <option value="data-deletion">Data deletion request</option>
                  <option value="technical-issues">Technical cookie issues</option>
                  <option value="general-question">General privacy question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide detailed information about your cookie or privacy concern..."
                  required
                ></textarea>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800">Your cookie inquiry has been submitted successfully! We'll get back to you within 24-48 hours.</span>
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
                      Submit Cookie Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <p className="text-blue-200 text-sm">
                <strong>Last Updated:</strong> March 15, 2024 • <strong>Effective Date:</strong> March 15, 2024
              </p>
              <p className="text-blue-200 text-xs mt-2">
                This cookie policy is reviewed regularly to ensure compliance with evolving privacy laws and regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
