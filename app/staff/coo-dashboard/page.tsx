'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, Users, Briefcase, Target, Bell, LogOut, Menu, X, BarChart3, Clock, CheckCircle, AlertCircle, Building, FileText, Calendar, TrendingUp, Factory, Package } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import RoleAccessControl from '@/components/staff/RoleAccessControl'

export default function COODashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    
    if (auth === 'true' && (role === 'coo' || role === 'ceo')) {
      setIsAuthenticated(true)
      setUserRole(role)
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
    { id: 'overview', label: 'Operations Overview', icon: Settings },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'team', label: 'Operations Team', icon: Users },
    { id: 'efficiency', label: 'Efficiency Metrics', icon: BarChart3 },
    { id: 'process', label: 'Process Management', icon: Target },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: 'supply', label: 'Supply Chain', icon: Package },
    { id: 'quality', label: 'Quality Control', icon: CheckCircle },
    { id: 'compliance', label: 'Compliance', icon: AlertCircle },
    { id: 'reports', label: 'Operations Reports', icon: FileText },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">COO Operations Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Efficiency Rate</p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">On-Time Delivery</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Operations Projects</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage and monitor operational projects.</p>
              <button
                onClick={() => router.push('/staff/coo-projects')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Project Management
              </button>
            </div>
          </div>
        )
      case 'team':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Operations Team</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage operations team members.</p>
              <button
                onClick={() => router.push('/staff/coo-team')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Team Management
              </button>
            </div>
          </div>
        )
      case 'efficiency':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Efficiency Metrics</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Monitor operational efficiency metrics.</p>
              <button
                onClick={() => router.push('/staff/coo-efficiency')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Efficiency Metrics
              </button>
            </div>
          </div>
        )
      case 'process':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Process Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage operational processes and workflows.</p>
              <button
                onClick={() => router.push('/staff/coo-process')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Process Management
              </button>
            </div>
          </div>
        )
      case 'facilities':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Facilities Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage facilities and office spaces.</p>
              <button
                onClick={() => router.push('/staff/coo-facilities')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Facilities Management
              </button>
            </div>
          </div>
        )
      case 'supply':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Supply Chain</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage supply chain and logistics.</p>
              <button
                onClick={() => router.push('/staff/coo-supply')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Supply Chain Management
              </button>
            </div>
          </div>
        )
      case 'quality':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Quality Control</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage quality control and assurance.</p>
              <button
                onClick={() => router.push('/staff/coo-quality')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Quality Control
              </button>
            </div>
          </div>
        )
      case 'compliance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Operations Compliance</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Ensure operational compliance and standards.</p>
              <button
                onClick={() => router.push('/staff/coo-compliance')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Compliance Management
              </button>
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Operations Reports</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Generate and view operations reports.</p>
              <button
                onClick={() => router.push('/staff/coo-reports')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Operations Reports
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
                onClick={() => router.push(`/staff/coo-${activeTab}`)}
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
        title="COO Dashboard - Annita"
        description="Chief Operating Officer dashboard"
        keywords={['coo', 'operations', 'dashboard', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* COO Header */}
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">COO Portal</h1>
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
          
          {/* Role Access Control Section */}
          <div className="mt-8">
            <RoleAccessControl 
              requiredRoles={['coo', 'ceo']}
              redirectTo="/staff/login"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Access Control</h3>
                <p className="text-gray-600">This section demonstrates role-based access control.</p>
              </div>
            </RoleAccessControl>
          </div>
        </main>
      </div>
    </>
  )
}
