'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, TrendingUp, FileText, Calculator, Bell, LogOut, Menu, X, PieChart, CreditCard, Receipt, Banknote, AlertCircle, CheckCircle, Clock, BarChart3 } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

export default function CFODashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    
    if (auth === 'true' && (role === 'cfo' || role === 'ceo')) {
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
    { id: 'overview', label: 'Financial Overview', icon: DollarSign },
    { id: 'budget', label: 'Budget Management', icon: Calculator },
    { id: 'requests', label: 'Financial Requests', icon: FileText },
    { id: 'payroll', label: 'Payroll', icon: CreditCard },
    { id: 'expenses', label: 'Expense Reports', icon: Receipt },
    { id: 'contracts', label: 'Financial Contracts', icon: FileText },
    { id: 'analytics', label: 'Financial Analytics', icon: BarChart3 },
    { id: 'investments', label: 'Investments', icon: TrendingUp },
    { id: 'compliance', label: 'Financial Compliance', icon: AlertCircle },
    { id: 'reporting', label: 'Financial Reports', icon: PieChart },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'budget':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage budgets and financial planning.</p>
              <button
                onClick={() => router.push('/staff/cfo-budget')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Budget Management
              </button>
            </div>
          </div>
        )
      case 'requests':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Requests</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Review and approve financial requests.</p>
              <button
                onClick={() => router.push('/staff/cfo-notifications')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Financial Requests
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
                onClick={() => router.push('/staff/cfo-payroll')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Payroll System
              </button>
            </div>
          </div>
        )
      case 'expenses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Expense Reports</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Review and manage expense reports.</p>
              <button
                onClick={() => router.push('/staff/cfo-expenses')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Expense Reports
              </button>
            </div>
          </div>
        )
      case 'contracts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Contracts</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage financial contracts and agreements.</p>
              <button
                onClick={() => router.push('/staff/cfo-contracts')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Financial Contracts
              </button>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Analytics</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">View financial analytics and metrics.</p>
              <button
                onClick={() => router.push('/staff/cfo-analytics')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Financial Analytics
              </button>
            </div>
          </div>
        )
      case 'investments':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Investment Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage investments and portfolio.</p>
              <button
                onClick={() => router.push('/staff/cfo-investments')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Investment Management
              </button>
            </div>
          </div>
        )
      case 'compliance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Compliance</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Ensure financial compliance and regulations.</p>
              <button
                onClick={() => router.push('/staff/cfo-compliance')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Compliance Management
              </button>
            </div>
          </div>
        )
      case 'reporting':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Generate and view financial reports.</p>
              <button
                onClick={() => router.push('/staff/cfo-reporting')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Financial Reports
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
                onClick={() => router.push(`/staff/cfo-${activeTab}`)}
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
        title="CFO Dashboard - Annita"
        description="Chief Financial Officer dashboard"
        keywords={['cfo', 'financial', 'dashboard', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* CFO Header */}
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">CFO Portal</h1>
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
                        ? 'bg-green-100 text-green-700'
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
        </main>
      </div>
    </>
  )
}
