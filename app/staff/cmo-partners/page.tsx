'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lightbulb, Users, TrendingUp, Calendar, DollarSign, Search, Filter, Download, Eye, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import PartnershipManagement from '@/components/staff/PartnershipManagement'

interface CMOPartner {
  id: string
  name: string
  type: 'technology' | 'agency' | 'reseller' | 'strategic' | 'content' | 'distribution'
  status: 'active' | 'pending' | 'inactive' | 'terminated'
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  partnershipDate: string
  contractValue: string
  description: string
  contactPerson: string
  email: string
  phone: string
  location: string
  performance: {
    leadsGenerated: number
    revenue: number
    satisfaction: number
    lastReview: string
  }
  benefits: string[]
  responsibilities: string[]
}

export default function CMOPartnersPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTier, setFilterTier] = useState('all')

  const [partners, setPartners] = useState<CMOPartner[]>([
    {
      id: 'PRT-001',
      name: 'TechCorp Solutions',
      type: 'technology',
      status: 'active',
      tier: 'platinum',
      partnershipDate: '2023-01-15',
      contractValue: '$2,500,000',
      description: 'Leading technology provider for enterprise software solutions and cloud services',
      contactPerson: 'Michael Roberts',
      email: 'michael.roberts@techcorp.com',
      phone: '+1-555-0101',
      location: 'San Francisco, CA',
      performance: {
        leadsGenerated: 450,
        revenue: 1250000,
        satisfaction: 4.8,
        lastReview: '2024-02-01'
      },
      benefits: ['Priority Support', 'Co-marketing Opportunities', 'Revenue Sharing'],
      responsibilities: ['Lead Generation', 'Technical Support', 'Joint Marketing']
    },
    {
      id: 'PRT-002',
      name: 'Creative Minds Agency',
      type: 'agency',
      status: 'active',
      tier: 'gold',
      partnershipDate: '2022-06-20',
      contractValue: '$750,000',
      description: 'Full-service digital marketing agency specializing in B2B technology clients',
      contactPerson: 'Sarah Chen',
      email: 'sarah.chen@creativeminds.com',
      phone: '+1-555-0102',
      location: 'New York, NY',
      performance: {
        leadsGenerated: 230,
        revenue: 450000,
        satisfaction: 4.5,
        lastReview: '2024-01-15'
      },
      benefits: ['Agency Discounts', 'First Look Opportunities', 'Strategic Planning'],
      responsibilities: ['Campaign Management', 'Content Creation', 'Analytics Reporting']
    },
    {
      id: 'PRT-003',
      name: 'Global Distribution Network',
      type: 'distribution',
      status: 'active',
      tier: 'gold',
      partnershipDate: '2023-03-10',
      contractValue: '$1,200,000',
      description: 'International distribution network for software and digital products',
      contactPerson: 'David Kim',
      email: 'david.kim@gdist.net',
      phone: '+1-555-0103',
      location: 'London, UK',
      performance: {
        leadsGenerated: 180,
        revenue: 680000,
        satisfaction: 4.2,
        lastReview: '2024-02-10'
      },
      benefits: ['Global Reach', 'Local Market Expertise', 'Logistics Support'],
      responsibilities: ['Product Distribution', 'Local Marketing', 'Customer Support']
    },
    {
      id: 'PRT-004',
      name: 'ContentHub Media',
      type: 'content',
      status: 'pending',
      tier: 'silver',
      partnershipDate: '2024-01-25',
      contractValue: '$250,000',
      description: 'Content creation and syndication platform for technology publications',
      contactPerson: 'Emily Davis',
      email: 'emily.davis@contenthub.com',
      phone: '+1-555-0104',
      location: 'Austin, TX',
      performance: {
        leadsGenerated: 0,
        revenue: 0,
        satisfaction: 0,
        lastReview: '2024-01-25'
      },
      benefits: ['Content Syndication', 'Brand Exposure', 'Lead Generation'],
      responsibilities: ['Content Creation', 'Distribution', 'Performance Tracking']
    },
    {
      id: 'PRT-005',
      name: 'Strategic Alliance Group',
      type: 'strategic',
      status: 'active',
      tier: 'platinum',
      partnershipDate: '2021-09-15',
      contractValue: '$3,000,000',
      description: 'Strategic consulting and business development partnership for market expansion',
      contactPerson: 'Alex Thompson',
      email: 'alex.thompson@strategicalliance.com',
      phone: '+1-555-0105',
      location: 'Boston, MA',
      performance: {
        leadsGenerated: 320,
        revenue: 1890000,
        satisfaction: 4.9,
        lastReview: '2024-01-20'
      },
      benefits: ['Strategic Guidance', 'Market Intelligence', 'Executive Access'],
      responsibilities: ['Market Analysis', 'Strategy Development', 'Relationship Management']
    },
    {
      id: 'PRT-006',
      name: 'Regional Resellers Inc',
      type: 'reseller',
      status: 'inactive',
      tier: 'bronze',
      partnershipDate: '2022-11-01',
      contractValue: '$150,000',
      description: 'Regional reseller network for small and medium business markets',
      contactPerson: 'Jessica Martinez',
      email: 'jessica.martinez@regionalresellers.com',
      phone: '+1-555-0106',
      location: 'Chicago, IL',
      performance: {
        leadsGenerated: 45,
        revenue: 78000,
        satisfaction: 3.8,
        lastReview: '2023-12-15'
      },
      benefits: ['Reseller Margins', 'Marketing Support', 'Training Programs'],
      responsibilities: ['Product Sales', 'Customer Support', 'Market Development']
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const avgId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cmo') {
      setIsAuthenticated(true)
      setUserRole('cmo')
      setEmployeeId(avgId || '')
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

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || partner.type === filterType
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus
    const matchesTier = filterTier === 'all' || partner.tier === filterTier
    
    return matchesSearch && matchesType && matchesStatus && matchesTier
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technology': return 'bg-blue-100 text-blue-700'
      case 'agency': return 'bg-purple-100 text-purple-700'
      case 'reseller': return 'bg-green-100 text-green-700'
      case 'strategic': return 'bg-orange-100 text-orange-700'
      case 'content': return 'bg-pink-100 text-pink-700'
      case 'distribution': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-500 text-white'
      case 'gold': return 'bg-yellow-500 text-white'
      case 'silver': return 'bg-gray-400 text-white'
      case 'bronze': return 'bg-orange-600 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const partnerTypes = Array.from(new Set(partners.map(partner => partner.type)))

  const totalContractValue = partners.reduce((sum, partner) => {
    return sum + parseFloat(partner.contractValue.replace(/[$,]/g, ''))
  }, 0)

  const totalRevenue = partners.reduce((sum, partner) => sum + partner.performance.revenue, 0)
  const totalLeads = partners.reduce((sum, partner) => sum + partner.performance.leadsGenerated, 0)
  const avgSatisfaction = partners.filter(p => p.performance.satisfaction > 0).reduce((sum, p) => sum + p.performance.satisfaction, 0) / partners.filter(p => p.performance.satisfaction > 0).length

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
        title="CMO Partnership Management - Annita"
        description="CMO partnership management and strategic alliances"
        keywords={['cmo', 'partnerships', 'strategic alliances', 'business development']}
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
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Partnership Management</h1>
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
          {/* Partnerships Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Partners</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
              <p className="text-sm text-gray-500">Active partnerships</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contract Value</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalContractValue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Total contract value</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Partner-generated revenue</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Satisfaction</h3>
                <Lightbulb className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{avgSatisfaction.toFixed(1)}/5</p>
              <p className="text-sm text-gray-500">Partner satisfaction</p>
            </div>
          </div>

          {/* Partners List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Strategic Partners</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search partners..."
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
                  {partnerTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Tiers</option>
                  <option value="platinum">Platinum</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                  <option value="terminated">Terminated</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{partner.description}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                          {partner.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(partner.type)}`}>
                          {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(partner.tier)}`}>
                          {partner.tier.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Contract Value</span>
                      <span className="text-sm font-semibold text-gray-900">{partner.contractValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Partnership Date</span>
                      <span className="text-sm text-gray-900">{partner.partnershipDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Contact</span>
                      <span className="text-sm text-gray-900">{partner.contactPerson}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Location</span>
                      <span className="text-sm text-gray-900">{partner.location}</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  {partner.status === 'active' && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Performance</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Leads:</span>
                          <span className="ml-2 font-medium text-gray-900">{partner.performance.leadsGenerated}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Revenue:</span>
                          <span className="ml-2 font-medium text-gray-900">${(partner.performance.revenue / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Satisfaction:</span>
                          <span className="ml-2 font-medium text-gray-900">{partner.performance.satisfaction}/5</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Partnership Benefits */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Benefits</h4>
                    <div className="flex flex-wrap gap-1">
                      {partner.benefits.slice(0, 2).map((benefit, index) => (
                        <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                          {benefit}
                        </span>
                      ))}
                      {partner.benefits.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{partner.benefits.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last review: {partner.performance.lastReview}
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPartners.length === 0 && (
              <div className="text-center py-12">
                <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No partners found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Partnership Management Section */}
          <div className="mt-8">
            <PartnershipManagement />
          </div>
        </main>
      </div>
    </>
  )
}
