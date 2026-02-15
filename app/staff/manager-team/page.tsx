'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, TrendingUp, TrendingDown, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import TeamDirectory from '@/components/staff/TeamDirectory'
import TeamPerformanceDashboard from '@/components/staff/TeamPerformanceDashboard'

interface ManagerTeamMember {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  status: 'active' | 'on-leave' | 'remote'
  performance: 'excellent' | 'good' | 'average' | 'improving'
  productivity: number
  projectsCompleted: number
  currentProjects: number
  lastReview: string
  nextReview: string
  skills: string[]
  goals: string[]
}

export default function ManagerTeamPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPerformance, setFilterPerformance] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [teamMembers, setTeamMembers] = useState<ManagerTeamMember[]>([
    {
      id: 'TM-001',
      name: 'John Smith',
      email: 'john.smith@annita.com',
      phone: '+1-555-0101',
      position: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      performance: 'excellent',
      productivity: 92,
      projectsCompleted: 8,
      currentProjects: 2,
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      goals: ['Lead a major project', 'Mentor junior developers', 'Complete AWS certification']
    },
    {
      id: 'TM-002',
      name: 'Sarah Chen',
      email: 'sarah.chen@annita.com',
      phone: '+1-555-0102',
      position: 'UX Designer',
      department: 'Design',
      status: 'remote',
      performance: 'good',
      productivity: 85,
      projectsCompleted: 6,
      currentProjects: 3,
      lastReview: '2024-01-20',
      nextReview: '2024-04-20',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      goals: ['Improve design system', 'Lead user research project', 'Mentor junior designers']
    },
    {
      id: 'TM-003',
      name: 'Mike Johnson',
      email: 'mike.johnson@annita.com',
      phone: '+1-555-0103',
      position: 'Marketing Specialist',
      department: 'Marketing',
      status: 'active',
      performance: 'good',
      productivity: 78,
      projectsCompleted: 5,
      currentProjects: 2,
      lastReview: '2024-01-10',
      nextReview: '2024-04-10',
      skills: ['Digital Marketing', 'SEO', 'Content Creation', 'Analytics'],
      goals: ['Increase organic traffic by 20%', 'Launch new campaign', 'Complete Google Analytics certification']
    },
    {
      id: 'TM-004',
      name: 'Emily Davis',
      email: 'emily.davis@annita.com',
      phone: '+1-555-0104',
      position: 'Junior Developer',
      department: 'Engineering',
      status: 'active',
      performance: 'average',
      productivity: 70,
      projectsCompleted: 3,
      currentProjects: 1,
      lastReview: '2024-01-25',
      nextReview: '2024-04-25',
      skills: ['JavaScript', 'React', 'CSS', 'Git'],
      goals: ['Complete React advanced course', 'Contribute to open source', 'Improve code review skills']
    },
    {
      id: 'TM-005',
      name: 'Alex Thompson',
      email: 'alex.thompson@annita.com',
      phone: '+1-555-0105',
      position: 'Data Analyst',
      department: 'Analytics',
      status: 'on-leave',
      performance: 'excellent',
      productivity: 88,
      projectsCompleted: 7,
      currentProjects: 1,
      lastReview: '2024-01-05',
      nextReview: '2024-04-05',
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
      goals: ['Complete ML certification', 'Lead data visualization project', 'Improve dashboard performance']
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

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPerformance = filterPerformance === 'all' || member.performance === filterPerformance
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    
    return matchesSearch && matchesPerformance && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'on-leave': return 'bg-yellow-100 text-yellow-700'
      case 'remote': return 'bg-blue-100 text-blue-700'
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

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return 'text-green-600'
    if (productivity >= 80) return 'text-blue-600'
    if (productivity >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const activeCount = teamMembers.filter(m => m.status === 'active').length
  const remoteCount = teamMembers.filter(m => m.status === 'remote').length
  const onLeaveCount = teamMembers.filter(m => m.status === 'on-leave').length
  const avgProductivity = teamMembers.reduce((sum, m) => sum + m.productivity, 0) / teamMembers.length

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
        title="Manager Team Performance - Annita"
        description="Manager team performance and employee management"
        keywords={['manager', 'team', 'performance', 'employees', 'management']}
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
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Team Performance</h1>
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
          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Team Size</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              <p className="text-sm text-gray-500">Total team members</p>
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
                <h3 className="text-lg font-semibold text-gray-900">Avg Productivity</h3>
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <p className={`text-2xl font-bold ${getProductivityColor(avgProductivity)}`}>
                {avgProductivity.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-500">Team average</p>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <select
                  value={filterPerformance}
                  onChange={(e) => setFilterPerformance(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Performance</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="improving">Improving</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="remote">Remote</option>
                  <option value="on-leave">On Leave</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{member.position} • {member.department}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getProductivityColor(member.productivity)}`}>
                        {member.productivity}%
                      </p>
                      <p className="text-sm text-gray-500">productivity</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{member.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">{member.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Projects</p>
                      <p className="text-sm font-medium text-gray-900">{member.currentProjects} active, {member.projectsCompleted} completed</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Review</p>
                      <p className="text-sm text-gray-900">{member.nextReview}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Current Goals</h4>
                    <div className="space-y-1">
                      {member.goals.slice(0, 2).map((goal, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{goal}</span>
                        </div>
                      ))}
                      {member.goals.length > 2 && (
                        <div className="text-sm text-gray-500">+{member.goals.length - 2} more goals</div>
                      )}
                    </div>
                  </div>

                  {/* Productivity Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Productivity Score</span>
                      <span className={`text-sm font-medium ${getProductivityColor(member.productivity)}`}>
                        {member.productivity}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          member.productivity >= 90 ? 'bg-green-500' :
                          member.productivity >= 80 ? 'bg-blue-500' :
                          member.productivity >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${member.productivity}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last review: {member.lastReview}
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View Details
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

          {/* Team Performance Dashboard Section */}
          <div className="mt-8">
            <TeamPerformanceDashboard userRole="manager" />
          </div>
        </main>
      </div>
    </>
  )
}
