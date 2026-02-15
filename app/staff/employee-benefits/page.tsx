'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Users, DollarSign, Calendar, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import BenefitsCompensation from '@/components/staff/BenefitsCompensation'

interface EmployeeBenefit {
  id: string
  name: string
  category: 'health' | 'dental' | 'vision' | 'retirement' | 'life' | 'disability' | 'wellness'
  status: 'active' | 'pending' | 'inactive' | 'enrolled' | 'waived'
  enrollmentDate: string
  coverage: string
  monthlyCost: string
  employerContribution: string
  description: string
  documents: number
  nextOpenEnrollment: string
  dependents: number
}

export default function EmployeeBenefitsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [benefits, setBenefits] = useState<EmployeeBenefit[]>([
    {
      id: 'BEN-001',
      name: 'Premium Health Insurance PPO',
      category: 'health',
      status: 'enrolled',
      enrollmentDate: '2023-03-15',
      coverage: 'Family',
      monthlyCost: '$225',
      employerContribution: '80%',
      description: 'Comprehensive PPO health insurance with nationwide coverage and low deductibles',
      documents: 3,
      nextOpenEnrollment: '2024-11-01',
      dependents: 2
    },
    {
      id: 'BEN-002',
      name: 'Dental Insurance Plus',
      category: 'dental',
      status: 'enrolled',
      enrollmentDate: '2023-03-15',
      coverage: 'Family',
      monthlyCost: '$25',
      employerContribution: '100%',
      description: 'Complete dental coverage including orthodontics and major procedures',
      documents: 2,
      nextOpenEnrollment: '2024-11-01',
      dependents: 2
    },
    {
      id: 'BEN-003',
      name: 'Vision Care Plan',
      category: 'vision',
      status: 'enrolled',
      enrollmentDate: '2023-03-15',
      coverage: 'Individual',
      monthlyCost: '$15',
      employerContribution: '100%',
      description: 'Vision care including eye exams, glasses, and contact lenses',
      documents: 1,
      nextOpenEnrollment: '2024-11-01',
      dependents: 0
    },
    {
      id: 'BEN-004',
      name: '401(k) Retirement Plan',
      category: 'retirement',
      status: 'enrolled',
      enrollmentDate: '2023-03-15',
      coverage: 'Individual',
      monthlyCost: '$500',
      employerContribution: 'Up to 6% match',
      description: 'Traditional and Roth 401(k) with company matching and investment options',
      documents: 2,
      nextOpenEnrollment: 'Any time',
      dependents: 0
    },
    {
      id: 'BEN-005',
      name: 'Term Life Insurance',
      category: 'life',
      status: 'enrolled',
      enrollmentDate: '2023-03-15',
      coverage: 'Individual',
      monthlyCost: '$12',
      employerContribution: '1x salary',
      description: 'Group term life insurance with optional supplemental coverage',
      documents: 2,
      nextOpenEnrollment: '2024-11-01',
      dependents: 0
    },
    {
      id: 'BEN-006',
      name: 'Short-Term Disability',
      category: 'disability',
      status: 'pending',
      enrollmentDate: '',
      coverage: 'Individual',
      monthlyCost: '$10',
      employerContribution: '100%',
      description: 'Income protection for temporary disabilities and medical leave',
      documents: 1,
      nextOpenEnrollment: '2024-11-01',
      dependents: 0
    },
    {
      id: 'BEN-007',
      name: 'Wellness Program',
      category: 'wellness',
      status: 'active',
      enrollmentDate: '2023-03-15',
      coverage: 'Individual',
      monthlyCost: '$0',
      employerContribution: '100%',
      description: 'Corporate wellness program including gym membership and health screenings',
      documents: 1,
      nextOpenEnrollment: 'Any time',
      dependents: 0
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

  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch = benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || benefit.category === filterCategory
    const matchesStatus = filterStatus === 'all' || benefit.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'enrolled': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      case 'waived': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-blue-100 text-blue-700'
      case 'dental': return 'bg-green-100 text-green-700'
      case 'vision': return 'bg-purple-100 text-purple-700'
      case 'retirement': return 'bg-orange-100 text-orange-700'
      case 'life': return 'bg-red-100 text-red-700'
      case 'disability': return 'bg-pink-100 text-pink-700'
      case 'wellness': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const categories = Array.from(new Set(benefits.map(benefit => benefit.category)))

  const enrolledCount = benefits.filter(b => b.status === 'enrolled').length
  const pendingCount = benefits.filter(b => b.status === 'pending').length
  const totalMonthlyCost = benefits.reduce((sum, benefit) => {
    if (benefit.status === 'enrolled') {
      return sum + parseFloat(benefit.monthlyCost.replace(/[$,]/g, ''))
    }
    return sum
  }, 0)
  const totalDependents = benefits.reduce((sum, benefit) => sum + benefit.dependents, 0)

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
        title="Employee Benefits - Annita"
        description="Employee benefits and wellness programs"
        keywords={['employee', 'benefits', 'wellness', 'insurance', 'health']}
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
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">My Benefits</h1>
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
                <h3 className="text-lg font-semibold text-gray-900">Enrolled</h3>
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{enrolledCount}</p>
              <p className="text-sm text-gray-500">Active benefits</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-500">Awaiting enrollment</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Cost</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalMonthlyCost}</p>
              <p className="text-sm text-gray-500">Total monthly</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Dependents</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalDependents}</p>
              <p className="text-sm text-gray-500">Covered dependents</p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Benefits</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search benefits..."
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
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="waived">Waived</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredBenefits.map((benefit) => (
                <div key={benefit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{benefit.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(benefit.status)}`}>
                          {benefit.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(benefit.category)}`}>
                          {benefit.category.charAt(0).toUpperCase() + benefit.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{benefit.monthlyCost}</p>
                      <p className="text-sm text-gray-500">monthly</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Coverage</p>
                      <p className="text-sm font-medium text-gray-900">{benefit.coverage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employer Contribution</p>
                      <p className="text-sm text-gray-900">{benefit.employerContribution}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Enrollment Date</p>
                      <p className="text-sm text-gray-900">{benefit.enrollmentDate || 'Not enrolled'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dependents</p>
                      <p className="text-sm text-gray-900">{benefit.dependents}</p>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Cost Breakdown</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Your monthly cost:</span>
                        <span className="ml-2 font-medium text-gray-900">{benefit.monthlyCost}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Employer contribution:</span>
                        <span className="ml-2 text-gray-900">{benefit.employerContribution}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {benefit.status === 'enrolled' && '✅ Currently enrolled'}
                      {benefit.status === 'pending' && '⏳ Enrollment pending'}
                      {benefit.status === 'active' && '🔄 Active benefit'}
                      {benefit.status === 'inactive' && '❌ Inactive'}
                      {benefit.status === 'waived' && '📋 Coverage waived'}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        Next open enrollment: {benefit.nextOpenEnrollment}
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBenefits.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No benefits found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Benefits Compensation Section */}
          <div className="mt-8">
            <BenefitsCompensation />
          </div>
        </main>
      </div>
    </>
  )
}
