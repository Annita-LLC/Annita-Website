'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '@/components/seo/SEOHead'
import {
  Building2,
  Users,
  Target,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Zap,
  Shield,
  Rocket
} from 'lucide-react'
import Link from 'next/link'

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('overview')

  const stats = [
    {
      icon: Building2,
      number: "2021",
      label: "Founded"
    },
    {
      icon: Users,
      number: "5M+",
      label: "MSMEs Target"
    },
    {
      icon: Globe,
      number: "54",
      label: "Countries"
    },
    {
      icon: Award,
      number: "10+",
      label: "Awards"
    }
  ]
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Annita",
    "url": "https://www.an-nita.com",
    "logo": "https://www.an-nita.com/favicon.png",
    "description": "Africa's first all-in-one digital ecosystem integrating e-commerce, fintech, AI, communication, marketing, logistics, and more. Delivering custom-built solutions for MSMEs, governments, and strategic partners across the continent.",
    "foundingDate": "2021",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Monrovia",
      "addressCountry": "Liberia"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "annitallc@gmail.com"
    },
    "sameAs": [
      "https://linkedin.com/company/annita-africa",
      "https://twitter.com/annita_africa"
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Christopher O. Fallah",
        "jobTitle": "CEO & Founder"
      },
      {
        "@type": "Person",
        "name": "Emmanuel Z. Weh",
        "jobTitle": "CTO"
      },
      {
        "@type": "Siah Fallah",
        "jobTitle": "CMO"
      },
      {
        "@type": "Person",
        "name": "Lamber Kpukuyou",
        "jobTitle": "CTO"
      }
    ],
    "award": [
      "Orange Social Venture Prize Winner 2024",
      "African Union EAN Fellowship 2024",
      "SMART Liberia Winner 2024",
      "Mansa Platform Partner 2025"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "All African Countries"
      }
    ],
    "numberOfEmployees": "10-50",
    "slogan": "Africa's First All-in-One Digital Ecosystem"
  }

  return (
    <>
      <SEOHead
        title="About Us - Annita | Empowering Africa's Digital Future"
        description="Learn about Annita, Africa's first all-in-one digital ecosystem. Discover our mission to empower MSMEs, governments, and strategic partners through custom-built solutions integrating e-commerce, fintech, AI, and more."
        keywords={[
          'Annita',
          'about Annita',
          'African digital platform',
          'e-commerce Africa',
          'fintech Africa',
          'AI solutions Africa',
          'MSME empowerment',
          'digital transformation Africa',
          'African startup',
          'Liberia tech company',
          'African innovation',
          'digital platform Africa',
          'business solutions Africa',
          'innovation Africa',
          'digital economy Africa',
          'African technology',
          'business empowerment Africa',
          'digital solutions Africa',
          'African fintech',
          'e-commerce platform Africa',
          'African digital services',
          'business technology Africa',
          'African digital innovation',
          'platform solutions Africa',
          'African business technology',
          'digital business Africa',
          'African platform company',
          'business platform Africa',
          'African digital business',
          'technology platform Africa',
          'African business solutions',
          'digital platform company',
          'African tech platform',
          'business innovation Africa',
          'African digital platform',
          'technology solutions Africa',
          'African business platform',
          'digital innovation Africa',
          'Orange Social Venture Prize',
          'African Union Fellowship',
          'Mansa Platform',
          'SMART Liberia',
          'Christopher O Fallah',
          'Annita leadership'
        ]}
        canonical="/about"
        ogImage="/about-og-image.jpg"
        structuredData={structuredData}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white overflow-hidden">
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
                  Empowering Africa's <span className="text-orange-200">Digital Future</span>
                </h1>

                <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-8">
                  Annita is Africa's first all-in-one digital ecosystem—integrating e-commerce, fintech, AI, communication, marketing, logistics, and more into a single, connected system. Built for both online and offline access, Annita delivers custom-built solutions for MSMEs, governments, and strategic partners across the continent.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <stat.icon className="w-8 h-8 text-orange-200 mx-auto mb-2" />
                      <div className="text-2xl sm:text-3xl font-bold">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-orange-200">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="#journey"
                    className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-200 shadow-lg text-sm sm:text-base"
                  >
                    Our Journey
                  </Link>
                  <Link
                    href="#team"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200 text-sm sm:text-base"
                  >
                    Meet Our Team
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: 'overview', name: 'Overview', icon: Building2 },
                { id: 'mission', name: 'Mission & Vision', icon: Target },
                { id: 'values', name: 'Core Values', icon: Heart },
                { id: 'journey', name: 'Our Journey', icon: TrendingUp },
                { id: 'goals', name: 'Our Goals', icon: Rocket }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                  }`}
                >
                  <section.icon className="w-4 h-4 mr-2" />
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  Empowering Africa's Future Through <span className="text-orange-500">Innovation</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Annita is Africa's first all-in-one digital ecosystem—integrating e-commerce, fintech, AI, communication, marketing, logistics, and more into a single, connected system. We design and deploy tailored digital infrastructure that empowers individuals and organizations with innovative tools, seamless connectivity, and real economic opportunity.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
              >
                {[
                  {
                    icon: Target,
                    number: "5M+",
                    label: "MSMEs Target",
                    desc: "by 2029",
                    color: "from-orange-400 to-red-400"
                  },
                  {
                    icon: Globe,
                    number: "54",
                    label: "African Countries",
                    desc: "Pan-African reach",
                    color: "from-blue-400 to-purple-400"
                  },
                  {
                    icon: Rocket,
                    number: "2021",
                    label: "Founded",
                    desc: "Innovation since day one",
                    color: "from-green-400 to-teal-400"
                  },
                  {
                    icon: Users,
                    number: "50+",
                    label: "Team Members",
                    desc: "Expert professionals",
                    color: "from-purple-400 to-pink-400"
                  }
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-500">{stat.desc}</div>
                  </div>
                ))}
              </motion.div>

              {/* Mission & Vision Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    To deliver Africa's first all-in-one platform, seamlessly integrating e-commerce, fintech, AI-driven tools, communication, marketing, logistics, and lifestyle services. We empower businesses and individuals with accessible, affordable, and innovative solutions, providing connectivity and convenience to drive growth and success.
                  </p>
                  <div className="flex items-center text-orange-600 font-medium">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Learn More
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    To empower 5 million Micro, Small, and Medium Enterprises (MSMEs) across Africa and beyond by 2029, catalyzing global economic growth and job creation. With a special focus on underserved communities, including rural and women-led businesses, we aim to transform Africa's economic landscape through digital innovation.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Discover More
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Goals Section */}
        <section id="goals" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  Our <span className="text-orange-500">Goals</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Transforming African Business through comprehensive digital solutions and unwavering commitment to excellence.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "Innovation First",
                    desc: "Continuously developing cutting-edge solutions that address Africa's unique business challenges and opportunities.",
                    color: "from-orange-400 to-red-400"
                  },
                  {
                    icon: Heart,
                    title: "Inclusive Growth",
                    desc: "Making digital tools accessible to underserved communities, including rural areas and women-led businesses across Africa.",
                    color: "from-blue-400 to-purple-400"
                  },
                  {
                    icon: Shield,
                    title: "Trust & Security",
                    desc: "Building secure, reliable platforms that businesses can depend on, with bank-grade security and escrow protection.",
                    color: "from-green-400 to-teal-400"
                  }
                ].map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${goal.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <goal.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{goal.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{goal.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section id="values" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  Our Core <span className="text-orange-500">Values</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  These values guide everything we do, from product development to customer service, ensuring we stay true to our mission of empowering Africa's MSMEs.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "Innovation & Impact",
                    desc: "Annita is committed to continuous innovation and creating meaningful impact. We push boundaries to solve Africa's unique challenges, developing solutions that drive real economic growth and social progress.",
                    points: ["Cutting-edge technology solutions", "Sustainable business practices", "Community-driven development"],
                    color: "from-orange-500 to-red-500"
                  },
                  {
                    icon: Heart,
                    title: "Empowerment",
                    desc: "We believe in empowering every African business to reach their full potential. Our platform provides the tools, resources, and support needed to thrive in today's digital economy.",
                    points: ["Comprehensive business tools", "24/7 expert support", "Educational resources"],
                    color: "from-blue-500 to-purple-500"
                  },
                  {
                    icon: Globe,
                    title: "Inclusion",
                    desc: "Making digital tools accessible to underserved communities across Africa. We ensure our platform serves all African businesses, regardless of location or size.",
                    points: ["Rural area accessibility", "Multi-language support", "Affordable pricing"],
                    color: "from-green-500 to-teal-500"
                  },
                  {
                    icon: Shield,
                    title: "Trust",
                    desc: "Building secure, reliable platforms that businesses can depend on. Trust is the foundation of our relationship with every African business we serve.",
                    points: ["Bank-grade security", "Escrow protection", "Transparent policies"],
                    color: "from-purple-500 to-pink-500"
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mr-4`}>
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{value.desc}</p>
                    <div className="space-y-3">
                      {value.points.map((point, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className={`w-4 h-4 mr-3 text-${value.color.split('-')[1]}-500`} />
                          <span className="text-sm text-gray-600">{point}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <section id="journey" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  Our <span className="text-orange-500">Journey</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  From a simple e-commerce idea to expanding into Africa's first all-in-one digital platform, here's our gradual evolution and growth story.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    phase: "Phase 1",
                    date: "August 2021",
                    title: "MVP Launch",
                    desc: "Launched MVP with multi-vendor marketplace and ads. Our first step into Africa's digital commerce space.",
                    achievement: "First paying customers secured",
                    icon: Rocket,
                    color: "from-orange-500 to-red-500"
                  },
                  {
                    phase: "Phase 2",
                    date: "June 2022",
                    title: "Product Validation",
                    desc: "Achieved product-market fit with our first paying customers and validated our business model.",
                    achievement: "Product-market fit achieved",
                    icon: Target,
                    color: "from-blue-500 to-purple-500"
                  },
                  {
                    phase: "Phase 3",
                    date: "May 2023",
                    title: "Cross-Border Expansion",
                    desc: "Expanded beyond local markets to serve MSMEs across multiple African countries.",
                    achievement: "Cross-border expansion completed",
                    icon: Globe,
                    color: "from-green-500 to-teal-500"
                  },
                  {
                    phase: "Phase 4",
                    date: "March 2024",
                    title: "Major Recognition",
                    desc: "Won Orange Social Venture Prize and became part of African Union EAN Fellowship.",
                    achievement: "International recognition received",
                    icon: Award,
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    phase: "Phase 5",
                    date: "Q1 2025",
                    title: "MANSA Partnership",
                    desc: "Validated by Afreximbank's MANSA as a trusted cross-border trade partner.",
                    achievement: "Institutional validation achieved",
                    icon: Shield,
                    color: "from-red-500 to-orange-500"
                  },
                  {
                    phase: "Phase 6",
                    date: "Q2 2025",
                    title: "AnnitaPay Launch",
                    desc: "Development and testing of our proprietary payment solution for African businesses.",
                    achievement: "Proprietary payment solution launched",
                    icon: TrendingUp,
                    color: "from-indigo-500 to-purple-500"
                  }
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-xl flex items-center justify-center`}>
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {milestone.phase}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-gray-500 mb-1">{milestone.date}</div>
                      <h3 className="text-lg font-bold text-gray-900">{milestone.title}</h3>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{milestone.desc}</p>

                    <div className="flex items-center text-xs">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-gray-600 font-medium">{milestone.achievement}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center p-6 sm:p-8 lg:p-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white shadow-2xl"
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                  Ready to Access Our Digital Ecosystem?
                </h3>
                <p className="text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
                  Join our mission to deliver custom-built solutions for MSMEs, governments, and strategic partners across Africa.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 shadow-lg text-sm sm:text-base"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Try V1.0 Now
                  </Link>
                  <Link
                    href="/careers"
                    className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Join Our Team
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default AboutPage
