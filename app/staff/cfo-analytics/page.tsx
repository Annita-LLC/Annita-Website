'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Download, Calendar, Filter, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import ReportsAnalytics from '@/components/staff/ReportsAnalytics'

interface CFOAnalyticsMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface FinancialTrend {
  month: string
  revenue: number
  expenses: number
  profit: number
}

export default function CFOAnalyticsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [timeRange, setTimeRange] = useState('quarter')
  const [chartType, setChartType] = useState('revenue')

  const [metrics, setMetrics] = useState<CFOAnalyticsMetric[]>([
    {
      id: '1',
      title: 'Revenue Growth',
      value: '23.5%',
      change: 5.2,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Profit Margin',
      value: '18.2%',
      change: -2.1,
      changeType: 'decrease',
      period: 'vs last quarter',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Operating Efficiency',
      value: '87.3%',
      change: 3.8,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <Activity className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Cost Reduction',
      value: '$1.2M',
      change: 12.5,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <TrendingDown className="w-6 h-6" />
    }
  ])

  const [financialTrends, setFinancialTrends] = useState<FinancialTrend[]>([
    { month: 'Jan', revenue: 2800000, expenses: 2200000, profit: 600000 },
    { month: 'Feb', revenue: 3200000, expenses: 2400000, profit: 800000 },
    { month: 'Mar', revenue: 3500000, expenses: 2600000, profit: 900000 },
    { month: 'Apr', revenue: 3300000, expenses: 2500000, profit: 800000 },
    { month: 'May', revenue: 3700000, expenses: 2700000, profit: 1000000 },
    { month: 'Jun', revenue: 4100000, expenses: 2900000, profit: 1200000 }
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

  const getChartData = () => {
    switch (chartType) {
      case 'revenue':
        return financialTrends.map(trend => trend.revenue)
      case 'expenses':
        return financialTrends.map(trend => trend.expenses)
      case 'profit':
        return financialTrends.map(trend => trend.profit)
      default:
        return financialTrends.map(trend => trend.revenue)
    }
  }

  const getChartColor = () => {
    switch (chartType) {
      case 'revenue': return 'bg-green-500'
      case 'expenses': return 'bg-red-500'
      case 'profit': return 'bg-blue-500'
      default: return 'bg-green-500'
    }
  }

  const maxValue = Math.max(...getChartData())
  const chartData = getChartData()

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
        title="CFO Financial Analytics - Annita"
        description="CFO financial analytics and performance metrics"
        keywords={['cfo', 'analytics', 'financial', 'metrics', 'performance']}
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
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Financial Analytics</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
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

          {/* Financial Trends Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Financial Trends</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="revenue">Revenue</option>
                  <option value="expenses">Expenses</option>
                  <option value="profit">Profit</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="space-y-4">
              <div className="flex items-end justify-between h-64 space-x-2">
                {financialTrends.map((trend, index) => (
                  <div key={trend.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">
                        ${(chartData[index] / 1000000).toFixed(1)}M
                      </div>
                      <div
                        className={`w-full ${getChartColor()} rounded-t transition-all duration-300`}
                        style={{ height: `${(chartData[index] / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{trend.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 ${getChartColor()} rounded`}></div>
                <span className="text-sm text-gray-600 capitalize">{chartType}</span>
              </div>
              <div className="text-sm text-gray-500">
                Total: ${(chartData.reduce((sum, val) => sum + val, 0) / 1000000).toFixed(1)}M
              </div>
            </div>
          </div>

          {/* Department Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h2>
              <div className="space-y-4">
                {[
                  { name: 'Marketing & Sales', budget: '$2.5M', spent: '$2.1M', percentage: 84 },
                  { name: 'IT & Technology', budget: '$1.8M', spent: '$1.6M', percentage: 89 },
                  { name: 'Operations', budget: '$2.2M', spent: '$1.9M', percentage: 86 },
                  { name: 'Human Resources', budget: '$1.2M', spent: '$950K', percentage: 79 },
                  { name: 'Finance & Accounting', budget: '$800K', spent: '$720K', percentage: 90 }
                ].map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                        <span className="text-sm text-gray-500">{dept.spent} / {dept.budget}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            dept.percentage <= 75 ? 'bg-green-500' :
                            dept.percentage <= 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-900 w-12 text-right">
                      {dept.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h2>
              <div className="space-y-4">
                {[
                  { category: 'Payroll', amount: '$8.5M', percentage: 45, color: 'bg-blue-500' },
                  { category: 'Operations', amount: '$4.2M', percentage: 22, color: 'bg-green-500' },
                  { category: 'Marketing', amount: '$2.8M', percentage: 15, color: 'bg-purple-500' },
                  { category: 'Technology', amount: '$2.1M', percentage: 11, color: 'bg-orange-500' },
                  { category: 'Other', amount: '$1.4M', percentage: 7, color: 'bg-gray-500' }
                ].map((cat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${cat.color} rounded`}></div>
                      <span className="text-sm font-medium text-gray-900">{cat.category}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{cat.amount}</span>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports Analytics Section */}
          <div className="mt-8">
            <ReportsAnalytics userRole="cfo" />
          </div>
        </main>
      </div>
    </>
  )
}
