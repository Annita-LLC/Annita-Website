'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, TrendingUp, Calendar, Mail, Phone, MapPin, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import TeamDirectory from '@/components/staff/TeamDirectory'

interface CMOTeamMember {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  location: string
  hireDate: string
  status: 'active' | 'on-leave' | 'remote'
  specialization: string[]
  currentProjects: string[]
  performance: 'excellent' | 'good' | 'average' | 'improving'
  manager: string
  workload: 'low' | 'medium' | 'high'
}

export default function CMOTeamPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterWorkload, setFilterWorkload] = useState('all')

  const [teamMembers, setTeamMembers] = useState<CMOTeamMember[]>([
    {
      id: 'MKT-001',
      name: 'Sarah Chen',
      email: 'sarah.chen@annita.com',
      phone: '+1-555-0101',
      position: 'Marketing Director',
      department: 'Marketing & Sales',
      location: 'Headquarters - New York',
      hireDate: '2020-03-15',
      status: 'active',
      specialization: ['Digital Marketing', 'Strategy', 'Team Management'],
      currentProjects: ['Spring Product Launch', 'Q2 Campaign Planning'],
      performance: 'excellent',
      manager: 'CMO',
      workload: 'high'
    },
    {
      id: 'MKT-002',
      name: 'Mike Johnson',
      email: 'mike.johnson@annita.com',
      phone: '+1-555-0102',
      position: 'Social Media Manager',
      department: 'Marketing & Sales',
      location: 'Remote - San Francisco',
      hireDate: '2021-07-22',
      status: 'remote',
      specialization: ['Social Media', 'Content Creation', 'Community Management'],
      currentProjects: ['LinkedIn Campaign', 'Instagram Strategy'],
      performance: 'good',
      manager: 'Sarah Chen',
      workload: 'medium'
    },
    {
      id: 'MKT-003',
      name: 'Emily Davis',
      email: 'emily.davis@annita.com',
      phone: '+1-555-0103',
      position: 'Email Marketing Specialist',
      department: 'Marketing & Sales',
      location: 'Headquarters - New York',
      hireDate: '2022-01-10',
      status: 'active',
      specialization: ['Email Marketing', 'Automation', 'Analytics'],
      currentProjects: ['Newsletter Campaign', 'Lead Nurturing'],
      performance: 'excellent',
      manager: 'Sarah Chen',
      workload: 'medium'
    },
    {
      id: 'MKT-004',
      name: 'Alex Thompson',
      email: 'alex.thompson@annita.com',
      phone: '+1-555-0104',
      position: 'Content Marketing Manager',
      department: 'Marketing & Sales',
      location: 'Remote - Austin',
      hireDate: '2021-11-15',
      status: 'remote',
      specialization: ['Content Strategy', 'SEO', 'Copywriting'],
      currentProjects: ['Blog Content Strategy', 'Whitepaper Series'],
      performance: 'good',
      manager: 'Sarah Chen',
      workload: 'high'
    },
    {
      id: 'MKT-005',
      name: 'Jessica Martinez',
      email: 'jessica.martinez@annita.com',
      phone: '+1-555-0105',
      position: 'PPC Specialist',
      department: 'Marketing & Sales',
      location: 'Headquarters - New York',
      hireDate: '2023-02-28',
      status: 'active',
      specialization: ['PPC Advertising', 'Google Ads', 'Facebook Ads'],
      currentProjects: ['Google Ads Campaign', 'Retargeting Strategy'],
      performance: 'good',
      manager: 'Sarah Chen',
      workload: 'low'
    },
    {
      id: 'MKT-006',
      name: 'David Kim',
      email: 'david.kim@annita.com',
      phone: '+1-555-0106',
      position: 'Marketing Analyst',
      department: 'Marketing & Sales',
      location: 'Headquarters - New York',
      hireDate: '2022-09-15',
      status: 'on-leave',
      specialization: ['Data Analysis', 'Reporting', 'Marketing Analytics'],
      currentProjects: ['Q1 Performance Report'],
      performance: 'average',
      manager: 'Sarah Chen',
      workload: 'low'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cmo') {
      setIsAuthenticated(true)
      setUserRole('cmo')
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

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    const matchesWorkload = filterWorkload === 'all' || member.workload === filterWorkload
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesWorkload
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'remote': return 'bg-blue-100 text-blue-700'
      case 'on-leave': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-purple-100 text-purple-700'
      case 'good': return 'bg-blue-100 text-blue-700'
      case 'average': return 'bg-yellow-100 text-yellow-700'
      case 'improving': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'low': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'high': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const departments = Array.from(new Set(teamMembers.map(member => member.department)))

  const activeCount = teamMembers.filter(m => m.status === 'active').length
  const remoteCount = teamMembers.filter(m => m.status === 'remote').length
  const onLeaveCount = teamMembers.filter(m => m.status === 'on-leave').length

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
        title="CMO Marketing Team - Annita"
        description="CMO marketing team management and organization"
        keywords={['cmo', 'marketing', 'team', 'management', 'organization']}
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
                  onClick={() => router.push('/staff/cmo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Marketing Team</h1>
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
          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Team</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              <p className="text-sm text-gray-500">Marketing professionals</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active</h3>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              <p className="text-sm text-gray-500">Currently working</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Remote</h3>
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{remoteCount}</p>
              <p className="text-sm text-gray-500">Working remotely</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">On Leave</h3>
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{onLeaveCount}</p>
              <p className="text-sm text-gray-500">Currently unavailable</p>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search team members..."
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
                </select>

                <select
                  value={filterWorkload}
                  onChange={(e) => setFilterWorkload(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Workloads</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{member.position}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getWorkloadColor(member.workload)}`}></div>
                      <span className="text-xs text-gray-500">{member.workload}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{member.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Reports to: {member.manager}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialization</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialization.map((spec, index) => (
                        <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Current Projects</p>
                    <div className="space-y-1">
                      {member.currentProjects.map((project, index) => (
                        <div key={index} className="text-xs text-gray-600">• {project}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm text-gray-500">
                    <span>Hired: {member.hireDate}</span>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Team Directory Section */}
          <div className="mt-8">
            <TeamDirectory />
          </div>
        </main>
      </div>
    </>
  )
}
