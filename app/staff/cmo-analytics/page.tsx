'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, TrendingUp, TrendingDown, Users, Eye, MousePointer, Target, Download, Calendar, Filter, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import ReportsAnalytics from '@/components/staff/ReportsAnalytics'

interface CMOAnalyticsMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface ChannelPerformance {
  channel: string
  impressions: number
  clicks: number
  conversions: number
  cost: number
  roi: number
}

export default function CMOAnalyticsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [timeRange, setTimeRange] = useState('month')
  const [chartType, setChartType] = useState('traffic')

  const [metrics, setMetrics] = useState<CMOAnalyticsMetric[]>([
    {
      id: '1',
      title: 'Total Traffic',
      value: '2.4M',
      change: 18.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Conversion Rate',
      value: '3.2%',
      change: 0.8,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Target className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Cost Per Acquisition',
      value: '$45.20',
      change: -5.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <TrendingDown className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Marketing ROI',
      value: '4.8x',
      change: 12.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ])

  const [channelPerformance, setChannelPerformance] = useState<ChannelPerformance[]>([
    {
      channel: 'Organic Search',
      impressions: 850000,
      clicks: 42500,
      conversions: 1275,
      cost: 0,
      roi: 8.5
    },
    {
      channel: 'Paid Search',
      impressions: 650000,
      clicks: 32500,
      conversions: 975,
      cost: 45000,
      roi: 3.2
    },
    {
      channel: 'Social Media',
      impressions: 520000,
      clicks: 26000,
      conversions: 520,
      cost: 28000,
      roi: 2.8
    },
    {
      channel: 'Email Marketing',
      impressions: 180000,
      clicks: 12600,
      conversions: 756,
      cost: 8000,
      roi: 6.3
    },
    {
      channel: 'Direct Traffic',
      impressions: 200000,
      clicks: 40000,
      conversions: 1200,
      cost: 0,
      roi: 12.0
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

  const getChartData = () => {
    switch (chartType) {
      case 'traffic':
        return channelPerformance.map(ch => ch.impressions)
      case 'clicks':
        return channelPerformance.map(ch => ch.clicks)
      case 'conversions':
        return channelPerformance.map(ch => ch.conversions)
      case 'cost':
        return channelPerformance.map(ch => ch.cost)
      default:
        return channelPerformance.map(ch => ch.impressions)
    }
  }

  const getChartColor = () => {
    switch (chartType) {
      case 'traffic': return 'bg-purple-500'
      case 'clicks': return 'bg-blue-500'
      case 'conversions': return 'bg-green-500'
      case 'cost': return 'bg-red-500'
      default: return 'bg-purple-500'
    }
  }

  const maxValue = Math.max(...getChartData().filter(v => v > 0))
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
        title="CMO Marketing Analytics - Annita"
        description="CMO marketing analytics and performance metrics"
        keywords={['cmo', 'analytics', 'marketing', 'performance', 'metrics']}
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
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Marketing Analytics</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
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

          {/* Channel Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Channel Performance</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="traffic">Traffic</option>
                  <option value="clicks">Clicks</option>
                  <option value="conversions">Conversions</option>
                  <option value="cost">Cost</option>
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
                {channelPerformance.map((channel, index) => (
                  <div key={channel.channel} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">
                        {chartType === 'cost' ? `$${(chartData[index] / 1000).toFixed(1)}K` : 
                         chartType === 'traffic' ? `${(chartData[index] / 1000).toFixed(0)}K` :
                         chartData[index].toLocaleString()}
                      </div>
                      <div
                        className={`w-full ${getChartColor()} rounded-t transition-all duration-300`}
                        style={{ height: `${chartData[index] > 0 ? (chartData[index] / maxValue) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">{channel.channel.split(' ')[0]}</div>
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
                Total: {chartType === 'cost' ? `$${(chartData.reduce((sum, val) => sum + val, 0) / 1000).toFixed(1)}K` : 
                        chartType === 'traffic' ? `${(chartData.reduce((sum, val) => sum + val, 0) / 1000).toFixed(0)}K` :
                        chartData.reduce((sum, val) => sum + val, 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Detailed Channel Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Channel Breakdown</h2>
              <div className="space-y-4">
                {channelPerformance.map((channel, index) => (
                  <div key={channel.channel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-purple-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-pink-500' :
                        index === 3 ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{channel.channel}</p>
                        <p className="text-xs text-gray-500">
                          {channel.impressions.toLocaleString()} impressions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{channel.roi}x ROI</p>
                      <p className="text-xs text-gray-500">
                        {channel.conversions} conversions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h2>
              <div className="space-y-4">
                {[
                  { stage: 'Impressions', value: 2400000, rate: 100, color: 'bg-purple-500' },
                  { stage: 'Clicks', value: 153600, rate: 6.4, color: 'bg-blue-500' },
                  { stage: 'Leads', value: 30720, rate: 20, color: 'bg-pink-500' },
                  { stage: 'Conversions', value: 4726, rate: 15.4, color: 'bg-green-500' }
                ].map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{stage.value.toLocaleString()}</span>
                        <span className="text-sm font-medium text-gray-900">{stage.rate}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${stage.color}`}
                        style={{ width: `${stage.rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports Analytics Section */}
          <div className="mt-8">
            <ReportsAnalytics userRole="cmo" />
          </div>
        </main>
      </div>
    </>
  )
}
