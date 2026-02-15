'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Megaphone, TrendingUp, Users, Target, Bell, LogOut, Menu, X, BarChart3, Heart, Calendar, DollarSign, FileText, AlertCircle, CheckCircle, Clock, Lightbulb, Mail } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import Announcements from '@/components/staff/Announcements'

export default function CMODashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    
    if (auth === 'true' && (role === 'cmo' || role === 'ceo')) {
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
    { id: 'overview', label: 'Marketing Overview', icon: Megaphone },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'team', label: 'Marketing Team', icon: Users },
    { id: 'analytics', label: 'Marketing Analytics', icon: BarChart3 },
    { id: 'budget', label: 'Marketing Budget', icon: DollarSign },
    { id: 'brand', label: 'Brand Management', icon: Heart },
    { id: 'content', label: 'Content Strategy', icon: FileText },
    { id: 'social', label: 'Social Media', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'partners', label: 'Partnerships', icon: Lightbulb },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">CMO Marketing Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <Megaphone className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Marketing ROI</p>
                    <p className="text-2xl font-bold text-gray-900">324%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Budget</p>
                    <p className="text-2xl font-bold text-gray-900">$450K</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )
      case 'campaigns':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage and monitor marketing campaigns.</p>
              <button
                onClick={() => router.push('/staff/cmo-campaigns')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Campaign Management
              </button>
            </div>
          </div>
        )
      case 'team':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Marketing Team</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage marketing team members.</p>
              <button
                onClick={() => router.push('/staff/cmo-team')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Team Management
              </button>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Marketing Analytics</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">View marketing analytics and metrics.</p>
              <button
                onClick={() => router.push('/staff/cmo-analytics')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Marketing Analytics
              </button>
            </div>
          </div>
        )
      case 'budget':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Marketing Budget</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage marketing budget and expenses.</p>
              <button
                onClick={() => router.push('/staff/cmo-budget')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Budget Management
              </button>
            </div>
          </div>
        )
      case 'brand':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Brand Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage brand strategy and guidelines.</p>
              <button
                onClick={() => router.push('/staff/cmo-brand')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Brand Management
              </button>
            </div>
          </div>
        )
      case 'content':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Content Strategy</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage content strategy and creation.</p>
              <button
                onClick={() => router.push('/staff/cmo-content')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Content Strategy
              </button>
            </div>
          </div>
        )
      case 'social':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Social Media</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage social media channels and campaigns.</p>
              <button
                onClick={() => router.push('/staff/cmo-social')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Social Media Management
              </button>
            </div>
          </div>
        )
      case 'events':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage marketing events and sponsorships.</p>
              <button
                onClick={() => router.push('/staff/cmo-events')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Events Management
              </button>
            </div>
          </div>
        )
      case 'partners':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Partnerships</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 mb-4">Manage strategic partnerships and collaborations.</p>
              <button
                onClick={() => router.push('/staff/cmo-partners')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Open Partnerships Management
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
                onClick={() => router.push(`/staff/cmo-${activeTab}`)}
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
        title="CMO Dashboard - Annita"
        description="Chief Marketing Officer dashboard"
        keywords={['cmo', 'marketing', 'dashboard', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* CMO Header */}
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">CMO Portal</h1>
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
          
          {/* Announcements Section */}
          <div className="mt-8">
            <Announcements userRole="cmo" />
          </div>
        </main>
      </div>
    </>
  )
}
