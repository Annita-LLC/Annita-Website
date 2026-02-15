'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SEOHead from '@/components/seo/SEOHead'
import {
  Award,
  TrendingUp,
  Users,
  Target,
  ExternalLink,
  Linkedin,
  ArrowRight,
  Download,
  Globe,
  Star,
  Trophy,
  Medal,
  Crown,
  Sparkles,
  Code
} from 'lucide-react'
import CTASection from '@/components/sections/CTASection'
import Link from 'next/link'

export default function AwardsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const awards = [
    {
      id: 'asc-2025',
      title: "$7,000 Grant - African Startup Conference (ASC 2025)",
      organization: "African Union & Government of Algeria",
      year: "2025",
      description: "Annita was awarded a $7,000 grant at the African Startup Conference (ASC 2025) in Algiers, Algeria. Part of a total USD 100,000 distributed among 10 innovative startups at the African Youth Startup Programme during the Intra African Trade Fair.",
      impact: "Received $7,000 USD grant for innovation and entrepreneurship",
      featured: true,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_africanstartupconference-asc2025-africanunion-activity-7404505251682283520-KZ-a"
    },
    {
      id: 'presidential-ai-grant',
      title: "$2,000 Grant - Presidential African Youth AI Recognition",
      organization: "Ele-Vate AI Innovation Hub & African Union",
      year: "2025",
      description: "Annita received a $2,000 grant through the Presidential African Youth in Artificial Intelligence and Robotics Competition 2025, recognizing our outstanding innovation in AI and technology.",
      impact: "Received $2,000 USD grant for AI innovation excellence",
      featured: true,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_moonshot-certificate-of-appreciation-activity-7394244971559616513-PzRc"
    },
    {
      id: 'moonshot-awards',
      title: "Top 15 Shortlisted - Moonshot Borderless Awards",
      organization: "Moonshot Platform",
      year: "2025",
      description: "Annita has been recognized among the Top 15 Shortlisted applicants for the prestigious Moonshot Borderless Awards, reaching this milestone from a competitive pool of Top 100 applicants representing 139 countries worldwide.",
      impact: "Selected among Top 15 from 139 countries worldwide",
      featured: true,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_moonshotawards2025-activity-7394246779233542145-9zy-"
    },
    {
      id: 'presidential-ai-competition',
      title: "Certificate of Excellence in Innovation and Technology",
      organization: "Ele-Vate AI Innovation Hub & African Union",
      year: "2025",
      description: "Recognized for the most outstanding innovation in the Presidential African Youth in Artificial Intelligence and Robotics Competition 2025, receiving the Certificate of Excellence in Innovation and Technology.",
      impact: "Most outstanding innovation award in AI & Robotics",
      featured: true,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_certificate-presidential-african-youth-competition-activity-7389229957429809152-YKKD"
    },
    {
      id: 'iatf2025',
      title: "First Liberian Startup at Intra-African Trade Fair 2025",
      organization: "African Union Youth Start-Up Program",
      year: "2025",
      description: "Annita became the first and only Liberian startup represented at the Intra-African Trade Fair 2025 (IATF2025), under the prestigious African Union Youth Start-Up Program (AU YSP).",
      impact: "First and only Liberian startup at IATF2025",
      featured: true,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_annita-at-iatf2025-representing-liberia-activity-7380915546302672898-tkdm"
    },
    {
      id: 'orange-prize',
      title: "$3,000 Grant - Orange Social Venture Prize 2024",
      organization: "Orange Social Venture Prize",
      year: "2024",
      description: "Annita was awarded 1st Place in the Orange Social Venture Prize 2024 – Liberia National Grand Prize, receiving a $3,000 USD grant for our innovative digital platform.",
      impact: "Received $3,000 USD grant for platform development",
      featured: false,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_i-give-all-the-glory-to-my-lord-and-savior-activity-7235399030187397120-Otrb"
    },
    {
      id: 'ean-fellowship',
      title: "Enterprise African Network (EAN) Fellowship",
      organization: "African Union",
      year: "2024",
      description: "Annita has been selected as one of the 50 innovative small businesses for the inaugural Enterprise African Network (EAN) Fellowship Programme, participating in the prestigious third AU Micro, Small, and Medium Enterprise (MSME) Forum.",
      impact: "Selected among 50 innovative businesses across Africa",
      featured: false,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_annita-has-been-selected-as-one-of-the-50-activity-7231565059083104256-NRVM"
    },
    {
      id: 'smart-liberia',
      title: "$375 Grant - SMART Liberia ESP",
      organization: "SMART Liberia",
      year: "2024",
      description: "Back-to-back wins as the 9th place winner at SMART Liberia's ESP, receiving the L$75,000 ($375 USD) prize for our innovative business model and social impact.",
      impact: "Received $375 USD grant for business innovation",
      featured: false,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_back-to-back-wins-not-luck-grace-humbled-activity-7235717012008697857-B4fQ"
    },
    {
      id: 'mansa-platform',
      title: "Mansa Platform Partnership",
      organization: "Mansa Due Diligence",
      year: "2024",
      description: "Annita joins the Mansa platform, strengthening our position in the African business ecosystem and expanding our reach across the continent.",
      impact: "Enhanced business credibility and continental reach",
      featured: false,
      linkedinUrl: "https://www.linkedin.com/posts/christopher-o-fallah-15058ab4_annita-joins-the-mansa-platform-strengthening-activity-7303127700020350977-ykKT"
    }
  ]

  const stats = [
    { icon: Award, value: "9", label: "Awards Won" },
    { icon: Target, value: "4", label: "Funding Grants" }
  ]

  return (
    <>
      <SEOHead
        title="Awards & Recognition - Annita | Celebrating Innovation in Africa's Digital Ecosystem"
        description="Discover Annita's achievements, awards, and recognition for our innovative contributions to Africa's digital ecosystem, delivering custom solutions for MSMEs, governments, and partners."
        keywords={['awards', 'recognition', 'achievements', 'Annita', 'Africa']}
        canonical="/awards"
      />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-1/3 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >

              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                Celebrating Our <span className="text-orange-200">Achievements</span>
              </h1>

              {/* Description */}
              <p className="text-xl sm:text-2xl text-orange-100 mb-8 leading-relaxed max-w-2xl">
                Discover our prestigious awards and recognitions that showcase our commitment to innovation and impact across Africa.
              </p>

              {/* Quick Award Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Trophy className="w-6 h-6 text-orange-200" />
                  <div>
                    <div className="font-semibold text-white">Awards Won</div>
                    <div className="text-sm text-orange-200">9 Prestigious Awards</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Award className="w-6 h-6 text-orange-200" />
                  <div>
                    <div className="font-semibold text-white">Funding Secured</div>
                    <div className="text-sm text-orange-200">$12,375 USD Grants</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visualization Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Annita Recognition</h3>
                  <p className="text-orange-200">Awarded across Africa & globally</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <span className="text-white">Total Awards</span>
                    <span className="font-bold text-orange-200">9 Recognitions</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <span className="text-white">Grant Funding</span>
                    <span className="font-bold text-orange-200">$12,375 USD</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <span className="text-white">Global Reach</span>
                    <span className="font-bold text-orange-200">139 Countries</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Awards & <span className="text-orange-500">Recognition</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Discover our prestigious awards and recognitions that showcase our commitment to innovation and impact across Africa.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 max-w-md mx-auto lg:max-w-none">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {awards.map((award, index) => (
                <div
                  key={award.id}
                  className={`group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 ${
                    award.featured ? 'shadow-xl ring-2 ring-orange-200' : 'shadow-lg'
                  }`}
                >
                  {award.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ FEATURED
                      </div>
                    </div>
                  )}

                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Award className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                            {award.year}
                          </div>
                          <p className="text-sm text-gray-600 font-medium">{award.organization}</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                      {award.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {award.description}
                    </p>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200 mb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-semibold text-gray-700">Impact</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{award.impact}</p>
                    </div>

                    {award.linkedinUrl && (
                      <a
                        href={award.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        View LinkedIn Post
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Celebrate your achievements and join thousands of MSMEs using Annita to grow their revenue, reach new customers, and streamline operations across Africa."
      />
    </>
  )
}