'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Users, DollarSign, Calendar, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import BenefitsAdministration from '@/components/staff/BenefitsAdministration'

interface HRBenefitPlan {
  id: string
  name: string
  type: 'health' | 'dental' | 'vision' | 'retirement' | 'life' | 'disability'
  category: 'medical' | 'financial' | 'wellness' | 'insurance'
  status: 'active' | 'inactive' | 'pending' | 'discontinued'
  enrollmentCount: number
  totalEligible: number
  employerContribution: string
  employeeCost: string
  renewalDate: string
  provider: string
  description: string
}

interface HRBenefitEnrollment {
  id: string
  employeeName: string
  employeeId: string
  department: string
  plan: string
  type: string
  status: 'active' | 'pending' | 'terminated' | 'waived'
  enrollmentDate: string
  effectiveDate: string
  monthlyCost: string
  dependents: number
  coverage: string
}

export default function HRBenefitsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState<'plans' | 'enrollments'>('plans')

  const [benefitPlans, setBenefitPlans] = useState<HRBenefitPlan[]>([
    {
      id: 'PLAN-001',
      name: 'Premium Health Insurance PPO',
      type: 'health',
      category: 'medical',
      status: 'active',
      enrollmentCount: 245,
      totalEligible: 280,
      employerContribution: '80%',
      employeeCost: '$150-300/month',
      renewalDate: '2024-12-31',
      provider: 'Blue Cross Blue Shield',
      description: 'Comprehensive PPO health insurance with nationwide coverage'
    },
    {
      id: 'PLAN-002',
      name: 'Dental Insurance Plus',
      type: 'dental',
      category: 'medical',
      status: 'active',
      enrollmentCount: 189,
      totalEligible: 280,
      employerContribution: '100%',
      employeeCost: '$25/month',
      renewalDate: '2024-12-31',
      provider: 'Delta Dental',
      description: 'Complete dental coverage including orthodontics'
    },
    {
      id: 'PLAN-003',
      name: '401(k) Retirement Plan',
      type: 'retirement',
      category: 'financial',
      status: 'active',
      enrollmentCount: 156,
      totalEligible: 220,
      employerContribution: 'Up to 6% match',
      employeeCost: 'Varies',
      renewalDate: '2025-01-01',
      provider: 'Fidelity Investments',
      description: 'Traditional and Roth 401(k) with company matching'
    },
    {
      id: 'PLAN-004',
      name: 'Vision Care Plan',
      type: 'vision',
      category: 'medical',
      status: 'active',
      enrollmentCount: 134,
      totalEligible: 280,
      employerContribution: '100%',
      employeeCost: '$15/month',
      renewalDate: '2024-12-31',
      provider: 'VSP Vision',
      description: 'Comprehensive vision care including exams and eyewear'
    },
    {
      id: 'PLAN-005',
      name: 'Term Life Insurance',
      type: 'life',
      category: 'insurance',
      status: 'active',
      enrollmentCount: 98,
      totalEligible: 280,
      employerContribution: '1x salary',
      employeeCost: '$5-20/month',
      renewalDate: '2024-12-31',
      provider: 'MetLife',
      description: 'Group term life insurance with optional supplemental coverage'
    },
    {
      id: 'PLAN-006',
      name: 'Short-Term Disability',
      type: 'disability',
      category: 'insurance',
      status: 'pending',
      enrollmentCount: 0,
      totalEligible: 280,
      employerContribution: '100%',
      employeeCost: '$10/month',
      renewalDate: '2024-06-30',
      provider: 'Aflac',
      description: 'Short-term disability coverage for income protection'
    }
  ])

  const [enrollments, setEnrollments] = useState<HRBenefitEnrollment[]>([
    {
      id: 'ENR-001',
      employeeName: 'John Smith',
      employeeId: 'E1001',
      department: 'Engineering',
      plan: 'Premium Health Insurance PPO',
      type: 'health',
      status: 'active',
      enrollmentDate: '2020-03-15',
      effectiveDate: '2020-04-01',
      monthlyCost: '$225',
      dependents: 2,
      coverage: 'Family'
    },
    {
      id: 'ENR-002',
      employeeName: 'Sarah Chen',
      employeeId: 'E1002',
      department: 'Engineering',
      plan: '401(k) Retirement Plan',
      type: 'retirement',
      status: 'active',
      enrollmentDate: '2019-06-20',
      effectiveDate: '2019-07-01',
      monthlyCost: '$500',
      dependents: 0,
      coverage: 'Individual'
    },
    {
      id: 'ENR-003',
      employeeName: 'Mike Johnson',
      employeeId: 'E1003',
      department: 'Marketing',
      plan: 'Dental Insurance Plus',
      type: 'dental',
      status: 'pending',
      enrollmentDate: '2024-02-10',
      effectiveDate: '2024-03-01',
      monthlyCost: '$25',
      dependents: 1,
      coverage: 'Individual + 1'
    },
    {
      id: 'ENR-004',
      employeeName: 'Emily Davis',
      employeeId: 'E1004',
      department: 'Human Resources',
      plan: 'Vision Care Plan',
      type: 'vision',
      status: 'active',
      enrollmentDate: '2018-11-05',
      effectiveDate: '2018-12-01',
      monthlyCost: '$15',
      dependents: 0,
      coverage: 'Individual'
    },
    {
      id: 'ENR-005',
      employeeName: 'Alex Thompson',
      employeeId: 'E1005',
      department: 'Sales',
      plan: 'Term Life Insurance',
      type: 'life',
      status: 'active',
      enrollmentDate: '2022-02-15',
      effectiveDate: '2022-03-01',
      monthlyCost: '$12',
      dependents: 0,
      coverage: 'Individual'
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

  const filteredPlans = benefitPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || plan.type === filterType
    const matchesCategory = filterCategory === 'all' || plan.category === filterCategory
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.plan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || enrollment.type === filterType
    const matchesStatus = filterStatus === 'all' || enrollment.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'discontinued': return 'bg-red-100 text-red-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      case 'waived': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'health': return 'bg-blue-100 text-blue-700'
      case 'dental': return 'bg-green-100 text-green-700'
      case 'vision': return 'bg-purple-100 text-purple-700'
      case 'retirement': return 'bg-orange-100 text-orange-700'
      case 'life': return 'bg-red-100 text-red-700'
      case 'disability': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-blue-100 text-blue-700'
      case 'financial': return 'bg-green-100 text-green-700'
      case 'wellness': return 'bg-purple-100 text-purple-700'
      case 'insurance': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const benefitTypes = Array.from(new Set(benefitPlans.map(plan => plan.type)))
  const categories = Array.from(new Set(benefitPlans.map(plan => plan.category)))

  const totalEnrollments = benefitPlans.reduce((sum, plan) => sum + plan.enrollmentCount, 0)
  const totalEligible = benefitPlans.reduce((sum, plan) => sum + plan.totalEligible, 0)
  const activePlans = benefitPlans.filter(p => p.status === 'active').length
  const pendingEnrollments = enrollments.filter(e => e.status === 'pending').length

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
        title="HR Benefits Administration - Annita"
        description="HR benefits administration and employee wellness programs"
        keywords={['hr', 'benefits', 'administration', 'wellness', 'insurance']}
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
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Benefits Administration</h1>
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
          {/* Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Plans</h3>
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activePlans}</p>
              <p className="text-sm text-gray-500">Available benefits</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Enrollments</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalEnrollments}</p>
              <p className="text-sm text-gray-500">Across all plans</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Participation Rate</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {totalEligible > 0 ? Math.round((totalEnrollments / totalEligible) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-500">Employee participation</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingEnrollments}</p>
              <p className="text-sm text-gray-500">Awaiting processing</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'plans'
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Benefit Plans ({benefitPlans.length})
                </button>
                <button
                  onClick={() => setActiveTab('enrollments')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'enrollments'
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Enrollments ({enrollments.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Benefit Plans Tab */}
          {activeTab === 'plans' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Benefit Plans</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search plans..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Types</option>
                    {benefitTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>

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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="discontinued">Discontinued</option>
                  </select>

                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredPlans.map((plan) => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                            {plan.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(plan.type)}`}>
                            {plan.type.charAt(0).toUpperCase() + plan.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(plan.category)}`}>
                            {plan.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{plan.enrollmentCount}</p>
                        <p className="text-sm text-gray-500">enrolled</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Provider</p>
                        <p className="text-sm font-medium text-gray-900">{plan.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Employer Contribution</p>
                        <p className="text-sm font-medium text-gray-900">{plan.employerContribution}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Employee Cost</p>
                        <p className="text-sm text-gray-900">{plan.employeeCost}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Renewal Date</p>
                        <p className="text-sm text-gray-900">{plan.renewalDate}</p>
                      </div>
                    </div>

                    {/* Enrollment Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Enrollment Rate</span>
                        <span className="text-sm text-gray-900">
                          {plan.totalEligible > 0 ? Math.round((plan.enrollmentCount / plan.totalEligible) * 100) : 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-pink-500"
                          style={{ width: `${plan.totalEligible > 0 ? (plan.enrollmentCount / plan.totalEligible) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        {plan.enrollmentCount} of {plan.totalEligible} eligible employees enrolled
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

          {/* Enrollments Tab */}
          {activeTab === 'enrollments' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Employee Enrollments</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search enrollments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Types</option>
                    {benefitTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="terminated">Terminated</option>
                    <option value="waived">Waived</option>
                  </select>

                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{enrollment.employeeName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{enrollment.plan}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                            {enrollment.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(enrollment.type)}`}>
                            {enrollment.type.charAt(0).toUpperCase() + enrollment.type}
                          </span>
                          <span className="text-xs text-gray-500">{enrollment.department}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{enrollment.monthlyCost}</p>
                        <p className="text-sm text-gray-500">monthly</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Employee ID</p>
                        <p className="text-sm font-medium text-gray-900">{enrollment.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Coverage</p>
                        <p className="text-sm text-gray-900">{enrollment.coverage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dependents</p>
                        <p className="text-sm text-gray-900">{enrollment.dependents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Effective Date</p>
                        <p className="text-sm text-gray-900">{enrollment.effectiveDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Enrolled: {enrollment.enrollmentDate}
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

          {/* Benefits Administration Section */}
          <div className="mt-8">
            <BenefitsAdministration userRole="hr" />
          </div>
        </main>
      </div>
    </>
  )
}
