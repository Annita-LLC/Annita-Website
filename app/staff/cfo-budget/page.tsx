'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, Calculator, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, Filter, Search, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import BudgetManagement from '@/components/staff/BudgetManagement'
import PayrollManagement from '@/components/staff/PayrollManagement'

interface CFOBudgetItem {
  id: string
  department: string
  category: string
  allocated: string
  spent: string
  remaining: string
  percentageUsed: number
  status: 'on-track' | 'warning' | 'over-budget'
  lastUpdated: string
  manager: string
}

export default function CFOBudgetPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [fiscalYear, setFiscalYear] = useState('2024')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const [budgetItems, setBudgetItems] = useState<CFOBudgetItem[]>([
    {
      id: 'BUD-001',
      department: 'Marketing & Sales',
      category: 'Advertising',
      allocated: '$2,500,000',
      spent: '$1,850,000',
      remaining: '$650,000',
      percentageUsed: 74,
      status: 'on-track',
      lastUpdated: '2024-02-15',
      manager: 'CMO'
    },
    {
      id: 'BUD-002',
      department: 'IT & Technology',
      category: 'Software Licenses',
      allocated: '$1,200,000',
      spent: '$1,350,000',
      remaining: '-$150,000',
      percentageUsed: 112.5,
      status: 'over-budget',
      lastUpdated: '2024-02-14',
      manager: 'CTO'
    },
    {
      id: 'BUD-003',
      department: 'Operations',
      category: 'Facilities',
      allocated: '$800,000',
      spent: '$680,000',
      remaining: '$120,000',
      percentageUsed: 85,
      status: 'warning',
      lastUpdated: '2024-02-13',
      manager: 'COO'
    },
    {
      id: 'BUD-004',
      department: 'Human Resources',
      category: 'Training & Development',
      allocated: '$500,000',
      spent: '$320,000',
      remaining: '$180,000',
      percentageUsed: 64,
      status: 'on-track',
      lastUpdated: '2024-02-12',
      manager: 'HR Director'
    },
    {
      id: 'BUD-005',
      department: 'Finance & Accounting',
      category: 'Audit & Compliance',
      allocated: '$300,000',
      spent: '$280,000',
      remaining: '$20,000',
      percentageUsed: 93.3,
      status: 'warning',
      lastUpdated: '2024-02-11',
      manager: 'CFO'
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

  const filteredBudgetItems = budgetItems.filter(item => {
    const matchesSearch = item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.manager.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || item.department === filterDepartment
    
    return matchesSearch && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-700'
      case 'warning': return 'bg-yellow-100 text-yellow-700'
      case 'over-budget': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getProgressBarColor = (percentageUsed: number) => {
    if (percentageUsed <= 75) return 'bg-green-500'
    if (percentageUsed <= 90) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const departments = Array.from(new Set(budgetItems.map(item => item.department)))

  const totalAllocated = budgetItems.reduce((sum, item) => {
    return sum + parseFloat(item.allocated.replace(/[$,]/g, ''))
  }, 0)

  const totalSpent = budgetItems.reduce((sum, item) => {
    return sum + parseFloat(item.spent.replace(/[$,]/g, ''))
  }, 0)

  const totalRemaining = totalAllocated - totalSpent

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
        title="CFO Budget Management - Annita"
        description="CFO budget management and financial oversight"
        keywords={['cfo', 'budget', 'financial', 'management']}
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
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Budget Management</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={fiscalYear}
                  onChange={(e) => setFiscalYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="2023">FY 2023</option>
                  <option value="2024">FY 2024</option>
                  <option value="2025">FY 2025</option>
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
          <BudgetManagement userRole={userRole} />
          
          {/* Payroll Management Section */}
          <div className="mt-8">
            <PayrollManagement userRole="cfo" />
          </div>
        </main>
      </div>
    </>
  )
}
