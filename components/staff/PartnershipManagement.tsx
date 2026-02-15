'use client'

import { useState } from 'react'
import { Hand, TrendingUp, Users, DollarSign, Star, AlertCircle, CheckCircle, Clock, MessageSquare, FileText, Eye, Plus, Search, Filter, BarChart3, Pause, Edit } from 'lucide-react'

interface Partnership {
  id: string
  companyName: string
  type: 'technology' | 'channel' | 'strategic' | 'marketing' | 'distribution' | 'investment'
  status: 'active' | 'pending' | 'negotiation' | 'terminated' | 'on-hold'
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  startDate: string
  endDate: string
  contactPerson: string
  contactEmail: string
  revenue: number
  costs: number
  performance: {
    satisfaction: number
    collaboration: number
    roi: number
    growth: number
  }
  description: string
  objectives: string[]
  lastActivity: string
}

interface PartnershipMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function PartnershipManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'partnerships' | 'opportunities' | 'analytics'>('overview')
  const [selectedPartnership, setSelectedPartnership] = useState<string | null>(null)

  const partnerships: Partnership[] = [
    {
      id: '1',
      companyName: 'TechSolutions Inc.',
      type: 'technology',
      status: 'active',
      tier: 'platinum',
      startDate: '2023-01-15',
      endDate: '2025-01-15',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah.johnson@techsolutions.com',
      revenue: 250000,
      costs: 75000,
      performance: {
        satisfaction: 4.8,
        collaboration: 4.9,
        roi: 185,
        growth: 45
      },
      description: 'Strategic technology partnership for AI integration and cloud services',
      objectives: ['Joint product development', 'Co-marketing initiatives', 'Technology integration', 'Market expansion'],
      lastActivity: '2024-02-10'
    },
    {
      id: '2',
      companyName: 'Global Distributors Ltd.',
      type: 'channel',
      status: 'active',
      tier: 'gold',
      startDate: '2023-06-01',
      endDate: '2024-06-01',
      contactPerson: 'Mike Chen',
      contactEmail: 'mike.chen@globaldist.com',
      revenue: 180000,
      costs: 45000,
      performance: {
        satisfaction: 4.5,
        collaboration: 4.3,
        roi: 145,
        growth: 28
      },
      description: 'Distribution partnership for enterprise software solutions',
      objectives: ['Market penetration', 'Sales growth', 'Customer acquisition', 'Regional expansion'],
      lastActivity: '2024-02-08'
    },
    {
      id: '3',
      companyName: 'Innovation Labs',
      type: 'strategic',
      status: 'negotiation',
      tier: 'platinum',
      startDate: '',
      endDate: '',
      contactPerson: 'Emma Davis',
      contactEmail: 'emma.davis@innovationlabs.com',
      revenue: 0,
      costs: 0,
      performance: {
        satisfaction: 0,
        collaboration: 0,
        roi: 0,
        growth: 0
      },
      description: 'Potential strategic partnership for R&D collaboration and innovation',
      objectives: ['Research collaboration', 'Joint innovation projects', 'IP sharing', 'Technology advancement'],
      lastActivity: '2024-02-12'
    }
  ]

  const metrics: PartnershipMetric[] = [
    {
      id: '1',
      title: 'Active Partnerships',
      value: '24',
      change: 8.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Hand className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Revenue from Partners',
      value: '$2.4M',
      change: 15.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Partner Satisfaction',
      value: '4.6/5',
      change: 4.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Star className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'New Opportunities',
      value: '12',
      change: -8.9,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'partnerships', label: 'Partnerships', icon: <Hand className="w-4 h-4" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Eye className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'negotiation': return 'bg-blue-100 text-blue-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      case 'on-hold': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-700'
      case 'gold': return 'bg-yellow-100 text-yellow-700'
      case 'silver': return 'bg-gray-100 text-gray-700'
      case 'bronze': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'negotiation': return <MessageSquare className="w-4 h-4" />
      case 'terminated': return <AlertCircle className="w-4 h-4" />
      case 'on-hold': return <Pause className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Hand className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Partnership Management</h2>
              <p className="text-sm text-gray-600">Manage strategic partnerships and alliances</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Partnership</span>
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
                  ? 'bg-white text-indigo-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Partnerships</h3>
                <div className="space-y-4">
                  {partnerships.filter(p => p.status === 'active').slice(0, 3).map((partnership) => (
                    <div key={partnership.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                          <Hand className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{partnership.companyName}</p>
                          <p className="text-xs text-gray-500 capitalize">{partnership.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${partnership.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Health Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Satisfaction</span>
                    <span className="text-sm font-medium text-green-600">4.6/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average ROI</span>
                    <span className="text-sm font-medium text-green-600">165%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="text-sm font-medium text-blue-600">+32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Retention Rate</span>
                    <span className="text-sm font-medium text-purple-600">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'partnerships' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Partnerships</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search partnerships..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>Technology</option>
                  <option>Channel</option>
                  <option>Strategic</option>
                  <option>Marketing</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Partnership</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {partnerships.map((partnership) => (
                <div key={partnership.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        partnership.status === 'active' ? 'bg-green-100 text-green-600' :
                        partnership.status === 'negotiation' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getStatusIcon(partnership.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{partnership.companyName}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(partnership.tier)}`}>
                            {partnership.tier}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{partnership.type}</span>
                          <span>•</span>
                          <span>{partnership.contactPerson}</span>
                          <span>•</span>
                          <span>{partnership.contactEmail}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(partnership.status)}`}>
                        {partnership.status}
                      </span>
                      <button
                        onClick={() => setSelectedPartnership(selectedPartnership === partnership.id ? null : partnership.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Contract Period</p>
                      <p className="text-sm font-medium text-gray-900">
                        {partnership.startDate} - {partnership.endDate || 'Ongoing'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last activity: {partnership.lastActivity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Financial Performance</p>
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-lg font-semibold text-green-600">${partnership.revenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-red-600">${partnership.costs.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Costs</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance Metrics</p>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{partnership.performance.satisfaction}</p>
                          <p className="text-xs text-gray-500">Satisfaction</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{partnership.performance.roi}%</p>
                          <p className="text-xs text-gray-500">ROI</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedPartnership === partnership.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Partnership Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Description</h6>
                          <p className="text-sm text-gray-700">{partnership.description}</p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Objectives</h6>
                          <ul className="space-y-1">
                            {partnership.objectives.map((objective, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h6 className="text-sm font-medium text-gray-900 mb-2">Performance Breakdown</h6>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{partnership.performance.satisfaction}/5</p>
                            <p className="text-xs text-gray-500">Satisfaction</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{partnership.performance.collaboration}/5</p>
                            <p className="text-xs text-gray-500">Collaboration</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{partnership.performance.roi}%</p>
                            <p className="text-xs text-gray-500">ROI</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">+{partnership.performance.growth}%</p>
                            <p className="text-xs text-gray-500">Growth</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <MessageSquare className="w-4 h-4" />
                        <span>Contact</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        <span>View Contract</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>Analytics</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Partnership Opportunities</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Eye className="w-4 h-4" />
                <span>Discover Opportunities</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Channel Partnership</h4>
                <p className="text-sm text-gray-600 mb-4">Expand distribution network through strategic channel partners</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">High Priority</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">$500K Potential</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Technology Alliance</h4>
                <p className="text-sm text-gray-600 mb-4">Partner with innovative tech companies for product integration</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Medium Priority</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">$750K Potential</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Market Expansion</h4>
                <p className="text-sm text-gray-600 mb-4">Enter new markets through strategic partnerships</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Urgent</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">$1M Potential</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Potential Partners Pipeline</h4>
              <div className="space-y-3">
                {[
                  { company: 'InnovateTech Solutions', type: 'Technology', stage: 'Initial Contact', value: '$200K' },
                  { company: 'Global Systems Inc.', type: 'Channel', stage: 'Proposal Sent', value: '$350K' },
                  { company: 'NextGen Technologies', type: 'Strategic', stage: 'Negotiation', value: '$800K' },
                  { company: 'Market Leaders Corp.', type: 'Marketing', stage: 'Due Diligence', value: '$150K' }
                ].map((partner, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{partner.company}</p>
                        <p className="text-xs text-gray-500">{partner.type} • {partner.stage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{partner.value}</p>
                      <p className="text-xs text-gray-500">Potential Value</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Performance Analytics</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Total Partnership Revenue', value: '$2.4M', change: 18.7 },
                    { metric: 'Average Partnership ROI', value: '165%', change: 12.5 },
                    { metric: 'Partnership Satisfaction Score', value: '4.6/5', change: 8.3 },
                    { metric: 'New Partnership Opportunities', value: '12', change: -5.2 }
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Type Performance</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Technology Partners', count: 8, revenue: '$1.2M', roi: 185 },
                    { type: 'Channel Partners', count: 12, revenue: '$850K', roi: 145 },
                    { type: 'Strategic Partners', count: 3, revenue: '$280K', roi: 210 },
                    { type: 'Marketing Partners', count: 6, revenue: '$120K', roi: 95 }
                  ].map((type, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{type.type}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{type.count}</p>
                          <p className="text-xs text-gray-500">partners</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{type.revenue} revenue</span>
                        <span>{type.roi}% ROI</span>
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
