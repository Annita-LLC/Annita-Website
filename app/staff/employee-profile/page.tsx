'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import ProfileSettings from '@/components/staff/ProfileSettings'
import EmployeeProfileSetup from '@/components/staff/EmployeeProfileSetup'
import SEOHead from '@/components/seo/SEOHead'

export default function EmployeeProfilePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

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
    localStorage.removeItem('staff-role')
    localStorage.removeItem('staff-employee-id')
    router.push('/staff/login')
  }

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
        title="Profile Settings - Annita"
        description="Employee profile management and settings"
        keywords={['profile', 'settings', 'employee account', 'personal information']}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Employee Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <button
                  onClick={() => router.back()}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">Profile Settings</h1>
                  {employeeId && (
                    <p className="text-xs sm:text-sm text-gray-500 truncate">ID: {employeeId}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileSettings />
          
          {/* Employee Profile Setup Section */}
          <div className="mt-8">
            <EmployeeProfileSetup 
              onProfileComplete={(profile) => console.log('Profile completed:', profile)}
              onCancel={() => console.log('Profile setup cancelled')}
            />
          </div>
        </main>
      </div>
    </>
  )
}
