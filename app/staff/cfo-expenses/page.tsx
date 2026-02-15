'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Receipt, DollarSign, TrendingUp, TrendingDown, Search, Filter, Download, Calendar, User, CheckCircle, AlertCircle, Clock, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import ExpenseManagement from '@/components/staff/ExpenseManagement'

interface CFOExpense {
  id: string
  employeeId: string
  employeeName: string
  department: string
  category: string
  description: string
  amount: string
  date: string
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed'
  submittedDate: string
  receiptAttached: boolean
  priority: 'low' | 'medium' | 'high'
  manager: string
}

export default function CFOExpensesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [timeRange, setTimeRange] = useState('month')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const [expenses, setExpenses] = useState<CFOExpense[]>([
    {
      id: 'EXP-001',
      employeeId: 'ANN-001234',
      employeeName: 'Sarah Johnson',
      department: 'Executive Management',
      category: 'Travel & Transportation',
      description: 'Flight and hotel for NYC investor meeting',
      amount: '$2,450.00',
      date: '2024-02-14',
      status: 'approved',
      submittedDate: '2024-02-15',
      receiptAttached: true,
      priority: 'high',
      manager: 'CEO'
    },
    {
      id: 'EXP-002',
      employeeId: 'ANN-001235',
      employeeName: 'Michael Chen',
      department: 'Marketing & Sales',
      category: 'Meals & Entertainment',
      description: 'Client dinner with TechCorp executives',
      amount: '$450.00',
      date: '2024-02-13',
      status: 'pending',
      submittedDate: '2024-02-14',
      receiptAttached: true,
      priority: 'medium',
      manager: 'CMO'
    },
    {
      id: 'EXP-003',
      employeeId: 'ANN-001236',
      employeeName: 'Emily Rodriguez',
      department: 'Operations',
      category: 'Office Supplies',
      description: 'New office equipment for West Coast office',
      amount: '$1,200.00',
      date: '2024-02-12',
      status: 'reimbursed',
      submittedDate: '2024-02-13',
      receiptAttached: true,
      priority: 'low',
      manager: 'COO'
    },
    {
      id: 'EXP-004',
      employeeId: 'ANN-001237',
      employeeName: 'David Kim',
      department: 'Human Resources',
      category: 'Training & Development',
      description: 'HR conference registration and materials',
      amount: '$850.00',
      date: '2024-02-11',
      status: 'approved',
      submittedDate: '2024-02-12',
      receiptAttached: true,
      priority: 'medium',
      manager: 'HR Director'
    },
    {
      id: 'EXP-005',
      employeeId: 'ANN-001238',
      employeeName: 'Jessica Taylor',
      department: 'IT & Technology',
      category: 'Software & Subscriptions',
      description: 'Annual software license renewal',
      amount: '$3,200.00',
      date: '2024-02-10',
      status: 'rejected',
      submittedDate: '2024-02-11',
      receiptAttached: false,
      priority: 'high',
      manager: 'CTO'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cfo') {
      setIsAuthenticated(true)
      setUserRole('cfo')
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

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || expense.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || expense.status === filterStatus
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'approved': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      case 'reimbursed': return 'bg-blue-100 text-blue-700'
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

  const departments = Array.from(new Set(expenses.map(expense => expense.department)))
  const categories = Array.from(new Set(expenses.map(expense => expense.category)))

  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + parseFloat(expense.amount.replace(/[$,]/g, ''))
  }, 0)

  const pendingCount = expenses.filter(e => e.status === 'pending').length
  const approvedCount = expenses.filter(e => e.status === 'approved').length
  const reimbursedCount = expenses.filter(e => e.status === 'reimbursed').length

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
        title="CFO Expense Reports - Annita"
        description="CFO expense reports and reimbursement management"
        keywords={['cfo', 'expenses', 'reimbursement', 'reports']}
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
                  onClick={() => router.push('/staff/cfo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Expense Reports</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ExpenseManagement />
        </main>
      </div>
    </>
  )
}
