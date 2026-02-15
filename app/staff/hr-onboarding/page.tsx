'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserCheck, Calendar, Clock, CheckCircle, AlertCircle, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import OnboardingManagement from '@/components/staff/OnboardingManagement'

interface HROnboardingTask {
  id: string
  title: string
  description: string
  category: 'documentation' | 'training' | 'equipment' | 'access' | 'orientation'
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  assignedTo: string
  priority: 'low' | 'medium' | 'high'
  estimatedTime: string
}

interface HROnboardingEmployee {
  id: string
  name: string
  position: string
  department: string
  startDate: string
  status: 'pre-onboarding' | 'day-one' | 'week-one' | 'month-one' | 'completed'
  progress: number
  tasksCompleted: number
  totalTasks: number
  assignedBuddy: string
  manager: string
  onboardingPlan: string[]
}

export default function HROnboardingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [activeTab, setActiveTab] = useState<'employees' | 'tasks'>('employees')

  const [onboardingEmployees, setOnboardingEmployees] = useState<HROnboardingEmployee[]>([
    {
      id: 'ONB-001',
      name: 'Sarah Johnson',
      position: 'Software Engineer',
      department: 'Engineering',
      startDate: '2024-02-19',
      status: 'day-one',
      progress: 25,
      tasksCompleted: 3,
      totalTasks: 12,
      assignedBuddy: 'Mike Chen',
      manager: 'Sarah Chen',
      onboardingPlan: ['HR Documentation', 'IT Setup', 'Team Introduction', 'System Training']
    },
    {
      id: 'ONB-002',
      name: 'David Martinez',
      position: 'Marketing Specialist',
      department: 'Marketing',
      startDate: '2024-02-15',
      status: 'week-one',
      progress: 60,
      tasksCompleted: 9,
      totalTasks: 15,
      assignedBuddy: 'Emily Davis',
      manager: 'Jessica Lee',
      onboardingPlan: ['HR Documentation', 'Marketing Tools', 'Brand Training', 'Campaign Overview']
    },
    {
      id: 'ONB-003',
      name: 'Lisa Wang',
      position: 'Sales Representative',
      department: 'Sales',
      startDate: '2024-02-26',
      status: 'pre-onboarding',
      progress: 10,
      tasksCompleted: 1,
      totalTasks: 10,
      assignedBuddy: 'Tom Wilson',
      manager: 'David Wilson',
      onboardingPlan: ['Pre-employment Check', 'Equipment Setup', 'Sales Training', 'Product Knowledge']
    }
  ])

  const [onboardingTasks, setOnboardingTasks] = useState<HROnboardingTask[]>([
    {
      id: 'TASK-001',
      title: 'Complete Employment Paperwork',
      description: 'Fill out all necessary HR documentation including tax forms, direct deposit, and benefits enrollment',
      category: 'documentation',
      dueDate: '2024-02-19',
      status: 'completed',
      assignedTo: 'Sarah Johnson',
      priority: 'high',
      estimatedTime: '2 hours'
    },
    {
      id: 'TASK-002',
      title: 'IT Equipment Setup',
      description: 'Configure laptop, email, and access to company systems',
      category: 'equipment',
      dueDate: '2024-02-19',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      priority: 'high',
      estimatedTime: '4 hours'
    },
    {
      id: 'TASK-003',
      title: 'Company Orientation Session',
      description: 'Attend company-wide orientation covering culture, policies, and procedures',
      category: 'orientation',
      dueDate: '2024-02-20',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
      priority: 'medium',
      estimatedTime: '3 hours'
    },
    {
      id: 'TASK-004',
      title: 'Product Training',
      description: 'Complete comprehensive product knowledge training',
      category: 'training',
      dueDate: '2024-02-22',
      status: 'pending',
      assignedTo: 'David Martinez',
      priority: 'medium',
      estimatedTime: '6 hours'
    },
    {
      id: 'TASK-005',
      title: 'CRM System Access',
      description: 'Set up access and training for customer relationship management system',
      category: 'access',
      dueDate: '2024-02-21',
      status: 'overdue',
      assignedTo: 'Lisa Wang',
      priority: 'high',
      estimatedTime: '2 hours'
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

  const filteredEmployees = onboardingEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const filteredTasks = onboardingTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pre-onboarding': return 'bg-blue-100 text-blue-700'
      case 'day-one': return 'bg-green-100 text-green-700'
      case 'week-one': return 'bg-yellow-100 text-yellow-700'
      case 'month-one': return 'bg-purple-100 text-purple-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'documentation': return 'bg-purple-100 text-purple-700'
      case 'training': return 'bg-blue-100 text-blue-700'
      case 'equipment': return 'bg-green-100 text-green-700'
      case 'access': return 'bg-orange-100 text-orange-700'
      case 'orientation': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const categories = Array.from(new Set(onboardingTasks.map(task => task.category)))

  const activeOnboarding = onboardingEmployees.filter(e => e.status !== 'completed').length
  const completedOnboarding = onboardingEmployees.filter(e => e.status === 'completed').length
  const pendingTasks = onboardingTasks.filter(t => t.status === 'pending').length
  const overdueTasks = onboardingTasks.filter(t => t.status === 'overdue').length

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
        title="HR Onboarding - Annita"
        description="HR employee onboarding and orientation management"
        keywords={['hr', 'onboarding', 'orientation', 'new hires', 'training']}
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
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Onboarding</h1>
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
          {/* Onboarding Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Onboarding</h3>
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeOnboarding}</p>
              <p className="text-sm text-gray-500">Currently onboarding</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedOnboarding}</p>
              <p className="text-sm text-gray-500">Successfully onboarded</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
              <p className="text-sm text-gray-500">Tasks to complete</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Overdue Tasks</h3>
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{overdueTasks}</p>
              <p className="text-sm text-gray-500">Require attention</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('employees')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'employees'
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Employees ({onboardingEmployees.length})
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'tasks'
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Tasks ({onboardingTasks.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Employees Tab */}
          {activeTab === 'employees' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Onboarding Employees</h2>
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
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pre-onboarding">Pre-Onboarding</option>
                    <option value="day-one">Day One</option>
                    <option value="week-one">Week One</option>
                    <option value="month-one">Month One</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{employee.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{employee.position} • {employee.department}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                            {employee.status.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-gray-500">Starts: {employee.startDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{employee.progress}%</p>
                        <p className="text-sm text-gray-500">{employee.tasksCompleted}/{employee.totalTasks} tasks</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Onboarding Progress</span>
                        <span className="text-sm text-gray-900">{employee.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-pink-500"
                          style={{ width: `${employee.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Manager</p>
                        <p className="text-sm font-medium text-gray-900">{employee.manager}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Assigned Buddy</p>
                        <p className="text-sm text-gray-900">{employee.assignedBuddy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="text-sm text-gray-900">{employee.department}</p>
                      </div>
                    </div>

                    {/* Onboarding Plan */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Onboarding Plan</h4>
                      <div className="flex flex-wrap gap-1">
                        {employee.onboardingPlan.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Employee ID: {employee.id}
                      </div>
                      <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Onboarding Tasks</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
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
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                            {task.category.charAt(0).toUpperCase() + task.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                            <span className="text-xs text-gray-500">{task.priority} priority</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Est. Time</p>
                        <p className="text-sm font-medium text-gray-900">{task.estimatedTime}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Assigned To</p>
                        <p className="text-sm font-medium text-gray-900">{task.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p className={`text-sm font-medium ${
                          new Date(task.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {task.dueDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Priority</p>
                        <p className="text-sm text-gray-900">{task.priority}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Task ID: {task.id}
                      </div>
                      <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onboarding Management Section */}
          <div className="mt-8">
            <OnboardingManagement userRole="hr" />
          </div>
        </main>
      </div>
    </>
  )
}
