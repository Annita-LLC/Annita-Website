'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, TrendingDown, DollarSign, PieChart, Search, Filter, Download, Calendar, AlertCircle, CheckCircle, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import InvestmentManagement from '@/components/staff/InvestmentManagement'

interface CFOInvestment {
  id: string
  name: string
  type: 'stocks' | 'bonds' | 'real-estate' | 'venture' | 'crypto'
  currentValue: string
  initialValue: string
  return: number
  returnPercentage: number
  status: 'active' | 'pending' | 'sold'
  purchaseDate: string
  lastUpdated: string
  risk: 'low' | 'medium' | 'high'
  manager: string
}

export default function CFOInvestmentsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')

  const [investments, setInvestments] = useState<CFOInvestment[]>([
    {
      id: 'INV-001',
      name: 'Tech Growth Fund',
      type: 'venture',
      currentValue: '$2,850,000',
      initialValue: '$2,000,000',
      return: 850000,
      returnPercentage: 42.5,
      status: 'active',
      purchaseDate: '2023-01-15',
      lastUpdated: '2024-02-15',
      risk: 'high',
      manager: 'Goldman Sachs'
    },
    {
      id: 'INV-002',
      name: 'Corporate Bond Portfolio',
      type: 'bonds',
      currentValue: '$1,450,000',
      initialValue: '$1,500,000',
      return: -50000,
      returnPercentage: -3.3,
      status: 'active',
      purchaseDate: '2022-06-01',
      lastUpdated: '2024-02-14',
      risk: 'low',
      manager: 'JP Morgan'
    },
    {
      id: 'INV-003',
      name: 'Commercial Real Estate',
      type: 'real-estate',
      currentValue: '$3,200,000',
      initialValue: '$2,800,000',
      return: 400000,
      returnPercentage: 14.3,
      status: 'active',
      purchaseDate: '2021-03-20',
      lastUpdated: '2024-02-13',
      risk: 'medium',
      manager: 'CBRE Group'
    },
    {
      id: 'INV-004',
      name: 'S&P 500 Index Fund',
      type: 'stocks',
      currentValue: '$1,890,000',
      initialValue: '$1,600,000',
      return: 290000,
      returnPercentage: 18.1,
      status: 'active',
      purchaseDate: '2022-09-10',
      lastUpdated: '2024-02-15',
      risk: 'medium',
      manager: 'Vanguard'
    },
    {
      id: 'INV-005',
      name: 'Bitcoin Holdings',
      type: 'crypto',
      currentValue: '$450,000',
      initialValue: '$300,000',
      return: 150000,
      returnPercentage: 50.0,
      status: 'active',
      purchaseDate: '2023-07-01',
      lastUpdated: '2024-02-14',
      risk: 'high',
      manager: 'Coinbase Custody'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cfo') {
      setIsAuthenticated(true)
      setUserRole('cfo')
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

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.manager.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || investment.type === filterType
    const matchesStatus = filterStatus === 'all' || investment.status === filterStatus
    const matchesRisk = filterRisk === 'all' || investment.risk === filterRisk
    
    return matchesSearch && matchesType && matchesStatus && matchesRisk
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'sold': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stocks': return 'bg-blue-100 text-blue-700'
      case 'bonds': return 'bg-green-100 text-green-700'
      case 'real-estate': return 'bg-purple-100 text-purple-700'
      case 'venture': return 'bg-orange-100 text-orange-700'
      case 'crypto': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'high': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const investmentTypes = Array.from(new Set(investments.map(inv => inv.type)))

  const totalCurrentValue = investments.reduce((sum, inv) => {
    return sum + parseFloat(inv.currentValue.replace(/[$,]/g, ''))
  }, 0)

  const totalInitialValue = investments.reduce((sum, inv) => {
    return sum + parseFloat(inv.initialValue.replace(/[$,]/g, ''))
  }, 0)

  const totalReturn = totalCurrentValue - totalInitialValue
  const totalReturnPercentage = (totalReturn / totalInitialValue) * 100

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
        title="CFO Investment Management - Annita"
        description="CFO investment portfolio and asset management"
        keywords={['cfo', 'investments', 'portfolio', 'assets', 'returns']}
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
                  onClick={() => router.push('/staff/cfo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Investment Management</h1>
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
          {/* Investment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Portfolio Value</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalCurrentValue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Current market value</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Return</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(totalReturn).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{totalReturnPercentage.toFixed(1)}% return</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Investments</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{investments.filter(i => i.status === 'active').length}</p>
              <p className="text-sm text-gray-500">Currently held</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Best Performer</h3>
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">Bitcoin</p>
              <p className="text-sm text-green-600">+50.0% return</p>
            </div>
          </div>

          {/* Investment Portfolio */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Investment Portfolio</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search investments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Types</option>
                  {investmentTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredInvestments.map((investment) => (
                <div key={investment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{investment.name}</h3>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                          {investment.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(investment.type)}`}>
                          {investment.type.charAt(0).toUpperCase() + investment.type.slice(1).replace('-', ' ')}
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getRiskColor(investment.risk)}`}></div>
                          <span className="text-xs text-gray-500">{investment.risk} risk</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{investment.currentValue}</p>
                      <p className={`text-sm font-medium ${investment.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.return >= 0 ? '+' : ''}{investment.returnPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Initial Value</p>
                      <p className="text-sm font-medium text-gray-900">{investment.initialValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Return</p>
                      <p className={`text-sm font-medium ${investment.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.return >= 0 ? '+' : ''}${Math.abs(investment.return).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="text-sm text-gray-900">{investment.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Purchase Date</p>
                      <p className="text-sm text-gray-900">{investment.purchaseDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last updated: {investment.lastUpdated}
                    </div>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredInvestments.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No investments found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Investment Management Section */}
          <div className="mt-8">
            <InvestmentManagement />
          </div>
        </main>
      </div>
    </>
  )
}
