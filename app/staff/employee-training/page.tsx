'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Clock, CheckCircle, Calendar, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import TrainingDevelopment from '@/components/staff/TrainingDevelopment'

interface EmployeeTraining {
  id: string
  title: string
  category: 'technical' | 'leadership' | 'compliance' | 'soft-skills' | 'safety'
  type: 'online' | 'in-person' | 'workshop' | 'webinar'
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue'
  progress: number
  startDate: string
  endDate: string
  duration: string
  instructor: string
  description: string
  skills: string[]
  certificate: boolean
  score?: number
  lastAccessed?: string
  nextSession?: string
}

export default function EmployeeTrainingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const [trainings, setTrainings] = useState<EmployeeTraining[]>([
    {
      id: 'TRN-001',
      title: 'Advanced React Development',
      category: 'technical',
      type: 'online',
      status: 'in-progress',
      progress: 65,
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      duration: '6 weeks',
      instructor: 'John Smith',
      description: 'Advanced React.js development including hooks, state management, and performance optimization',
      skills: ['React Hooks', 'State Management', 'Performance', 'Testing'],
      certificate: true,
      lastAccessed: '2024-02-14',
      nextSession: '2024-02-20'
    },
    {
      id: 'TRN-002',
      title: 'Leadership Excellence Program',
      category: 'leadership',
      type: 'workshop',
      status: 'not-started',
      progress: 0,
      startDate: '2024-03-01',
      endDate: '2024-04-26',
      duration: '8 weeks',
      instructor: 'Dr. Sarah Mitchell',
      description: 'Comprehensive leadership development program for aspiring managers',
      skills: ['Strategic Thinking', 'Team Management', 'Communication', 'Decision Making'],
      certificate: true
    },
    {
      id: 'TRN-003',
      title: 'Data Privacy and Compliance',
      category: 'compliance',
      type: 'online',
      status: 'completed',
      progress: 100,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      duration: '4 hours',
      instructor: 'Legal Department',
      description: 'Mandatory training on data privacy regulations and compliance requirements',
      skills: ['GDPR', 'Data Protection', 'Privacy Policies', 'Compliance'],
      certificate: true,
      score: 92,
      lastAccessed: '2024-02-10'
    },
    {
      id: 'TRN-004',
      title: 'Effective Communication Skills',
      category: 'soft-skills',
      type: 'in-person',
      status: 'completed',
      progress: 100,
      startDate: '2024-01-20',
      endDate: '2024-01-21',
      duration: '2 days',
      instructor: 'Emily Davis',
      description: 'Interactive workshop on improving workplace communication and interpersonal skills',
      skills: ['Active Listening', 'Conflict Resolution', 'Presentation Skills'],
      certificate: true,
      score: 88,
      lastAccessed: '2024-01-21'
    },
    {
      id: 'TRN-005',
      title: 'Workplace Safety Training',
      category: 'safety',
      type: 'in-person',
      status: 'overdue',
      progress: 0,
      startDate: '2024-02-01',
      endDate: '2024-02-01',
      duration: '1 day',
      instructor: 'Safety Department',
      description: 'Mandatory workplace safety training and emergency procedures',
      skills: ['Safety Procedures', 'Emergency Response', 'OSHA Compliance'],
      certificate: true
    },
    {
      id: 'TRN-006',
      title: 'Python for Data Analysis',
      category: 'technical',
      type: 'online',
      status: 'not-started',
      progress: 0,
      startDate: '2024-04-01',
      endDate: '2024-05-15',
      duration: '6 weeks',
      instructor: 'Data Science Team',
      description: 'Learn Python programming for data analysis and visualization',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization'],
      certificate: true
    }
  ])

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
    localStorage.removeItem('staff-employee-id')
    localStorage.removeItem('staff-role')
    router.push('/staff/login')
  }

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || training.category === filterCategory
    const matchesStatus = filterStatus === 'all' || training.status === filterStatus
    const matchesType = filterType === 'all' || training.type === filterType
    
    return matchesSearch && matchesCategory && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-700'
      case 'leadership': return 'bg-purple-100 text-purple-700'
      case 'compliance': return 'bg-red-100 text-red-700'
      case 'soft-skills': return 'bg-green-100 text-green-700'
      case 'safety': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'online': return 'bg-blue-100 text-blue-700'
      case 'in-person': return 'bg-green-100 text-green-700'
      case 'workshop': return 'bg-orange-100 text-orange-700'
      case 'webinar': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const categories = Array.from(new Set(trainings.map(training => training.category)))
  const types = Array.from(new Set(trainings.map(training => training.type)))

  const completedCount = trainings.filter(t => t.status === 'completed').length
  const inProgressCount = trainings.filter(t => t.status === 'in-progress').length
  const notStartedCount = trainings.filter(t => t.status === 'not-started').length
  const overdueCount = trainings.filter(t => t.status === 'overdue').length
  const avgProgress = trainings.reduce((sum, training) => sum + training.progress, 0) / trainings.length

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
        title="Employee Training - Annita"
        description="Employee training and development programs"
        keywords={['employee', 'training', 'development', 'learning', 'education']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/employee-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">My Training</h1>
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
          {/* Training Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              <p className="text-sm text-gray-500">Training completed</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">In Progress</h3>
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
              <p className="text-sm text-gray-500">Currently learning</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Not Started</h3>
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{notStartedCount}</p>
              <p className="text-sm text-gray-500">Awaiting start</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Overdue</h3>
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
              <p className="text-sm text-gray-500">Require attention</p>
            </div>
          </div>

          {/* Training List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Training Programs</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search training..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTrainings.map((training) => (
                <div key={training.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{training.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(training.status)}`}>
                          {training.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(training.category)}`}>
                          {training.category.replace('-', ' ').charAt(0).toUpperCase() + training.category.replace('-', ' ').slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(training.type)}`}>
                          {training.type.replace('-', ' ').charAt(0).toUpperCase() + training.type.replace('-', ' ').slice(1)}
                        </span>
                        {training.certificate && (
                          <span className="flex items-center space-x-1 text-xs text-gray-500">
                            <CheckCircle className="w-3 h-3" />
                            <span>Certificate</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{training.progress}%</p>
                      <p className="text-sm text-gray-500">progress</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Instructor</p>
                      <p className="text-sm font-medium text-gray-900">{training.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-sm text-gray-900">{training.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="text-sm text-gray-900">{training.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="text-sm text-gray-900">{training.endDate}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Course Progress</span>
                      <span className="text-sm text-gray-900">{training.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(training.progress)}`}
                        style={{ width: `${training.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Covered</h4>
                    <div className="flex flex-wrap gap-1">
                      {training.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {training.score && (
                      <div>
                        <p className="text-sm text-gray-500">Score</p>
                        <p className="text-sm font-medium text-gray-900">{training.score}%</p>
                      </div>
                    )}
                    {training.lastAccessed && (
                      <div>
                        <p className="text-sm text-gray-500">Last Accessed</p>
                        <p className="text-sm text-gray-900">{training.lastAccessed}</p>
                      </div>
                    )}
                    {training.nextSession && (
                      <div>
                        <p className="text-sm text-gray-500">Next Session</p>
                        <p className="text-sm text-gray-900">{training.nextSession}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {training.status === 'not-started' && '📚 Ready to start'}
                      {training.status === 'in-progress' && '📖 Currently learning'}
                      {training.status === 'completed' && '✅ Successfully completed'}
                      {training.status === 'overdue' && '⚠️ Overdue - Complete now'}
                    </div>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      {training.status === 'not-started' ? 'Start Training' : 
                       training.status === 'in-progress' ? 'Continue Learning' :
                       training.status === 'completed' ? 'View Certificate' : 'Complete Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTrainings.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No training found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Training Development Section */}
          <div className="mt-8">
            <TrainingDevelopment />
          </div>
        </main>
      </div>
    </>
  )
}
