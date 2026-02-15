'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, AlertCircle, CheckCircle, Clock, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import CompliancePolicies from '@/components/staff/CompliancePolicies'

interface COOComplianceItem {
  id: string
  title: string
  type: 'safety' | 'environmental' | 'operational' | 'regulatory' | 'quality'
  status: 'compliant' | 'non-compliant' | 'pending' | 'overdue'
  dueDate: string
  lastReviewed: string
  assignedTo: string
  department: string
  risk: 'low' | 'medium' | 'high' | 'critical'
  description: string
  documents: number
  nextAudit: string
}

export default function COOCompliancePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')

  const [complianceItems, setComplianceItems] = useState<COOComplianceItem[]>([
    {
      id: 'COMP-001',
      title: 'OSHA Safety Standards',
      type: 'safety',
      status: 'compliant',
      dueDate: '2024-03-31',
      lastReviewed: '2024-02-15',
      assignedTo: 'John Smith',
      department: 'Operations',
      risk: 'high',
      description: 'Occupational Safety and Health Administration compliance for all facilities',
      documents: 12,
      nextAudit: '2024-03-15'
    },
    {
      id: 'COMP-002',
      title: 'Environmental Impact Assessment',
      type: 'environmental',
      status: 'pending',
      dueDate: '2024-02-28',
      lastReviewed: '2024-02-01',
      assignedTo: 'Sarah Chen',
      department: 'Manufacturing',
      risk: 'medium',
      description: 'Environmental compliance and sustainability reporting',
      documents: 8,
      nextAudit: '2024-02-25'
    },
    {
      id: 'COMP-003',
      title: 'ISO 9001 Quality Management',
      type: 'quality',
      status: 'compliant',
      dueDate: '2024-04-15',
      lastReviewed: '2024-02-10',
      assignedTo: 'Mike Johnson',
      department: 'Quality Control',
      risk: 'high',
      description: 'ISO 9001 quality management system certification and maintenance',
      documents: 25,
      nextAudit: '2024-04-01'
    },
    {
      id: 'COMP-004',
      title: 'Equipment Safety Certification',
      type: 'operational',
      status: 'non-compliant',
      dueDate: '2024-02-15',
      lastReviewed: '2024-02-01',
      assignedTo: 'Emily Davis',
      department: 'Maintenance',
      risk: 'critical',
      description: 'Annual safety certification for all manufacturing equipment',
      documents: 6,
      nextAudit: '2024-02-20'
    },
    {
      id: 'COMP-005',
      title: 'FDA Regulatory Compliance',
      type: 'regulatory',
      status: 'compliant',
      dueDate: '2024-06-30',
      lastReviewed: '2024-02-05',
      assignedTo: 'Alex Thompson',
      department: 'Regulatory Affairs',
      risk: 'critical',
      description: 'Food and Drug Administration compliance for product manufacturing',
      documents: 15,
      nextAudit: '2024-06-15'
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

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesRisk = filterRisk === 'all' || item.risk === filterRisk
    
    return matchesSearch && matchesType && matchesStatus && matchesRisk
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-700'
      case 'non-compliant': return 'bg-red-100 text-red-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'safety': return 'bg-blue-100 text-blue-700'
      case 'environmental': return 'bg-green-100 text-green-700'
      case 'operational': return 'bg-purple-100 text-purple-700'
      case 'regulatory': return 'bg-orange-100 text-orange-700'
      case 'quality': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'high': return 'bg-orange-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const complianceTypes = Array.from(new Set(complianceItems.map(item => item.type)))

  const compliantCount = complianceItems.filter(i => i.status === 'compliant').length
  const nonCompliantCount = complianceItems.filter(i => i.status === 'non-compliant').length
  const pendingCount = complianceItems.filter(i => i.status === 'pending').length
  const overdueCount = complianceItems.filter(i => i.status === 'overdue').length

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
        title="COO Operations Compliance - Annita"
        description="COO operations compliance and regulatory management"
        keywords={['coo', 'compliance', 'regulatory', 'safety', 'operations']}
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
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Operations Compliance</h1>
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
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Compliant</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{compliantCount}</p>
              <p className="text-sm text-gray-500">Items compliant</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Non-Compliant</h3>
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{nonCompliantCount}</p>
              <p className="text-sm text-gray-500">Requires action</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-500">In progress</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Overdue</h3>
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
              <p className="text-sm text-gray-500">Immediate attention</p>
            </div>
          </div>

          {/* Compliance Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Compliance Items</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search compliance items..."
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
                  {complianceTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                  <option value="critical">Critical Risk</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
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
                    <div className="flex items-start space-x-4">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getRiskColor(item.risk)}`}></div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type.charAt(0).toUpperCase() + item.type}
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getRiskColor(item.risk)}`}></div>
                            <span className="text-xs text-gray-500">{item.risk} risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">{item.documents}</div>
                      <div className="text-gray-400">📄</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Assigned To</p>
                      <p className="text-sm font-medium text-gray-900">{item.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-sm text-gray-900">{item.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className={`text-sm font-medium ${
                        new Date(item.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.dueDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Audit</p>
                      <p className="text-sm text-gray-900">{item.nextAudit}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {item.status === 'overdue' && '⚠️ Overdue - Immediate attention required'}
                      {item.status === 'non-compliant' && '⚠️ Non-compliant - Action required'}
                      {item.status === 'pending' && '⏳ In progress'}
                      {item.status === 'compliant' && '✅ Compliant'}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No compliance items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Compliance Policies Section */}
          <div className="mt-8">
            <CompliancePolicies userRole="coo" />
          </div>
        </main>
      </div>
    </>
  )
}
