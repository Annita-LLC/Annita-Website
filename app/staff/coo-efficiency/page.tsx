'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, TrendingUp, TrendingDown, Target, Clock, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import EfficiencyTracking from '@/components/staff/EfficiencyTracking'

interface COOEfficiencyMetric {
  id: string
  name: string
  category: 'productivity' | 'quality' | 'cost' | 'time'
  currentValue: string
  targetValue: string
  change: number
  changeType: 'increase' | 'decrease'
  status: 'on-track' | 'warning' | 'critical'
  lastUpdated: string
}

export default function COOEfficiencyPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [timeRange, setTimeRange] = useState('month')

  const [metrics, setMetrics] = useState<COOEfficiencyMetric[]>([
    {
      id: 'EFF-001',
      name: 'Production Output',
      category: 'productivity',
      currentValue: '12,500 units',
      targetValue: '15,000 units',
      change: 8.5,
      changeType: 'increase',
      status: 'on-track',
      lastUpdated: '2024-02-15'
    },
    {
      id: 'EFF-002',
      name: 'Quality Defect Rate',
      category: 'quality',
      currentValue: '2.3%',
      targetValue: '2.0%',
      change: -0.5,
      changeType: 'decrease',
      status: 'on-track',
      lastUpdated: '2024-02-14'
    },
    {
      id: 'EFF-003',
      name: 'Operating Costs',
      category: 'cost',
      currentValue: '$850,000',
      targetValue: '$800,000',
      change: 5.2,
      changeType: 'increase',
      status: 'warning',
      lastUpdated: '2024-02-13'
    },
    {
      id: 'EFF-004',
      name: 'Order Fulfillment Time',
      category: 'time',
      currentValue: '2.8 days',
      targetValue: '2.5 days',
      change: -0.3,
      changeType: 'decrease',
      status: 'on-track',
      lastUpdated: '2024-02-12'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'coo') {
      setIsAuthenticated(true)
      setUserRole('coo')
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
        title="COO Efficiency Metrics - Annita"
        description="COO efficiency metrics and operational performance"
        keywords={['coo', 'efficiency', 'metrics', 'performance', 'operations']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/coo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Efficiency Metrics</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
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
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.currentValue}</p>
                <p className="text-sm text-gray-500 mb-2">Target: {metric.targetValue}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  metric.status === 'on-track' ? 'bg-green-100 text-green-700' :
                  metric.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {metric.status}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Trends</h2>
            <div className="space-y-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                      <p className="text-sm text-gray-600">{metric.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{metric.currentValue}</p>
                      <p className="text-sm text-gray-500">Target: {metric.targetValue}</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metric.status === 'on-track' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <span>Last updated: {metric.lastUpdated}</span>
                    <span className={`font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'increase' ? '+' : '-'}{Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency Tracking Section */}
          <div className="mt-8">
            <EfficiencyTracking />
          </div>
        </main>
      </div>
    </>
  )
}
