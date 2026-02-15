'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, FileText, Plus, Search, Filter, Calendar, Clock, CheckCircle, XCircle, AlertCircle, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import EmployeeRequestModal from '@/components/staff/modals/EmployeeRequestModal'
import LeaveRequests from '@/components/staff/LeaveRequests'
import EmployeeRequestForm from '@/components/staff/EmployeeRequestForm'

interface EmployeeRequest {
  id: string
  type: 'leave' | 'expense' | 'training' | 'equipment' | 'hr'
  title: string
  description: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  submittedDate: string
  lastUpdated?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  amount?: string
  dates?: {
    start: string
    end: string
  }
}

export default function EmployeeRequestsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    localStorage.removeItem('staff-role')
    localStorage.removeItem('staff-employee-id')
    router.push('/staff/login')
  }

  const [requests, setRequests] = useState<EmployeeRequest[]>([
    {
      id: 'REQ-001',
      type: 'leave',
      title: 'Annual Vacation Leave',
      description: 'Two-week vacation for family trip to Hawaii',
      status: 'approved',
      submittedDate: '2024-02-01',
      lastUpdated: '2024-02-03',
      priority: 'medium',
      dates: {
        start: '2024-03-15',
        end: '2024-03-29'
      }
    },
    {
      id: 'REQ-002',
      type: 'expense',
      title: 'Conference Travel Expenses',
      description: 'Flight and hotel expenses for Tech Conference 2024',
      status: 'pending',
      submittedDate: '2024-02-10',
      lastUpdated: '2024-02-10',
      priority: 'high',
      amount: '$2,500'
    },
    {
      id: 'REQ-003',
      type: 'training',
      title: 'Advanced React Course',
      description: 'Professional development course for advanced React patterns',
      status: 'pending',
      submittedDate: '2024-02-05',
      lastUpdated: '2024-02-05',
      priority: 'medium'
    },
    {
      id: 'REQ-004',
      type: 'equipment',
      title: 'New Laptop Request',
      description: 'Request for new development laptop due to current hardware failure',
      status: 'rejected',
      submittedDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      priority: 'high'
    },
    {
      id: 'REQ-005',
      type: 'hr',
      title: 'Benefits Enrollment Issue',
      description: 'Need assistance with benefits enrollment process for upcoming quarter',
      status: 'pending',
      submittedDate: '2024-02-08',
      lastUpdated: '2024-02-08',
      priority: 'urgent'
    }
  ])

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
        title="Employee Requests - Annita"
        description="Employee request management system"
        keywords={['employee', 'requests', 'leave', 'expense', 'training']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <button
                  onClick={() => router.back()}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">My Requests</h1>
                  {employeeId && (
                    <p className="text-xs sm:text-sm text-gray-500 truncate">ID: {employeeId}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Requests</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Plus className="w-4 h-4" />
                <span>New Request</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      request.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {request.priority}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Type:</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{request.type}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        request.status === 'approved' ? 'bg-green-100 text-green-700' :
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {request.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Submitted:</span>
                      <span className="text-sm text-gray-900">{request.submittedDate}</span>
                    </div>

                    {request.dates && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Dates:</span>
                        <span className="text-sm text-gray-900">{request.dates.start} - {request.dates.end}</span>
                      </div>
                    )}

                    {request.amount && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Amount:</span>
                        <span className="text-sm text-gray-900">{request.amount}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">{request.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Requests Section */}
          <div className="mt-8">
            <LeaveRequests userRole="employee" />
          </div>

          {/* Employee Request Form Section */}
          <div className="mt-8">
            <EmployeeRequestForm />
          </div>
        </main>

        <EmployeeRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => {
            console.log('New request submitted:', data)
            setIsModalOpen(false)
          }}
          employeeId={employeeId}
        />
      </div>
    </>
  )
}
