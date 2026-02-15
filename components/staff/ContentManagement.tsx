'use client'

import { useState } from 'react'
import { FileText, Image, Video, Calendar, TrendingUp, Users, Eye, Heart, MessageSquare, Share2, Edit, Trash2, Plus, Search, Filter, Download, Mail } from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  type: 'article' | 'blog' | 'video' | 'infographic' | 'social' | 'email' | 'webinar'
  status: 'draft' | 'scheduled' | 'published' | 'archived'
  author: string
  publishDate: string
  lastModified: string
  category: string
  tags: string[]
  performance: {
    views: number
    engagement: number
    shares: number
    comments: number
    likes: number
  }
  content: string
}

interface ContentMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'calendar' | 'analytics'>('overview')
  const [selectedContent, setSelectedContent] = useState<string | null>(null)

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'The Future of Remote Work: Trends for 2024',
      type: 'blog',
      status: 'published',
      author: 'Sarah Johnson',
      publishDate: '2024-02-10',
      lastModified: '2024-02-08',
      category: 'Industry Insights',
      tags: ['remote work', 'trends', 'future of work'],
      performance: {
        views: 15420,
        engagement: 8.5,
        shares: 245,
        comments: 89,
        likes: 567
      },
      content: 'Exploring the latest trends shaping the remote work landscape...'
    },
    {
      id: '2',
      title: 'Product Demo: New Collaboration Features',
      type: 'video',
      status: 'scheduled',
      author: 'Mike Chen',
      publishDate: '2024-02-20',
      lastModified: '2024-02-12',
      category: 'Product Updates',
      tags: ['product demo', 'collaboration', 'features'],
      performance: {
        views: 0,
        engagement: 0,
        shares: 0,
        comments: 0,
        likes: 0
      },
      content: 'Walkthrough of our latest collaboration tools and features...'
    },
    {
      id: '3',
      title: 'Customer Success Stories: TechCorp Solutions',
      type: 'article',
      status: 'published',
      author: 'Emma Davis',
      publishDate: '2024-02-05',
      lastModified: '2024-02-03',
      category: 'Case Studies',
      tags: ['customer success', 'case study', 'techcorp'],
      performance: {
        views: 8760,
        engagement: 12.3,
        shares: 156,
        comments: 34,
        likes: 423
      },
      content: 'How TechCorp Solutions transformed their operations...'
    },
    {
      id: '4',
      title: 'Q1 Marketing Calendar Infographic',
      type: 'infographic',
      status: 'draft',
      author: 'Alex Rivera',
      publishDate: '',
      lastModified: '2024-02-14',
      category: 'Marketing Materials',
      tags: ['marketing calendar', 'infographic', 'planning'],
      performance: {
        views: 0,
        engagement: 0,
        shares: 0,
        comments: 0,
        likes: 0
      },
      content: 'Visual guide to our Q1 marketing activities and campaigns...'
    }
  ]

  const metrics: ContentMetric[] = [
    {
      id: '1',
      title: 'Total Content Views',
      value: '45.2K',
      change: 18.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Engagement Rate',
      value: '9.8%',
      change: 12.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Published Content',
      value: '24',
      change: 4,
      changeType: 'increase',
      period: 'vs last month',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Content Shares',
      value: '1.2K',
      change: -3.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <Share2 className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'content', label: 'Content Library', icon: <FileText className="w-4 h-4" /> },
    { id: 'calendar', label: 'Content Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <Eye className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-yellow-100 text-yellow-700'
      case 'archived': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
      case 'article': return <FileText className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      case 'infographic': return <Image className="w-4 h-4" />
      case 'social': return <MessageSquare className="w-4 h-4" />
      case 'email': return <Mail className="w-4 h-4" />
      case 'webinar': return <Users className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Content Management</h2>
              <p className="text-sm text-gray-600">Create, schedule, and analyze your content performance</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Content</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {metric.icon}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'increase' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4 rotate-180" />
                      )}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                  <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
                  <p className="text-xs text-gray-500">{metric.period}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Content Performance</h3>
                <div className="space-y-4">
                  {contentItems.filter(item => item.status === 'published').slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.publishDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{item.performance.views.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Pipeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Drafts</span>
                    <span className="text-sm font-medium text-yellow-600">
                      {contentItems.filter(item => item.status === 'draft').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Scheduled</span>
                    <span className="text-sm font-medium text-blue-600">
                      {contentItems.filter(item => item.status === 'scheduled').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Published This Month</span>
                    <span className="text-sm font-medium text-green-600">
                      {contentItems.filter(item => item.status === 'published').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Engagement</span>
                    <span className="text-sm font-medium text-purple-600">9.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Content Library</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>Blog Posts</option>
                  <option>Videos</option>
                  <option>Infographics</option>
                  <option>Social Media</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Content</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {contentItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{item.type}</span>
                          <span>•</span>
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>by {item.author}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <button
                        onClick={() => setSelectedContent(selectedContent === item.id ? null : item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Publish Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {item.publishDate || 'Not scheduled'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Modified: {item.lastModified}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance</p>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{item.performance.views.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{item.performance.engagement}%</p>
                          <p className="text-xs text-gray-500">Engagement</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            +{item.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedContent === item.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Content Preview</h5>
                      <p className="text-sm text-gray-700 mb-4">{item.content}</p>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{item.performance.likes.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Likes</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{item.performance.comments.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Comments</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{item.performance.shares.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Shares</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">
                            {item.performance.views > 0 ? ((item.performance.likes + item.performance.comments + item.performance.shares) / item.performance.views * 100).toFixed(1) : 0}%
                          </p>
                          <p className="text-xs text-gray-500">Engagement Rate</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-red-600 hover:text-red-700 text-sm font-medium">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Content Calendar</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Calendar View
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Schedule Content</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { date: '2024-02-15', day: 'Thu', content: ['Blog Post: Remote Work Trends', 'Social Media Posts (3)'] },
                { date: '2024-02-16', day: 'Fri', content: ['Video: Product Demo', 'Email Newsletter'] },
                { date: '2024-02-17', day: 'Sat', content: ['Infographic: Industry Stats'] },
                { date: '2024-02-18', day: 'Sun', content: ['Content Planning Session'] },
                { date: '2024-02-19', day: 'Mon', content: ['Case Study: Customer Success', 'LinkedIn Posts (2)'] },
                { date: '2024-02-20', day: 'Tue', content: ['Webinar: Best Practices'] }
              ].map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{day.day}</p>
                      <p className="text-xs text-gray-500">{day.date}</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">{day.content.length} items</span>
                  </div>
                  <div className="space-y-2">
                    {day.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-xs text-gray-700 truncate">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance Analytics</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Total Views', value: '45,230', change: 18.7 },
                    { metric: 'Average Engagement Rate', value: '9.8%', change: 12.5 },
                    { metric: 'Top Performing Content', value: 'Remote Work Trends', change: 0 },
                    { metric: 'Conversion Rate', value: '3.2%', change: -2.1 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        {item.change !== 0 && (
                          <p className="text-xs text-gray-500">
                            {item.change > 0 ? '+' : ''}{item.change}% from last period
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type Performance</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Blog Posts', views: 15200, engagement: 11.2, color: 'bg-blue-500' },
                    { type: 'Videos', views: 12300, engagement: 15.8, color: 'bg-green-500' },
                    { type: 'Infographics', views: 8900, engagement: 8.9, color: 'bg-purple-500' },
                    { type: 'Social Media', views: 21800, engagement: 6.4, color: 'bg-yellow-500' }
                  ].map((type, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{type.type}</p>
                        <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{type.views.toLocaleString()} views</span>
                        <span>{type.engagement}% engagement</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
