'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, FileText, Calendar, Bell, LogOut, Menu, X, Clock, DollarSign, Briefcase, Heart, BookOpen, AlertCircle, CheckCircle, Building } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import RestrictedDashboard from '@/components/staff/RestrictedDashboard'
import AttendanceSignin from '@/components/staff/AttendanceSignin'
import WorkTracker from '@/components/staff/WorkTracker'

function EmployeeDashboardContent() {
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
    
    if (auth === 'true' && role === 'employee') {
      setIsAuthenticated(true)
      setUserRole('employee')
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
    // Redirect to login to complete profile
    router.push('/staff/login')
  }

  // Show restricted dashboard if user has incomplete profile
  if (isRestricted) {
    return (
      <RestrictedDashboard
        userRole="employee"
        employeeId={employeeId}
        onCompleteProfile={handleCompleteProfile}
        onLogout={handleLogout}
      />
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'requests', label: 'My Requests', icon: FileText },
    { id: 'contracts', label: 'My Contracts', icon: FileText },
    { id: 'work-tracker', label: 'Work Tracker', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'benefits', label: 'Benefits', icon: Heart },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Employee Overview</h2>
            
            {/* Attendance Sign-in */}
            <AttendanceSignin
              userRole={userRole}
              employeeId={employeeId}
              onNavigateToAttendance={() => router.push('/staff/live-attendance')}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">My Requests</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hours This Week</p>
                    <p className="text-2xl font-bold text-gray-900">32</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Contracts</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Training Courses</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )
      case 'requests':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Requests</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Submit and track your employee requests.</p>
              <button
                onClick={() => router.push('/staff/employee-requests')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                View My Requests
              </button>
            </div>
          </div>
        )
      case 'contracts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Contracts</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">View and manage your employment contracts.</p>
              <button
                onClick={() => router.push('/staff/employee-contracts')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                View My Contracts
              </button>
            </div>
          </div>
        )
      case 'work-tracker':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Work Tracker</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Track your work hours and productivity.</p>
              <button
                onClick={() => router.push('/staff/employee-work-tracker')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Work Tracker
              </button>
            </div>
          </div>
        )
      case 'calendar':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">View your work calendar and events.</p>
              <button
                onClick={() => router.push('/staff/employee-calendar')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Calendar
              </button>
            </div>
          </div>
        )
      case 'benefits':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Benefits</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">View your employee benefits and enrollment.</p>
              <button
                onClick={() => router.push('/staff/employee-benefits')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                View My Benefits
              </button>
            </div>
          </div>
        )
      case 'training':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Training</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">View and manage your training programs.</p>
              <button
                onClick={() => router.push('/staff/employee-training')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                View Training Programs
              </button>
            </div>
          </div>
        )
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage your personal profile information.</p>
              <button
                onClick={() => router.push('/staff/employee-profile')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Edit My Profile
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
                onClick={() => router.push(`/staff/employee-${activeTab}`)}
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
        title="Employee Dashboard - Annita"
        description="Employee dashboard for staff members"
        keywords={['employee', 'dashboard', 'staff', 'portal']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Employee Header */}
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">Employee Portal</h1>
                  {employeeId && (
                    <p className="text-xs sm:text-sm text-gray-500 truncate">ID: {employeeId}</p>
                  )}
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
                        ? 'bg-orange-100 text-orange-700'
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
          
          {/* Work Tracker Section */}
          <div className="mt-8">
            <WorkTracker />
          </div>
        </main>
      </div>
    </>
  )
}

export default function EmployeeDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading dashboard...</div>
    </div>}>
      <EmployeeDashboardContent />
    </Suspense>
  )
}
