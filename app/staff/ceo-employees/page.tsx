'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, Users, Search, Filter, MoreVertical, Mail, Phone, MapPin, Briefcase, Calendar, TrendingUp, TrendingDown, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import TeamDirectory from '@/components/staff/TeamDirectory'

interface CEOEmployee {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  location: string
  hireDate: string
  status: 'active' | 'on-leave' | 'terminated'
  performance: 'excellent' | 'good' | 'average' | 'poor'
  salary: string
  manager: string
}

export default function CEOEmployeesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [employees, setEmployees] = useState<CEOEmployee[]>([
    {
      id: 'ANN-001234',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@annita.com',
      phone: '+1-555-0123',
      department: 'Executive Management',
      position: 'Chief Financial Officer',
      location: 'Headquarters - New York',
      hireDate: '2020-03-15',
      status: 'active',
      performance: 'excellent',
      salary: '$250,000',
      manager: 'CEO'
    },
    {
      id: 'ANN-001235',
      name: 'Michael Chen',
      email: 'michael.chen@annita.com',
      phone: '+1-555-0124',
      department: 'Marketing & Sales',
      position: 'Chief Marketing Officer',
      location: 'Headquarters - New York',
      hireDate: '2019-07-22',
      status: 'active',
      performance: 'excellent',
      salary: '$220,000',
      manager: 'CEO'
    },
    {
      id: 'ANN-001236',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@annita.com',
      phone: '+1-555-0125',
      department: 'Operations',
      position: 'Chief Operating Officer',
      location: 'Headquarters - New York',
      hireDate: '2018-11-10',
      status: 'active',
      performance: 'excellent',
      salary: '$240,000',
      manager: 'CEO'
    },
    {
      id: 'ANN-001237',
      name: 'David Kim',
      email: 'david.kim@annita.com',
      phone: '+1-555-0126',
      department: 'Human Resources',
      position: 'HR Director',
      location: 'Headquarters - New York',
      hireDate: '2021-02-28',
      status: 'active',
      performance: 'good',
      salary: '$120,000',
      manager: 'COO'
    },
    {
      id: 'ANN-001238',
      name: 'Jessica Taylor',
      email: 'jessica.taylor@annita.com',
      phone: '+1-555-0127',
      department: 'IT & Technology',
      position: 'IT Manager',
      location: 'West Coast Office - San Francisco',
      hireDate: '2020-09-15',
      status: 'on-leave',
      performance: 'excellent',
      salary: '$110,000',
      manager: 'COO'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'ceo') {
      setIsAuthenticated(true)
      setUserRole('ceo')
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
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'on-leave': return 'bg-yellow-100 text-yellow-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-purple-100 text-purple-700'
      case 'good': return 'bg-blue-100 text-blue-700'
      case 'average': return 'bg-yellow-100 text-yellow-700'
      case 'poor': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const departments = Array.from(new Set(employees.map(emp => emp.department)))

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
        title="CEO Employee Management - Annita"
        description="CEO employee management and oversight"
        keywords={['ceo', 'employees', 'management', 'executive']}
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
                  onClick={() => router.push('/staff/ceo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">All Employees</h2>
              <div className="text-sm text-gray-500">
                {filteredEmployees.length} of {employees.length} employees
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>

          {/* Employee Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{employee.department}</span>
                  </div>
                  
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
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Reports to: {employee.manager}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Hired: {employee.hireDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(employee.performance)}`}>
                      {employee.performance}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{employee.salary}</span>
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

          {/* Team Directory Section */}
          <div className="mt-8">
            <TeamDirectory />
          </div>
        </main>
      </div>
    </>
  )
}
