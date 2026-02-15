'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, TrendingUp, TrendingDown, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import BudgetManagement from '@/components/staff/BudgetManagement'

interface ManagerBudgetItem {
  id: string
  category: string
  allocated: string
  spent: string
  remaining: string
  percentage: number
  status: 'on-track' | 'warning' | 'over-budget'
  period: string
  lastUpdated: string
  items: BudgetItem[]
}

interface BudgetItem {
  id: string
  name: string
  allocated: string
  spent: string
  vendor: string
  date: string
  status: 'approved' | 'pending' | 'rejected'
}

export default function ManagerBudgetPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [timeRange, setTimeRange] = useState('quarter')

  const [budgetItems, setBudgetItems] = useState<ManagerBudgetItem[]>([
    {
      id: 'BUD-001',
      category: 'Personnel',
      allocated: '$150,000',
      spent: '$125,000',
      remaining: '$25,000',
      percentage: 83,
      status: 'on-track',
      period: 'Q1 2024',
      lastUpdated: '2024-02-15',
      items: [
        { id: 'ITM-001', name: 'Salaries', allocated: '$120,000', spent: '$100,000', vendor: 'Payroll', date: '2024-02-15', status: 'approved' },
        { id: 'ITM-002', name: 'Bonuses', allocated: '$20,000', spent: '$15,000', vendor: 'HR', date: '2024-02-10', status: 'approved' },
        { id: 'ITM-003', name: 'Training', allocated: '$10,000', spent: '$10,000', vendor: 'Training Co', date: '2024-02-05', status: 'approved' }
      ]
    },
    {
      id: 'BUD-002',
      category: 'Software & Tools',
      allocated: '$25,000',
      spent: '$18,500',
      remaining: '$6,500',
      percentage: 74,
      status: 'on-track',
      period: 'Q1 2024',
      lastUpdated: '2024-02-14',
      items: [
        { id: 'ITM-004', name: 'Development Tools', allocated: '$8,000', spent: '$6,500', vendor: 'GitHub', date: '2024-02-12', status: 'approved' },
        { id: 'ITM-005', name: 'Design Software', allocated: '$5,000', spent: '$4,000', vendor: 'Adobe', date: '2024-02-08', status: 'approved' },
        { id: 'ITM-006', name: 'Analytics Tools', allocated: '$12,000', spent: '$8,000', vendor: 'Google', date: '2024-02-15', status: 'pending' }
      ]
    },
    {
      id: 'BUD-003',
      category: 'Marketing & Advertising',
      allocated: '$30,000',
      spent: '$28,000',
      remaining: '$2,000',
      percentage: 93,
      status: 'warning',
      period: 'Q1 2024',
      lastUpdated: '2024-02-13',
      items: [
        { id: 'ITM-007', name: 'Digital Ads', allocated: '$15,000', spent: '$14,000', vendor: 'Google Ads', date: '2024-02-15', status: 'approved' },
        { id: 'ITM-008', name: 'Content Creation', allocated: '$10,000', spent: '$9,000', vendor: 'Content Co', date: '2024-02-10', status: 'approved' },
        { id: 'ITM-009', name: 'Social Media', allocated: '$5,000', spent: '$5,000', vendor: 'Facebook', date: '2024-02-08', status: 'approved' }
      ]
    },
    {
      id: 'BUD-004',
      category: 'Equipment & Hardware',
      allocated: '$20,000',
      spent: '$22,000',
      remaining: '-$2,000',
      percentage: 110,
      status: 'over-budget',
      period: 'Q1 2024',
      lastUpdated: '2024-02-12',
      items: [
        { id: 'ITM-010', name: 'Laptops', allocated: '$12,000', spent: '$14,000', vendor: 'Apple', date: '2024-02-10', status: 'approved' },
        { id: 'ITM-011', name: 'Monitors', allocated: '$5,000', spent: '$5,000', vendor: 'Dell', date: '2024-02-05', status: 'approved' },
        { id: 'ITM-012', name: 'Office Furniture', allocated: '$3,000', spent: '$3,000', vendor: 'IKEA', date: '2024-02-01', status: 'approved' }
      ]
    },
    {
      id: 'BUD-005',
      category: 'Travel & Expenses',
      allocated: '$15,000',
      spent: '$8,500',
      remaining: '$6,500',
      percentage: 57,
      status: 'on-track',
      period: 'Q1 2024',
      lastUpdated: '2024-02-11',
      items: [
        { id: 'ITM-013', name: 'Conference Travel', allocated: '$8,000', spent: '$5,000', vendor: 'Travel Co', date: '2024-02-08', status: 'approved' },
        { id: 'ITM-014', name: 'Client Meetings', allocated: '$5,000', spent: '$2,500', vendor: 'Various', date: '2024-02-15', status: 'pending' },
        { id: 'ITM-015', name: 'Team Building', allocated: '$2,000', spent: '$1,000', vendor: 'Events Co', date: '2024-02-01', status: 'approved' }
      ]
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'manager') {
      setIsAuthenticated(true)
      setUserRole('manager')
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

  const filteredItems = budgetItems.filter(item => {
    const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-600'
    if (percentage >= 90) return 'text-yellow-600'
    if (percentage >= 75) return 'text-blue-600'
    return 'text-green-600'
  }

  const totalAllocated = budgetItems.reduce((sum, item) => {
    return sum + parseFloat(item.allocated.replace(/[$,]/g, ''))
  }, 0)
  const totalSpent = budgetItems.reduce((sum, item) => {
    return sum + parseFloat(item.spent.replace(/[$,]/g, ''))
  }, 0)
  const totalRemaining = totalAllocated - totalSpent

  const onTrackCount = budgetItems.filter(i => i.status === 'on-track').length
  const warningCount = budgetItems.filter(i => i.status === 'warning').length
  const overBudgetCount = budgetItems.filter(i => i.status === 'over-budget').length

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
        title="Manager Budget Management - Annita"
        description="Manager budget management and expense tracking"
        keywords={['manager', 'budget', 'expenses', 'financial', 'management']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/manager-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Budget Management</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
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

        <main className="container mx-auto px-4 py-8">
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Allocated</h3>
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalAllocated / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-500">Total budget</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalSpent / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-500">Expenses incurred</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Remaining</h3>
                <TrendingDown className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalRemaining / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-500">Budget remaining</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Utilization</h3>
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <p className={`text-2xl font-bold ${getPercentageColor((totalSpent / totalAllocated) * 100)}`}>
                {((totalSpent / totalAllocated) * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-gray-500">Budget used</p>
            </div>
          </div>

          {/* Budget Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">On Track</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{onTrackCount}</p>
              <p className="text-sm text-gray-500">Categories on track</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Warning</h3>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{warningCount}</p>
              <p className="text-sm text-gray-500">Near budget limit</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Over Budget</h3>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{overBudgetCount}</p>
              <p className="text-sm text-gray-500">Exceeded budget</p>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
              {filteredItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.category}</h3>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">Period: {item.period}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getPercentageColor(item.percentage)}`}>
                        {item.percentage}%
                      </p>
                      <p className="text-sm text-gray-500">utilized</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Allocated</p>
                      <p className="text-sm font-medium text-gray-900">{item.allocated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Spent</p>
                      <p className="text-sm text-gray-900">{item.spent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining</p>
                      <p className={`text-sm font-medium ${
                        parseFloat(item.remaining.replace(/[$,]/g, '')) < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.remaining}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-sm text-gray-900">{item.lastUpdated}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Budget Utilization</span>
                      <span className={`text-sm font-medium ${getPercentageColor(item.percentage)}`}>
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.percentage >= 100 ? 'bg-red-500' :
                          item.percentage >= 90 ? 'bg-yellow-500' :
                          item.percentage >= 75 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Recent Items */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Expenses</h4>
                    <div className="space-y-2">
                      {item.items.slice(0, 3).map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">{expense.name}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{expense.vendor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-900">{expense.spent}</span>
                            <span className={`px-1 py-0.5 rounded text-xs ${
                              expense.status === 'approved' ? 'bg-green-100 text-green-700' :
                              expense.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {expense.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {item.items.length} expense items
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No budget categories found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Budget Management Section */}
          <div className="mt-8">
            <BudgetManagement userRole="manager" />
          </div>
        </main>
      </div>
    </>
  )
}
