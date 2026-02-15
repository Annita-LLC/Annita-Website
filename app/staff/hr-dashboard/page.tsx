'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Users, DollarSign, FileText, Calendar, Bell, LogOut, Menu, X, BarChart3, Heart, Target, Briefcase, Clock, CheckCircle, AlertCircle, TrendingUp, UserPlus, UserCheck, Shield, BookOpen } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import RestrictedDashboard from '@/components/staff/RestrictedDashboard'
import DocumentLibrary from '@/components/staff/DocumentLibrary'

function HRDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRestricted, setIsRestricted] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    const profileIncomplete = localStorage.getItem('profile-incomplete')
    const restricted = searchParams.get('restricted') === 'true'
    
    if (auth === 'true' && role === 'hr') {
      setIsAuthenticated(true)
      setUserRole('hr')
      setEmployeeId(empId || '')
      setIsRestricted(restricted || profileIncomplete === 'true')
    } else {
      router.push('/staff/login')
    }
  }, [router, searchParams])

  const handleLogout = () => {
    localStorage.removeItem('staff-authenticated')
    localStorage.removeItem('staff-employee-id')
    localStorage.removeItem('staff-role')
    localStorage.removeItem('profile-incomplete')
    localStorage.removeItem('profile-skip-time')
    router.push('/staff/login')
  }

  const handleCompleteProfile = () => {
    router.push('/staff/login')
  }

  // Show restricted dashboard if user has incomplete profile
  if (isRestricted) {
    return (
      <RestrictedDashboard
        userRole="hr"
        employeeId={employeeId}
        onCompleteProfile={handleCompleteProfile}
        onLogout={handleLogout}
      />
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'employees', label: 'Employee Management', icon: Users },
    { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
    { id: 'onboarding', label: 'Onboarding', icon: UserCheck },
    { id: 'requests', label: 'Employee Requests', icon: FileText },
    { id: 'contracts', label: 'Contracts', icon: Shield },
    { id: 'benefits', label: 'Benefits Admin', icon: Heart },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'attendance', label: 'Live Attendance', icon: Clock },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">HR Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">247</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Open Positions</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Onboarding</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )
      case 'employees':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage employee records and information.</p>
              <button
                onClick={() => router.push('/staff/hr-employees')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Open Employee Management
              </button>
            </div>
          </div>
        )
      case 'recruitment':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Recruitment</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage recruitment and hiring process.</p>
              <button
                onClick={() => router.push('/staff/hr-recruitment')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Open Recruitment Management
              </button>
            </div>
          </div>
        )
      case 'onboarding':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Onboarding</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage employee onboarding process.</p>
              <button
                onClick={() => router.push('/staff/hr-onboarding')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Open Onboarding Management
              </button>
            </div>
          </div>
        )
      case 'requests':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Employee Requests</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Review and manage employee requests.</p>
              <button
                onClick={() => router.push('/staff/hr-requests')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                View Employee Requests
              </button>
            </div>
          </div>
        )
      case 'contracts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Contracts Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage employee contracts and agreements.</p>
              <button
                onClick={() => router.push('/staff/hr-contracts')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Open Contracts Management
              </button>
            </div>
          </div>
        )
      case 'benefits':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Benefits Administration</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage employee benefits and compensation.</p>
              <button
                onClick={() => router.push('/staff/hr-benefits')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Open Benefits Administration
              </button>
            </div>
          </div>
        )
      case 'payroll':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Payroll Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage payroll and compensation.</p>
              <button
                onClick={() => router.push('/staff/hr-payroll')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Open Payroll Management
              </button>
            </div>
          </div>
        )
      case 'training':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Training & Development</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage employee training and development programs.</p>
              <button
                onClick={() => router.push('/staff/hr-training')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Open Training Management
              </button>
            </div>
          </div>
        )
      case 'compliance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Compliance</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600">HR compliance and regulatory requirements.</p>
            </div>
          </div>
        )
      case 'attendance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Live Attendance</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Real-time attendance monitoring and management.</p>
              <button
                onClick={() => router.push('/staff/live-attendance')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Live Attendance
              </button>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 mb-4">This section is available as a dedicated page with detailed functionality.</p>
              <button
                onClick={() => router.push(`/staff/hr-${activeTab}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go to {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page
              </button>
            </div>
          </div>
        )
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <SEOHead
        title="HR Dashboard - Annita"
        description="HR management dashboard"
        keywords={['hr', 'dashboard', 'human resources', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* HR Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">HR Portal</h1>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hamburger Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="bg-white border-b border-gray-200 shadow-lg z-40">
            <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-pink-100 text-pink-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
          
          {/* Document Library Section */}
          <div className="mt-8">
            <DocumentLibrary />
          </div>
        </main>
      </div>
    </>
  )
}

export default function HRDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading dashboard...</div>
    </div>}>
      <HRDashboardContent />
    </Suspense>
  )
}
