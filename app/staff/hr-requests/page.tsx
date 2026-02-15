'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Clock, CheckCircle, AlertCircle, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

interface HRRequest {
  id: string
  title: string
  type: 'leave' | 'benefits' | 'payroll' | 'policy' | 'complaint' | 'accommodation'
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  submittedDate: string
  submittedBy: string
  department: string
  description: string
  assignedTo: string
  dueDate: string
  resolution?: string
  documents: number
}

export default function HRRequestsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const [requests, setRequests] = useState<HRRequest[]>([
    {
      id: 'REQ-001',
      title: 'Annual Leave Request',
      type: 'leave',
      status: 'approved',
      priority: 'medium',
      submittedDate: '2024-02-10',
      submittedBy: 'John Smith',
      department: 'Engineering',
      description: 'Request for 2 weeks annual leave from March 15-29, 2024',
      assignedTo: 'Emily Davis',
      dueDate: '2024-02-15',
      resolution: 'Approved for requested dates. Coverage arranged.',
      documents: 1
    },
    {
      id: 'REQ-002',
      title: 'Benefits Enrollment Change',
      type: 'benefits',
      status: 'in-review',
      priority: 'medium',
      submittedDate: '2024-02-12',
      submittedBy: 'Sarah Chen',
      department: 'Engineering',
      description: 'Request to change health insurance plan and add dental coverage',
      assignedTo: 'Emily Davis',
      dueDate: '2024-02-20',
      documents: 2
    },
    {
      id: 'REQ-003',
      title: 'Payroll Correction',
      type: 'payroll',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-02-14',
      submittedBy: 'Mike Johnson',
      department: 'Marketing',
      description: 'Incorrect overtime hours calculated for January 2024',
      assignedTo: 'David Wilson',
      dueDate: '2024-02-16',
      documents: 3
    },
    {
      id: 'REQ-004',
      title: 'Workplace Accommodation',
      type: 'accommodation',
      status: 'in-review',
      priority: 'urgent',
      submittedDate: '2024-02-08',
      submittedBy: 'Lisa Wang',
      department: 'Sales',
      description: 'Request for ergonomic chair and standing desk due to medical condition',
      assignedTo: 'Emily Davis',
      dueDate: '2024-02-18',
      documents: 2
    },
    {
      id: 'REQ-005',
      title: 'Remote Work Policy Inquiry',
      type: 'policy',
      status: 'completed',
      priority: 'low',
      submittedDate: '2024-02-05',
      submittedBy: 'Alex Thompson',
      department: 'Sales',
      description: 'Inquiry about permanent remote work options and requirements',
      assignedTo: 'Emily Davis',
      dueDate: '2024-02-10',
      resolution: 'Provided information about remote work policy and eligibility criteria.',
      documents: 0
    },
    {
      id: 'REQ-006',
      title: 'Harassment Complaint',
      type: 'complaint',
      status: 'in-review',
      priority: 'urgent',
      submittedDate: '2024-02-13',
      submittedBy: 'Anonymous',
      department: 'Operations',
      description: 'Formal complaint regarding workplace harassment',
      assignedTo: 'Emily Davis',
      dueDate: '2024-02-17',
      documents: 1
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
      case 'completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'leave': return 'bg-blue-100 text-blue-700'
      case 'benefits': return 'bg-green-100 text-green-700'
      case 'payroll': return 'bg-purple-100 text-purple-700'
      case 'policy': return 'bg-orange-100 text-orange-700'
      case 'complaint': return 'bg-red-100 text-red-700'
      case 'accommodation': return 'bg-pink-100 text-pink-700'
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
  const urgentCount = requests.filter(r => r.priority === 'urgent').length

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
        title="HR Employee Requests - Annita"
        description="HR employee requests and case management"
        keywords={['hr', 'requests', 'employee', 'cases', 'management']}
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
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Employee Requests</h1>
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
              <p className="text-sm text-gray-500">Successfully completed</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Urgent</h3>
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{urgentCount}</p>
              <p className="text-sm text-gray-500">Require immediate attention</p>
            </div>
          </div>

          {/* Requests List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Requests</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search requests..."
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
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
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
                        new Date(request.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {request.dueDate}
                      </p>
                    </div>
                  </div>

                  {/* Resolution */}
                  {request.resolution && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Resolution</h4>
                      <p className="text-sm text-gray-600">{request.resolution}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Assigned to: {request.assignedTo} • Request ID: {request.id}
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Details
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
      </div>
    </>
  )
}
