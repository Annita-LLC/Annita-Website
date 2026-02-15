'use client'

import { useState } from 'react'
import { Palette, TrendingUp, Users, Eye, Heart, Star, Zap, Target, Award, Globe, Camera, FileText } from 'lucide-react'

interface BrandMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface BrandAsset {
  id: string
  name: string
  type: 'logo' | 'color' | 'font' | 'image' | 'template'
  category: 'primary' | 'secondary' | 'campaign'
  lastUpdated: string
  usage: string
  downloads: number
}

interface BrandGuideline {
  id: string
  title: string
  category: 'logo' | 'colors' | 'typography' | 'voice' | 'imagery'
  description: string
  examples: string[]
  doDonts: string[]
}

export default function BrandManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'guidelines' | 'analytics'>('overview')

  const metrics: BrandMetric[] = [
    {
      id: '1',
      title: 'Brand Awareness',
      value: '78%',
      change: 12.5,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Brand Sentiment',
      value: '4.2/5',
      change: 8.3,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Brand Recognition',
      value: '92%',
      change: -2.1,
      changeType: 'decrease',
      period: 'vs last quarter',
      icon: <Star className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Brand Loyalty',
      value: '68%',
      change: 15.7,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <Award className="w-6 h-6" />
    }
  ]

  const brandAssets: BrandAsset[] = [
    {
      id: '1',
      name: 'Primary Logo (Horizontal)',
      type: 'logo',
      category: 'primary',
      lastUpdated: '2024-02-15',
      usage: 'Website, presentations, email signatures',
      downloads: 1247
    },
    {
      id: '2',
      name: 'Primary Logo (Icon Only)',
      type: 'logo',
      category: 'primary',
      lastUpdated: '2024-02-15',
      usage: 'Social media, apps, favicons',
      downloads: 892
    },
    {
      id: '3',
      name: 'Brand Color Palette',
      type: 'color',
      category: 'primary',
      lastUpdated: '2024-01-20',
      usage: 'All digital and print materials',
      downloads: 543
    },
    {
      id: '4',
      name: 'Typography Guidelines',
      type: 'font',
      category: 'primary',
      lastUpdated: '2024-01-10',
      usage: 'All written communications',
      downloads: 678
    }
  ]

  const guidelines: BrandGuideline[] = [
    {
      id: '1',
      title: 'Logo Usage Guidelines',
      category: 'logo',
      description: 'Clear space, minimum size, and placement requirements for logo usage.',
      examples: ['Maintain 1x logo height clear space', 'Minimum size: 24px height for digital', 'Place on white/light backgrounds'],
      doDonts: ['Do: Use approved logo variations', 'Don\'t: Modify logo colors or proportions', 'Don\'t: Place logo on busy backgrounds']
    },
    {
      id: '2',
      title: 'Color Palette Standards',
      category: 'colors',
      description: 'Primary and secondary color specifications with usage guidelines.',
      examples: ['Primary: #3B82F6 (Blue)', 'Secondary: #10B981 (Green)', 'Accent: #F59E0B (Amber)'],
      doDonts: ['Do: Use exact hex values', 'Don\'t: Create new colors', 'Don\'t: Use colors outside the palette']
    },
    {
      id: '3',
      title: 'Typography Guidelines',
      category: 'typography',
      description: 'Font families, sizes, and usage rules for consistent text appearance.',
      examples: ['Headlines: Inter Bold, 24-48px', 'Body: Inter Regular, 16px', 'Captions: Inter Light, 14px'],
      doDonts: ['Do: Use specified font weights', 'Don\'t: Mix fonts unnecessarily', 'Don\'t: Stretch or distort text']
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Target className="w-4 h-4" /> },
    { id: 'assets', label: 'Brand Assets', icon: <Camera className="w-4 h-4" /> },
    { id: 'guidelines', label: 'Guidelines', icon: <FileText className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Brand Management</h2>
              <p className="text-sm text-gray-600">Manage brand identity, assets, and guidelines</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Zap className="w-4 h-4" />
              <span>Update Brand</span>
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
                  ? 'bg-white text-purple-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Brand Activities</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Logo updated', date: '2024-02-15', user: 'Design Team' },
                    { action: 'Brand guidelines published', date: '2024-02-10', user: 'Marketing Team' },
                    { action: 'New brand colors approved', date: '2024-02-05', user: 'Creative Director' },
                    { action: 'Brand audit completed', date: '2024-01-28', user: 'Brand Manager' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Health Score</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Health</span>
                    <span className="text-lg font-bold text-green-600">85/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">92%</div>
                      <div className="text-xs text-gray-500">Consistency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">78%</div>
                      <div className="text-xs text-gray-500">Recognition</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Brand Assets Library</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Camera className="w-4 h-4" />
                <span>Upload Asset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandAssets.map((asset) => (
                <div key={asset.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        {asset.type === 'logo' && <Globe className="w-5 h-5 text-purple-600" />}
                        {asset.type === 'color' && <Palette className="w-5 h-5 text-purple-600" />}
                        {asset.type === 'font' && <FileText className="w-5 h-5 text-purple-600" />}
                        {asset.type === 'image' && <Camera className="w-5 h-5 text-purple-600" />}
                        {asset.type === 'template' && <FileText className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{asset.name}</h4>
                        <p className="text-xs text-gray-500 capitalize">{asset.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      asset.category === 'primary' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {asset.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{asset.usage}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Updated {asset.lastUpdated}</span>
                    <span>{asset.downloads} downloads</span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors">
                      Download
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'guidelines' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Brand Guidelines</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <FileText className="w-4 h-4" />
                <span>Add Guideline</span>
              </button>
            </div>

            <div className="space-y-6">
              {guidelines.map((guideline) => (
                <div key={guideline.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        {guideline.category === 'logo' && <Globe className="w-5 h-5 text-purple-600" />}
                        {guideline.category === 'colors' && <Palette className="w-5 h-5 text-purple-600" />}
                        {guideline.category === 'typography' && <FileText className="w-5 h-5 text-purple-600" />}
                        {guideline.category === 'voice' && <Users className="w-5 h-5 text-purple-600" />}
                        {guideline.category === 'imagery' && <Camera className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{guideline.title}</h4>
                        <p className="text-sm text-gray-600 capitalize">{guideline.category} Guidelines</p>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{guideline.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Examples</h5>
                      <ul className="space-y-1">
                        {guideline.examples.map((example, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Do's and Don'ts</h5>
                      <ul className="space-y-1">
                        {guideline.doDonts.map((rule, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                            <span className={`mt-0.5 ${rule.startsWith('Do:') ? 'text-green-500' : 'text-red-500'}`}>
                              {rule.startsWith('Do:') ? '✓' : '✗'}
                            </span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Performance Trends</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Brand Awareness', current: 78, previous: 69, trend: 'up' },
                    { metric: 'Brand Sentiment', current: 4.2, previous: 3.9, trend: 'up' },
                    { metric: 'Brand Recognition', current: 92, previous: 94, trend: 'down' },
                    { metric: 'Brand Loyalty', current: 68, previous: 59, trend: 'up' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        <p className="text-xs text-gray-500">
                          {item.trend === 'up' ? '+' : '-'}{Math.abs(item.current - item.previous).toFixed(1)} from last period
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.current}</p>
                        <p className="text-xs text-gray-500">Current</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Usage Analytics</h3>
                <div className="space-y-4">
                  {[
                    { asset: 'Primary Logo', usage: 1247, growth: 15 },
                    { asset: 'Brand Colors', usage: 543, growth: 8 },
                    { asset: 'Typography', usage: 678, growth: 22 },
                    { asset: 'Templates', usage: 234, growth: -5 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.asset}</p>
                        <p className="text-xs text-gray-500">
                          {item.growth > 0 ? '+' : ''}{item.growth}% growth
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.usage}</p>
                        <p className="text-xs text-gray-500">Downloads</p>
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
