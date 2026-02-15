'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, Users, DollarSign, FileText, TrendingUp, Calendar, Bell, LogOut, Menu, X, Briefcase, Target, BarChart3, Building, Shield, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import AttendanceSignin from '@/components/staff/AttendanceSignin'
import KnowledgeBase from '@/components/staff/KnowledgeBase'
import DashboardOverview from '@/components/staff/DashboardOverview'
import CEODashboardComponent from '@/components/staff/CEODashboard'

export default function CEODashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && (role === 'ceo' || role === 'cfo' || role === 'cmo' || role === 'coo')) {
      setIsAuthenticated(true)
      setUserRole(role)
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Crown },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'requests', label: 'Employee Requests', icon: FileText },
    { id: 'contracts', label: 'Contracts', icon: FileText },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'strategic', label: 'Strategic Planning', icon: Target },
    { id: 'board', label: 'Board Meetings', icon: Users },
    { id: 'investors', label: 'Investor Relations', icon: TrendingUp },
    { id: 'market', label: 'Market Analysis', icon: Building },
    { id: 'admin', label: 'System Admin', icon: Shield },
    { id: 'attendance', label: 'Live Attendance', icon: Eye },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">CEO Overview</h2>
            
            {/* Attendance Quick Actions */}
            <AttendanceSignin
              userRole={userRole}
              employeeId={employeeId}
              onNavigateToAttendance={() => router.push('/staff/live-attendance')}
            />
            
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
                    <p className="text-sm text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Contracts</p>
                    <p className="text-2xl font-bold text-gray-900">198</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$2.4M</p>
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
            <p className="text-gray-600">Review and approve employee requests across all departments</p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 mb-4">Access the comprehensive employee request management system.</p>
              <button
                onClick={() => router.push('/staff/ceo-employees')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Employee Management
              </button>
            </div>
          </div>
        )
      case 'market':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Market Analysis</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600">Market analysis and competitive intelligence dashboard.</p>
            </div>
          </div>
        )
      case 'admin':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Admin</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Complete system administration and user management.</p>
              <button
                onClick={() => router.push('/staff/ceo-admin')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Open Admin Panel
              </button>
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
                onClick={() => router.push(`/staff/ceo-${activeTab}`)}
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
        title="CEO Dashboard - Annita"
        description="CEO management dashboard"
        keywords={['ceo', 'dashboard', 'management', 'executive']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* CEO Header */}
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Crown className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">CEO Portal</h1>
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
                        ? 'bg-purple-100 text-purple-700'
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
          
          {/* Knowledge Base Section */}
          <div className="mt-8">
            <KnowledgeBase />
          </div>

          {/* Dashboard Overview Section */}
          <div className="mt-8">
            <DashboardOverview 
              userRole="ceo"
              onNavigate={(tab) => {
                // Handle navigation based on role
                switch (tab) {
                  case 'admin':
                    router.push('/staff/ceo-admin')
                    break
                  case 'reports':
                    router.push('/staff/ceo-financial')
                    break
                  default:
                    break
                }
              }}
            />
          </div>

          {/* CEO Dashboard Component Section */}
          <div className="mt-8">
            <CEODashboardComponent />
          </div>
        </main>
      </div>
    </>
  )
}
