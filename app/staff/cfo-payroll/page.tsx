'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, CreditCard, Users, Calendar, Download, Search, Filter, CheckCircle, AlertCircle, Clock, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import PayrollManagement from '@/components/staff/PayrollManagement'

interface CFOPayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  department: string
  position: string
  baseSalary: string
  bonus: string
  deductions: string
  netPay: string
  payPeriod: string
  status: 'processed' | 'pending' | 'failed'
  paymentDate: string
  paymentMethod: string
}

export default function CFOPayrollPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [payPeriod, setPayPeriod] = useState('2024-02')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [payrollRecords, setPayrollRecords] = useState<CFOPayrollRecord[]>([
    {
      id: 'PAY-001',
      employeeId: 'ANN-001234',
      employeeName: 'Sarah Johnson',
      department: 'Executive Management',
      position: 'Chief Financial Officer',
      baseSalary: '$20,833.33',
      bonus: '$5,000.00',
      deductions: '$3,250.00',
      netPay: '$22,583.33',
      payPeriod: '2024-02',
      status: 'processed',
      paymentDate: '2024-02-15',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 'PAY-002',
      employeeId: 'ANN-001235',
      employeeName: 'Michael Chen',
      department: 'Marketing & Sales',
      position: 'Chief Marketing Officer',
      baseSalary: '$18,333.33',
      bonus: '$3,000.00',
      deductions: '$2,950.00',
      netPay: '$18,383.33',
      payPeriod: '2024-02',
      status: 'processed',
      paymentDate: '2024-02-15',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 'PAY-003',
      employeeId: 'ANN-001236',
      employeeName: 'Emily Rodriguez',
      department: 'Operations',
      position: 'Chief Operating Officer',
      baseSalary: '$20,000.00',
      bonus: '$4,000.00',
      deductions: '$3,100.00',
      netPay: '$20,900.00',
      payPeriod: '2024-02',
      status: 'processed',
      paymentDate: '2024-02-15',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 'PAY-004',
      employeeId: 'ANN-001237',
      employeeName: 'David Kim',
      department: 'Human Resources',
      position: 'HR Director',
      baseSalary: '$10,000.00',
      bonus: '$1,500.00',
      deductions: '$1,650.00',
      netPay: '$9,850.00',
      payPeriod: '2024-02',
      status: 'pending',
      paymentDate: '2024-02-16',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 'PAY-005',
      employeeId: 'ANN-001238',
      employeeName: 'Jessica Taylor',
      department: 'IT & Technology',
      position: 'IT Manager',
      baseSalary: '$9,166.67',
      bonus: '$1,000.00',
      deductions: '$1,520.00',
      netPay: '$8,646.67',
      payPeriod: '2024-02',
      status: 'failed',
      paymentDate: '2024-02-15',
      paymentMethod: 'Direct Deposit'
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

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const departments = Array.from(new Set(payrollRecords.map(record => record.department)))

  const totalPayroll = payrollRecords.reduce((sum, record) => {
    return sum + parseFloat(record.netPay.replace(/[$,]/g, ''))
  }, 0)

  const processedCount = payrollRecords.filter(r => r.status === 'processed').length
  const pendingCount = payrollRecords.filter(r => r.status === 'pending').length
  const failedCount = payrollRecords.filter(r => r.status === 'failed').length

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
        title="CFO Payroll Management - Annita"
        description="CFO payroll processing and employee compensation management"
        keywords={['cfo', 'payroll', 'compensation', 'salary']}
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
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Payroll Management</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={payPeriod}
                  onChange={(e) => setPayPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="2024-01">January 2024</option>
                  <option value="2024-02">February 2024</option>
                  <option value="2024-03">March 2024</option>
                  <option value="2024-04">April 2024</option>
                  <option value="2024-05">May 2024</option>
                  <option value="2024-06">June 2024</option>
                  <option value="2024-07">July 2024</option>
                  <option value="2024-08">August 2024</option>
                  <option value="2024-09">September 2024</option>
                  <option value="2024-10">October 2024</option>
                  <option value="2024-11">November 2024</option>
                  <option value="2024-12">December 2024</option>
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
          <PayrollManagement userRole={userRole} />
        </main>
      </div>
    </>
  )
}
