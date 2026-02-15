'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Eye, Calendar, AlertCircle, CheckCircle, Clock, Filter, Search, Bell, ChevronDown, ChevronUp, User, Building, DollarSign, Calendar as CalendarIcon, Shield, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Contract {
  id: string
  title: string
  type: 'employment' | 'nda' | 'non-compete' | 'consulting' | 'service' | 'other'
  status: 'active' | 'expired' | 'pending' | 'terminated'
  effectiveDate: string
  expirationDate?: string
  lastUpdated: string
  description: string
  fileUrl: string
  version: string
  updates: ContractUpdate[]
  signedDate?: string
  salary?: number
  position?: string
  department?: string
}

interface ContractUpdate {
  id: string
  date: string
  type: 'new' | 'amendment' | 'renewal' | 'termination' | 'clarification'
  description: string
  changes: string[]
  version: string
}

export default function ContractManagement() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showUpdates, setShowUpdates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading contracts data
    const mockContracts: Contract[] = [
      {
        id: '1',
        title: 'Employment Agreement',
        type: 'employment',
        status: 'active',
        effectiveDate: '2024-01-15',
        expirationDate: '2025-01-15',
        lastUpdated: '2024-02-01',
        description: 'Full-time employment agreement with benefits and compensation terms',
        fileUrl: '/contracts/employment-agreement.pdf',
        version: '2.1',
        signedDate: '2024-01-10',
        salary: 75000,
        position: 'Senior Developer',
        department: 'Engineering',
        updates: [
          {
            id: 'u1',
            date: '2024-02-01',
            type: 'amendment',
            description: 'Salary adjustment and remote work policy update',
            changes: [
              'Base salary increased from $70,000 to $75,000',
              'Added remote work flexibility clause',
              'Updated vacation days from 15 to 20 days'
            ],
            version: '2.1'
          },
          {
            id: 'u2',
            date: '2024-01-15',
            type: 'new',
            description: 'Initial employment agreement',
            changes: [
              'Original contract creation',
              'Standard employment terms and conditions'
            ],
            version: '1.0'
          }
        ]
      },
      {
        id: '2',
        title: 'Non-Disclosure Agreement',
        type: 'nda',
        status: 'active',
        effectiveDate: '2024-01-15',
        lastUpdated: '2024-01-15',
        description: 'Confidentiality and non-disclosure agreement for proprietary information',
        fileUrl: '/contracts/nda.pdf',
        version: '1.0',
        signedDate: '2024-01-10',
        updates: [
          {
            id: 'u3',
            date: '2024-01-15',
            type: 'new',
            description: 'Initial NDA agreement',
            changes: [
              'Standard confidentiality terms',
              '5-year non-disclosure period'
            ],
            version: '1.0'
          }
        ]
      },
      {
        id: '3',
        title: 'Non-Compete Agreement',
        type: 'non-compete',
        status: 'active',
        effectiveDate: '2024-01-15',
        expirationDate: '2026-01-15',
        lastUpdated: '2024-01-15',
        description: 'Non-compete and non-solicitation agreement',
        fileUrl: '/contracts/non-compete.pdf',
        version: '1.0',
        signedDate: '2024-01-10',
        updates: [
          {
            id: 'u4',
            date: '2024-01-15',
            type: 'new',
            description: 'Initial non-compete agreement',
            changes: [
              '2-year non-compete period',
              '50-mile radius restriction'
            ],
            version: '1.0'
          }
        ]
      },
      {
        id: '4',
        title: 'Benefits Agreement',
        type: 'other',
        status: 'pending',
        effectiveDate: '2024-03-01',
        lastUpdated: '2024-02-20',
        description: 'Updated benefits package including health insurance and retirement plan',
        fileUrl: '/contracts/benefits-agreement.pdf',
        version: '1.0',
        updates: [
          {
            id: 'u5',
            date: '2024-02-20',
            type: 'new',
            description: 'New benefits package for 2024',
            changes: [
              'Enhanced health insurance coverage',
              '401k matching increased to 6%',
              'Added mental health benefits'
            ],
            version: '1.0'
          }
        ]
      }
    ]
    
    setTimeout(() => {
      setContracts(mockContracts)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || contract.type === filterType
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'terminated': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'employment': return 'bg-blue-100 text-blue-800'
      case 'nda': return 'bg-purple-100 text-purple-800'
      case 'non-compete': return 'bg-orange-100 text-orange-800'
      case 'consulting': return 'bg-indigo-100 text-indigo-800'
      case 'service': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'new': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'amendment': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'renewal': return <Calendar className="w-4 h-4 text-blue-600" />
      case 'termination': return <AlertCircle className="w-4 h-4 text-red-600" />
      default: return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const toggleUpdates = (contractId: string) => {
    setShowUpdates(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId)
        : [...prev, contractId]
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Contracts</h2>
            <p className="text-xs text-gray-600 mt-1">Manage your agreements</p>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-orange-600" />
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
              {contracts.filter(c => c.status === 'pending').length}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contract Management</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">View and manage your employment contracts and agreements</p>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-600" />
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                {contracts.filter(c => c.status === 'pending').length} Pending
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Types</option>
            <option value="employment">Employment</option>
            <option value="nda">NDA</option>
            <option value="non-compete">Non-Compete</option>
            <option value="consulting">Consulting</option>
            <option value="service">Service</option>
            <option value="other">Other</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      {/* Contracts List */}
      <div className="grid gap-4">
        {filteredContracts.map((contract) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(contract.type)}`}>
                      {contract.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{contract.description}</p>
                  
                  {/* Contract Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {contract.position && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Position</p>
                          <p className="text-sm font-medium text-gray-900">{contract.position}</p>
                        </div>
                      </div>
                    )}
                    {contract.department && (
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-sm font-medium text-gray-900">{contract.department}</p>
                        </div>
                      </div>
                    )}
                    {contract.salary && (
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Salary</p>
                          <p className="text-sm font-medium text-gray-900">${contract.salary.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Effective Date</p>
                        <p className="text-sm font-medium text-gray-900">{new Date(contract.effectiveDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Effective: {new Date(contract.effectiveDate).toLocaleDateString()}</span>
                    </div>
                    {contract.expirationDate && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Expires: {new Date(contract.expirationDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>Version: {contract.version}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>Updated: {new Date(contract.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => setSelectedContract(contract)}
                    className="flex items-center space-x-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => window.open(contract.fileUrl, '_blank')}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Updates Section */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => toggleUpdates(contract.id)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Updates ({contract.updates.length})
                    </span>
                  </div>
                  {showUpdates.includes(contract.id) ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {showUpdates.includes(contract.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-3"
                    >
                      {contract.updates.map((update) => (
                        <div key={update.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            {getUpdateIcon(update.type)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900 capitalize">
                                  {update.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(update.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{update.description}</p>
                              <div className="space-y-1">
                                {update.changes.map((change, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    <span>{change}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>

      {/* Contract Detail Modal */}
      <AnimatePresence>
        {selectedContract && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedContract(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedContract.title}</h3>
                  <button
                    onClick={() => setSelectedContract(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Contract Overview */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Contract Overview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedContract.status)}`}>
                          {selectedContract.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Type</p>
                        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(selectedContract.type)}`}>
                          {selectedContract.type.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Effective Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(selectedContract.effectiveDate).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedContract.expirationDate && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Expiration Date</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(selectedContract.expirationDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {selectedContract.signedDate && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Signed Date</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(selectedContract.signedDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Version</p>
                        <p className="text-sm font-medium text-gray-900">{selectedContract.version}</p>
                      </div>
                    </div>
                  </div>

                  {/* Employment Details */}
                  {selectedContract.position && (
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Position</p>
                          <p className="text-sm font-medium text-gray-900">{selectedContract.position}</p>
                        </div>
                        {selectedContract.department && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Department</p>
                            <p className="text-sm font-medium text-gray-900">{selectedContract.department}</p>
                          </div>
                        )}
                        {selectedContract.salary && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Annual Salary</p>
                            <p className="text-sm font-medium text-gray-900">${selectedContract.salary.toLocaleString()}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-700">{selectedContract.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => window.open(selectedContract.fileUrl, '_blank')}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Contract</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <FileText className="w-5 h-5" />
                      <span>Request Amendment</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Shield className="w-5 h-5" />
                      <span>Contact HR</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
