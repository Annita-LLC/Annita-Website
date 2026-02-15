'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Calendar, Clock, CheckCircle, AlertCircle, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

interface HRContract {
  id: string
  title: string
  type: 'employment' | 'independent-contractor' | 'consulting' | 'internship' | 'temporary'
  status: 'active' | 'expired' | 'pending' | 'terminated' | 'renewal-due'
  employeeName: string
  employeeId: string
  department: string
  position: string
  startDate: string
  endDate?: string
  renewalDate?: string
  salary: string
  terms: string
  signedDate: string
  lastModified: string
  documents: number
  manager: string
}

export default function HRContractsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const [contracts, setContracts] = useState<HRContract[]>([
    {
      id: 'CON-001',
      title: 'Full-Time Employment Agreement',
      type: 'employment',
      status: 'active',
      employeeName: 'John Smith',
      employeeId: 'E1001',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      startDate: '2020-03-15',
      endDate: '2025-03-15',
      renewalDate: '2025-02-15',
      salary: '$125,000',
      terms: 'Full-time, exempt position with comprehensive benefits',
      signedDate: '2020-03-10',
      lastModified: '2024-01-15',
      documents: 3,
      manager: 'Sarah Chen'
    },
    {
      id: 'CON-002',
      title: 'Independent Contractor Agreement',
      type: 'independent-contractor',
      status: 'active',
      employeeName: 'Jessica Martinez',
      employeeId: 'C1001',
      department: 'Marketing',
      position: 'Marketing Consultant',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      salary: '$8,000/month',
      terms: '6-month contract for marketing strategy consulting',
      signedDate: '2023-12-20',
      lastModified: '2024-01-01',
      documents: 2,
      manager: 'Emily Davis'
    },
    {
      id: 'CON-003',
      title: 'Internship Agreement',
      type: 'internship',
      status: 'expired',
      employeeName: 'Alex Kim',
      employeeId: 'I1001',
      department: 'Engineering',
      position: 'Software Engineering Intern',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      salary: '$20/hour',
      terms: '3-month paid internship with potential for full-time offer',
      signedDate: '2023-05-25',
      lastModified: '2023-08-31',
      documents: 2,
      manager: 'Sarah Chen'
    },
    {
      id: 'CON-004',
      title: 'Full-Time Employment Agreement',
      type: 'employment',
      status: 'renewal-due',
      employeeName: 'Sarah Chen',
      employeeId: 'E1002',
      department: 'Engineering',
      position: 'Engineering Manager',
      startDate: '2019-06-20',
      endDate: '2024-06-20',
      renewalDate: '2024-05-20',
      salary: '$165,000',
      terms: 'Full-time, exempt position with leadership responsibilities',
      signedDate: '2019-06-15',
      lastModified: '2024-01-20',
      documents: 4,
      manager: 'CTO'
    },
    {
      id: 'CON-005',
      title: 'Consulting Agreement',
      type: 'consulting',
      status: 'pending',
      employeeName: 'Michael Roberts',
      employeeId: 'C1002',
      department: 'Operations',
      position: 'Process Improvement Consultant',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      salary: '$12,000/month',
      terms: '3-month consulting engagement for operational efficiency',
      signedDate: '',
      lastModified: '2024-02-14',
      documents: 1,
      manager: 'COO'
    },
    {
      id: 'CON-006',
      title: 'Temporary Employment Agreement',
      type: 'temporary',
      status: 'terminated',
      employeeName: 'Lisa Wang',
      employeeId: 'T1001',
      department: 'Sales',
      position: 'Sales Support',
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      salary: '$45,000',
      terms: '3-month temporary position for holiday season support',
      signedDate: '2023-10-25',
      lastModified: '2024-01-31',
      documents: 2,
      manager: 'David Wilson'
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

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || contract.type === filterType
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || contract.department === filterDepartment
    
    return matchesSearch && matchesType && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'expired': return 'bg-gray-100 text-gray-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      case 'renewal-due': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'employment': return 'bg-blue-100 text-blue-700'
      case 'independent-contractor': return 'bg-purple-100 text-purple-700'
      case 'consulting': return 'bg-green-100 text-green-700'
      case 'internship': return 'bg-pink-100 text-pink-700'
      case 'temporary': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const contractTypes = Array.from(new Set(contracts.map(contract => contract.type)))
  const departments = Array.from(new Set(contracts.map(contract => contract.department)))

  const activeCount = contracts.filter(c => c.status === 'active').length
  const renewalDueCount = contracts.filter(c => c.status === 'renewal-due').length
  const pendingCount = contracts.filter(c => c.status === 'pending').length
  const expiredCount = contracts.filter(c => c.status === 'expired').length

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
        title="HR Contracts Management - Annita"
        description="HR contracts management and employee agreements"
        keywords={['hr', 'contracts', 'agreements', 'employment', 'legal']}
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
                    <h1 className="text-xl font-bold text-gray-900">Contracts Management</h1>
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
          {/* Contracts Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              <p className="text-sm text-gray-500">Currently active</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Renewal Due</h3>
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{renewalDueCount}</p>
              <p className="text-sm text-gray-500">Require renewal</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-500">Awaiting signature</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Expired</h3>
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{expiredCount}</p>
              <p className="text-sm text-gray-500">No longer active</p>
            </div>
          </div>

          {/* Contracts List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Contracts</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search contracts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Types</option>
                  {contractTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="renewal-due">Renewal Due</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                  <option value="terminated">Terminated</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredContracts.map((contract) => (
                <div key={contract.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{contract.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{contract.terms}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contract.type)}`}>
                          {contract.type.charAt(0).toUpperCase() + contract.type.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{contract.documents}</span>
                      <span className="text-gray-400">📄</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Employee</p>
                      <p className="text-sm font-medium text-gray-900">{contract.employeeName}</p>
                      <p className="text-xs text-gray-500">{contract.employeeId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="text-sm text-gray-900">{contract.position}</p>
                      <p className="text-xs text-gray-500">{contract.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contract Period</p>
                      <p className="text-sm text-gray-900">{contract.startDate}</p>
                      {contract.endDate && (
                        <p className="text-xs text-gray-500">to {contract.endDate}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="text-sm font-medium text-gray-900">{contract.salary}</p>
                      <p className="text-xs text-gray-500">Manager: {contract.manager}</p>
                    </div>
                  </div>

                  {/* Important Dates */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Important Dates</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Signed:</span>
                        <span className="ml-2 text-gray-900">{contract.signedDate || 'Pending'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Start:</span>
                        <span className="ml-2 text-gray-900">{contract.startDate}</span>
                      </div>
                      {contract.endDate && (
                        <div>
                          <span className="text-gray-500">End:</span>
                          <span className="ml-2 text-gray-900">{contract.endDate}</span>
                        </div>
                      )}
                      {contract.renewalDate && (
                        <div>
                          <span className="text-gray-500">Renewal:</span>
                          <span className="ml-2 text-orange-600">{contract.renewalDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last modified: {contract.lastModified} • Contract ID: {contract.id}
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredContracts.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
