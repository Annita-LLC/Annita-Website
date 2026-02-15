'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, TrendingUp, Heart, MessageCircle, Share2, Search, Filter, Download, Calendar, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import SocialMediaManagement from '@/components/staff/SocialMediaManagement'

interface CMOSocialPlatform {
  platform: string
  followers: number
  growth: number
  engagement: number
  posts: number
  reach: number
  impressions: number
  status: 'active' | 'paused' | 'archived'
}

interface CMOSocialPost {
  id: string
  platform: string
  content: string
  type: 'image' | 'video' | 'text' | 'link' | 'carousel'
  status: 'scheduled' | 'published' | 'draft'
  publishDate: string
  author: string
  metrics: {
    likes: number
    comments: number
    shares: number
    reach: number
    engagement: number
  }
}

export default function CMOSocialPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [timeRange, setTimeRange] = useState('month')

  const [platforms, setPlatforms] = useState<CMOSocialPlatform[]>([
    {
      platform: 'LinkedIn',
      followers: 45200,
      growth: 12.5,
      engagement: 4.2,
      posts: 156,
      reach: 125000,
      impressions: 890000,
      status: 'active'
    },
    {
      platform: 'Twitter',
      followers: 28900,
      growth: 8.3,
      engagement: 2.8,
      posts: 234,
      reach: 89000,
      impressions: 456000,
      status: 'active'
    },
    {
      platform: 'Facebook',
      followers: 67800,
      growth: 15.7,
      engagement: 3.5,
      posts: 89,
      reach: 234000,
      impressions: 1567000,
      status: 'active'
    },
    {
      platform: 'Instagram',
      followers: 34500,
      growth: 22.1,
      engagement: 5.8,
      posts: 178,
      reach: 189000,
      impressions: 1234000,
      status: 'active'
    },
    {
      platform: 'YouTube',
      followers: 12300,
      growth: 18.9,
      engagement: 3.2,
      posts: 45,
      reach: 67000,
      impressions: 890000,
      status: 'active'
    }
  ])

  const [posts, setPosts] = useState<CMOSocialPost[]>([
    {
      id: 'SOC-001',
      platform: 'LinkedIn',
      content: 'Excited to announce our Q4 2023 results! 🚀 We achieved record growth and expanded our team by 25%. Thank you to our amazing team and loyal customers! #businessgrowth #success #teamwork',
      type: 'text',
      status: 'published',
      publishDate: '2024-02-10',
      author: 'Sarah Chen',
      metrics: {
        likes: 342,
        comments: 45,
        shares: 67,
        reach: 12500,
        engagement: 4.2
      }
    },
    {
      id: 'SOC-002',
      platform: 'Instagram',
      content: 'Behind the scenes at our headquarters! Our team working hard on the next big thing. 🏢💼 #team #worklife #innovation',
      type: 'image',
      status: 'published',
      publishDate: '2024-02-09',
      author: 'Mike Johnson',
      metrics: {
        likes: 567,
        comments: 89,
        shares: 34,
        reach: 18900,
        engagement: 5.8
      }
    },
    {
      id: 'SOC-003',
      platform: 'Twitter',
      content: 'New blog post is live! "The Future of Digital Marketing in 2024" - Check out our latest insights on emerging trends. 📖 #digitalmarketing #marketingtips #2024trends',
      type: 'link',
      status: 'published',
      publishDate: '2024-02-08',
      author: 'Emily Davis',
      metrics: {
        likes: 128,
        comments: 23,
        shares: 45,
        reach: 8900,
        engagement: 2.8
      }
    },
    {
      id: 'SOC-004',
      platform: 'Facebook',
      content: 'Meet our new Marketing Director! Sarah Chen joins us with 15+ years of experience in digital marketing and brand strategy. Welcome to the team! 👋 #newhire #teambuilding #marketing',
      type: 'image',
      status: 'published',
      publishDate: '2024-02-07',
      author: 'Jessica Martinez',
      metrics: {
        likes: 234,
        comments: 67,
        shares: 23,
        reach: 23400,
        engagement: 3.5
      }
    },
    {
      id: 'SOC-005',
      platform: 'YouTube',
      content: 'Marketing Masterclass: Complete Guide to Social Media Strategy',
      type: 'video',
      status: 'scheduled',
      publishDate: '2024-02-15',
      author: 'Alex Thompson',
      metrics: {
        likes: 0,
        comments: 0,
        shares: 0,
        reach: 0,
        engagement: 0
      }
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cmo') {
      setIsAuthenticated(true)
      setUserRole('cmo')
      setEmployeeId(empId || '')
    } else {
      router.push('/staff/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('staff-authenticated')
    localStorage.removeItem('staff-employee-id')
    localStorage.removeItem('staff-role')
    router.push('/staff/login')
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = filterPlatform === 'all' || post.platform === filterPlatform
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    
    return matchesSearch && matchesPlatform && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'paused': return 'bg-yellow-100 text-yellow-700'
      case 'archived': return 'bg-gray-100 text-gray-700'
      case 'published': return 'bg-blue-100 text-blue-700'
      case 'scheduled': return 'bg-purple-100 text-purple-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-purple-100 text-purple-700'
      case 'video': return 'bg-pink-100 text-pink-700'
      case 'text': return 'bg-blue-100 text-blue-700'
      case 'link': return 'bg-green-100 text-green-700'
      case 'carousel': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const platformNames = Array.from(new Set(posts.map(post => post.platform)))

  const totalFollowers = platforms.reduce((sum, platform) => sum + platform.followers, 0)
  const avgEngagement = platforms.reduce((sum, platform) => sum + platform.engagement, 0) / platforms.length
  const totalImpressions = platforms.reduce((sum, platform) => sum + platform.impressions, 0)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title="CMO Social Media Management - Annita"
        description="CMO social media management and analytics"
        keywords={['cmo', 'social media', 'analytics', 'engagement', 'marketing']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/cmo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Social Media Management</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Social Media Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Followers</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalFollowers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Across all platforms</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Engagement</h3>
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{avgEngagement.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">Engagement rate</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Impressions</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{(totalImpressions / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">This {timeRange}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Platforms</h3>
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{platforms.filter(p => p.status === 'active').length}</p>
              <p className="text-sm text-gray-500">Currently active</p>
            </div>
          </div>

          {/* Platform Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <div key={platform.platform} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{platform.platform}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(platform.status)}`}>
                      {platform.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Followers</span>
                      <span className="text-sm font-medium text-gray-900">{platform.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Growth</span>
                      <span className={`text-sm font-medium ${platform.growth >= 10 ? 'text-green-600' : 'text-yellow-600'}`}>
                        +{platform.growth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Engagement</span>
                      <span className="text-sm font-medium text-gray-900">{platform.engagement}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Posts</span>
                      <span className="text-sm font-medium text-gray-900">{platform.posts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Reach</span>
                      <span className="text-sm font-medium text-gray-900">{platform.reach.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Platforms</option>
                  {platformNames.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                          {post.platform}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                          {post.type.charAt(0).toUpperCase() + post.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{post.content}</p>
                      <p className="text-xs text-gray-500">By {post.author} • {post.publishDate}</p>
                    </div>
                  </div>

                  {post.status === 'published' && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Metrics</h4>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-pink-500" />
                          <span className="text-gray-600">Likes:</span>
                          <span className="font-medium text-gray-900">{post.metrics.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3 text-blue-500" />
                          <span className="text-gray-600">Comments:</span>
                          <span className="font-medium text-gray-900">{post.metrics.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="w-3 h-3 text-green-500" />
                          <span className="text-gray-600">Shares:</span>
                          <span className="font-medium text-gray-900">{post.metrics.shares}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-600">Reach:</span>
                          <span className="font-medium text-gray-900">{post.metrics.reach.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-600">Engagement:</span>
                          <span className="font-medium text-gray-900">{post.metrics.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Social Media Management Section */}
          <div className="mt-8">
            <SocialMediaManagement />
          </div>
        </main>
      </div>
    </>
  )
}
