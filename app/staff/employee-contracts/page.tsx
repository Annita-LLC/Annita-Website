'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Download, Calendar, Search, Filter, LogOut, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import SharedContracts from '@/components/staff/SharedContracts'

interface EmployeeContract {
  id: string
  title: string
  type: 'employment' | 'nda' | 'non-compete' | 'benefits' | 'policy'
  status: 'active' | 'expired' | 'pending' | 'signed'
  startDate: string
  endDate?: string
  signedDate?: string
  description: string
  documentUrl: string
  fileSize: string
  lastModified: string
  requiredAction?: string
}

export default function EmployeeContractsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [contracts, setContracts] = useState<EmployeeContract[]>([
    {
      id: 'CON-001',
      title: 'Employment Agreement',
      type: 'employment',
      status: 'active',
      startDate: '2023-03-15',
      endDate: '2026-03-14',
      signedDate: '2023-03-10',
      description: 'Full-time employment agreement with terms and conditions',
      documentUrl: '/contracts/employment-agreement.pdf',
      fileSize: '2.4 MB',
      lastModified: '2023-03-10'
    },
    {
      id: 'CON-002',
      title: 'Non-Disclosure Agreement',
      type: 'nda',
      status: 'active',
      startDate: '2023-03-15',
      signedDate: '2023-03-10',
      description: 'Confidentiality and non-disclosure agreement',
      documentUrl: '/contracts/nda-agreement.pdf',
      fileSize: '1.2 MB',
      lastModified: '2023-03-10'
    },
    {
      id: 'CON-003',
      title: 'Benefits Enrollment Form',
      type: 'benefits',
      status: 'pending',
      startDate: '2024-01-01',
      description: '2024 benefits enrollment and selection form',
      documentUrl: '/contracts/benefits-2024.pdf',
      fileSize: '3.1 MB',
      lastModified: '2024-01-01',
      requiredAction: 'Please review and sign by January 31, 2024'
    },
    {
      id: 'CON-004',
      title: 'Employee Handbook',
      type: 'policy',
      status: 'active',
      startDate: '2023-01-01',
      description: 'Company policies and procedures handbook',
      documentUrl: '/contracts/employee-handbook.pdf',
      fileSize: '5.8 MB',
      lastModified: '2023-12-15'
    },
    {
      id: 'CON-005',
      title: 'Remote Work Policy',
      type: 'policy',
      status: 'active',
      startDate: '2023-06-01',
      description: 'Remote work and telecommuting policy guidelines',
      documentUrl: '/contracts/remote-work-policy.pdf',
      fileSize: '1.5 MB',
      lastModified: '2023-06-01'
    },
    {
      id: 'CON-006',
      title: 'Non-Compete Agreement',
      type: 'non-compete',
      status: 'signed',
      startDate: '2023-03-15',
      endDate: '2025-03-14',
      signedDate: '2023-03-10',
      description: 'Non-compete and non-solicitation agreement',
      documentUrl: '/contracts/non-compete.pdf',
      fileSize: '1.8 MB',
      lastModified: '2023-03-10'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'employee') {
      setIsAuthenticated(true)
      setUserRole('employee')
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
                         contract.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || contract.type === filterType
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'expired': return 'bg-red-100 text-red-700'
      case 'signed': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'employment': return 'bg-blue-100 text-blue-700'
      case 'nda': return 'bg-purple-100 text-purple-700'
      case 'non-compete': return 'bg-red-100 text-red-700'
      case 'benefits': return 'bg-green-100 text-green-700'
      case 'policy': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const contractTypes = Array.from(new Set(contracts.map(contract => contract.type)))

  const activeCount = contracts.filter(c => c.status === 'active').length
  const pendingCount = contracts.filter(c => c.status === 'pending').length
  const signedCount = contracts.filter(c => c.status === 'signed').length

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
        title="My Contracts - Annita"
        description="Employee contracts and agreements management"
        keywords={['employee', 'contracts', 'agreements', 'documents', 'signing']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/employee-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">My Contracts</h1>
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
              <p className="text-sm text-gray-500">Active contracts</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-500">Awaiting action</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Signed</h3>
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{signedCount}</p>
              <p className="text-sm text-gray-500">Signed documents</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total</h3>
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
              <p className="text-sm text-gray-500">Total contracts</p>
            </div>
          </div>

          {/* Contracts List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Documents</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search contracts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Types</option>
                  {contractTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="signed">Signed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredContracts.map((contract) => (
                <div key={contract.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{contract.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{contract.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contract.type)}`}>
                          {contract.type.replace('-', ' ').charAt(0).toUpperCase() + contract.type.replace('-', ' ').slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{contract.fileSize}</p>
                      <p className="text-sm text-gray-500">File size</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="text-sm font-medium text-gray-900">{contract.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="text-sm text-gray-900">{contract.endDate || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Signed Date</p>
                      <p className="text-sm text-gray-900">{contract.signedDate || 'Not signed'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Modified</p>
                      <p className="text-sm text-gray-900">{contract.lastModified}</p>
                    </div>
                  </div>

                  {/* Required Action Alert */}
                  {contract.requiredAction && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Action Required</h4>
                          <p className="text-sm text-yellow-700">{contract.requiredAction}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Contract ID: {contract.id}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:text-green-700 text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      {contract.status === 'pending' && (
                        <button className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm">
                          Sign Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredContracts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Shared Contracts Section */}
          <div className="mt-8">
            <SharedContracts 
              userRole="employee"
              employeeId={employeeId}
              onLogout={handleLogout}
              roleSpecificContracts={[]}
              roleSpecificCategories={['employment', 'nda', 'benefits', 'policy']}
              canManage={false}
            />
          </div>
        </main>
      </div>
    </>
  )
}
