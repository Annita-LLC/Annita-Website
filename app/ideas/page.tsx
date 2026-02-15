"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import SEOHead from '@/components/seo/SEOHead'
import { 
  Lightbulb, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ThumbsUp, 
  MessageSquare,
  TrendingUp,
  Users,
  Target,
  Star,
  Filter,
  Search,
  Plus,
  Eye,
  Clock,
  Award,
  Heart,
  Zap,
  Globe,
  Building,
  BookOpen,
  DollarSign,
  Shield,
  ChevronDown,
  ChevronUp,
  Play,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  MapPin,
  ExternalLink,
  Share2,
  Bookmark,
  Flag,
  Edit,
  Trash2,
  Copy,
  Link,
  Image,
  FileText,
  Video,
  Mic,
  Camera,
  Upload,
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Settings,
  Bell,
  User,
  Mail,
  Phone,
  MessageCircle,
  ThumbsDown,
  Reply,
  MoreHorizontal,
  Tag,
  Hash,
  TrendingDown,
  Minus,
  Maximize2,
  Minimize2,
  List,
  Grid3X3
} from 'lucide-react'
import CTASection from '@/components/sections/CTASection'

interface Idea {
  id: number
  title: string
  description: string
  detailedDescription: string
  category: string
  impact: string
  votes: number
  comments: number
  status: string
  author: string
  authorAvatar: string
  date: string
  targetAudience: string
  tags: string[]
  estimatedEffort: string
  businessValue: string
  technicalFeasibility: string
  priority: string
  progress: number
  budget: string
  timeline: string
  team: string[]
  attachments: string[]
  location: string
  relatedIdeas: number[]
}

