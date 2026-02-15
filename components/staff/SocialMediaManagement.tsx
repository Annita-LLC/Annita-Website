'use client'

import { useState } from 'react'
import { MessageSquare, Heart, Share2, TrendingUp, Users, Eye, Calendar, Clock, Plus, Search, Filter, BarChart3 } from 'lucide-react'

interface SocialPost {
  id: string
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube'
  content: string
  type: 'text' | 'image' | 'video' | 'carousel' | 'story' | 'reel'
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduledDate: string
  publishedDate?: string
  engagement: {
    likes: number
    comments: number
    shares: number
    views: number
  }
  performance: {
    reach: number
    impressions: number
    engagementRate: number
    clicks: number
  }
}

interface SocialMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function SocialMediaManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'calendar' | 'analytics'>('overview')
  const [selectedPost, setSelectedPost] = useState<string | null>(null)

  const posts: SocialPost[] = [
    {
      id: '1',
      platform: 'instagram',
      content: '🚀 Exciting updates coming to our platform! Stay tuned for the big reveal. #TechInnovation #ProductUpdate',
      type: 'carousel',
      status: 'published',
      scheduledDate: '2024-02-10',
      publishedDate: '2024-02-10',
      engagement: {
        likes: 1250,
        comments: 89,
        shares: 45,
        views: 15420
      },
      performance: {
        reach: 15420,
        impressions: 18750,
        engagementRate: 8.2,
        clicks: 890
      }
    },
    {
      id: '2',
      platform: 'linkedin',
      content: 'How our AI-powered solutions are transforming business operations. Read our latest case study. Link in bio. #AI #BusinessTransformation',
      type: 'text',
      status: 'scheduled',
      scheduledDate: '2024-02-15',
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0
      },
      performance: {
        reach: 0,
        impressions: 0,
        engagementRate: 0,
        clicks: 0
      }
    },
    {
      id: '3',
      platform: 'twitter',
      content: 'Just wrapped up an amazing webinar on digital transformation! Thanks to all who attended. Recording will be available soon. #Webinar #DigitalTransformation',
      type: 'text',
      status: 'published',
      scheduledDate: '2024-02-08',
      publishedDate: '2024-02-08',
      engagement: {
        likes: 567,
        comments: 34,
        shares: 123,
        views: 8750
      },
      performance: {
        reach: 8750,
        impressions: 12400,
        engagementRate: 8.9,
        clicks: 456
      }
    }
  ]

  const metrics: SocialMetric[] = [
    {
      id: '1',
      title: 'Total Followers',
      value: '45.2K',
      change: 12.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Engagement Rate',
      value: '8.7%',
      change: 5.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Total Reach',
      value: '2.4M',
      change: 18.9,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Post Performance',
      value: '4.2/5',
      change: -2.1,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <BarChart3 className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'content', label: 'Content', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-pink-100 text-pink-700'
      case 'twitter': return 'bg-blue-100 text-blue-700'
      case 'facebook': return 'bg-blue-100 text-blue-700'
      case 'linkedin': return 'bg-blue-100 text-blue-700'
      case 'tiktok': return 'bg-black text-white'
      case 'youtube': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-yellow-100 text-yellow-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquare className="w-4 h-4" />
      case 'image': return <Eye className="w-4 h-4" />
      case 'video': return <Play className="w-4 h-4" />
      case 'carousel': return <Eye className="w-4 h-4" />
      case 'story': return <Clock className="w-4 h-4" />
      case 'reel': return <Play className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Social Media Management</h2>
              <p className="text-sm text-gray-600">Create, schedule, and analyze social media content</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
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
                  ? 'bg-white text-pink-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
                <div className="space-y-4">
                  {[
                    { platform: 'Instagram', followers: 15200, engagement: 8.5, growth: 245 },
                    { platform: 'LinkedIn', followers: 12300, engagement: 6.2, growth: 189 },
                    { platform: 'Twitter', followers: 8900, engagement: 4.8, growth: 156 },
                    { platform: 'Facebook', followers: 12800, engagement: 5.9, growth: 203 }
                  ].map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          platform.platform === 'Instagram' ? 'bg-pink-100 text-pink-600' :
                          platform.platform === 'LinkedIn' ? 'bg-blue-100 text-blue-600' :
                          platform.platform === 'Twitter' ? 'bg-blue-100 text-blue-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{platform.platform}</p>
                          <p className="text-xs text-gray-500">{platform.followers.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{platform.engagement}%</p>
                        <p className="text-xs text-gray-500">engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best Performing Content</span>
                    <span className="text-sm font-medium text-green-600">Product Updates</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Highest Engagement</span>
                    <span className="text-sm font-medium text-green-600">8.9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Most Shared Content</span>
                    <span className="text-sm font-medium text-blue-600">Industry Insights</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Optimal Posting Time</span>
                    <span className="text-sm font-medium text-purple-600">2:00 PM</span>
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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Platforms</option>
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>Twitter</option>
                  <option>Facebook</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        post.platform === 'instagram' ? 'bg-pink-100 text-pink-600' :
                        post.platform === 'linkedin' ? 'bg-blue-100 text-blue-600' :
                        post.platform === 'twitter' ? 'bg-blue-100 text-blue-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {getTypeIcon(post.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPlatformColor(post.platform)}`}>
                            {post.platform}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(post.status)}`}>
                            {post.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Schedule</p>
                      <p className="text-sm font-medium text-gray-900">
                        {post.publishedDate || post.scheduledDate}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">
                        {post.type} post
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Engagement</p>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{post.engagement.likes.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Likes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{post.engagement.comments.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Comments</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance</p>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{post.performance.reach.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Reach</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{post.performance.engagementRate}%</p>
                          <p className="text-xs text-gray-500">Engagement</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedPost === post.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Detailed Analytics</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{post.engagement.likes.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Likes</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{post.engagement.comments.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Comments</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{post.engagement.shares.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Shares</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{post.engagement.views.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Views</p>
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
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                        <span>Analytics</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-pink-600 hover:text-pink-700 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
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
                  Month View
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Schedule Post</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { date: '2024-02-15', day: 'Thu', posts: ['Instagram Carousel', 'LinkedIn Article', 'Twitter Thread'] },
                { date: '2024-02-16', day: 'Fri', posts: ['Facebook Live', 'Instagram Story'] },
                { date: '2024-02-17', day: 'Sat', posts: ['Weekend Recap Post'] },
                { date: '2024-02-18', day: 'Sun', posts: ['Content Planning', 'Hashtag Research'] },
                { date: '2024-02-19', day: 'Mon', posts: ['Industry News Roundup', 'Team Spotlight'] },
                { date: '2024-02-20', day: 'Tue', posts: ['Product Update', 'Customer Testimonial'] }
              ].map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{day.day}</p>
                      <p className="text-xs text-gray-500">{day.date}</p>
                    </div>
                    <span className="text-sm font-medium text-pink-600">{day.posts.length} posts</span>
                  </div>
                  <div className="space-y-2">
                    {day.posts.map((post, postIndex) => (
                      <div key={postIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <p className="text-xs text-gray-700 truncate">{post}</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Analytics</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Total Reach', value: '2,450,000', change: 18.7 },
                    { metric: 'Total Engagement', value: '45,230', change: 12.5 },
                    { metric: 'Average Engagement Rate', value: '8.7%', change: 5.3 },
                    { metric: 'Click-through Rate', value: '3.2%', change: 8.9 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        {item.change && (
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
                    { type: 'Images', engagement: 12.5, reach: 45000, bestTime: '11 AM' },
                    { type: 'Videos', engagement: 15.8, reach: 78000, bestTime: '2 PM' },
                    { type: 'Text Posts', engagement: 6.2, reach: 32000, bestTime: '9 AM' },
                    { type: 'Stories', engagement: 8.9, reach: 56000, bestTime: '7 PM' }
                  ].map((type, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{type.type}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{type.engagement}%</p>
                          <p className="text-xs text-gray-500">engagement</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{type.reach.toLocaleString()} reach</span>
                        <span>Best time: {type.bestTime}</span>
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
