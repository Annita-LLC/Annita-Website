'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, DollarSign, FileText, Calendar, Bell, LogOut, Menu, X, BarChart3, Target, Briefcase, Clock, CheckCircle, AlertCircle, TrendingUp, Download, TrendingDown, Search } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import RestrictedDashboard from '@/components/staff/RestrictedDashboard'
import PerformanceReviews from '@/components/staff/PerformanceReviews'
import PerformanceReviewSystem from '@/components/staff/PerformanceReviewSystem'

interface ManagerAnalyticsMetric {
  id: string
  name: string
  category: 'performance' | 'productivity' | 'engagement' | 'quality' | 'growth'
  currentValue: number
  targetValue: number
  unit: string
  change: number
  changeType: 'increase' | 'decrease'
  status: 'on-track' | 'warning' | 'critical'
  lastUpdated: string
}

interface TeamMemberPerformance {
  id: string
  name: string
  position: string
  department: string
  performance: number
  productivity: number
  engagement: number
  quality: number
  goalsCompleted: number
  goalsTotal: number
  lastReview: string
}

export default function ManagerAnalyticsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [timeRange, setTimeRange] = useState('month')
  const [filterCategory, setFilterCategory] = useState('all')

  const [metrics, setMetrics] = useState<ManagerAnalyticsMetric[]>([
    {
      id: 'MET-001',
      name: 'Team Productivity Score',
      category: 'productivity',
      currentValue: 87,
      targetValue: 85,
      unit: '%',
      change: 5.2,
      changeType: 'increase',
      status: 'on-track',
      lastUpdated: '2024-02-15'
    },
    {
      id: 'MET-002',
      name: 'Goal Completion Rate',
      category: 'performance',
      currentValue: 78,
      targetValue: 80,
      unit: '%',
      change: -2.1,
      changeType: 'decrease',
      status: 'warning',
      lastUpdated: '2024-02-14'
    },
    {
      id: 'MET-003',
      name: 'Team Engagement Score',
      category: 'engagement',
      currentValue: 92,
      targetValue: 90,
      unit: '%',
      change: 3.8,
      changeType: 'increase',
      status: 'on-track',
      lastUpdated: '2024-02-13'
    },
    {
      id: 'MET-004',
      name: 'Quality Score',
      category: 'quality',
      currentValue: 94,
      targetValue: 95,
      unit: '%',
      change: 1.5,
      changeType: 'increase',
      status: 'on-track',
      lastUpdated: '2024-02-12'
    },
    {
      id: 'MET-005',
      name: 'Project Delivery Rate',
      category: 'performance',
      currentValue: 85,
      targetValue: 90,
      unit: '%',
      change: -5.3,
      changeType: 'decrease',
      status: 'warning',
      lastUpdated: '2024-02-11'
    },
    {
      id: 'MET-006',
      name: 'Team Growth Rate',
      category: 'growth',
      currentValue: 12,
      targetValue: 15,
      unit: '%',
      change: 2.1,
      changeType: 'increase',
      status: 'on-track',
      lastUpdated: '2024-02-10'
    }
  ])

  const [teamPerformance, setTeamPerformance] = useState<TeamMemberPerformance[]>([
    {
      id: 'TMP-001',
      name: 'John Smith',
      position: 'Senior Developer',
      department: 'Engineering',
      performance: 92,
      productivity: 88,
      engagement: 95,
      quality: 90,
      goalsCompleted: 4,
      goalsTotal: 5,
      lastReview: '2024-02-15'
    },
    {
      id: 'TMP-002',
      name: 'Sarah Chen',
      position: 'UX Designer',
      department: 'Design',
      performance: 88,
      productivity: 85,
      engagement: 92,
      quality: 94,
      goalsCompleted: 3,
      goalsTotal: 4,
      lastReview: '2024-02-10'
    },
    {
      id: 'TMP-003',
      name: 'Mike Johnson',
      position: 'Marketing Specialist',
      department: 'Marketing',
      performance: 85,
      productivity: 82,
      engagement: 88,
      quality: 87,
      goalsCompleted: 2,
      goalsTotal: 3,
      lastReview: '2024-02-08'
    },
    {
      id: 'TMP-004',
      name: 'Emily Davis',
      position: 'Junior Developer',
      department: 'Engineering',
      performance: 78,
      productivity: 75,
      engagement: 85,
      quality: 80,
      goalsCompleted: 2,
      goalsTotal: 3,
      lastReview: '2024-02-05'
    },
    {
      id: 'TMP-005',
      name: 'Alex Thompson',
      position: 'Data Analyst',
      department: 'Analytics',
      performance: 90,
      productivity: 92,
      engagement: 88,
      quality: 89,
      goalsCompleted: 3,
      goalsTotal: 3,
      lastReview: '2024-02-12'
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

  const filteredMetrics = metrics.filter(metric => {
    const matchesCategory = filterCategory === 'all' || metric.category === filterCategory
    return matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-700'
      case 'warning': return 'bg-yellow-100 text-yellow-700'
      case 'critical': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-700'
      case 'productivity': return 'bg-green-100 text-green-700'
      case 'engagement': return 'bg-purple-100 text-purple-700'
      case 'quality': return 'bg-orange-100 text-orange-700'
      case 'growth': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const categories = Array.from(new Set(metrics.map(metric => metric.category)))

  const avgPerformance = teamPerformance.reduce((sum, member) => sum + member.performance, 0) / teamPerformance.length
  const avgProductivity = teamPerformance.reduce((sum, member) => sum + member.productivity, 0) / teamPerformance.length
  const avgEngagement = teamPerformance.reduce((sum, member) => sum + member.engagement, 0) / teamPerformance.length
  const avgQuality = teamPerformance.reduce((sum, member) => sum + member.quality, 0) / teamPerformance.length

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
        title="Manager Team Analytics - Annita"
        description="Manager team analytics and performance metrics"
        keywords={['manager', 'analytics', 'performance', 'metrics', 'team']}
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
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Team Analytics</h1>
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
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Performance</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className={`text-2xl font-bold ${getScoreColor(avgPerformance)}`}>
                {avgPerformance.toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">Team average</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Productivity</h3>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className={`text-2xl font-bold ${getScoreColor(avgProductivity)}`}>
                {avgProductivity.toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">Team average</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Engagement</h3>
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <p className={`text-2xl font-bold ${getScoreColor(avgEngagement)}`}>
                {avgEngagement.toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">Team average</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Quality</h3>
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <p className={`text-2xl font-bold ${getScoreColor(avgQuality)}`}>
                {avgQuality.toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">Team average</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMetrics.map((metric) => (
                <div key={metric.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.name}</h3>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                          {metric.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(metric.category)}`}>
                          {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{metric.currentValue}{metric.unit}</p>
                      <p className="text-sm text-gray-500">Current</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Target</p>
                      <p className="text-sm font-medium text-gray-900">{metric.targetValue}{metric.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Change</p>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.changeType === 'increase' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{Math.abs(metric.change)}{metric.unit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress to Target</span>
                      <span className="text-sm text-gray-900">
                        {Math.round((metric.currentValue / metric.targetValue) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (metric.currentValue / metric.targetValue) >= 1 ? 'bg-green-500' :
                          (metric.currentValue / metric.targetValue) >= 0.9 ? 'bg-blue-500' :
                          (metric.currentValue / metric.targetValue) >= 0.75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((metric.currentValue / metric.targetValue) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last updated: {metric.lastUpdated}
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Team Performance</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search team members..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {teamPerformance.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{member.position} • {member.department}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getScoreColor(member.performance)}`}>
                        {member.performance}
                      </p>
                      <p className="text-sm text-gray-500">Performance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Productivity</p>
                      <p className={`text-sm font-medium ${getScoreColor(member.productivity)}`}>
                        {member.productivity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Engagement</p>
                      <p className={`text-sm font-medium ${getScoreColor(member.engagement)}`}>
                        {member.engagement}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quality</p>
                      <p className={`text-sm font-medium ${getScoreColor(member.quality)}`}>
                        {member.quality}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Goals</p>
                      <p className="text-sm font-medium text-gray-900">
                        {member.goalsCompleted}/{member.goalsTotal}
                      </p>
                    </div>
                  </div>

                  {/* Performance Bars */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Performance</span>
                        <span className="text-xs text-gray-900">{member.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${getScoreColor(member.performance)}`}
                          style={{ width: `${member.performance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Productivity</span>
                        <span className="text-xs text-gray-900">{member.productivity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${getScoreColor(member.productivity)}`}
                          style={{ width: `${member.productivity}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Engagement</span>
                        <span className="text-xs text-gray-900">{member.engagement}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${getScoreColor(member.engagement)}`}
                          style={{ width: `${member.engagement}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Quality</span>
                        <span className="text-xs text-gray-900">{member.quality}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${getScoreColor(member.quality)}`}
                          style={{ width: `${member.quality}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Goal Progress */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Goal Completion</span>
                      <span className="text-sm text-gray-900">
                        {Math.round((member.goalsCompleted / member.goalsTotal) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (member.goalsCompleted / member.goalsTotal) >= 0.75 ? 'bg-green-500' :
                          (member.goalsCompleted / member.goalsTotal) >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(member.goalsCompleted / member.goalsTotal) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last review: {member.lastReview}
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Reviews Section */}
          <div className="mt-8">
            <PerformanceReviews />
          </div>

          {/* Performance Review System Section */}
          <div className="mt-8">
            <PerformanceReviewSystem userRole="manager" />
          </div>
        </main>
      </div>
    </>
  )
}
