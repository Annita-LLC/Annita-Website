'use client'

import { useState } from 'react'
import { Target, TrendingUp, Users, DollarSign, Calendar, Play, Pause, CheckCircle, AlertCircle, Clock, BarChart3, Zap, Eye, MousePointer, MessageSquare } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  type: 'email' | 'social' | 'paid' | 'content' | 'event' | 'partnership'
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled'
  objective: 'awareness' | 'engagement' | 'conversion' | 'retention' | 'lead-gen'
  budget: number
  spent: number
  startDate: string
  endDate: string
  targetAudience: string
  channels: string[]
  performance: {
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cpc: number
    roi: number
  }
}

interface CampaignMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function CampaignManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'performance' | 'planning'>('overview')
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Q1 Product Launch',
      type: 'paid',
      status: 'active',
      objective: 'awareness',
      budget: 50000,
      spent: 32500,
      startDate: '2024-02-01',
      endDate: '2024-03-31',
      targetAudience: 'Tech-savvy millennials',
      channels: ['Google Ads', 'Facebook', 'LinkedIn'],
      performance: {
        impressions: 1250000,
        clicks: 37500,
        conversions: 1875,
        ctr: 3.0,
        cpc: 0.87,
        roi: 2.4
      }
    },
    {
      id: '2',
      name: 'Customer Retention Email Series',
      type: 'email',
      status: 'active',
      objective: 'retention',
      budget: 15000,
      spent: 8900,
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      targetAudience: 'Existing customers',
      channels: ['Email Marketing'],
      performance: {
        impressions: 50000,
        clicks: 7500,
        conversions: 1125,
        ctr: 15.0,
        cpc: 1.19,
        roi: 3.8
      }
    },
    {
      id: '3',
      name: 'Social Media Engagement Campaign',
      type: 'social',
      status: 'scheduled',
      objective: 'engagement',
      budget: 25000,
      spent: 0,
      startDate: '2024-02-20',
      endDate: '2024-03-20',
      targetAudience: 'Gen Z professionals',
      channels: ['Instagram', 'TikTok', 'Twitter'],
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        roi: 0
      }
    },
    {
      id: '4',
      name: 'Content Marketing Initiative',
      type: 'content',
      status: 'completed',
      objective: 'lead-gen',
      budget: 35000,
      spent: 34800,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      targetAudience: 'B2B decision makers',
      channels: ['Blog', 'LinkedIn', 'Webinars'],
      performance: {
        impressions: 850000,
        clicks: 42500,
        conversions: 2125,
        ctr: 5.0,
        cpc: 0.82,
        roi: 4.1
      }
    }
  ]

  const metrics: CampaignMetric[] = [
    {
      id: '1',
      title: 'Total Campaign ROI',
      value: '3.2x',
      change: 15.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Active Campaigns',
      value: '12',
      change: 2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Target className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Total Impressions',
      value: '2.4M',
      change: 8.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Conversion Rate',
      value: '4.2%',
      change: -2.1,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <BarChart3 className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Target className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'planning', label: 'Planning', icon: <Calendar className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'paused': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-purple-100 text-purple-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />
      case 'scheduled': return <Clock className="w-4 h-4" />
      case 'paused': return <Pause className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Campaign Management</h2>
              <p className="text-sm text-gray-600">Plan, execute, and optimize marketing campaigns</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Zap className="w-4 h-4" />
              <span>Create Campaign</span>
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
                  ? 'bg-white text-blue-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Campaigns Summary</h3>
                <div className="space-y-4">
                  {campaigns.filter(c => c.status === 'active').map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          campaign.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getStatusIcon(campaign.status)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                          <p className="text-xs text-gray-500">{campaign.type} • {campaign.objective}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${campaign.spent.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">of ${campaign.budget.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best Performing</span>
                    <span className="text-sm font-medium text-green-600">Content Marketing</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Highest ROI</span>
                    <span className="text-sm font-medium text-green-600">4.1x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Most Engaged</span>
                    <span className="text-sm font-medium text-blue-600">Email Campaigns</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Budget Utilization</span>
                    <span className="text-sm font-medium text-purple-600">78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Campaigns</h3>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Paused</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Target className="w-4 h-4" />
                  <span>New Campaign</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-600' :
                        campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                        campaign.status === 'completed' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getStatusIcon(campaign.status)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{campaign.type}</span>
                          <span>•</span>
                          <span className="capitalize">{campaign.objective}</span>
                          <span>•</span>
                          <span>{campaign.targetAudience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <button
                        onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="text-lg font-semibold text-gray-900">${campaign.budget.toLocaleString()}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">${campaign.spent.toLocaleString()} spent</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="text-sm font-medium text-gray-900">{campaign.startDate} - {campaign.endDate}</p>
                      <p className="text-xs text-gray-500 mt-1">Channels: {campaign.channels.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance</p>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{campaign.performance.impressions.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Impressions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{campaign.performance.ctr}%</p>
                          <p className="text-xs text-gray-500">CTR</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{campaign.performance.roi}x</p>
                          <p className="text-xs text-gray-500">ROI</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedCampaign === campaign.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Detailed Performance</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{campaign.performance.impressions.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Impressions</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{campaign.performance.clicks.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Clicks</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{campaign.performance.conversions.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Conversions</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">${campaign.performance.cpc}</p>
                          <p className="text-xs text-gray-500">Cost per Click</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <MessageSquare className="w-4 h-4" />
                        <span>Comments</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {campaign.status === 'active' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                          <Pause className="w-4 h-4" />
                          <span>Pause</span>
                        </button>
                      )}
                      {campaign.status === 'paused' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                          <Play className="w-4 h-4" />
                          <span>Resume</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                        <span>Analytics</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance Overview</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Total Impressions', value: '3,250,000', change: 12.5 },
                    { metric: 'Total Clicks', value: '97,500', change: 8.3 },
                    { metric: 'Total Conversions', value: '5,125', change: 15.7 },
                    { metric: 'Average CTR', value: '3.0%', change: -2.1 },
                    { metric: 'Average CPC', value: '$0.85', change: -5.3 },
                    { metric: 'Average ROI', value: '3.2x', change: 22.4 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        <p className="text-xs text-gray-500">
                          {item.change > 0 ? '+' : ''}{item.change}% from last period
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance</h3>
                <div className="space-y-4">
                  {[
                    { channel: 'Google Ads', impressions: 1200000, clicks: 36000, conversions: 1800 },
                    { channel: 'Facebook', impressions: 850000, clicks: 25500, conversions: 1275 },
                    { channel: 'Email', impressions: 50000, clicks: 7500, conversions: 1125 },
                    { channel: 'LinkedIn', impressions: 400000, clicks: 12000, conversions: 600 },
                    { channel: 'Content', impressions: 850000, clicks: 42500, conversions: 2125 }
                  ].map((channel, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{channel.channel}</p>
                        <p className="text-sm text-gray-600">{channel.impressions.toLocaleString()} impressions</p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{channel.clicks.toLocaleString()} clicks</span>
                        <span>{channel.conversions.toLocaleString()} conversions</span>
                        <span>{((channel.conversions / channel.clicks) * 100).toFixed(1)}% conv. rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'planning' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Campaign Planning</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Plan New Campaign</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Product Launch Campaign</h4>
                <p className="text-sm text-gray-600 mb-4">Promote new product features and generate buzz</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start Planning
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Customer Acquisition</h4>
                <p className="text-sm text-gray-600 mb-4">Target new customer segments and expand reach</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start Planning
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Seasonal Campaign</h4>
                <p className="text-sm text-gray-600 mb-4">Capitalize on seasonal trends and holidays</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start Planning
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Campaign Milestones</h4>
              <div className="space-y-3">
                {[
                  { campaign: 'Q1 Product Launch', milestone: 'Creative Assets Due', date: '2024-02-25', status: 'upcoming' },
                  { campaign: 'Social Media Engagement', milestone: 'Content Calendar Finalized', date: '2024-02-20', status: 'upcoming' },
                  { campaign: 'Email Retention Series', milestone: 'A/B Testing Complete', date: '2024-02-18', status: 'upcoming' },
                  { campaign: 'Content Marketing', milestone: 'Performance Review', date: '2024-02-15', status: 'completed' }
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {milestone.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{milestone.milestone}</p>
                        <p className="text-xs text-gray-500">{milestone.campaign}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{milestone.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
