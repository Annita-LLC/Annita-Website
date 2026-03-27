'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  Filter,
  TrendingUp,
  Award,
  Globe,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

// Blog post data with CEO/Founder content
const blogPosts = [
  {
    id: 1,
    title: "Christopher O. Fallah Wins Orange Social Venture Prize 2024",
    excerpt: "Annita's founder and CEO, Christopher O. Fallah, secures first place in the prestigious Orange Social Venture Prize for Africa and the Middle East, recognizing innovative solutions for local communities.",
    content: `
      <p>In a remarkable achievement for Liberia's tech ecosystem, Christopher O. Fallah, founder and CEO of Annita, has won first place in the Orange Social Venture Prize (OSVP) 2024 for Liberia. This prestigious award recognizes startups using new technologies to meet the needs of local communities across Africa and the Middle East.</p>
      
      <h3>The Innovation That Won</h3>
      <p>Annita's groundbreaking digital ecosystem platform impressed judges with its comprehensive approach to empowering MSMEs (Micro, Small, and Medium Enterprises) through technology. The platform integrates e-commerce, fintech, AI, communication, marketing, and logistics into a single, unified system designed specifically for African businesses.</p>
      
      <blockquote>
        <p>"We are building Africa's first unified digital platform from Liberia, for the continent. This award validates our mission to empower African MSMEs through innovative technology solutions that address real-world challenges."</p>
        <footer>— Christopher O. Fallah, CEO & Founder of Annita</footer>
      </blockquote>
      
      <h3>Impact on African Communities</h3>
      <p>The OSVP recognition highlights Annita's significant contribution to addressing critical challenges faced by African businesses. The platform's ability to connect small businesses with international markets while providing essential digital tools has positioned it as a game-changer for intra-African trade.</p>
      
      <h3>Looking Ahead</h3>
      <p>This achievement opens new opportunities for Annita to scale its impact across the continent. With the recognition and support from the Orange Social Venture Prize, Christopher and his team are poised to expand their reach and continue innovating for African businesses.</p>
    `,
    author: "Annita Team",
    date: "2024-11-15",
    readTime: "5 min read",
    category: "Awards",
    image: "/images/blog/orange-prize-winner.jpg",
    tags: ["Awards", "Christopher Fallah", "Innovation", "OSVP 2024"],
    featured: true
  },
  {
    id: 2,
    title: "Annita Showcases at Intra-African Trade Fair 2025 in Algeria",
    excerpt: "Christopher O. Fallah represents Liberia at IATF2025, showcasing Annita's innovative digital platform that's transforming intra-African trade and empowering MSMEs across the continent.",
    content: `
      <p>Liberia's digital innovation landscape is gaining international attention as Christopher O. Fallah, CEO and founder of Annita, represents the country at the Intra-African Trade Fair (IATF2025) in Algeria. This prestigious event brings together leaders from across the continent to showcase innovations driving intra-African trade.</p>
      
      <h3>Putting Liberia on the Tech Map</h3>
      <p>Christopher's participation at IATF2025 highlights Liberia's growing role in Africa's digital transformation. Through Annita's platform, he's actively promoting intra-African trade and empowering entrepreneurs to connect with markets beyond their borders.</p>
      
      <h3>The Annita Solution</h3>
      <p>At the heart of Annita's presentation is its revolutionary digital ecosystem that addresses the unique challenges faced by African MSMEs. The platform's comprehensive approach includes:</p>
      <ul>
        <li><strong>E-commerce Integration:</strong> Connecting local vendors with international customers</li>
        <li><strong>Financial Services:</strong> Fintech solutions tailored for African markets</li>
        <li><strong>AI-Powered Tools:</strong> Smart analytics and business insights</li>
        <li><strong>Communication Hub:</strong> Unified messaging and customer engagement</li>
        <li><strong>Marketing Solutions:</strong> Digital marketing tools for small businesses</li>
        <li><strong>Logistics Support:</strong> Supply chain and delivery management</li>
      </ul>
      
      <h3>Impact on Trade</h3>
      <p>Annita's platform is already making significant strides in facilitating intra-African trade. By providing small businesses with the tools and connections they need to compete in the digital marketplace, the platform is helping to level the playing field and create new opportunities for economic growth.</p>
      
      <blockquote>
        <p>"We're not just building a platform; we're creating a digital ecosystem that empowers African businesses to thrive in the global marketplace. Our presence at IATF2025 demonstrates Liberia's commitment to digital innovation and economic transformation."</p>
        <footer>— Christopher O. Fallah, CEO & Founder of Annita</footer>
      </blockquote>
    `,
    author: "Annita Team",
    date: "2025-01-20",
    readTime: "6 min read",
    category: "Events",
    image: "/images/blog/iatf2025-algeria.jpg",
    tags: ["IATF2025", "Christopher Fallah", "Intra-African Trade", "Algeria"],
    featured: true
  },
  {
    id: 3,
    title: "From Computer Science Student to Tech Entrepreneur: Christopher Fallah's Journey",
    excerpt: "Discover the inspiring story of how Christopher O. Fallah transformed his passion for technology into Annita, Liberia's first unified digital ecosystem platform.",
    content: `
      <p>Christopher O. Fallah's journey from a computer science student to the founder of one of Liberia's most innovative tech startups is a testament to vision, perseverance, and the power of technology to transform communities.</p>
      
      <h3>Early Education and Foundation</h3>
      <p>Christopher holds a bachelor's degree in computer science, information science, and support services from BlueCrest University College in Ghana, graduating in 2021. His educational background provided him with the technical foundation and strategic thinking needed to identify and solve real-world problems through technology.</p>
      
      <h3>The Birth of Annita</h3>
      <p>Launched in 2021, Annita Store began as an e-commerce platform designed to connect small businesses and vendors with customers. Christopher recognized the challenges faced by Liberian MSMEs in accessing digital tools and international markets, and he was determined to create a solution.</p>
      
      <blockquote>
        <p>"I saw how small businesses in Liberia struggled to compete in the digital age. I knew that technology could be the great equalizer, providing them with the tools they need to succeed both locally and internationally."</p>
        <footer>— Christopher O. Fallah, CEO & Founder of Annita</footer>
      </blockquote>
      
      <h3>Professional Experience and Growth</h3>
      <p>Before fully dedicating himself to Annita, Christopher gained valuable experience working as a sales manager at Prestige Motor Corporation, the exclusive Ford dealership in Liberia, from 2022 to 2023. This experience gave him insights into business operations and customer needs that would prove invaluable in developing Annita's platform.</p>
      
      <h3>Vision for Africa's Digital Future</h3>
      <p>Christopher's vision extends beyond Liberia. He sees Annita as a platform that can be replicated across Africa, providing the digital infrastructure needed to empower MSMEs continent-wide. His participation as an African Union Enterprise Africa Network Fellow demonstrates his commitment to pan-African digital transformation.</p>
      
      <h3>Awards and Recognition</h3>
      <p>The 2024 Orange Social Venture Prize win marked a significant milestone in Christopher's journey, but it's just the beginning. His dedication to using technology for social impact continues to drive Annita's evolution and expansion.</p>
    `,
    author: "Annita Team",
    date: "2024-12-10",
    readTime: "7 min read",
    category: "Founder Story",
    image: "/images/blog/christopher-fallah-journey.jpg",
    tags: ["Christopher Fallah", "Founder Story", "Entrepreneurship", "Journey"],
    featured: false
  },
  {
    id: 4,
    title: "Annita 3.0 Mobile App: Taking African Digital Ecosystems Mobile",
    excerpt: "Get ready for the next chapter in African digital transformation as Annita announces the upcoming launch of its revolutionary mobile application.",
    content: `
      <p>Excitement is building as Annita prepares to launch Annita 3.0, its revolutionary mobile application that will bring the full power of Africa's first digital ecosystem to users' fingertips. This mobile launch represents a significant milestone in the company's mission to empower MSMEs across the continent.</p>
      
      <h3>What to Expect from Annita 3.0</h3>
      <p>The mobile app is designed with African users in mind, featuring:</p>
      <ul>
        <li><strong>Native Performance:</strong> Lightning-fast performance optimized for African networks</li>
        <li><strong>Enhanced Security:</strong> Biometric authentication and end-to-end encryption</li>
        <li><strong>Offline Capabilities:</strong> Full offline mode ensuring business continuity</li>
        <li><strong>Cloud Synchronization:</strong> Real-time sync across all devices</li>
        <li><strong>AI-Powered Features:</strong> Intelligent insights and automation</li>
        <li><strong>Social Integration:</strong> Community networking and collaboration tools</li>
      </ul>
      
      <h3>Why Mobile Matters for Africa</h3>
      <p>With mobile penetration continuing to rise across Africa, the Annita 3.0 app is perfectly timed to meet the needs of entrepreneurs and businesses who rely on mobile devices as their primary gateway to the digital economy.</p>
      
      <h3>Join the Waitlist</h3>
      <p>Be among the first to experience the future of African digital ecosystems. Join over 50,000 people already on the waitlist and get exclusive early access when Annita 3.0 launches.</p>
      
      <blockquote>
        <p>"We're not just launching an app; we're launching a movement. Annita 3.0 will put the power of Africa's digital ecosystem directly into the hands of entrepreneurs, wherever they are."</p>
        <footer>— Christopher O. Fallah, CEO & Founder of Annita</footer>
      </blockquote>
    `,
    author: "Annita Team",
    date: "2025-02-01",
    readTime: "4 min read",
    category: "Product Updates",
    image: "/images/blog/annita-3-0-mobile.jpg",
    tags: ["Annita 3.0", "Mobile App", "Product Launch", "Digital Transformation"],
    featured: true
  },
  {
    id: 5,
    title: "Empowering MSMEs: Annita's Impact on Liberian Small Businesses",
    excerpt: "Discover how Annita is transforming the landscape for small and medium enterprises in Liberia, providing them with the digital tools needed to compete and grow.",
    content: `
      <p>Small and Medium Enterprises (SMEs) are the backbone of Liberia's economy, and Annita is playing a crucial role in empowering these businesses with the digital tools they need to thrive in today's competitive marketplace.</p>
      
      <h3>The Challenge Facing Liberian MSMEs</h3>
      <p>Many small businesses in Liberia struggle with limited access to digital tools, international markets, and the infrastructure needed to scale their operations. This is where Annita's comprehensive digital ecosystem comes into play.</p>
      
      <h3>Annita's Solution</h3>
      <p>Through its integrated platform, Annita provides Liberian MSMEs with:</p>
      <ul>
        <li><strong>E-commerce Tools:</strong> Online storefronts and payment processing</li>
        <li><strong>Financial Services:</strong> Access to digital banking and credit facilities</li>
        <li><strong>Marketing Support:</strong> Digital marketing tools and customer engagement</li>
        <li><strong>Analytics Dashboard:</strong> Business insights and performance tracking</li>
        <li><strong>Supply Chain Management:</strong> Logistics and inventory solutions</li>
      </ul>
      
      <h3>Success Stories</h3>
      <p>Already, numerous Liberian businesses have transformed their operations through Annita's platform. From local artisans reaching international customers to small retailers streamlining their inventory management, the impact is evident across various sectors.</p>
      
      <h3>The Road Ahead</h3>
      <p>As Annita continues to expand its offerings and reach, the future looks bright for Liberian MSMEs. With the upcoming mobile app launch and continued innovation, Christopher Fallah and his team are committed to ensuring that every small business in Liberia has access to the digital tools they need to succeed.</p>
    `,
    author: "Annita Team",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Impact",
    image: "/images/blog/liberian-msme-impact.jpg",
    tags: ["MSME", "Liberia", "Impact", "Digital Transformation"],
    featured: false
  }
]

const categories = ["All", "Awards", "Events", "Founder Story", "Product Updates", "Impact"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <>
      <SEOHead
        title="Annita Blog - Latest Updates & Insights"
        description="Stay updated with the latest news, achievements, and insights from Annita. Follow our journey as we transform Africa's digital ecosystem."
        keywords={[
          'Annita blog',
          'Christopher Fallah',
          'African tech news',
          'digital transformation',
          'MSME empowerment',
          'Liberia technology',
          'Orange Social Venture Prize',
          'intra-African trade',
          'Annita updates'
        ]}
        canonical="/blog"
        ogImage="/images/blog/annita-blog-og.jpg"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Annita Blog
                </h1>
                <p className="text-xl sm:text-2xl mb-8 text-blue-100">
                  Stay updated with our journey transforming Africa's digital ecosystem
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <Award className="w-4 h-4" />
                    <span>Award Winning</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <Users className="w-4 h-4" />
                    <span>Community Focused</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span>Growth Driven</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Stories</h2>
              <p className="text-gray-600 dark:text-gray-300">Highlights from our journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <div className="flex items-center justify-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredBlogPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Annita</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get the latest news, updates, and insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
