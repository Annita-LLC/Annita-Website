'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Calendar, TrendingUp, Eye, Search, Filter, Download, Edit, Trash2, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import ContentManagement from '@/components/staff/ContentManagement'

interface CMOContentItem {
  id: string
  title: string
  type: 'blog' | 'whitepaper' | 'case-study' | 'infographic' | 'video' | 'ebook'
  status: 'draft' | 'in-review' | 'published' | 'archived'
  author: string
  publishDate: string
  lastModified: string
  category: string
  description: string
  wordCount: number
  readTime: string
  views: number
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  seo: {
    score: number
    keywords: string[]
  }
}

export default function CMOContentPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterAuthor, setFilterAuthor] = useState('all')

  const [contentItems, setContentItems] = useState<CMOContentItem[]>([
    {
      id: 'CNT-001',
      title: 'The Future of Digital Marketing in 2024',
      type: 'blog',
      status: 'published',
      author: 'Alex Thompson',
      publishDate: '2024-02-10',
      lastModified: '2024-02-12',
      category: 'Digital Marketing',
      description: 'Comprehensive guide to emerging digital marketing trends and strategies for 2024',
      wordCount: 2500,
      readTime: '10 min',
      views: 15420,
      engagement: {
        likes: 342,
        shares: 128,
        comments: 45
      },
      seo: {
        score: 92,
        keywords: ['digital marketing', '2024 trends', 'marketing strategy']
      }
    },
    {
      id: 'CNT-002',
      title: 'ROI Optimization Guide for B2B Marketing',
      type: 'whitepaper',
      status: 'published',
      author: 'Sarah Chen',
      publishDate: '2024-02-05',
      lastModified: '2024-02-08',
      category: 'Marketing Analytics',
      description: 'Detailed whitepaper on maximizing return on investment for B2B marketing campaigns',
      wordCount: 5200,
      readTime: '20 min',
      views: 8930,
      engagement: {
        likes: 189,
        shares: 67,
        comments: 23
      },
      seo: {
        score: 88,
        keywords: ['ROI', 'B2B marketing', 'optimization', 'analytics']
      }
    },
    {
      id: 'CNT-003',
      title: 'Customer Success Story: TechCorp Implementation',
      type: 'case-study',
      status: 'in-review',
      author: 'Emily Davis',
      publishDate: '2024-02-15',
      lastModified: '2024-02-14',
      category: 'Customer Stories',
      description: 'How TechCorp achieved 300% ROI with our marketing automation platform',
      wordCount: 1800,
      readTime: '8 min',
      views: 2340,
      engagement: {
        likes: 67,
        shares: 34,
        comments: 12
      },
      seo: {
        score: 85,
        keywords: ['case study', 'customer success', 'ROI', 'automation']
      }
    },
    {
      id: 'CNT-004',
      title: 'Marketing Funnel Visualization 2024',
      type: 'infographic',
      status: 'draft',
      author: 'Mike Johnson',
      publishDate: '2024-02-20',
      lastModified: '2024-02-13',
      category: 'Visual Content',
      description: 'Comprehensive infographic showing modern marketing funnel metrics and optimization points',
      wordCount: 800,
      readTime: '5 min',
      views: 0,
      engagement: {
        likes: 0,
        shares: 0,
        comments: 0
      },
      seo: {
        score: 78,
        keywords: ['infographic', 'marketing funnel', 'metrics', 'visualization']
      }
    },
    {
      id: 'CNT-005',
      title: 'Video Marketing Masterclass',
      type: 'video',
      status: 'published',
      author: 'Jessica Martinez',
      publishDate: '2024-02-01',
      lastModified: '2024-02-10',
      category: 'Video Content',
      description: 'Complete video marketing guide from strategy to execution and analytics',
      wordCount: 1200,
      readTime: '15 min',
      views: 25670,
      engagement: {
        likes: 523,
        shares: 189,
        comments: 78
      },
      seo: {
        score: 95,
        keywords: ['video marketing', 'content strategy', 'social media']
      }
    },
    {
      id: 'CNT-006',
      title: 'Ultimate Guide to Content Marketing',
      type: 'ebook',
      status: 'published',
      author: 'Alex Thompson',
      publishDate: '2024-01-25',
      lastModified: '2024-02-05',
      category: 'Resources',
      description: 'Comprehensive ebook covering all aspects of content marketing strategy and execution',
      wordCount: 8500,
      readTime: '35 min',
      views: 12450,
      engagement: {
        likes: 289,
        shares: 156,
        comments: 34
      },
      seo: {
        score: 91,
        keywords: ['content marketing', 'ebook', 'strategy', 'guide']
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

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesAuthor = filterAuthor === 'all' || item.author === filterAuthor
    
    return matchesSearch && matchesType && matchesStatus && matchesAuthor
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700'
      case 'in-review': return 'bg-yellow-100 text-yellow-700'
      case 'published': return 'bg-green-100 text-green-700'
      case 'archived': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-700'
      case 'whitepaper': return 'bg-purple-100 text-purple-700'
      case 'case-study': return 'bg-green-100 text-green-700'
      case 'infographic': return 'bg-orange-100 text-orange-700'
      case 'video': return 'bg-pink-100 text-pink-700'
      case 'ebook': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getSeoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const contentTypes = Array.from(new Set(contentItems.map(item => item.type)))
  const authors = Array.from(new Set(contentItems.map(item => item.author)))

  const totalViews = contentItems.reduce((sum, item) => sum + item.views, 0)
  const publishedContent = contentItems.filter(item => item.status === 'published').length
  const avgSeoScore = contentItems.reduce((sum, item) => sum + item.seo.score, 0) / contentItems.length

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
        title="CMO Content Strategy - Annita"
        description="CMO content strategy and marketing materials management"
        keywords={['cmo', 'content', 'marketing', 'strategy', 'materials']}
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
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Content Strategy</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Create Content</span>
                </button>
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
          {/* Content Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Content</h3>
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{contentItems.length}</p>
              <p className="text-sm text-gray-500">Content pieces</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Published</h3>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{publishedContent}</p>
              <p className="text-sm text-gray-500">Live content</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Views</h3>
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Content views</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg SEO Score</h3>
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <p className={`text-2xl font-bold ${getSeoScoreColor(avgSeoScore)}`}>
                {avgSeoScore.toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">SEO performance</p>
            </div>
          </div>

          {/* Content List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Content Library</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Types</option>
                  {contentTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterAuthor}
                  onChange={(e) => setFilterAuthor(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Authors</option>
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="in-review">In Review</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1).replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">By {item.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Word Count</p>
                      <p className="text-sm font-medium text-gray-900">{item.wordCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Read Time</p>
                      <p className="text-sm font-medium text-gray-900">{item.readTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Views</p>
                      <p className="text-sm font-medium text-gray-900">{item.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">SEO Score</p>
                      <p className={`text-sm font-medium ${getSeoScoreColor(item.seo.score)}`}>
                        {item.seo.score}/100
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <p className="text-sm text-gray-900">{item.publishDate}</p>
                    </div>
                  </div>

                  {/* Engagement Metrics */}
                  {item.status === 'published' && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Engagement</h4>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Likes:</span>
                          <span className="font-medium text-gray-900">{item.engagement.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Shares:</span>
                          <span className="font-medium text-gray-900">{item.engagement.shares}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-500">Comments:</span>
                          <span className="font-medium text-gray-900">{item.engagement.comments}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SEO Keywords */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Keywords:</span>
                      <div className="flex flex-wrap gap-1">
                        {item.seo.keywords.slice(0, 3).map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Content Management Section */}
          <div className="mt-8">
            <ContentManagement />
          </div>
        </main>
      </div>
    </>
  )
}
