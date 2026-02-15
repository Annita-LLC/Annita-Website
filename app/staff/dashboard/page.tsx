'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardOverview from '@/components/staff/DashboardOverview'

export default function StaffDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    
    if (auth === 'true' && role) {
      // Redirect to role-specific dashboard
      switch (role) {
        case 'ceo':
          router.replace('/staff/ceo-dashboard')
          break
        case 'cfo':
          router.replace('/staff/cfo-dashboard')
          break
        case 'cmo':
          router.replace('/staff/cmo-dashboard')
          break
        case 'coo':
          router.replace('/staff/coo-dashboard')
          break
        case 'hr':
          router.replace('/staff/hr-dashboard')
          break
        case 'manager':
          router.replace('/staff/manager-dashboard')
          break
        case 'employee':
          router.replace('/staff/employee-dashboard')
          break
        default:
          router.replace('/staff/employee-dashboard')
      }
    } else {
      router.replace('/staff/login')
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return null
}
