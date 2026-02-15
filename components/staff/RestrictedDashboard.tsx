'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, Clock, User, FileText, Calendar, Bell, LogOut, Menu, X, Briefcase, Heart, BookOpen } from 'lucide-react'

interface RestrictedDashboardProps {
  userRole: string
  employeeId: string
  onCompleteProfile: () => void
  onLogout: () => void
}

export default function RestrictedDashboard({ userRole, employeeId, onCompleteProfile, onLogout }: RestrictedDashboardProps) {
  const [showReminder, setShowReminder] = useState(false)
  const [reminderCount, setReminderCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Show reminder after 30 seconds
    const timer = setTimeout(() => {
      setShowReminder(true)
      setReminderCount(1)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleCompleteProfile = () => {
    onCompleteProfile()
  }

  const handleDismissReminder = () => {
    setShowReminder(false)
    // Show reminder again after 30 seconds
    setTimeout(() => {
      setShowReminder(true)
      setReminderCount(prev => prev + 1)
    }, 30000)
  }

  // Render the dashboard content (read-only)
  const renderDashboardContent = () => {
    const tabs = [
      { id: 'overview', label: 'Overview', icon: User },
      { id: 'requests', label: 'Requests', icon: FileText },
      { id: 'schedule', label: 'Schedule', icon: Calendar },
      { id: 'benefits', label: 'Benefits', icon: Heart },
      { id: 'training', label: 'Training', icon: BookOpen },
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">ID: {employeeId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className="flex items-center space-x-2 py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">My Requests</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hours This Week</p>
                    <p className="text-2xl font-bold text-gray-900">32</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Benefits</p>
                    <p className="text-2xl font-bold text-gray-900">Active</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Training Courses</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <p className="text-gray-500">Complete your profile to access all features and view your activity.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Dashboard Content */}
      {renderDashboardContent()}

      {/* Reminder Overlay */}
      {showReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Complete Your Profile
              </h3>
              
              <p className="text-gray-600 mb-6">
                {reminderCount === 1 
                  ? "You've skipped your profile setup. Please complete it now to access all features."
                  : `Reminder #${reminderCount}: Complete your profile to unlock full dashboard functionality.`
                }
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleCompleteProfile}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Complete Profile Now
                </button>
                
                <button
                  onClick={handleDismissReminder}
                  className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Remind Me Later
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                You can only view dashboard content. All actions require a completed profile.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
