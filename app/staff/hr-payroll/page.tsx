'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, Calendar, Users, TrendingUp, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

interface HRPayrollRecord {
  id: string
  employeeName: string
  employeeId: string
  department: string
  position: string
  payPeriod: string
  grossPay: string
  netPay: string
  taxes: string
  deductions: string
  overtime: string
  bonuses: string
  status: 'processed' | 'pending' | 'failed' | 'on-hold'
  payDate: string
  bankAccount: string
  hoursWorked: string
  hourlyRate: string
}

interface HRPayrollSummary {
  period: string
  totalEmployees: number
  totalGrossPay: string
  totalNetPay: string
  totalTaxes: string
  totalDeductions: string
  averagePay: string
  status: 'completed' | 'in-progress' | 'scheduled'
  processedDate: string
}

export default function HRPayrollPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPeriod, setFilterPeriod] = useState('all')
  const [activeTab, setActiveTab] = useState<'records' | 'summary'>('records')

  const [payrollRecords, setPayrollRecords] = useState<HRPayrollRecord[]>([
    {
      id: 'PAY-001',
      employeeName: 'John Smith',
      employeeId: 'E1001',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      payPeriod: '2024-02-01 to 2024-02-15',
      grossPay: '$6,250.00',
      netPay: '$4,375.00',
      taxes: '$1,562.50',
      deductions: '$312.50',
      overtime: '$500.00',
      bonuses: '$0.00',
      status: 'processed',
      payDate: '2024-02-15',
      bankAccount: '****1234',
      hoursWorked: '80',
      hourlyRate: '$71.25'
    },
    {
      id: 'PAY-002',
      employeeName: 'Sarah Chen',
      employeeId: 'E1002',
      department: 'Engineering',
      position: 'Engineering Manager',
      payPeriod: '2024-02-01 to 2024-02-15',
      grossPay: '$8,125.00',
      netPay: '$5,687.50',
      taxes: '$2,031.25',
      deductions: '$406.25',
      overtime: '$0.00',
      bonuses: '$1,000.00',
      status: 'processed',
      payDate: '2024-02-15',
      bankAccount: '****5678',
      hoursWorked: '80',
      hourlyRate: '$89.06'
    },
    {
      id: 'PAY-003',
      employeeName: 'Mike Johnson',
      employeeId: 'E1003',
      department: 'Marketing',
      position: 'Marketing Specialist',
      payPeriod: '2024-02-01 to 2024-02-15',
      grossPay: '$3,750.00',
      netPay: '$2,625.00',
      taxes: '$937.50',
      deductions: '$187.50',
      overtime: '$0.00',
      bonuses: '$0.00',
      status: 'processed',
      payDate: '2024-02-15',
      bankAccount: '****9012',
      hoursWorked: '80',
      hourlyRate: '$46.88'
    },
    {
      id: 'PAY-004',
      employeeName: 'Emily Davis',
      employeeId: 'E1004',
      department: 'Human Resources',
      position: 'HR Manager',
      payPeriod: '2024-02-01 to 2024-02-15',
      grossPay: '$4,687.50',
      netPay: '$3,281.25',
      taxes: '$1,171.88',
      deductions: '$234.37',
      overtime: '$0.00',
      bonuses: '$0.00',
      status: 'pending',
      payDate: '2024-02-15',
      bankAccount: '****3456',
      hoursWorked: '80',
      hourlyRate: '$58.59'
    },
    {
      id: 'PAY-005',
      employeeName: 'Alex Thompson',
      employeeId: 'E1005',
      department: 'Sales',
      position: 'Sales Representative',
      payPeriod: '2024-02-01 to 2024-02-15',
      grossPay: '$3,125.00',
      netPay: '$2,187.50',
      taxes: '$781.25',
      deductions: '$156.25',
      overtime: '$250.00',
      bonuses: '$0.00',
      status: 'processed',
      payDate: '2024-02-15',
      bankAccount: '****7890',
      hoursWorked: '85',
      hourlyRate: '$34.72'
    }
  ])

  const [payrollSummaries, setPayrollSummaries] = useState<HRPayrollSummary[]>([
    {
      period: '2024-02-01 to 2024-02-15',
      totalEmployees: 280,
      totalGrossPay: '$1,250,000',
      totalNetPay: '$875,000',
      totalTaxes: '$312,500',
      totalDeductions: '$62,500',
      averagePay: '$4,464',
      status: 'completed',
      processedDate: '2024-02-14'
    },
    {
      period: '2024-01-16 to 2024-01-31',
      totalEmployees: 278,
      totalGrossPay: '$1,225,000',
      totalNetPay: '$857,500',
      totalTaxes: '$306,250',
      totalDeductions: '$61,250',
      averagePay: '$4,406',
      status: 'completed',
      processedDate: '2024-01-31'
    },
    {
      period: '2024-01-01 to 2024-01-15',
      totalEmployees: 275,
      totalGrossPay: '$1,200,000',
      totalNetPay: '$840,000',
      totalTaxes: '$300,000',
      totalDeductions: '$60,000',
      averagePay: '$4,364',
      status: 'completed',
      processedDate: '2024-01-16'
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

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus
    const matchesPeriod = filterPeriod === 'all' || record.payPeriod.includes(filterPeriod)
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesPeriod
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'failed': return 'bg-red-100 text-red-700'
      case 'on-hold': return 'bg-orange-100 text-orange-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'scheduled': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const departments = Array.from(new Set(payrollRecords.map(record => record.department)))
  const periods = Array.from(new Set(payrollRecords.map(record => record.payPeriod)))

  const processedCount = payrollRecords.filter(r => r.status === 'processed').length
  const pendingCount = payrollRecords.filter(r => r.status === 'pending').length
  const totalGrossPay = payrollRecords.reduce((sum, record) => {
    return sum + parseFloat(record.grossPay.replace(/[$,]/g, ''))
  }, 0)
  const totalNetPay = payrollRecords.reduce((sum, record) => {
    return sum + parseFloat(record.netPay.replace(/[$,]/g, ''))
  }, 0)

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
        title="HR Payroll Management - Annita"
        description="HR payroll management and compensation administration"
        keywords={['hr', 'payroll', 'compensation', 'salary', 'benefits']}
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
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Payroll Management</h1>
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
          {/* Payroll Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Processed</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{processedCount}</p>
              <p className="text-sm text-gray-500">Payroll processed</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-500">Awaiting processing</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Gross Pay</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalGrossPay / 1000).toFixed(1)}K</p>
              <p className="text-sm text-gray-500">Current period</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Net Pay</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalNetPay / 1000).toFixed(1)}K</p>
              <p className="text-sm text-gray-500">After deductions</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('records')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'records'
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Payroll Records ({payrollRecords.length})
                </button>
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'summary'
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Payroll Summary ({payrollSummaries.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Payroll Records Tab */}
          {activeTab === 'records' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Payroll Records</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search records..."
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
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Periods</option>
                    {periods.map(period => (
                      <option key={period} value={period}>{period}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Status</option>
                    <option value="processed">Processed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="on-hold">On Hold</option>
                  </select>

                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{record.employeeName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{record.position} • {record.department}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                          <span className="text-xs text-gray-500">ID: {record.employeeId}</span>
                          <span className="text-xs text-gray-500">Period: {record.payPeriod}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{record.netPay}</p>
                        <p className="text-sm text-gray-500">net pay</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Gross Pay</p>
                        <p className="text-sm font-medium text-gray-900">{record.grossPay}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Taxes</p>
                        <p className="text-sm text-gray-900">{record.taxes}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Deductions</p>
                        <p className="text-sm text-gray-900">{record.deductions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hours Worked</p>
                        <p className="text-sm text-gray-900">{record.hoursWorked}</p>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Hourly Rate:</span>
                          <span className="ml-2 text-gray-900">{record.hourlyRate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Overtime:</span>
                          <span className="ml-2 text-gray-900">{record.overtime}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Bonuses:</span>
                          <span className="ml-2 text-gray-900">{record.bonuses}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Bank Account:</span>
                          <span className="ml-2 text-gray-900">{record.bankAccount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Pay Date: {record.payDate} • Record ID: {record.id}
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

          {/* Payroll Summary Tab */}
          {activeTab === 'summary' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payroll Summary</h2>
              
              <div className="space-y-4">
                {payrollSummaries.map((summary) => (
                  <div key={summary.period} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{summary.period}</h3>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(summary.status)}`}>
                            {summary.status.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-gray-500">Processed: {summary.processedDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{summary.totalNetPay}</p>
                        <p className="text-sm text-gray-500">total net pay</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Employees</p>
                        <p className="text-sm font-medium text-gray-900">{summary.totalEmployees}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gross Pay</p>
                        <p className="text-sm text-gray-900">{summary.totalGrossPay}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Taxes</p>
                        <p className="text-sm text-gray-900">{summary.totalTaxes}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Deductions</p>
                        <p className="text-sm text-gray-900">{summary.totalDeductions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Pay</p>
                        <p className="text-sm font-medium text-gray-900">{summary.averagePay}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Payroll period summary
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
        </main>
      </div>
    </>
  )
}
