'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Eye, UserCheck, UserX } from 'lucide-react'

interface AttendanceSigninProps {
  userRole: string
  employeeId: string
  onNavigateToAttendance?: () => void
  className?: string
}

export default function AttendanceSignin({ 
  userRole, 
  employeeId, 
  onNavigateToAttendance,
  className = '' 
}: AttendanceSigninProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState('')

  useEffect(() => {
    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    // Check if user already checked in today
    const storedCheckInTime = localStorage.getItem('check-in-time')
    const storedCheckInDate = localStorage.getItem('check-in-date')
    const today = new Date().toISOString().split('T')[0]
    
    if (storedCheckInTime && storedCheckInDate === today) {
      setCheckInTime(storedCheckInTime)
      setHasCheckedIn(true)
    }
  }, [])

  const handleCheckIn = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    
    setCheckInTime(timeString)
    setHasCheckedIn(true)
    
    // Store check-in in localStorage for persistence
    localStorage.setItem('check-in-time', timeString)
    localStorage.setItem('check-in-date', now.toISOString().split('T')[0])
  }

  const handleCheckOut = () => {
    setHasCheckedIn(false)
    setCheckInTime('')
    
    // Clear check-in from localStorage
    localStorage.removeItem('check-in-time')
    localStorage.removeItem('check-in-date')
  }

  const getRoleLabel = () => {
    switch (userRole) {
      case 'ceo': return 'CEO'
      case 'cfo': return 'CFO'
      case 'cmo': return 'CMO'
      case 'coo': return 'COO'
      case 'hr': return 'HR Manager'
      case 'manager': return 'Manager'
      case 'employee': return 'Employee'
      default: return 'Staff'
    }
  }

  const getGradientColors = () => {
    switch (userRole) {
      case 'ceo': return 'from-purple-50 to-red-50 border-purple-200'
      case 'cfo': return 'from-blue-50 to-green-50 border-blue-200'
      case 'cmo': return 'from-pink-50 to-orange-50 border-pink-200'
      case 'coo': return 'from-gray-50 to-blue-50 border-gray-200'
      case 'hr': return 'from-green-50 to-blue-50 border-green-200'
      case 'manager': return 'from-yellow-50 to-orange-50 border-yellow-200'
      case 'employee': return 'from-blue-50 to-purple-50 border-blue-200'
      default: return 'from-gray-50 to-blue-50 border-gray-200'
    }
  }

  return (
    <div className={`bg-gradient-to-r ${getGradientColors()} rounded-lg p-6 border ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {getRoleLabel()} Attendance
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-gray-900">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
            <div className="text-sm text-gray-500">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {!hasCheckedIn ? (
            <button
              onClick={handleCheckIn}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Check In</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                Checked in: {checkInTime}
              </span>
              <button
                onClick={handleCheckOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
              >
                <UserX className="w-4 h-4" />
                <span>Check Out</span>
              </button>
            </div>
          )}
          
          {onNavigateToAttendance && (
            <button
              onClick={onNavigateToAttendance}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Attendance</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
