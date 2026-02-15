'use client'

import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '@/components/seo/SEOHead'
const BenefitsSection = lazy(() => import('@/components/government/BenefitsSection'))
import {
  Code,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Settings,
  Zap,
  Shield,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  Building,
  Truck,
  GraduationCap,
  Store,
  Brain,
  FileText,
  MessageSquare,
  ExternalLink,
  Star,
  Award,
  TrendingUp,
  Layers,
  Monitor,
  Cpu,
  Server,
  Wifi,
  Lock,
  BarChart3,
  Rocket,
  DollarSign,
  Eye,
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { useFormSubmission, formValidations } from '@/lib/hooks/useFormSubmission'

export default function GovernmentSolutionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    requirements: '',
    currentTech: ''
  })

  const { submitForm, isSubmitting, isSubmitted, error, success, reset } = useFormSubmission({
    validateForm: formValidations.solution,
    onSuccess: (data) => {
      console.log('government solution form submitted successfully:', data)
    },
    onError: (error) => {
      console.error('government solution form submission failed:', error)
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
    await submitForm('solution', formData)
  }

  const solutions = [
    {
      icon: Users,
      title: "Citizen Portals",
      description: "Secure online platforms for citizens to access government services, submit applications, and track requests.",
      features: [
        "User authentication",
        "Service request tracking",
        "Multi-language support",
        "Mobile responsive",
        "Accessibility compliance"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileText,
      title: "E-Governance Systems",
      description: "Digital administration platforms for streamlined government operations and inter-agency collaboration.",
      features: [
        "Document management",
        "Workflow automation",
        "Inter-agency integration",
        "Audit trails",
        "Real-time reporting"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Secure data platforms for government information management, analytics, and decision-making support.",
      features: [
        "Data warehousing",
        "Analytics dashboards",
        "Data security",
        "Compliance frameworks",
        "Backup & recovery"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "Government-grade security solutions ensuring data protection and regulatory compliance.",
      features: [
        "Encryption standards",
        "Access controls",
        "Compliance monitoring",
        "Incident response",
        "Security audits"
      ],
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Public Analytics",
      description: "Business intelligence platforms for government data analysis and public service optimization.",
      features: [
        "Performance metrics",
        "Citizen feedback systems",
        "Predictive analytics",
        "Public dashboards",
        "Automated reporting"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Monitor,
      title: "Digital Service Integration",
      description: "Unified platforms connecting multiple government services for seamless citizen experience.",
      features: [
        "API gateways",
        "Service orchestration",
        "Single sign-on",
        "Cross-platform compatibility",
        "Legacy system integration"
      ],
      color: "from-orange-500 to-red-500"
    }
  ]

  const process = [
    {
      step: 1,
      title: "Requirements Analysis",
      description: "We analyze government needs, regulatory requirements, and citizen service goals.",
      icon: Target
    },
    {
      step: 2,
      title: "Security & Compliance Design",
      description: "Design secure, compliant systems meeting government standards and data protection laws.",
      icon: Layers
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "Build scalable solutions with rigorous testing for security and performance.",
      icon: Code
    },
    {
      step: 4,
      title: "Deployment & Training",
      description: "Deploy solutions with comprehensive training and ongoing government support.",
      icon: Rocket
    }
  ]

  const stats = [
    { number: "100%", label: "Security Compliant", icon: Shield },
    { number: "24/7", label: "Government Support", icon: Users },
    { number: "99.9%", label: "Uptime Guarantee", icon: Target },
    { number: "24-48h", label: "Average Delivery Time", icon: Zap }
  ]

  const [faqStates, setFaqStates] = useState([false, false, false, false, false, false, false, false])

  return (
    <>
      <SEOHead
        title="Government Solutions - Custom Digital Infrastructure | Annita"
        description="Custom-built government solutions within Annita's digital ecosystem. Secure digital infrastructure for African governments, integrating e-governance, citizen portals, and more."
        keywords={[
          'government digital solutions',
          'e-governance',
          'citizen portals',
          'government software',
          'public administration',
          'digital government',
          'citizen services',
          'government data management',
          'compliance platforms',
          'public sector technology',
          'government IT solutions',
          'digital transformation government',
          'secure government systems',
          'public service platforms',
          'government analytics',
          'citizen engagement',
          'government efficiency',
          'public sector innovation',
          'government security',
          'regulatory compliance',
          'African government technology',
          'government digital platforms',
          'public administration software',
          'government service delivery',
          'citizen digital services'
        ]}
        canonical="/government-solutions"
      />

      {/* Hero Section */}
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
                Government <span className="text-blue-200">Digital Solutions</span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Empower your government with secure, efficient digital platforms that enhance citizen services,
                streamline operations, and ensure regulatory compliance across Africa.
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

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg text-sm sm:text-base"
                >
                  Start Government Project
                </Link>
                <Link
                  href="#solutions"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 text-sm sm:text-base"
                >
                  View Solutions
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 text-center">Loading benefits...</div>}>
        <BenefitsSection />
      </Suspense>

      {/* Solutions Grid */}
      <section id="solutions" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Government <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Solutions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Secure, scalable digital platforms designed specifically for government operations and citizen services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>

                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Process</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A secure, compliant methodology ensuring government solutions meet the highest standards of security and efficiency.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Technologies Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Stack</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Enterprise-grade technologies ensuring security, scalability, and compliance for government systems.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {/* Frontend */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">React/Next.js</h3>
                <p className="text-sm text-gray-600">Modern Frontend</p>
              </div>

              {/* Backend */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Node.js</h3>
                <p className="text-sm text-gray-600">Secure Backend</p>
              </div>

              {/* Security */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-sm text-gray-600">Government Grade</p>
              </div>

              {/* Cloud */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AWS/GCP</h3>
                <p className="text-sm text-gray-600">Secure Cloud</p>
              </div>

              {/* Compliance */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
                <p className="text-sm text-gray-600">Regulatory Standards</p>
              </div>

              {/* Analytics */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">Public Insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common questions about government digital transformation and our solutions.
              </p>
            </motion.div>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 0 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  How secure are your government solutions?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[0] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[0] ? 'auto' : 0, opacity: faqStates[0] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    Our government solutions implement bank-grade security measures including end-to-end encryption, multi-factor authentication, regular security audits, and compliance with international standards like ISO 27001, GDPR, and local data protection regulations. All data is stored in secure, government-approved cloud environments with 24/7 monitoring.
                  </p>
                </motion.div>
              </motion.div>

              {/* FAQ Item 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 1 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  Do you comply with government regulations and standards?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[1] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[1] ? 'auto' : 0, opacity: faqStates[1] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    Yes, all our government solutions are designed to comply with relevant regulations including data protection laws, accessibility standards (WCAG 2.1), and government-specific requirements. We work closely with your compliance team to ensure all solutions meet local and international standards before deployment.
                  </p>
                </motion.div>
              </motion.div>

              {/* FAQ Item 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 2 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  What is the typical implementation timeline?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[2] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[2] ? 'auto' : 0, opacity: faqStates[2] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    Implementation timelines vary based on project complexity, but typically range from 3-12 months. Simple citizen portals may take 3-4 months, while complex integrated systems requiring legacy migration can take 8-12 months. We provide detailed project timelines during our initial consultation.
                  </p>
                </motion.div>
              </motion.div>

              {/* FAQ Item 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 3 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  Can you integrate with our existing government systems?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[3] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[3] ? 'auto' : 0, opacity: faqStates[3] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    Yes, integration is a core strength of our solutions. We specialize in connecting new digital platforms with legacy government systems through secure APIs, data migration tools, and middleware solutions. Our team conducts thorough system audits to ensure seamless integration.
                  </p>
                </motion.div>
              </motion.div>

              {/* FAQ Item 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 4 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  What ongoing support and maintenance do you provide?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[4] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[4] ? 'auto' : 0, opacity: faqStates[4] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    We provide comprehensive 24/7 support including system monitoring, regular updates, security patches, performance optimization, and user training. Our government clients receive priority support with dedicated account managers and guaranteed response times for critical issues.
                  </p>
                </motion.div>
              </motion.div>

              {/* FAQ Item 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 5 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  How much do government digital solutions typically cost?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[5] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[5] ? 'auto' : 0, opacity: faqStates[5] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    Costs vary significantly based on project scope, complexity, and requirements. Basic citizen portals may start from $50,000, while comprehensive integrated systems can range from $250,000 to $1M+. We provide detailed proposals with transparent pricing after understanding your specific needs and conducting a requirements analysis.
                  </p>
                </motion.div>
              </motion.div>

              {/* FAQ Item 7 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 6 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  Do you provide training for government staff?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[6] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[6] ? 'auto' : 0, opacity: faqStates[6] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    Yes, comprehensive training is included in all our government projects. We provide administrator training, user training sessions, detailed documentation, video tutorials, and ongoing support. Training is customized for different user roles and includes both technical and end-user training programs.
                  </p>
                </motion.div>
              </motion.div>

              {/* FAQ Item 8 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center cursor-pointer" onClick={() => setFaqStates(prev => prev.map((state, i) => i === 7 ? !state : state))}>
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-600" />
                  What happens if we need to scale our solution in the future?
                  <ChevronDown className={`w-5 h-5 ml-auto transition-transform ${faqStates[7] ? 'rotate-180' : ''}`} />
                </h3>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: faqStates[7] ? 'auto' : 0, opacity: faqStates[7] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    Our solutions are built with scalability in mind. We use cloud-native architectures that can handle increased user loads, additional features, and expanded functionality. We provide scaling roadmaps and can accommodate future growth without significant redevelopment costs.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Certifications Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Security & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Compliance</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our government solutions meet the highest international security standards and compliance requirements.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
              {/* ISO 27001 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">ISO 27001</h3>
                <p className="text-sm text-gray-600">Information Security</p>
                <div className="text-xs text-blue-600 mt-2">Certified</div>
              </motion.div>

              {/* SOC 2 Type II */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">SOC 2 Type II</h3>
                <p className="text-sm text-gray-600">Trust Services</p>
                <div className="text-xs text-blue-600 mt-2">Certified</div>
              </motion.div>

              {/* GDPR */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">GDPR</h3>
                <p className="text-sm text-gray-600">Data Protection</p>
                <div className="text-xs text-blue-600 mt-2">Compliant</div>
              </motion.div>

              {/* WCAG 2.1 AA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">WCAG 2.1 AA</h3>
                <p className="text-sm text-gray-600">Accessibility</p>
                <div className="text-xs text-blue-600 mt-2">Certified</div>
              </motion.div>

              {/* ISO 9001 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">ISO 9001</h3>
                <p className="text-sm text-gray-600">Quality Management</p>
                <div className="text-xs text-blue-600 mt-2">Certified</div>
              </motion.div>

              {/* NIST Framework */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">NIST</h3>
                <p className="text-sm text-gray-600">Cybersecurity</p>
                <div className="text-xs text-blue-600 mt-2">Framework</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-gray-600 max-w-3xl mx-auto">
                All our government solutions undergo rigorous security testing and compliance audits.
                We maintain comprehensive documentation and provide regular compliance reports to ensure
                ongoing adherence to the highest security and regulatory standards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Government Project</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transform your government operations with secure digital solutions. Let's discuss your vision.
              </p>
            </motion.div>

            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-lg"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Government Agency *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Agency name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="official.email@gov.agency"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+231 77 505 7227"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select project type</option>
                        <option value="citizen-portal">Citizen Portal</option>
                        <option value="e-governance">E-Governance System</option>
                        <option value="data-management">Data Management</option>
                        <option value="compliance">Compliance Platform</option>
                        <option value="analytics">Public Analytics</option>
                        <option value="integration">Service Integration</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select budget</option>
                        <option value="under-50k">Under $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="over-500k">Over $500,000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select timeline</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-12-months">6-12 months</option>
                        <option value="over-12-months">Over 12 months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Describe your government's digital transformation needs, current challenges, and desired outcomes..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Government Project Inquiry'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center bg-green-50 border border-green-200 rounded-2xl p-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700 mb-4">
                  Your government project inquiry has been submitted successfully. Our team will review your requirements and contact you within 24 hours.
                </p>
                <button
                  onClick={reset}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
