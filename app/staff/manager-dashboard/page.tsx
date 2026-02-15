'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Users, DollarSign, FileText, Calendar, Bell, LogOut, Menu, X, BarChart3, Target, Briefcase, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import RestrictedDashboard from '@/components/staff/RestrictedDashboard'
import GoalsObjectives from '@/components/staff/GoalsObjectives'

function ManagerDashboardContent() {
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
    
    if (auth === 'true' && role === 'manager') {
      setIsAuthenticated(true)
      setUserRole('manager')
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
        userRole="manager"
        employeeId={employeeId}
        onCompleteProfile={handleCompleteProfile}
        onLogout={handleLogout}
      />
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'team', label: 'Team Performance', icon: BarChart3 },
    { id: 'requests', label: 'Employee Requests', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'meetings', label: '1-on-1 Meetings', icon: Users },
    { id: 'goals', label: 'Goals & Objectives', icon: Target },
    { id: 'analytics', label: 'Team Analytics', icon: TrendingUp },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Manager Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Budget Used</p>
                    <p className="text-2xl font-bold text-gray-900">68%</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )
      case 'requests':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Employee Requests</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Review and manage team requests.</p>
              <button
                onClick={() => router.push('/staff/manager-requests')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                View Team Requests
              </button>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage team projects and tasks.</p>
              <button
                onClick={() => router.push('/staff/manager-projects')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Project Management
              </button>
            </div>
          </div>
        )
      case 'budget':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage team budget and expenses.</p>
              <button
                onClick={() => router.push('/staff/manager-budget')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Budget Management
              </button>
            </div>
          </div>
        )
      case 'meetings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">1-on-1 Meetings</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Schedule and manage team meetings.</p>
              <button
                onClick={() => router.push('/staff/manager-meetings')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Meeting Management
              </button>
            </div>
          </div>
        )
      case 'goals':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Goals & Objectives</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage team goals and objectives.</p>
              <button
                onClick={() => router.push('/staff/manager-goals')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Goals Management
              </button>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Team Analytics</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">View team performance analytics.</p>
              <button
                onClick={() => router.push('/staff/manager-analytics')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Team Analytics
              </button>
            </div>
          </div>
        )
      case 'team':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage team members and performance.</p>
              <button
                onClick={() => router.push('/staff/manager-team')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Team Management
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
                onClick={() => router.push(`/staff/manager-${activeTab}`)}
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
        title="Manager Dashboard - Annita"
        description="Manager dashboard for team management"
        keywords={['manager', 'dashboard', 'team', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Manager Header */}
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">Manager Portal</h1>
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
                        ? 'bg-blue-100 text-blue-700'
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
          
          {/* Goals Objectives Section */}
          <div className="mt-8">
            <GoalsObjectives />
          </div>
        </main>
      </div>
    </>
  )
}

export default function ManagerDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading dashboard...</div>
    </div>}>
      <ManagerDashboardContent />
    </Suspense>
  )
}
