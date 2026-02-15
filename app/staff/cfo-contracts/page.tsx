'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, DollarSign, Calendar, Search, Filter, Download, CheckCircle, AlertCircle, Clock, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import SharedContracts from '@/components/staff/SharedContracts'

interface CFOContract {
  id: string
  title: string
  vendor: string
  type: 'software' | 'service' | 'lease' | 'equipment' | 'consulting'
  value: string
  startDate: string
  endDate: string
  status: 'active' | 'pending' | 'expired' | 'terminated'
  renewalDate: string
  department: string
  description: string
  paymentTerms: string
  lastReviewed: string
}

export default function CFOContractsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const [contracts, setContracts] = useState<CFOContract[]>([
    {
      id: 'FC-001',
      title: 'Microsoft Enterprise License',
      vendor: 'Microsoft Corporation',
      type: 'software',
      value: '$2,500,000',
      startDate: '2023-01-01',
      endDate: '2025-12-31',
      status: 'active',
      renewalDate: '2025-11-01',
      department: 'IT & Technology',
      description: 'Enterprise-wide Microsoft 365 and Azure services',
      paymentTerms: 'Annual',
      lastReviewed: '2024-01-15'
    },
    {
      id: 'FC-002',
      title: 'Office Building Lease',
      vendor: 'Manhattan Properties LLC',
      type: 'lease',
      value: '$1,200,000',
      startDate: '2022-01-01',
      endDate: '2027-12-31',
      status: 'active',
      renewalDate: '2027-10-01',
      department: 'Operations',
      description: 'Headquarters office space lease agreement',
      paymentTerms: 'Monthly',
      lastReviewed: '2023-12-01'
    },
    {
      id: 'FC-003',
      title: 'Financial Audit Services',
      vendor: 'Deloitte & Touche',
      type: 'consulting',
      value: '$450,000',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      renewalDate: '2024-11-01',
      department: 'Finance & Accounting',
      description: 'Annual financial audit and compliance services',
      paymentTerms: 'Quarterly',
      lastReviewed: '2024-01-10'
    },
    {
      id: 'FC-004',
      title: 'Cloud Infrastructure Services',
      vendor: 'Amazon Web Services',
      type: 'service',
      value: '$850,000',
      startDate: '2023-06-01',
      endDate: '2025-05-31',
      status: 'active',
      renewalDate: '2025-04-01',
      department: 'IT & Technology',
      description: 'AWS cloud hosting and infrastructure services',
      paymentTerms: 'Monthly',
      lastReviewed: '2024-02-01'
    },
    {
      id: 'FC-005',
      title: 'Marketing Agency Retainer',
      vendor: 'Creative Minds Agency',
      type: 'service',
      value: '$750,000',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'pending',
      renewalDate: '2025-01-01',
      department: 'Marketing & Sales',
      description: 'Annual marketing and creative services retainer',
      paymentTerms: 'Monthly',
      lastReviewed: '2024-02-15'
    }
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

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || contract.type === filterType
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || contract.department === filterDepartment
    
    return matchesSearch && matchesType && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'expired': return 'bg-red-100 text-red-700'
      case 'terminated': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'software': return 'bg-blue-100 text-blue-700'
      case 'service': return 'bg-purple-100 text-purple-700'
      case 'lease': return 'bg-orange-100 text-orange-700'
      case 'equipment': return 'bg-green-100 text-green-700'
      case 'consulting': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const contractTypes = Array.from(new Set(contracts.map(contract => contract.type)))
  const departments = Array.from(new Set(contracts.map(contract => contract.department)))

  const totalContractValue = contracts.reduce((sum, contract) => {
    return sum + parseFloat(contract.value.replace(/[$,]/g, ''))
  }, 0)

  const activeContracts = contracts.filter(c => c.status === 'active').length
  const pendingContracts = contracts.filter(c => c.status === 'pending').length

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
        title="CFO Financial Contracts - Annita"
        description="CFO financial contracts and vendor agreements management"
        keywords={['cfo', 'contracts', 'financial', 'vendor', 'agreements']}
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
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Financial Contracts</h1>
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Contract Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Contract Value</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalContractValue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">All active contracts</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Contracts</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeContracts}</p>
              <p className="text-sm text-gray-500">Currently in effect</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Contracts</h3>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingContracts}</p>
              <p className="text-sm text-gray-500">Awaiting approval</p>
            </div>
          </div>

          {/* Contract List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Financial Contracts</h2>
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
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
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
                      <p className="text-sm text-gray-600 mb-2">{contract.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contract.type)}`}>
                          {contract.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600">{contract.value}</p>
                      <p className="text-sm text-gray-500">{contract.paymentTerms} payments</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Vendor</p>
                      <p className="text-sm font-medium text-gray-900">{contract.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-sm text-gray-900">{contract.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contract Period</p>
                      <p className="text-sm text-gray-900">{contract.startDate} - {contract.endDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Renewal: {contract.renewalDate}</span>
                      <span>Last reviewed: {contract.lastReviewed}</span>
                    </div>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View Details
                    </button>
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
              userRole="cfo"
              employeeId={employeeId}
              onLogout={handleLogout}
              roleSpecificContracts={[]}
              roleSpecificCategories={['software', 'service', 'lease', 'equipment', 'consulting']}
              canManage={true}
            />
          </div>
        </main>
      </div>
    </>
  )
}
