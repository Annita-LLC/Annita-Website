'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Clock, CheckCircle, AlertCircle, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import RequestModal from '@/components/staff/modals/RequestModal'

interface ManagerRequest {
  id: string
  title: string
  type: 'leave' | 'expense' | 'equipment' | 'training' | 'salary' | 'other'
  status: 'pending' | 'approved' | 'rejected' | 'in-review'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  submittedBy: string
  employeeId: string
  department: string
  submittedDate: string
  dueDate?: string
  description: string
  amount?: string
  duration?: string
  resolution?: string
  documents: number
}

export default function ManagerRequestsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const [requests, setRequests] = useState<ManagerRequest[]>([
    {
      id: 'REQ-001',
      title: 'Annual Leave Request',
      type: 'leave',
      status: 'approved',
      priority: 'medium',
      submittedBy: 'John Smith',
      employeeId: 'E1001',
      department: 'Engineering',
      submittedDate: '2024-02-10',
      dueDate: '2024-02-15',
      description: 'Request for 2 weeks annual leave from March 15-29, 2024',
      duration: '2 weeks',
      resolution: 'Approved for requested dates. Coverage arranged with Sarah Chen.',
      documents: 1
    },
    {
      id: 'REQ-002',
      title: 'Training Conference Attendance',
      type: 'training',
      status: 'in-review',
      priority: 'medium',
      submittedBy: 'Sarah Chen',
      employeeId: 'E1002',
      department: 'Engineering',
      submittedDate: '2024-02-12',
      dueDate: '2024-02-20',
      description: 'Request to attend React Conference 2024 in San Francisco',
      amount: '$2,500',
      duration: '3 days',
      documents: 2
    },
    {
      id: 'REQ-003',
      title: 'New Laptop Request',
      type: 'equipment',
      status: 'pending',
      priority: 'high',
      submittedBy: 'Mike Johnson',
      employeeId: 'E1003',
      department: 'Marketing',
      submittedDate: '2024-02-14',
      dueDate: '2024-02-18',
      description: 'Request for new MacBook Pro for design work',
      amount: '$2,800',
      documents: 1
    },
    {
      id: 'REQ-004',
      title: 'Salary Review Request',
      type: 'salary',
      status: 'in-review',
      priority: 'high',
      submittedBy: 'Emily Davis',
      employeeId: 'E1004',
      department: 'Design',
      submittedDate: '2024-02-08',
      dueDate: '2024-02-22',
      description: 'Request for salary review based on performance and market rates',
      documents: 3
    },
    {
      id: 'REQ-005',
      title: 'Home Office Setup',
      type: 'expense',
      status: 'approved',
      priority: 'medium',
      submittedBy: 'Alex Thompson',
      employeeId: 'E1005',
      department: 'Analytics',
      submittedDate: '2024-02-05',
      dueDate: '2024-02-10',
      description: 'Request for home office equipment reimbursement',
      amount: '$1,200',
      resolution: 'Approved for ergonomic chair, monitor, and desk setup.',
      documents: 4
    },
    {
      id: 'REQ-006',
      title: 'Professional Development Course',
      type: 'training',
      status: 'rejected',
      priority: 'low',
      submittedBy: 'Lisa Wang',
      employeeId: 'E1006',
      department: 'Marketing',
      submittedDate: '2024-02-01',
      dueDate: '2024-02-08',
      description: 'Request for online digital marketing certification course',
      amount: '$800',
      resolution: 'Rejected due to budget constraints. Consider next quarter.',
      documents: 2
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

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || request.type === filterType
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in-review': return 'bg-blue-100 text-blue-700'
      case 'approved': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'leave': return 'bg-blue-100 text-blue-700'
      case 'expense': return 'bg-green-100 text-green-700'
      case 'equipment': return 'bg-purple-100 text-purple-700'
      case 'training': return 'bg-orange-100 text-orange-700'
      case 'salary': return 'bg-pink-100 text-pink-700'
      case 'other': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const requestTypes = Array.from(new Set(requests.map(request => request.type)))

  const pendingCount = requests.filter(r => r.status === 'pending').length
  const inReviewCount = requests.filter(r => r.status === 'in-review').length
  const approvedCount = requests.filter(r => r.status === 'approved').length
  const rejectedCount = requests.filter(r => r.status === 'rejected').length

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
        title="Manager Team Requests - Annita"
        description="Manager team requests and approval management"
        keywords={['manager', 'requests', 'approvals', 'team', 'management']}
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
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Team Requests</h1>
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
          {/* Requests Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-500">Awaiting review</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">In Review</h3>
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{inReviewCount}</p>
              <p className="text-sm text-gray-500">Being processed</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
              <p className="text-sm text-gray-500">Successfully approved</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rejected</h3>
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
              <p className="text-sm text-gray-500">Not approved</p>
            </div>
          </div>

          {/* Requests List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Team Requests</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Types</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(request.type)}`}>
                          {request.type.charAt(0).toUpperCase() + request.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(request.priority)}`}></div>
                          <span className="text-xs text-gray-500">{request.priority} priority</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{request.documents}</span>
                      <span className="text-gray-400">📄</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Submitted By</p>
                      <p className="text-sm font-medium text-gray-900">{request.submittedBy}</p>
                      <p className="text-xs text-gray-500">{request.employeeId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-sm text-gray-900">{request.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submitted Date</p>
                      <p className="text-sm text-gray-900">{request.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className={`text-sm font-medium ${
                        request.dueDate && new Date(request.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {request.dueDate || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {request.amount && (
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="text-sm font-medium text-gray-900">{request.amount}</p>
                      </div>
                    )}
                    {request.duration && (
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-sm text-gray-900">{request.duration}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Request ID</p>
                      <p className="text-sm text-gray-900">{request.id}</p>
                    </div>
                  </div>

                  {/* Resolution */}
                  {request.resolution && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Resolution</h4>
                      <p className="text-sm text-gray-600">{request.resolution}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {request.status === 'pending' && '⏳ Awaiting your review'}
                      {request.status === 'in-review' && '🔍 Currently under review'}
                      {request.status === 'approved' && '✅ Request approved'}
                      {request.status === 'rejected' && '❌ Request rejected'}
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      Review Request
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>

        {/* Request Modal */}
        <RequestModal
          isOpen={false}
          onClose={() => {}}
          onSubmit={() => {}}
          type="leave"
          userRole="manager"
        />
      </div>
    </>
  )
}
