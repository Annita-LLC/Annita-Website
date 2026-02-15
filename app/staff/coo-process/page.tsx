'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Target, Workflow, Clock, TrendingUp, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import ProcessManagement from '@/components/staff/ProcessManagement'

interface COOProcess {
  id: string
  name: string
  type: 'manufacturing' | 'logistics' | 'quality' | 'administrative' | 'customer-service'
  status: 'active' | 'optimizing' | 'deprecated' | 'new'
  efficiency: number
  cycleTime: string
  cost: string
  description: string
  owner: string
  lastOptimized: string
  kpis: string[]
  bottlenecks: string[]
}

export default function COOProcessPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [processes, setProcesses] = useState<COOProcess[]>([
    {
      id: 'PRC-001',
      name: 'Order Fulfillment Process',
      type: 'logistics',
      status: 'active',
      efficiency: 87,
      cycleTime: '2.8 days',
      cost: '$45 per order',
      description: 'End-to-end order processing from receipt to delivery',
      owner: 'John Smith',
      lastOptimized: '2024-01-15',
      kpis: ['Order Accuracy', 'Delivery Time', 'Customer Satisfaction'],
      bottlenecks: ['Warehouse Capacity', 'Shipping Delays']
    },
    {
      id: 'PRC-002',
      name: 'Quality Control Inspection',
      type: 'quality',
      status: 'optimizing',
      efficiency: 92,
      cycleTime: '4 hours',
      cost: '$12 per inspection',
      description: 'Product quality inspection and certification process',
      owner: 'Sarah Chen',
      lastOptimized: '2024-02-01',
      kpis: ['Defect Rate', 'Inspection Time', 'Cost per Unit'],
      bottlenecks: ['Equipment Maintenance', 'Staff Training']
    },
    {
      id: 'PRC-003',
      name: 'Inventory Management',
      type: 'manufacturing',
      status: 'active',
      efficiency: 78,
      cycleTime: '24 hours',
      cost: '$8,500 monthly',
      description: 'Inventory tracking, replenishment, and optimization',
      owner: 'Mike Johnson',
      lastOptimized: '2023-12-10',
      kpis: ['Turnover Rate', 'Stock Accuracy', 'Carrying Costs'],
      bottlenecks: ['System Integration', 'Forecast Accuracy']
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

  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || process.type === filterType
    const matchesStatus = filterStatus === 'all' || process.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'optimizing': return 'bg-yellow-100 text-yellow-700'
      case 'deprecated': return 'bg-red-100 text-red-700'
      case 'new': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600'
    if (efficiency >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const processTypes = Array.from(new Set(processes.map(process => process.type)))

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
        title="COO Process Management - Annita"
        description="COO process management and operational workflows"
        keywords={['coo', 'process', 'management', 'workflows', 'operations']}
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
                    <Workflow className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Process Management</h1>
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Operational Processes</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search processes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  {processTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="optimizing">Optimizing</option>
                  <option value="deprecated">Deprecated</option>
                  <option value="new">New</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredProcesses.map((process) => (
                <div key={process.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{process.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{process.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                          {process.status}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {process.type.charAt(0).toUpperCase() + process.type.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getEfficiencyColor(process.efficiency)}`}>
                        {process.efficiency}%
                      </p>
                      <p className="text-sm text-gray-500">Efficiency</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Cycle Time</p>
                      <p className="text-sm font-medium text-gray-900">{process.cycleTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cost</p>
                      <p className="text-sm font-medium text-gray-900">{process.cost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Owner</p>
                      <p className="text-sm text-gray-900">{process.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Optimized</p>
                      <p className="text-sm text-gray-900">{process.lastOptimized}</p>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Performance Indicators</h4>
                    <div className="flex flex-wrap gap-2">
                      {process.kpis.map((kpi, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {kpi}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottlenecks */}
                  {process.bottlenecks.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Identified Bottlenecks</h4>
                      <div className="flex flex-wrap gap-2">
                        {process.bottlenecks.map((bottleneck, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                            {bottleneck}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Efficiency Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Process Efficiency</span>
                      <span className="text-sm text-gray-900">{process.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          process.efficiency >= 90 ? 'bg-green-500' :
                          process.efficiency >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${process.efficiency}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Process ID: {process.id}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProcesses.length === 0 && (
              <div className="text-center py-12">
                <Workflow className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No processes found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Process Management Section */}
          <div className="mt-8">
            <ProcessManagement />
          </div>
        </main>
      </div>
    </>
  )
}
