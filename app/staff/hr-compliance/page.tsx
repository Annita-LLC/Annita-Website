'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, AlertCircle, CheckCircle, Clock, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

interface HRComplianceItem {
  id: string
  title: string
  category: 'labor-law' | 'safety' | 'privacy' | 'discrimination' | 'wages' | 'benefits'
  type: 'policy' | 'training' | 'documentation' | 'audit' | 'certification'
  status: 'compliant' | 'non-compliant' | 'pending' | 'overdue' | 'in-review'
  dueDate: string
  lastReviewed: string
  assignedTo: string
  department: string
  risk: 'low' | 'medium' | 'high' | 'critical'
  description: string
  requirements: string[]
  documents: number
  nextAudit: string
}

export default function HRCompliancePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')

  const [complianceItems, setComplianceItems] = useState<HRComplianceItem[]>([
    {
      id: 'COMP-001',
      title: 'OSHA Workplace Safety Compliance',
      category: 'safety',
      type: 'audit',
      status: 'compliant',
      dueDate: '2024-03-31',
      lastReviewed: '2024-02-15',
      assignedTo: 'Emily Davis',
      department: 'Human Resources',
      risk: 'high',
      description: 'Annual OSHA compliance audit and workplace safety assessment',
      requirements: ['Safety training records', 'Incident reports', 'Safety inspections', 'Emergency procedures'],
      documents: 12,
      nextAudit: '2024-03-15'
    },
    {
      id: 'COMP-002',
      title: 'EEO-1 Report Filing',
      category: 'discrimination',
      type: 'documentation',
      status: 'pending',
      dueDate: '2024-03-31',
      lastReviewed: '2024-02-01',
      assignedTo: 'Sarah Chen',
      department: 'Human Resources',
      risk: 'high',
      description: 'Annual EEO-1 report for equal employment opportunity compliance',
      requirements: ['Workforce demographics', 'Job categories', 'Pay data analysis', 'EEO statements'],
      documents: 8,
      nextAudit: '2024-03-25'
    },
    {
      id: 'COMP-003',
      title: 'GDPR Data Privacy Compliance',
      category: 'privacy',
      type: 'policy',
      status: 'compliant',
      dueDate: '2024-06-30',
      lastReviewed: '2024-02-10',
      assignedTo: 'Mike Johnson',
      department: 'Legal',
      risk: 'critical',
      description: 'EU General Data Protection Regulation compliance and data handling procedures',
      requirements: ['Data processing agreements', 'Privacy policy', 'Consent records', 'Data breach procedures'],
      documents: 15,
      nextAudit: '2024-06-15'
    },
    {
      id: 'COMP-004',
      title: 'Fair Labor Standards Act (FLSA)',
      category: 'wages',
      type: 'audit',
      status: 'non-compliant',
      dueDate: '2024-02-28',
      lastReviewed: '2024-02-01',
      assignedTo: 'David Wilson',
      department: 'Payroll',
      risk: 'high',
      description: 'FLSA compliance for minimum wage, overtime, and recordkeeping',
      requirements: ['Time tracking records', 'Overtime calculations', 'Minimum wage compliance', 'Exemption classifications'],
      documents: 6,
      nextAudit: '2024-02-25'
    },
    {
      id: 'COMP-005',
      title: 'ACA Health Benefits Reporting',
      category: 'benefits',
      type: 'documentation',
      status: 'in-review',
      dueDate: '2024-02-15',
      lastReviewed: '2024-02-05',
      assignedTo: 'Lisa Wang',
      department: 'Benefits',
      risk: 'medium',
      description: 'Affordable Care Act reporting and benefits compliance',
      requirements: ['Form 1095-C', 'Benefits eligibility', 'Coverage reporting', 'Affordability analysis'],
      documents: 10,
      nextAudit: '2024-02-20'
    },
    {
      id: 'COMP-006',
      title: 'Harassment Prevention Training',
      category: 'labor-law',
      type: 'training',
      status: 'compliant',
      dueDate: '2024-04-30',
      lastReviewed: '2024-01-15',
      assignedTo: 'Emily Davis',
      department: 'Human Resources',
      risk: 'medium',
      description: 'Mandatory harassment prevention training for all employees',
      requirements: ['Training completion records', 'Policy acknowledgments', 'Incident reporting procedures', 'Investigation protocols'],
      documents: 5,
      nextAudit: '2024-04-15'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'hr') {
      setIsAuthenticated(true)
      setUserRole('hr')
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
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesRisk = filterRisk === 'all' || item.risk === filterRisk
    
    return matchesSearch && matchesCategory && matchesStatus && matchesRisk
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-700'
      case 'non-compliant': return 'bg-red-100 text-red-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      case 'in-review': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'labor-law': return 'bg-blue-100 text-blue-700'
      case 'safety': return 'bg-green-100 text-green-700'
      case 'privacy': return 'bg-purple-100 text-purple-700'
      case 'discrimination': return 'bg-orange-100 text-orange-700'
      case 'wages': return 'bg-pink-100 text-pink-700'
      case 'benefits': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'policy': return 'bg-blue-100 text-blue-700'
      case 'training': return 'bg-green-100 text-green-700'
      case 'documentation': return 'bg-purple-100 text-purple-700'
      case 'audit': return 'bg-orange-100 text-orange-700'
      case 'certification': return 'bg-pink-100 text-pink-700'
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

  const categories = Array.from(new Set(complianceItems.map(item => item.category)))

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
        title="HR Compliance Management - Annita"
        description="HR compliance management and regulatory adherence"
        keywords={['hr', 'compliance', 'regulatory', 'legal', 'audits']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/hr-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">HR Compliance</h1>
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
              <p className="text-sm text-gray-500">Require action</p>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="in-review">In Review</option>
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                            {item.category.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getRiskColor(item.risk)}`}></div>
                            <span className="text-xs text-gray-500">{item.risk} risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{item.documents}</span>
                      <span className="text-gray-400">📄</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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

                  {/* Requirements */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.requirements.map((requirement, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {requirement}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {item.status === 'overdue' && '⚠️ Overdue - Immediate attention required'}
                      {item.status === 'non-compliant' && '⚠️ Non-compliant - Action required'}
                      {item.status === 'pending' && '⏳ In progress'}
                      {item.status === 'in-review' && '🔍 Under review'}
                      {item.status === 'compliant' && '✅ Compliant'}
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
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
        </main>
      </div>
    </>
  )
}
