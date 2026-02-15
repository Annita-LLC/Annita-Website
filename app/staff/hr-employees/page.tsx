'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Mail, Phone, MapPin, Calendar, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import EmployeeManagement from '@/components/staff/EmployeeManagement'

interface HREmployee {
  id: string
  employeeId: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  location: string
  hireDate: string
  status: 'active' | 'on-leave' | 'remote' | 'terminated'
  manager: string
  salary: string
  performance: 'excellent' | 'good' | 'average' | 'improving'
  skills: string[]
  lastReview: string
}

export default function HREmployeesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [employees, setEmployees] = useState<HREmployee[]>([
    {
      id: 'EMP-001',
      employeeId: 'E1001',
      name: 'John Smith',
      email: 'john.smith@annita.com',
      phone: '+1-555-0101',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      hireDate: '2020-03-15',
      status: 'active',
      manager: 'Sarah Chen',
      salary: '$125,000',
      performance: 'excellent',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      lastReview: '2024-01-15'
    },
    {
      id: 'EMP-002',
      employeeId: 'E1002',
      name: 'Sarah Chen',
      email: 'sarah.chen@annita.com',
      phone: '+1-555-0102',
      position: 'Engineering Manager',
      department: 'Engineering',
      location: 'San Francisco, CA',
      hireDate: '2019-06-20',
      status: 'active',
      manager: 'CTO',
      salary: '$165,000',
      performance: 'excellent',
      skills: ['Leadership', 'Project Management', 'Technical Strategy'],
      lastReview: '2024-01-20'
    },
    {
      id: 'EMP-003',
      employeeId: 'E1003',
      name: 'Mike Johnson',
      email: 'mike.johnson@annita.com',
      phone: '+1-555-0103',
      position: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Austin, TX',
      hireDate: '2021-09-10',
      status: 'remote',
      manager: 'Emily Davis',
      salary: '$75,000',
      performance: 'good',
      skills: ['Digital Marketing', 'SEO', 'Content Creation', 'Analytics'],
      lastReview: '2024-02-01'
    },
    {
      id: 'EMP-004',
      employeeId: 'E1004',
      name: 'Emily Davis',
      email: 'emily.davis@annita.com',
      phone: '+1-555-0104',
      position: 'HR Manager',
      department: 'Human Resources',
      location: 'Chicago, IL',
      hireDate: '2018-11-05',
      status: 'active',
      manager: 'CHRO',
      salary: '$95,000',
      performance: 'excellent',
      skills: ['Recruitment', 'Employee Relations', 'Performance Management', 'HRIS'],
      lastReview: '2024-01-25'
    },
    {
      id: 'EMP-005',
      employeeId: 'E1005',
      name: 'Alex Thompson',
      email: 'alex.thompson@annita.com',
      phone: '+1-555-0105',
      position: 'Sales Representative',
      department: 'Sales',
      location: 'Boston, MA',
      hireDate: '2022-02-15',
      status: 'on-leave',
      manager: 'David Wilson',
      salary: '$65,000',
      performance: 'good',
      skills: ['Sales', 'CRM', 'Negotiation', 'Customer Relations'],
      lastReview: '2023-12-15'
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

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'on-leave': return 'bg-yellow-100 text-yellow-700'
      case 'remote': return 'bg-blue-100 text-blue-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-700'
      case 'good': return 'bg-blue-100 text-blue-700'
      case 'average': return 'bg-yellow-100 text-yellow-700'
      case 'improving': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const departments = Array.from(new Set(employees.map(employee => employee.department)))

  const activeCount = employees.filter(e => e.status === 'active').length
  const remoteCount = employees.filter(e => e.status === 'remote').length
  const onLeaveCount = employees.filter(e => e.status === 'on-leave').length

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
        title="HR Employee Management - Annita"
        description="HR employee management and personnel records"
        keywords={['hr', 'employees', 'management', 'personnel', 'records']}
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
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Employee Management</h1>
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
          {/* Employee Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Employees</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              <p className="text-sm text-gray-500">Active workforce</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active</h3>
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              <p className="text-sm text-gray-500">Currently working</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Remote</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{remoteCount}</p>
              <p className="text-sm text-gray-500">Working remotely</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">On Leave</h3>
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{onLeaveCount}</p>
              <p className="text-sm text-gray-500">Currently on leave</p>
            </div>
          </div>

          {/* Employee List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Directory</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
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
                  <option value="remote">Remote</option>
                  <option value="on-leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{employee.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{employee.position}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                          {employee.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(employee.performance)}`}>
                          {employee.performance}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.department}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{employee.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      <div>Employee ID: {employee.employeeId}</div>
                      <div>Hired: {employee.hireDate}</div>
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Employee Management Section */}
          <div className="mt-8">
            <EmployeeManagement />
          </div>
        </main>
      </div>
    </>
  )
}
