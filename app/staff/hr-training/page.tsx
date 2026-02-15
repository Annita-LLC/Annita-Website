'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Users, Calendar, TrendingUp, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import TrainingDevelopment from '@/components/staff/TrainingDevelopment'

interface HRTrainingProgram {
  id: string
  title: string
  category: 'technical' | 'leadership' | 'compliance' | 'soft-skills' | 'safety' | 'onboarding'
  type: 'online' | 'in-person' | 'hybrid' | 'workshop' | 'webinar'
  status: 'active' | 'completed' | 'upcoming' | 'cancelled'
  duration: string
  cost: string
  instructor: string
  maxParticipants: number
  currentParticipants: number
  startDate: string
  endDate: string
  description: string
  skills: string[]
  prerequisites: string[]
}

interface HRTrainingEnrollment {
  id: string
  employeeName: string
  employeeId: string
  department: string
  programTitle: string
  programId: string
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped' | 'pending'
  enrollmentDate: string
  completionDate?: string
  progress: number
  score?: number
  certificate: boolean
  feedback?: string
}

export default function HRTrainingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState<'programs' | 'enrollments'>('programs')

  const [trainingPrograms, setTrainingPrograms] = useState<HRTrainingProgram[]>([
    {
      id: 'TRN-001',
      title: 'Leadership Excellence Program',
      category: 'leadership',
      type: 'hybrid',
      status: 'active',
      duration: '8 weeks',
      cost: '$2,500',
      instructor: 'Dr. Sarah Mitchell',
      maxParticipants: 25,
      currentParticipants: 18,
      startDate: '2024-03-01',
      endDate: '2024-04-26',
      description: 'Comprehensive leadership development program for managers and team leads',
      skills: ['Strategic Thinking', 'Team Management', 'Communication', 'Decision Making'],
      prerequisites: ['2+ years management experience', 'Manager approval']
    },
    {
      id: 'TRN-002',
      title: 'Advanced React Development',
      category: 'technical',
      type: 'online',
      status: 'upcoming',
      duration: '6 weeks',
      cost: '$1,200',
      instructor: 'John Smith',
      maxParticipants: 30,
      currentParticipants: 12,
      startDate: '2024-03-15',
      endDate: '2024-04-26',
      description: 'Advanced React.js development including hooks, state management, and performance optimization',
      skills: ['React Hooks', 'State Management', 'Performance', 'Testing'],
      prerequisites: ['Basic React knowledge', 'JavaScript proficiency']
    },
    {
      id: 'TRN-003',
      title: 'Workplace Safety Training',
      category: 'safety',
      type: 'in-person',
      status: 'active',
      duration: '1 day',
      cost: '$150',
      instructor: 'Safety Department',
      maxParticipants: 50,
      currentParticipants: 35,
      startDate: '2024-02-20',
      endDate: '2024-02-20',
      description: 'Mandatory workplace safety training and emergency procedures',
      skills: ['Safety Procedures', 'Emergency Response', 'OSHA Compliance'],
      prerequisites: ['All employees']
    },
    {
      id: 'TRN-004',
      title: 'Effective Communication Skills',
      category: 'soft-skills',
      type: 'workshop',
      status: 'completed',
      duration: '2 days',
      cost: '$800',
      instructor: 'Emily Davis',
      maxParticipants: 20,
      currentParticipants: 20,
      startDate: '2024-02-01',
      endDate: '2024-02-02',
      description: 'Interactive workshop on improving workplace communication and interpersonal skills',
      skills: ['Active Listening', 'Conflict Resolution', 'Presentation Skills'],
      prerequisites: ['None']
    },
    {
      id: 'TRN-005',
      title: 'New Employee Onboarding',
      category: 'onboarding',
      type: 'hybrid',
      status: 'active',
      duration: '1 week',
      cost: '$0',
      instructor: 'HR Team',
      maxParticipants: 15,
      currentParticipants: 8,
      startDate: '2024-02-19',
      endDate: '2024-02-23',
      description: 'Comprehensive onboarding program for new hires',
      skills: ['Company Culture', 'Policies', 'Systems Training', 'Team Integration'],
      prerequisites: ['New hires only']
    },
    {
      id: 'TRN-006',
      title: 'Data Privacy and Compliance',
      category: 'compliance',
      type: 'online',
      status: 'active',
      duration: '4 hours',
      cost: '$300',
      instructor: 'Legal Department',
      maxParticipants: 100,
      currentParticipants: 67,
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      description: 'Mandatory training on data privacy regulations and compliance requirements',
      skills: ['GDPR', 'Data Protection', 'Privacy Policies', 'Compliance'],
      prerequisites: ['All employees handling data']
    }
  ])

  const [enrollments, setEnrollments] = useState<HRTrainingEnrollment[]>([
    {
      id: 'ENR-001',
      employeeName: 'John Smith',
      employeeId: 'E1001',
      department: 'Engineering',
      programTitle: 'Leadership Excellence Program',
      programId: 'TRN-001',
      status: 'in-progress',
      enrollmentDate: '2024-03-01',
      progress: 45,
      certificate: false
    },
    {
      id: 'ENR-002',
      employeeName: 'Sarah Chen',
      employeeId: 'E1002',
      department: 'Engineering',
      programTitle: 'Advanced React Development',
      programId: 'TRN-002',
      status: 'enrolled',
      enrollmentDate: '2024-02-10',
      progress: 0,
      certificate: false
    },
    {
      id: 'ENR-003',
      employeeName: 'Mike Johnson',
      employeeId: 'E1003',
      department: 'Marketing',
      programTitle: 'Effective Communication Skills',
      programId: 'TRN-004',
      status: 'completed',
      enrollmentDate: '2024-02-01',
      completionDate: '2024-02-02',
      progress: 100,
      score: 92,
      certificate: true,
      feedback: 'Excellent course, very practical and engaging.'
    },
    {
      id: 'ENR-004',
      employeeName: 'Emily Davis',
      employeeId: 'E1004',
      department: 'Human Resources',
      programTitle: 'Data Privacy and Compliance',
      programId: 'TRN-006',
      status: 'in-progress',
      enrollmentDate: '2024-02-15',
      progress: 75,
      certificate: false
    },
    {
      id: 'ENR-005',
      employeeName: 'Alex Thompson',
      employeeId: 'E1005',
      department: 'Sales',
      programTitle: 'Workplace Safety Training',
      programId: 'TRN-003',
      status: 'completed',
      enrollmentDate: '2024-02-18',
      completionDate: '2024-02-20',
      progress: 100,
      score: 88,
      certificate: true
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

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory
    const matchesType = filterType === 'all' || program.type === filterType
    const matchesStatus = filterStatus === 'all' || program.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus
  })

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.programTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || enrollment.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      case 'enrolled': return 'bg-blue-100 text-blue-700'
      case 'in-progress': return 'bg-yellow-100 text-yellow-700'
      case 'dropped': return 'bg-red-100 text-red-700'
      case 'pending': return 'bg-orange-100 text-orange-700'
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
      case 'onboarding': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'online': return 'bg-blue-100 text-blue-700'
      case 'in-person': return 'bg-green-100 text-green-700'
      case 'hybrid': return 'bg-purple-100 text-purple-700'
      case 'workshop': return 'bg-orange-100 text-orange-700'
      case 'webinar': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const categories = Array.from(new Set(trainingPrograms.map(program => program.category)))
  const types = Array.from(new Set(trainingPrograms.map(program => program.type)))

  const activePrograms = trainingPrograms.filter(p => p.status === 'active').length
  const totalEnrollments = trainingPrograms.reduce((sum, program) => sum + program.currentParticipants, 0)
  const completedEnrollments = enrollments.filter(e => e.status === 'completed').length
  const inProgressEnrollments = enrollments.filter(e => e.status === 'in-progress').length

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
        title="HR Training & Development - Annita"
        description="HR training programs and employee development management"
        keywords={['hr', 'training', 'development', 'learning', 'education']}
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
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Training & Development</h1>
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
          <TrainingDevelopment />
        </main>
      </div>
    </>
  )
}
