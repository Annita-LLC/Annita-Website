'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Target, TrendingUp, TrendingDown, DollarSign, Users, Calendar, Search, Filter, Download, Eye, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import CampaignManagement from '@/components/staff/CampaignManagement'

interface CMOCampaign {
  id: string
  name: string
  type: 'digital' | 'social' | 'email' | 'content' | 'event' | 'ppc'
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled'
  budget: string
  spent: string
  startDate: string
  endDate: string
  targetAudience: string
  description: string
  performance: {
    impressions: number
    clicks: number
    conversions: number
    roi: number
  }
  manager: string
  team: string[]
}

export default function CMOCampaignsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [campaigns, setCampaigns] = useState<CMOCampaign[]>([
    {
      id: 'CMP-001',
      name: 'Spring Product Launch 2024',
      type: 'digital',
      status: 'active',
      budget: '$250,000',
      spent: '$125,000',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      targetAudience: 'Tech professionals, 25-45',
      description: 'Multi-channel launch campaign for new product line',
      performance: {
        impressions: 2500000,
        clicks: 125000,
        conversions: 2500,
        roi: 3.2
      },
      manager: 'Sarah Chen',
      team: ['Marketing Team', 'Design Team', 'Content Team']
    },
    {
      id: 'CMP-002',
      name: 'LinkedIn Lead Generation',
      type: 'social',
      status: 'active',
      budget: '$75,000',
      spent: '$45,000',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      targetAudience: 'B2B decision makers',
      description: 'Targeted LinkedIn advertising for B2B leads',
      performance: {
        impressions: 850000,
        clicks: 42500,
        conversions: 850,
        roi: 2.8
      },
      manager: 'Mike Johnson',
      team: ['Social Media Team', 'Sales Team']
    },
    {
      id: 'CMP-003',
      name: 'Email Newsletter Series',
      type: 'email',
      status: 'active',
      budget: '$25,000',
      spent: '$15,000',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      targetAudience: 'Existing customers',
      description: 'Monthly newsletter with product updates and offers',
      performance: {
        impressions: 500000,
        clicks: 25000,
        conversions: 1250,
        roi: 4.1
      },
      manager: 'Emily Davis',
      team: ['Email Marketing Team']
    },
    {
      id: 'CMP-004',
      name: 'Tech Conference 2024',
      type: 'event',
      status: 'planning',
      budget: '$150,000',
      spent: '$25,000',
      startDate: '2024-06-01',
      endDate: '2024-06-03',
      targetAudience: 'Industry professionals',
      description: 'Annual tech conference sponsorship and booth',
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        roi: 0
      },
      manager: 'Alex Thompson',
      team: ['Events Team', 'Sales Team']
    },
    {
      id: 'CMP-005',
      name: 'Google Ads Campaign',
      type: 'ppc',
      status: 'completed',
      budget: '$100,000',
      spent: '$98,500',
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      targetAudience: 'Product researchers',
      description: 'Q4 Google Ads campaign for holiday season',
      performance: {
        impressions: 1800000,
        clicks: 90000,
        conversions: 1800,
        roi: 2.5
      },
      manager: 'Sarah Chen',
      team: ['PPC Team']
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

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.manager.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || campaign.type === filterType
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700'
      case 'active': return 'bg-green-100 text-green-700'
      case 'paused': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-purple-100 text-purple-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'digital': return 'bg-purple-100 text-purple-700'
      case 'social': return 'bg-blue-100 text-blue-700'
      case 'email': return 'bg-green-100 text-green-700'
      case 'content': return 'bg-orange-100 text-orange-700'
      case 'event': return 'bg-pink-100 text-pink-700'
      case 'ppc': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const campaignTypes = Array.from(new Set(campaigns.map(campaign => campaign.type)))

  const totalBudget = campaigns.reduce((sum, campaign) => {
    return sum + parseFloat(campaign.budget.replace(/[$,]/g, ''))
  }, 0)

  const totalSpent = campaigns.reduce((sum, campaign) => {
    return sum + parseFloat(campaign.spent.replace(/[$,]/g, ''))
  }, 0)

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const avgROI = campaigns.reduce((sum, c) => sum + c.performance.roi, 0) / campaigns.length

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
        title="CMO Campaign Management - Annita"
        description="CMO marketing campaigns and performance tracking"
        keywords={['cmo', 'campaigns', 'marketing', 'performance', 'roi']}
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
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Campaign Management</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Campaign Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Budget</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
              <p className="text-sm text-gray-500">All campaigns</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{((totalSpent / totalBudget) * 100).toFixed(1)}% utilized</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeCampaigns}</p>
              <p className="text-sm text-gray-500">Currently running</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Average ROI</h3>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{avgROI.toFixed(1)}x</p>
              <p className="text-sm text-gray-500">Return on investment</p>
            </div>
          </div>

          {/* Campaign List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Marketing Campaigns</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
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
                  {campaignTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(campaign.type)}`}>
                          {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{campaign.budget}</p>
                      <p className="text-sm text-gray-500">{campaign.spent} spent</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="text-sm font-medium text-gray-900">{campaign.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Target Audience</p>
                      <p className="text-sm text-gray-900">{campaign.targetAudience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-sm text-gray-900">{campaign.startDate} - {campaign.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ROI</p>
                      <p className={`text-sm font-semibold ${campaign.performance.roi >= 3 ? 'text-green-600' : campaign.performance.roi >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {campaign.performance.roi}x
                      </p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  {campaign.status === 'active' || campaign.status === 'completed' ? (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Metrics</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Impressions:</span>
                          <span className="ml-2 font-medium text-gray-900">{campaign.performance.impressions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Clicks:</span>
                          <span className="ml-2 font-medium text-gray-900">{campaign.performance.clicks.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Conversions:</span>
                          <span className="ml-2 font-medium text-gray-900">{campaign.performance.conversions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Team: {campaign.team.join(', ')}</span>
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Campaign Management Section */}
          <div className="mt-8">
            <CampaignManagement />
          </div>
        </main>
      </div>
    </>
  )
}
