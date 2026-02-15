'use client'

// Build fix at 2026-02-15 12:30

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Download, Filter, Search, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import BudgetManagement from '@/components/staff/BudgetManagement'

interface CEOFinancialMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: JSX.Element
}

interface CEOTransaction {
  id: string
  date: string
  description: string
  amount: string
  type: 'income' | 'expense'
  category: string
  status: 'completed' | 'pending'
}

export default function CEOFinancialPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [timeRange, setTimeRange] = useState('month')
  const [searchTerm, setSearchTerm] = useState('')

  const [metrics, setMetrics] = useState<CEOFinancialMetric[]>([
    {
      id: '1',
      title: 'Total Revenue',
      value: '$12,450,000',
      change: 15.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Net Profit',
      value: '$3,280,000',
      change: 8.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Operating Expenses',
      value: '$8,920,000',
      change: -3.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Cash Flow',
      value: '$1,850,000',
      change: 22.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: <PieChart className="w-6 h-6" />
    }
  ])

  const [transactions, setTransactions] = useState<CEOTransaction[]>([
    {
      id: '1',
      date: '2024-02-15',
      description: 'Client Payment - TechCorp Solutions',
      amount: '$450,000',
      type: 'income',
      category: 'Sales Revenue',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-02-14',
      description: 'Payroll Processing',
      amount: '$850,000',
      type: 'expense',
      category: 'Payroll',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-02-13',
      description: 'Software License Renewal',
      amount: '$125,000',
      type: 'expense',
      category: 'Software',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-02-12',
      description: 'Investment Return - Venture Fund',
      amount: '$180,000',
      type: 'income',
      category: 'Investments',
      status: 'completed'
    },
    {
      id: '5',
      date: '2024-02-11',
      description: 'Office Rent Payment',
      amount: '$100,000',
      type: 'expense',
      category: 'Real Estate',
      status: 'completed'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'ceo') {
      setIsAuthenticated(true)
      setUserRole('ceo')
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

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

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
        title="CEO Financial Overview - Annita"
        description="CEO financial metrics and company performance"
        keywords={['ceo', 'financial', 'metrics', 'performance']}
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
                  onClick={() => router.push('/staff/ceo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Financial Overview</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="week">This Week</option>
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(metric.change)}%</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-xs text-gray-400 mt-1">{metric.period}</p>
              </div>
            ))}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{transaction.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{transaction.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{transaction.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-sm font-medium text-right ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {/* Budget Management Section */}
          <div className="mt-8">
            <BudgetManagement userRole="ceo" />
          </div>
        </main>
      </div>
    </>
  )
}