const IdeasPage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeTab, setActiveTab] = useState('submit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [bookmarkedIdeas, setBookmarkedIdeas] = useState<number[]>([])
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    title: '',
    description: '',
    impact: 'medium',
    targetAudience: '',
    contactPreference: 'email',
    tags: '',
    attachments: [] as File[],
    estimatedEffort: 'medium',
    businessValue: 'medium',
    technicalFeasibility: 'medium',
    priority: 'medium'
  })

  const categories = [
    { id: 'all', name: 'All Ideas', icon: Lightbulb, color: 'gray' },
    { id: 'features', name: 'Feature Requests', icon: Zap, color: 'blue' },
    { id: 'improvements', name: 'Improvements', icon: TrendingUp, color: 'green' },
    { id: 'business', name: 'Business Ideas', icon: Building, color: 'purple' },
    { id: 'partnerships', name: 'Partnerships', icon: Users, color: 'orange' },
    { id: 'community', name: 'Community', icon: Heart, color: 'pink' },
    { id: 'feedback', name: 'General Feedback', icon: MessageSquare, color: 'indigo' }
  ]

  const impactLevels = [
    { value: 'low', label: 'Low Impact', description: 'Nice to have' },
    { value: 'medium', label: 'Medium Impact', description: 'Would be helpful' },
    { value: 'high', label: 'High Impact', description: 'Very important' },
    { value: 'critical', label: 'Critical', description: 'Essential for success' }
  ]

  // Ideas data (will be populated as users submit ideas)
  const [ideas, setIdeas] = useState<Idea[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, attachments: [...formData.attachments, ...Array.from(e.target.files)] })
    }
  }

  const removeAttachment = (index: number) => {
    setFormData({ 
      ...formData, 
      attachments: formData.attachments.filter((_, i) => i !== index) 
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create new idea object from form data
    const newIdea: Idea = {
      id: Date.now(), // Use timestamp as unique ID
      title: formData.title,
      description: formData.description,
      detailedDescription: formData.description,
      category: formData.category,
      impact: formData.impact,
      votes: 0,
      comments: 0,
      status: 'under-review',
      author: formData.name || 'Anonymous',
      authorAvatar: '',
      date: new Date().toISOString(),
      targetAudience: formData.targetAudience || 'General',
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
      estimatedEffort: formData.estimatedEffort,
      businessValue: formData.businessValue,
      technicalFeasibility: formData.technicalFeasibility,
      priority: formData.priority,
      progress: 0,
      budget: '',
      timeline: '',
      team: [],
      attachments: formData.attachments.map(f => f.name),
      location: '',
      relatedIdeas: []
    }
    
    // Add the new idea to the ideas array
    setIdeas(prevIdeas => [newIdea, ...prevIdeas])
    
    // Simulate success
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    // Switch to browse tab after a short delay so user can see their idea
    setTimeout(() => {
      setActiveTab('browse')
      // Scroll to top of browse section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)
    
    // Reset form after switching tabs
    setTimeout(() => {
      setSubmitStatus('idle')
      setFormData({
        name: '',
        email: '',
        category: '',
        title: '',
        description: '',
        impact: 'medium',
        targetAudience: '',
        contactPreference: 'email',
        tags: '',
        attachments: [],
        estimatedEffort: 'medium',
        businessValue: 'medium',
        technicalFeasibility: 'medium',
        priority: 'medium'
      })
    }, 3000)
  }

  const toggleIdea = (id: number) => {
    setExpandedIdea(expandedIdea === id ? null : id)
  }

  const voteOnIdea = (id: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    ))
  }

  const toggleBookmark = (id: number) => {
    setBookmarkedIdeas(prev => 
      prev.includes(id) 
        ? prev.filter(bookmarkId => bookmarkId !== id)
        : [...prev, id]
    )
  }

  const shareIdea = (idea: any) => {
    if (navigator.share) {
      navigator.share({
        title: idea.title,
        text: idea.description,
        url: window.location.href
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${idea.title} - ${idea.description}`)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-blue-600 bg-blue-100'
      case 'low': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-blue-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'impact':
        const impactOrder = { critical: 4, high: 3, medium: 2, low: 1 }
        return impactOrder[b.impact as keyof typeof impactOrder] - impactOrder[a.impact as keyof typeof impactOrder]
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'planned': return 'bg-purple-100 text-purple-700'
      case 'under-review': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-blue-600'
      case 'low': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <>
      <SEOHead
        title="Ideas & Tips - Shape Annita's Digital Ecosystem"
        description="Share your ideas, suggestions, and feedback to help shape Annita's digital ecosystem. Submit feature requests, business ideas, and community initiatives for MSMEs, governments, and partners."
        keywords={["ideas", "tips", "feedback", "feature requests", "suggestions", "community", "innovation", "Annita"]}
        canonical="/ideas"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white/5 rounded-full animate-bounce delay-500"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Main Content */}
              <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                  className="text-center lg:text-left"
              >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                  Ideas & <span className="text-orange-200">Tips</span>
                </h1>
                  <p className="text-lg sm:text-xl text-orange-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                    Help shape the future of Annita's digital ecosystem! Share your ideas, suggestions, and feedback. 
                    Together, we can build something amazing for MSMEs, governments, and partners across Africa.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold">{ideas.length}</div>
                      <div className="text-sm text-orange-200">Ideas Submitted</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold">{ideas.reduce((sum, idea) => sum + idea.votes, 0)}</div>
                      <div className="text-sm text-orange-200">Total Votes</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button 
                      onClick={() => setActiveTab('submit')}
                      className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center shadow-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Submit Your Idea
                    </button>
                    <button 
                      onClick={() => setActiveTab('browse')}
                      className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200 flex items-center justify-center"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Browse Ideas
                    </button>
                  </div>
              </motion.div>

                {/* Right Column - Interactive Elements */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  {/* Ideas Overview */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-4 text-center">Community Ideas</h3>
                    <div className="text-center py-8">
                      {ideas.length === 0 ? (
                        <>
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lightbulb className="w-8 h-8 text-orange-200" />
                          </div>
                          <p className="text-orange-200 text-sm mb-2">No ideas submitted yet</p>
                          <p className="text-orange-100 text-xs">Be the first to share your idea!</p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lightbulb className="w-8 h-8 text-orange-200" />
                          </div>
                          <p className="text-orange-200 text-sm mb-2 font-semibold">{ideas.length} {ideas.length === 1 ? 'Idea' : 'Ideas'} Submitted</p>
                          <p className="text-orange-100 text-xs">Keep the ideas coming!</p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
            <nav className="flex space-x-1 overflow-x-auto">
              {[
                { id: 'submit', label: 'Submit Idea', icon: Plus },
                { id: 'browse', label: 'Browse Ideas', icon: Eye },
                  { id: 'status', label: 'Implementation Status', icon: Clock },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
              
              {/* View Controls */}
              {activeTab === 'browse' && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      showFilters ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Submit Idea Tab */}
              {activeTab === 'submit' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                        Share Your <span className="text-orange-600">Idea</span>
                      </h2>
                      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a brilliant idea? We'd love to hear it! Your suggestions help us improve 
                        and innovate for the benefit of all our users.
                      </p>
                    </div>

                    <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100">
                      {/* Success/Error Messages */}
                      {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <p className="text-green-800">Thank you! Your idea has been submitted successfully. We'll review it and get back to you soon.</p>
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <p className="text-red-800">There was an error submitting your idea. Please try again.</p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Optional - can be anonymous"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Optional - for updates on your idea"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="">Select Category</option>
                              <option value="features">Feature Request</option>
                              <option value="improvements">Improvement Suggestion</option>
                              <option value="business">Business Idea</option>
                              <option value="partnerships">Partnership Opportunity</option>
                              <option value="community">Community Initiative</option>
                              <option value="feedback">General Feedback</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Impact Level *</label>
                            <select
                              name="impact"
                              value={formData.impact}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              {impactLevels.map((level) => (
                                <option key={level.value} value={level.value}>
                                  {level.label} - {level.description}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Effort</label>
                            <select
                              name="estimatedEffort"
                              value={formData.estimatedEffort}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="low">Low Effort</option>
                              <option value="medium">Medium Effort</option>
                              <option value="high">High Effort</option>
                              <option value="critical">Critical Effort</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Value</label>
                            <select
                              name="businessValue"
                              value={formData.businessValue}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="low">Low Value</option>
                              <option value="medium">Medium Value</option>
                              <option value="high">High Value</option>
                              <option value="critical">Critical Value</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Feasibility</label>
                            <select
                              name="technicalFeasibility"
                              value={formData.technicalFeasibility}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="low">Low Feasibility</option>
                              <option value="medium">Medium Feasibility</option>
                              <option value="high">High Feasibility</option>
                              <option value="critical">Critical Feasibility</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Idea Title *</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Brief, descriptive title for your idea"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                          <input
                            type="text"
                            name="targetAudience"
                            value={formData.targetAudience}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Who would benefit from this idea?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                          <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter tags separated by commas (e.g., mobile, AI, accessibility)"
                          />
                          <p className="text-sm text-gray-500 mt-1">Tags help categorize and find your idea</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Describe your idea in detail. What problem does it solve? How would it work? What benefits would it provide?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors duration-200">
                            <input
                              type="file"
                              multiple
                              onChange={handleFileUpload}
                              className="hidden"
                              id="file-upload"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-1">Click to upload files or drag and drop</p>
                              <p className="text-xs text-gray-500">PDF, DOC, images, videos (max 10MB each)</p>
                            </label>
                          </div>
                          
                          {formData.attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {formData.attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm text-gray-700">{file.name}</span>
                                    <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeAttachment(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">How would you like us to contact you about updates?</label>
                          <select
                            name="contactPreference"
                            value={formData.contactPreference}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="email">Email updates</option>
                            <option value="phone">Phone call</option>
                            <option value="none">No contact needed</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>{isSubmitting ? 'Submitting...' : 'Submit Idea'}</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Browse Ideas Tab */}
              {activeTab === 'browse' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
                      Community <span className="text-orange-600">Ideas</span>
                    </h2>
                    
                    {/* Advanced Filters and Search */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Search & Filter Ideas</h3>
                        <button
                          onClick={() => setShowFilters(!showFilters)}
                          className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
                        >
                          <Filter className="w-4 h-4" />
                          <span className="text-sm">Advanced Filters</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search ideas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="recent">Most Recent</option>
                          <option value="votes">Most Popular</option>
                          <option value="impact">Highest Impact</option>
                          <option value="effort">Lowest Effort</option>
                          <option value="feasibility">Highest Feasibility</option>
                        </select>
                      </div>

                      {/* Advanced Filters */}
                      {showFilters && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-200 pt-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                <option value="">All Status</option>
                                <option value="implemented">Implemented</option>
                                <option value="in-progress">In Progress</option>
                                <option value="planned">Planned</option>
                                <option value="under-review">Under Review</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Impact Level</label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                <option value="">All Impact Levels</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Effort Level</label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                <option value="">All Effort Levels</option>
                                <option value="low">Low Effort</option>
                                <option value="medium">Medium Effort</option>
                                <option value="high">High Effort</option>
                                <option value="critical">Critical Effort</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                              <input
                                type="text"
                                placeholder="Filter by tags..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Ideas List/Grid */}
                    {sortedIdeas.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Lightbulb className="w-12 h-12 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Ideas Yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                          Be the first to share your brilliant idea! Your suggestions help us improve and innovate for the benefit of all our users.
                        </p>
                        <button 
                          onClick={() => setActiveTab('submit')}
                          className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center mx-auto"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Submit Your First Idea
                        </button>
                      </div>
                    ) : (
                      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                      {sortedIdeas.map((idea, index) => (
                        <motion.div
                          key={idea.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-start space-x-3 mb-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {idea.author.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h3 className="text-lg font-semibold text-gray-900 truncate">{idea.title}</h3>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                                    {idea.status.replace('-', ' ')}
                                  </span>
                                </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                  <span>By {idea.author}</span>
                                  <span>•</span>
                                  <span>{new Date(idea.date).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{idea.description}</p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {idea.tags?.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                      #{tag}
                                  </span>
                                  ))}
                                  {idea.tags?.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                      +{idea.tags.length - 3} more
                                    </span>
                                  )}
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <div className="text-lg font-bold text-orange-600">{idea.votes}</div>
                                    <div className="text-xs text-gray-500">Votes</div>
                              </div>
                                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <div className="text-lg font-bold text-blue-600">{idea.comments}</div>
                                    <div className="text-xs text-gray-500">Comments</div>
                                  </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{idea.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-orange-600 h-2 rounded-full transition-all duration-1000"
                                      style={{ width: `${idea.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => voteOnIdea(idea.id)}
                                  className="flex items-center space-x-1 px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors duration-200"
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  <span className="text-sm font-medium">Vote</span>
                                </button>
                                <button
                                  onClick={() => toggleBookmark(idea.id)}
                                  className={`p-2 rounded-lg transition-colors duration-200 ${
                                    bookmarkedIdeas.includes(idea.id)
                                      ? 'bg-orange-100 text-orange-600'
                                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                  }`}
                                >
                                  <Bookmark className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => shareIdea(idea)}
                                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                  <Share2 className="w-4 h-4" />
                                </button>
                              </div>
                                <button
                                  onClick={() => toggleIdea(idea.id)}
                                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                  {expandedIdea === idea.id ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>
                            </div>
                            
                            <AnimatePresence>
                              {expandedIdea === idea.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 border-t border-gray-100">
                                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">{idea.detailedDescription}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                      <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Target Audience</h4>
                                        <p className="text-sm text-gray-600">{idea.targetAudience}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                                        <p className="text-sm text-gray-600">{idea.location}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Budget</h4>
                                        <p className="text-sm text-gray-600">{idea.budget}</p>
                                    </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Timeline</h4>
                                        <p className="text-sm text-gray-600">{idea.timeline}</p>
                                      </div>
                                    </div>

                                    <div className="mb-4">
                                      <h4 className="font-medium text-gray-900 mb-2">Team Required</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {idea.team?.map((role, idx) => (
                                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                            {role}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="mb-4">
                                      <h4 className="font-medium text-gray-900 mb-2">All Tags</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {idea.tags?.map((tag, idx) => (
                                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                            #{tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                      <div className="flex items-center space-x-1">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>{idea.comments} comments</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{idea.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                      Ideas <span className="text-orange-600">Analytics</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Track trends, engagement, and impact of community ideas over time.
                    </p>
                  </div>

                  {/* Analytics Dashboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { title: 'Total Ideas', value: ideas.length, icon: Lightbulb, color: 'orange' },
                      { title: 'Total Votes', value: ideas.length > 0 ? ideas.reduce((sum, idea) => sum + idea.votes, 0) : 0, icon: ThumbsUp, color: 'blue' },
                      { title: 'Total Comments', value: ideas.length > 0 ? ideas.reduce((sum, idea) => sum + idea.comments, 0) : 0, icon: MessageSquare, color: 'green' },
                      { title: 'Implementation Rate', value: '0%', icon: CheckCircle, color: 'purple' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                          stat.color === 'orange' ? 'bg-orange-100' :
                          stat.color === 'blue' ? 'bg-blue-100' :
                          stat.color === 'green' ? 'bg-green-100' :
                          'bg-purple-100'
                        }`}>
                          <stat.icon className={`w-6 h-6 ${
                            stat.color === 'orange' ? 'text-orange-600' :
                            stat.color === 'blue' ? 'text-blue-600' :
                            stat.color === 'green' ? 'text-green-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                        <p className="text-gray-600">{stat.title}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts and Trends */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ideas by Category</h3>
                      {ideas.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">No data available yet</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {categories.slice(1).map((category) => {
                            const count = ideas.filter(idea => idea.category === category.id).length
                            const percentage = ideas.length > 0 ? (count / ideas.length) * 100 : 0
                            return (
                              <div key={category.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <category.icon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-700">{category.name}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-orange-600 h-2 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Status</h3>
                      {ideas.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PieChart className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">No data available yet</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {[
                            { status: 'implemented', count: ideas.filter(i => i.status === 'implemented').length, color: 'green' },
                            { status: 'in-progress', count: ideas.filter(i => i.status === 'in-progress').length, color: 'blue' },
                            { status: 'planned', count: ideas.filter(i => i.status === 'planned').length, color: 'purple' },
                            { status: 'under-review', count: ideas.filter(i => i.status === 'under-review').length, color: 'yellow' }
                          ].map((stat) => {
                            const percentage = ideas.length > 0 ? (stat.count / ideas.length) * 100 : 0
                            return (
                              <div key={stat.status} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 capitalize">{stat.status.replace('-', ' ')}</span>
                                <div className="flex items-center space-x-3">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        stat.color === 'green' ? 'bg-green-600' :
                                        stat.color === 'blue' ? 'bg-blue-600' :
                                        stat.color === 'purple' ? 'bg-purple-600' :
                                        'bg-yellow-600'
                                      }`}
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 w-8">{stat.count}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Implementation Status Tab */}
              {activeTab === 'status' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                      Implementation <span className="text-orange-600">Status</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Track the progress of submitted ideas and see what we're working on.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { status: 'implemented', count: 0, label: 'Implemented', color: 'green' },
                      { status: 'in-progress', count: 0, label: 'In Progress', color: 'blue' },
                      { status: 'planned', count: 0, label: 'Planned', color: 'purple' },
                      { status: 'under-review', count: 0, label: 'Under Review', color: 'yellow' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.status}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                          stat.color === 'green' ? 'bg-green-100' :
                          stat.color === 'blue' ? 'bg-blue-100' :
                          stat.color === 'purple' ? 'bg-purple-100' :
                          'bg-yellow-100'
                        }`}>
                          <Award className={`w-6 h-6 ${
                            stat.color === 'green' ? 'text-green-600' :
                            stat.color === 'blue' ? 'text-blue-600' :
                            stat.color === 'purple' ? 'text-purple-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.count}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Implementations</h3>
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-gray-400" />
                          </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No Implementations Yet</h4>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Once ideas are submitted and implemented, they'll appear here. Be the first to submit an idea!
                      </p>
                      <button 
                        onClick={() => setActiveTab('submit')}
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center mx-auto"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Submit Your First Idea
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Main CTA */}
              <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                  className="text-center lg:text-left"
              >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Together, We Build the <span className="text-orange-200">Future</span>
                </h2>
                  <p className="text-lg sm:text-xl text-orange-100 mb-8 leading-relaxed">
                  Your ideas and feedback are the foundation of our innovation. 
                  Join our community of thinkers, creators, and changemakers.
                </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => setActiveTab('submit')}
                      className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Submit Your Idea
                  </button>
                  <button 
                    onClick={() => setActiveTab('browse')}
                      className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200 flex items-center justify-center"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Browse Ideas
                  </button>
                </div>
              </motion.div>

                {/* Right Column - Community Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <h3 className="text-2xl font-bold mb-6 text-center">Community Impact</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Ideas Submitted</span>
                      </div>
                      <span className="text-2xl font-bold">{ideas.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <ThumbsUp className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Total Votes</span>
                      </div>
                      <span className="text-2xl font-bold">{ideas.reduce((sum, idea) => sum + idea.votes, 0)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Implemented</span>
                      </div>
                      <span className="text-2xl font-bold">{ideas.filter(idea => idea.status === 'implemented').length}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-sm text-orange-200 mb-2">Ready to make an impact?</div>
                      <button 
                        onClick={() => setActiveTab('submit')}
                        className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors duration-200"
                      >
                        Start Sharing Ideas
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Share Your Ideas?"
          subtitle="Join thousands of innovators contributing to Africa's digital transformation. Your ideas help shape the future of business across the continent."
        />
      </div>
    </>
  )
}

export default IdeasPage
