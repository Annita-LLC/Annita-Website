'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Search, Filter, Eye, Calendar, Clock, AlertTriangle, CheckCircle, User, Building } from 'lucide-react'

interface Contract {
  id: string
  title: string
  type: string
  category: string
  status: 'active' | 'expired' | 'pending' | 'signed' | 'draft'
  startDate: string
  endDate?: string
  signedDate?: string | undefined
  description: string
  documentUrl: string
  fileSize: string
  lastModified: string
  parties: string[]
  value?: string
  renewalDate?: string | undefined
  priority: 'high' | 'medium' | 'low'
  department: string
  assignedTo?: string
}

interface SharedContractsProps {
  userRole: string
  employeeId: string
  onLogout: () => void
  roleSpecificContracts: Contract[]
  roleSpecificCategories: string[]
  canManage: boolean
}

export default function SharedContracts({ 
  userRole, 
  employeeId, 
  onLogout, 
  roleSpecificContracts,
  roleSpecificCategories,
  canManage
}: SharedContractsProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [contracts, setContracts] = useState<Contract[]>(roleSpecificContracts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    
    if (auth === 'true' && role) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleViewContract = (contract: Contract) => {
    // In a real app, this would open the contract viewer
    console.log('Viewing contract:', contract)
  }

  const handleDownloadContract = (contract: Contract) => {
    // In a real app, this would download the contract file
    console.log('Downloading contract:', contract)
  }

  const handleSignContract = (contract: Contract) => {
    // In a real app, this would open the signing interface
    console.log('Signing contract:', contract)
  }

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || contract.type === filterType
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus
    const matchesCategory = filterCategory === 'all' || contract.category === filterCategory
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'expired': return 'bg-red-100 text-red-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'signed': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const activeCount = contracts.filter(c => c.status === 'active').length
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Contracts</h1>
                  <p className="text-sm text-gray-500">ID: {employeeId}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
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
              <h3 className="text-lg font-semibold text-gray-900">Expired</h3>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{expiredCount}</p>
            <p className="text-sm text-gray-500">Expired contracts</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total</h3>
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
            <p className="text-sm text-gray-500">All contracts</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                {roleSpecificCategories.map(category => (
                  <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="signed">Signed</option>
                <option value="expired">Expired</option>
                <option value="draft">Draft</option>
              </select>

              {canManage && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create New Contract
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contract.priority)}`}></span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{contract.description}</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {contract.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {contract.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{contract.department}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{contract.fileSize}</p>
                  <p className="text-sm text-gray-500">File size</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Contract Period</p>
                  <p className="text-sm font-medium text-gray-900">
                    {contract.startDate} {contract.endDate ? `- ${contract.endDate}` : ''}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="text-sm font-medium text-gray-900">
                    {contract.value || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parties</p>
                  <p className="text-sm text-gray-900">
                    {contract.parties.join(', ')}
                  </p>
                </div>
              </div>

              {contract.renewalDate && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Renewal Date</p>
                  <p className="text-sm font-medium text-gray-900">{contract.renewalDate}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Signed Date</p>
                  <p className="text-sm text-gray-900">{contract.signedDate || 'Not signed'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Modified</p>
                  <p className="text-sm text-gray-900">{contract.lastModified}</p>
                </div>
              </div>

              {contract.assignedTo && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="text-sm text-gray-900">{contract.assignedTo}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Contract ID: {contract.id}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewContract(contract)}
                    className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDownloadContract(contract)}
                    className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:text-green-700 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  {canManage && contract.status === 'pending' && (
                    <button
                      onClick={() => handleSignContract(contract)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Sign Contract
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
      </main>
    </div>
  )
}
