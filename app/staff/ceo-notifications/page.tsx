'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedNotifications from '@/components/staff/SharedNotifications'

interface CEONotification {
  id: string
  type: 'urgent' | 'important' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  category: 'board' | 'financial' | 'strategic' | 'compliance' | 'investor' | 'operations'
  priority: 'high' | 'medium' | 'low'
  sender?: string
  dueDate?: string
}

export default function CEONotificationsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const ceoNotifications: CEONotification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Board Meeting Rescheduled',
      message: 'Tomorrow\'s board meeting has been moved to 3 PM EST. New agenda items include Q4 financial review and 2025 strategic planning.',
      timestamp: '2 hours ago',
      read: false,
      actionRequired: true,
      category: 'board',
      priority: 'high',
      sender: 'Board Secretary',
      dueDate: '2024-02-21'
    },
    {
      id: '2',
      type: 'important',
      title: 'Q4 Financial Report Ready',
      message: 'The Q4 financial report has been prepared and is ready for your review. Revenue increased by 15% compared to Q3.',
      timestamp: '4 hours ago',
      read: false,
      actionRequired: true,
      category: 'financial',
      priority: 'high',
      sender: 'CFO Office'
    },
    {
      id: '3',
      type: 'urgent',
      title: 'Investor Meeting Tomorrow',
      message: 'Quarterly investor meeting scheduled for tomorrow at 10 AM. Please prepare presentation slides and financial projections.',
      timestamp: '5 hours ago',
      read: false,
      actionRequired: true,
      category: 'investor',
      priority: 'high',
      sender: 'Investor Relations',
      dueDate: '2024-02-21'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Compliance Audit Scheduled',
      message: 'Annual compliance audit scheduled for next week. Please ensure all documentation is up to date.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: true,
      category: 'compliance',
      priority: 'medium',
      sender: 'Legal Department',
      dueDate: '2024-02-28'
    },
    {
      id: '5',
      type: 'info',
      title: 'New Strategic Partnership',
      message: 'Potential strategic partnership discussion with TechCorp Inc. They are interested in a $10M investment opportunity.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: false,
      category: 'strategic',
      priority: 'medium',
      sender: 'Business Development'
    },
    {
      id: '6',
      type: 'success',
      title: 'Market Share Increased',
      message: 'Great news! Our market share has increased by 3.2% this quarter, exceeding our target of 2%.',
      timestamp: '3 days ago',
      read: true,
      actionRequired: false,
      category: 'operations',
      priority: 'low',
      sender: 'Marketing Analytics'
    },
    {
      id: '7',
      type: 'important',
      title: 'Executive Team Review',
      message: 'Monthly executive team performance review scheduled for Friday. Please review team metrics and provide feedback.',
      timestamp: '4 days ago',
      read: true,
      actionRequired: true,
      category: 'board',
      priority: 'medium',
      sender: 'HR Department',
      dueDate: '2024-02-23'
    },
    {
      id: '8',
      type: 'info',
      title: 'Industry Conference Invitation',
      message: 'You\'ve been invited to speak at the Global Leadership Summit 2024. Event dates: March 15-17, 2024.',
      timestamp: '1 week ago',
      read: true,
      actionRequired: false,
      category: 'strategic',
      priority: 'low',
      sender: 'Events Coordinator'
    }
  ]

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

  const ceoCategories = ['board', 'financial', 'strategic', 'compliance', 'investor', 'operations']

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
        title="CEO Notifications - Annita"
        description="CEO notifications and alerts management"
        keywords={['ceo', 'notifications', 'alerts', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedNotifications
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificCategories={ceoCategories}
        roleSpecificNotifications={ceoNotifications}
      />
    </>
  )
}
