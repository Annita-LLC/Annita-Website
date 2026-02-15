'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Target, TrendingUp, Calendar, CheckCircle, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import GoalsObjectives from '@/components/staff/GoalsObjectives'

interface ManagerGoal {
  id: string
  title: string
  category: 'performance' | 'development' | 'project' | 'team' | 'personal'
  status: 'not-started' | 'in-progress' | 'on-track' | 'at-risk' | 'completed' | 'missed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignee: string
  employeeId: string
  department: string
  startDate: string
  dueDate: string
  completedDate?: string
  description: string
  progress: number
  kpis: string[]
  milestones: GoalMilestone[]
  resources: string[]
  notes?: string
}

interface GoalMilestone {
  id: string
  title: string
  dueDate: string
  completed: boolean
  completedDate?: string
}

export default function ManagerGoalsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterAssignee, setFilterAssignee] = useState('all')

  const [goals, setGoals] = useState<ManagerGoal[]>([
    {
      id: 'GOAL-001',
      title: 'Increase Team Productivity by 15%',
      category: 'performance',
      status: 'on-track',
      priority: 'high',
      assignee: 'John Smith',
      employeeId: 'E1001',
      department: 'Engineering',
      startDate: '2024-01-01',
      dueDate: '2024-03-31',
      description: 'Improve overall team productivity through process optimization and tool adoption',
      progress: 65,
      kpis: ['Code commits per week', 'Task completion rate', 'Bug reduction rate', 'Sprint velocity'],
      milestones: [
        { id: 'MIL-001', title: 'Process Analysis', dueDate: '2024-01-15', completed: true, completedDate: '2024-01-14' },
        { id: 'MIL-002', title: 'Tool Implementation', dueDate: '2024-02-15', completed: true, completedDate: '2024-02-12' },
        { id: 'MIL-003', title: 'Team Training', dueDate: '2024-03-15', completed: false }
      ],
      resources: ['Process automation tools', 'Training budget', 'Consulting services'],
      notes: 'Team showing good progress. New tools have been well received.'
    },
    {
      id: 'GOAL-002',
      title: 'Complete React Advanced Certification',
      category: 'development',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Sarah Chen',
      employeeId: 'E1002',
      department: 'Engineering',
      startDate: '2024-01-15',
      dueDate: '2024-04-30',
      description: 'Obtain advanced React certification to improve technical skills',
      progress: 40,
      kpis: ['Course completion', 'Practice projects', 'Exam score', 'Knowledge application'],
      milestones: [
        { id: 'MIL-004', title: 'Course Enrollment', dueDate: '2024-01-31', completed: true, completedDate: '2024-01-28' },
        { id: 'MIL-005', title: 'Complete 50% Course', dueDate: '2024-03-15', completed: false },
        { id: 'MIL-006', title: 'Take Exam', dueDate: '2024-04-30', completed: false }
      ],
      resources: ['Online course subscription', 'Study materials', 'Practice environment'],
      notes: 'Making good progress. Need to allocate more study time.'
    },
    {
      id: 'GOAL-003',
      title: 'Launch E-commerce Platform Redesign',
      category: 'project',
      status: 'at-risk',
      priority: 'critical',
      assignee: 'Mike Johnson',
      employeeId: 'E1003',
      department: 'Marketing',
      startDate: '2024-01-01',
      dueDate: '2024-02-28',
      description: 'Complete redesign and launch of the e-commerce platform',
      progress: 75,
      kpis: ['Launch date', 'User adoption', 'Conversion rate', 'Performance metrics'],
      milestones: [
        { id: 'MIL-007', title: 'Design Completion', dueDate: '2024-01-15', completed: true, completedDate: '2024-01-12' },
        { id: 'MIL-008', title: 'Development Phase', dueDate: '2024-02-15', completed: true, completedDate: '2024-02-14' },
        { id: 'MIL-009', title: 'Launch', dueDate: '2024-02-28', completed: false }
      ],
      resources: ['Development team', 'Design resources', 'Testing environment'],
      notes: 'Development complete but facing unexpected technical issues with payment gateway integration.'
    },
    {
      id: 'GOAL-004',
      title: 'Improve Team Communication',
      category: 'team',
      status: 'completed',
      priority: 'medium',
      assignee: 'Emily Davis',
      employeeId: 'E1004',
      department: 'Design',
      startDate: '2024-01-01',
      dueDate: '2024-02-15',
      completedDate: '2024-02-12',
      description: 'Enhance team communication through regular meetings and better tools',
      progress: 100,
      kpis: ['Meeting effectiveness', 'Response time', 'Feedback quality', 'Team satisfaction'],
      milestones: [
        { id: 'MIL-010', title: 'Communication Audit', dueDate: '2024-01-15', completed: true, completedDate: '2024-01-14' },
        { id: 'MIL-011', title: 'Tool Implementation', dueDate: '2024-01-31', completed: true, completedDate: '2024-01-30' },
        { id: 'MIL-012', title: 'Process Evaluation', dueDate: '2024-02-15', completed: true, completedDate: '2024-02-12' }
      ],
      resources: ['Communication tools', 'Meeting facilitation training', 'Feedback system'],
      notes: 'Successfully implemented new communication tools and processes. Team satisfaction improved significantly.'
    },
    {
      id: 'GOAL-005',
      title: 'Reduce Customer Response Time',
      category: 'performance',
      status: 'not-started',
      priority: 'high',
      assignee: 'Alex Thompson',
      employeeId: 'E1005',
      department: 'Analytics',
      startDate: '2024-03-01',
      dueDate: '2024-05-31',
      description: 'Reduce average customer response time from 24 hours to 12 hours',
      progress: 0,
      kpis: ['Response time', 'Customer satisfaction', 'Ticket resolution rate', 'Team efficiency'],
      milestones: [
        { id: 'MIL-013', title: 'Current Process Analysis', dueDate: '2024-03-15', completed: false },
        { id: 'MIL-014', title: 'System Optimization', dueDate: '2024-04-15', completed: false },
        { id: 'MIL-015', title: 'Team Training', dueDate: '2024-05-15', completed: false }
      ],
      resources: ['Customer service tools', 'Training materials', 'Process documentation'],
      notes: 'Goal to start in March. Currently gathering requirements and analyzing current processes.'
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

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || goal.category === filterCategory
    const matchesStatus = filterStatus === 'all' || goal.status === filterStatus
    const matchesPriority = filterPriority === 'all' || goal.priority === filterPriority
    const matchesAssignee = filterAssignee === 'all' || goal.assignee === filterAssignee
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesAssignee
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'on-track': return 'bg-green-100 text-green-700'
      case 'at-risk': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'missed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-700'
      case 'development': return 'bg-purple-100 text-purple-700'
      case 'project': return 'bg-green-100 text-green-700'
      case 'team': return 'bg-orange-100 text-orange-700'
      case 'personal': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const categories = Array.from(new Set(goals.map(goal => goal.category)))
  const assignees = Array.from(new Set(goals.map(goal => goal.assignee)))

  const totalGoals = goals.length
  const completedGoals = goals.filter(g => g.status === 'completed').length
  const onTrackGoals = goals.filter(g => g.status === 'on-track').length
  const atRiskGoals = goals.filter(g => g.status === 'at-risk').length
  const avgProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length

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
        title="Manager Goals & Objectives - Annita"
        description="Manager goals and objectives management and tracking"
        keywords={['manager', 'goals', 'objectives', 'performance', 'tracking']}
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
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Goals & Objectives</h1>
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
          {/* Goals Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Goals</h3>
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalGoals}</p>
              <p className="text-sm text-gray-500">Active goals</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedGoals}</p>
              <p className="text-sm text-gray-500">Achieved goals</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">On Track</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{onTrackGoals}</p>
              <p className="text-sm text-gray-500">Progressing well</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">At Risk</h3>
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{atRiskGoals}</p>
              <p className="text-sm text-gray-500">Need attention</p>
            </div>
          </div>

          {/* Goals List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Team Goals</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search goals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterAssignee}
                  onChange={(e) => setFilterAssignee(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Assignees</option>
                  {assignees.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
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
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="on-track">On Track</option>
                  <option value="at-risk">At Risk</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredGoals.map((goal) => (
                <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                          {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(goal.priority)}`}></div>
                          <span className="text-xs text-gray-500">{goal.priority} priority</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{goal.progress}%</p>
                      <p className="text-sm text-gray-500">progress</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Assignee</p>
                      <p className="text-sm font-medium text-gray-900">{goal.assignee}</p>
                      <p className="text-xs text-gray-500">{goal.employeeId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-sm text-gray-900">{goal.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="text-sm text-gray-900">{goal.startDate} - {goal.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-sm text-gray-900">{goal.completedDate || 'In Progress'}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Goal Progress</span>
                      <span className="text-sm text-gray-900">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Performance Indicators</h4>
                    <div className="flex flex-wrap gap-1">
                      {goal.kpis.map((kpi, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {kpi}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone, index) => (
                        <div key={milestone.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                            <span className="text-gray-600">{milestone.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500">{milestone.dueDate}</span>
                            {milestone.completed && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Resources</h4>
                    <div className="flex flex-wrap gap-1">
                      {goal.resources.map((resource, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {goal.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600">{goal.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Goal ID: {goal.id}
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredGoals.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Goals Objectives Section */}
          <div className="mt-8">
            <GoalsObjectives userRole="manager" />
          </div>
        </main>
      </div>
    </>
  )
}
