'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, TrendingUp, TrendingDown, BarChart3, Search, Filter, Download, Calendar, AlertCircle, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

interface CMOBudgetItem {
  id: string
  category: string
  allocated: string
  spent: string
  remaining: string
  percentageUsed: number
  status: 'on-track' | 'warning' | 'over-budget'
  lastUpdated: string
  manager: string
  quarterly: {
    q1: string
    q2: string
    q3: string
    q4: string
  }
}

export default function CMOBudgetPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [fiscalYear, setFiscalYear] = useState('2024')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [budgetItems, setBudgetItems] = useState<CMOBudgetItem[]>([
    {
      id: 'MKT-BUD-001',
      category: 'Digital Advertising',
      allocated: '$1,200,000',
      spent: '$850,000',
      remaining: '$350,000',
      percentageUsed: 70.8,
      status: 'on-track',
      lastUpdated: '2024-02-15',
      manager: 'Sarah Chen',
      quarterly: {
        q1: '$300,000',
        q2: '$300,000',
        q3: '$300,000',
        q4: '$300,000'
      }
    },
    {
      id: 'MKT-BUD-002',
      category: 'Content Marketing',
      allocated: '$450,000',
      spent: '$380,000',
      remaining: '$70,000',
      percentageUsed: 84.4,
      status: 'warning',
      lastUpdated: '2024-02-14',
      manager: 'Alex Thompson',
      quarterly: {
        q1: '$112,500',
        q2: '$112,500',
        q3: '$112,500',
        q4: '$112,500'
      }
    },
    {
      id: 'MKT-BUD-003',
      category: 'Social Media Marketing',
      allocated: '$600,000',
      spent: '$520,000',
      remaining: '$80,000',
      percentageUsed: 86.7,
      status: 'warning',
      lastUpdated: '2024-02-13',
      manager: 'Mike Johnson',
      quarterly: {
        q1: '$150,000',
        q2: '$150,000',
        q3: '$150,000',
        q4: '$150,000'
      }
    },
    {
      id: 'MKT-BUD-004',
      category: 'Events & Trade Shows',
      allocated: '$800,000',
      spent: '$920,000',
      remaining: '-$120,000',
      percentageUsed: 115.0,
      status: 'over-budget',
      lastUpdated: '2024-02-12',
      manager: 'Jessica Martinez',
      quarterly: {
        q1: '$200,000',
        q2: '$200,000',
        q3: '$200,000',
        q4: '$200,000'
      }
    },
    {
      id: 'MKT-BUD-005',
      category: 'Marketing Tools & Software',
      allocated: '$250,000',
      spent: '$180,000',
      remaining: '$70,000',
      percentageUsed: 72.0,
      status: 'on-track',
      lastUpdated: '2024-02-11',
      manager: 'Emily Davis',
      quarterly: {
        q1: '$62,500',
        q2: '$62,500',
        q3: '$62,500',
        q4: '$62,500'
      }
    },
    {
      id: 'MKT-BUD-006',
      category: 'Brand & Creative',
      allocated: '$350,000',
      spent: '$280,000',
      remaining: '$70,000',
      percentageUsed: 80.0,
      status: 'on-track',
      lastUpdated: '2024-02-10',
      manager: 'Sarah Chen',
      quarterly: {
        q1: '$87,500',
        q2: '$87,500',
        q3: '$87,500',
        q4: '$87,500'
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

  const filteredBudgetItems = budgetItems.filter(item => {
    const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.manager.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-700'
      case 'warning': return 'bg-yellow-100 text-yellow-700'
      case 'over-budget': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getProgressBarColor = (percentageUsed: number) => {
    if (percentageUsed <= 75) return 'bg-green-500'
    if (percentageUsed <= 90) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const totalAllocated = budgetItems.reduce((sum, item) => {
    return sum + parseFloat(item.allocated.replace(/[$,]/g, ''))
  }, 0)

  const totalSpent = budgetItems.reduce((sum, item) => {
    return sum + parseFloat(item.spent.replace(/[$,]/g, ''))
  }, 0)

  const totalRemaining = totalAllocated - totalSpent

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
        title="CMO Marketing Budget - Annita"
        description="CMO marketing budget management and allocation"
        keywords={['cmo', 'budget', 'marketing', 'allocation', 'spending']}
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
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Marketing Budget</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={fiscalYear}
                  onChange={(e) => setFiscalYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="2023">FY 2023</option>
                  <option value="2024">FY 2024</option>
                  <option value="2025">FY 2025</option>
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
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Budget</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalAllocated.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Fiscal Year {fiscalYear}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{((totalSpent / totalAllocated) * 100).toFixed(1)}% utilized</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Remaining</h3>
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <p className={`text-2xl font-bold ${
                totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${Math.abs(totalRemaining).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                {totalRemaining >= 0 ? 'Available' : 'Over Budget'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Budget Alerts</h3>
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {budgetItems.filter(item => item.status === 'warning' || item.status === 'over-budget').length}
              </p>
              <p className="text-sm text-gray-500">Need attention</p>
            </div>
          </div>

          {/* Budget Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Budget Categories</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="on-track">On Track</option>
                  <option value="warning">Warning</option>
                  <option value="over-budget">Over Budget</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredBudgetItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.category}</h3>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">Manager: {item.manager}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{item.allocated}</p>
                      <p className="text-sm text-gray-500">Total allocated</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Allocated</p>
                      <p className="text-lg font-semibold text-gray-900">{item.allocated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Spent</p>
                      <p className="text-lg font-semibold text-blue-600">{item.spent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining</p>
                      <p className={`text-lg font-semibold ${
                        parseFloat(item.remaining.replace(/[$,]/g, '')) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.remaining}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Used</p>
                      <p className="text-lg font-semibold text-gray-900">{item.percentageUsed.toFixed(1)}%</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Budget Utilization</span>
                      <span className="text-sm text-gray-900">{item.percentageUsed.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressBarColor(item.percentageUsed)}`}
                        style={{ width: `${Math.min(item.percentageUsed, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Quarterly Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Quarterly Allocation</h4>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="text-center">
                        <p className="text-gray-500">Q1</p>
                        <p className="font-medium text-gray-900">{item.quarterly.q1}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Q2</p>
                        <p className="font-medium text-gray-900">{item.quarterly.q2}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Q3</p>
                        <p className="font-medium text-gray-900">{item.quarterly.q3}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Q4</p>
                        <p className="font-medium text-gray-900">{item.quarterly.q4}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Last updated: {item.lastUpdated}</span>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredBudgetItems.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No budget items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
