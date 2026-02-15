'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import QualityControl from '@/components/staff/QualityControl'

interface COOQualityMetric {
  id: string
  name: string
  category: 'product' | 'process' | 'service' | 'compliance'
  currentValue: string
  targetValue: string
  change: number
  changeType: 'increase' | 'decrease'
  status: 'excellent' | 'good' | 'warning' | 'critical'
  lastUpdated: string
  description: string
}

interface COOQualityIssue {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  reportedDate: string
  resolvedDate?: string
  department: string
  description: string
  impact: string
  resolution?: string
}

export default function COOQualityPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [qualityMetrics, setQualityMetrics] = useState<COOQualityMetric[]>([
    {
      id: 'QLT-001',
      name: 'Product Defect Rate',
      category: 'product',
      currentValue: '2.3%',
      targetValue: '2.0%',
      change: -0.5,
      changeType: 'decrease',
      status: 'good',
      lastUpdated: '2024-02-15',
      description: 'Percentage of products failing quality inspection'
    },
    {
      id: 'QLT-002',
      name: 'Customer Satisfaction',
      category: 'service',
      currentValue: '4.6/5',
      targetValue: '4.5/5',
      change: 0.2,
      changeType: 'increase',
      status: 'excellent',
      lastUpdated: '2024-02-14',
      description: 'Average customer satisfaction score'
    },
    {
      id: 'QLT-003',
      name: 'Process Efficiency',
      category: 'process',
      currentValue: '87%',
      targetValue: '90%',
      change: -3.0,
      changeType: 'decrease',
      status: 'warning',
      lastUpdated: '2024-02-13',
      description: 'Overall process efficiency across operations'
    },
    {
      id: 'QLT-004',
      name: 'Compliance Score',
      category: 'compliance',
      currentValue: '96%',
      targetValue: '95%',
      change: 1.0,
      changeType: 'increase',
      status: 'excellent',
      lastUpdated: '2024-02-12',
      description: 'Regulatory and internal compliance adherence'
    }
  ])

  const [qualityIssues, setQualityIssues] = useState<COOQualityIssue[]>([
    {
      id: 'ISS-001',
      title: 'Packaging Damage in Shipments',
      severity: 'medium',
      status: 'in-progress',
      reportedDate: '2024-02-10',
      department: 'Logistics',
      description: 'Increased reports of damaged packaging during shipping',
      impact: 'Customer complaints and returns increased by 15%',
      resolution: 'Implementing new packaging standards and quality checks'
    },
    {
      id: 'ISS-002',
      title: 'Component Quality Variation',
      severity: 'high',
      status: 'open',
      reportedDate: '2024-02-08',
      department: 'Manufacturing',
      description: 'Inconsistent quality in electronic components from supplier',
      impact: 'Production delays and increased rework costs',
      resolution: undefined
    },
    {
      id: 'ISS-003',
      title: 'Service Response Time',
      severity: 'low',
      status: 'resolved',
      reportedDate: '2024-02-05',
      resolvedDate: '2024-02-09',
      department: 'Customer Support',
      description: 'Slow response times to customer inquiries',
      impact: 'Minor customer dissatisfaction',
      resolution: 'Hired additional support staff and implemented new ticketing system'
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

  const filteredIssues = qualityIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700'
      case 'good': return 'bg-blue-100 text-blue-700'
      case 'warning': return 'bg-yellow-100 text-yellow-700'
      case 'critical': return 'bg-red-100 text-red-700'
      case 'open': return 'bg-red-100 text-red-700'
      case 'in-progress': return 'bg-yellow-100 text-yellow-700'
      case 'resolved': return 'bg-green-100 text-green-700'
      case 'closed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'high': return 'bg-orange-100 text-orange-700'
      case 'critical': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'bg-purple-100 text-purple-700'
      case 'process': return 'bg-blue-100 text-blue-700'
      case 'service': return 'bg-green-100 text-green-700'
      case 'compliance': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
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
        title="COO Quality Control - Annita"
        description="COO quality control and assurance management"
        keywords={['coo', 'quality', 'control', 'assurance', 'metrics']}
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
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Quality Control</h1>
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

        <main className="container mx-auto px-4 py-8">
          {/* Quality Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {qualityMetrics.map((metric) => (
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
                    <span>{Math.abs(metric.change)}</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.currentValue}</p>
                <p className="text-sm text-gray-500 mb-2">Target: {metric.targetValue}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
            ))}
          </div>

          {/* Quality Issues */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Quality Issues</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{issue.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">{issue.department}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Reported</p>
                      <p className="text-sm font-medium text-gray-900">{issue.reportedDate}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Impact</h4>
                    <p className="text-sm text-gray-600">{issue.impact}</p>
                  </div>

                  {issue.resolution && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Resolution</h4>
                      <p className="text-sm text-gray-600">{issue.resolution}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Issue ID: {issue.id}
                      {issue.resolvedDate && ` • Resolved: ${issue.resolvedDate}`}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredIssues.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No quality issues found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Quality Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quality Performance Trends</h2>
            <div className="space-y-4">
              {qualityMetrics.map((metric) => (
                <div key={metric.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                      <p className="text-sm text-gray-600">{metric.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{metric.currentValue}</p>
                      <p className="text-sm text-gray-500">Target: {metric.targetValue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(metric.category)}`}>
                      {metric.category.charAt(0).toUpperCase() + metric.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'increase' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{Math.abs(metric.change)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Last updated: {metric.lastUpdated}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View History
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Control Section */}
          <div className="mt-8">
            <QualityControl />
          </div>
        </main>
      </div>
    </>
  )
}
