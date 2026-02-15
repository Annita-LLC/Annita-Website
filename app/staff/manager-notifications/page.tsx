'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedNotifications from '@/components/staff/SharedNotifications'

interface ManagerNotification {
  id: string
  type: 'urgent' | 'important' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  category: 'team' | 'projects' | 'budget' | 'meetings' | 'goals' | 'analytics' | 'requests' | 'performance'
  priority: 'high' | 'medium' | 'low'
  sender?: string
  dueDate?: string
}

export default function ManagerNotificationsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const managerNotifications: ManagerNotification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Project Deadline at Risk',
      message: 'Alpha project deadline is 3 days away and team is behind schedule. Immediate intervention required.',
      timestamp: '1 hour ago',
      read: false,
      actionRequired: true,
      category: 'projects',
      priority: 'high',
      sender: 'Project Lead',
      dueDate: '2024-02-23'
    },
    {
      id: '2',
      type: 'important',
      title: 'Team Performance Review Due',
      message: 'Monthly team performance reviews scheduled for this week. Please complete all assessments by Friday.',
      timestamp: '3 hours ago',
      read: false,
      actionRequired: true,
      category: 'performance',
      priority: 'medium',
      sender: 'HR Department',
      dueDate: '2024-02-23'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Budget Overrun Alert',
      message: 'Team budget usage at 85% with 3 weeks remaining in quarter. Please review spending patterns.',
      timestamp: '5 hours ago',
      read: true,
      actionRequired: true,
      category: 'budget',
      priority: 'medium',
      sender: 'Finance Department',
      dueDate: '2024-02-25'
    },
    {
      id: '4',
      type: 'success',
      title: 'Team Goal Achievement',
      message: 'Congratulations! Your team exceeded Q1 targets by 15%. All key performance indicators met or exceeded.',
      timestamp: '6 hours ago',
      read: true,
      actionRequired: false,
      category: 'goals',
      priority: 'low',
      sender: 'Management Analytics'
    },
    {
      id: '5',
      type: 'info',
      title: '1-on-1 Meetings Schedule',
      message: 'Weekly 1-on-1 meetings with team members scheduled. 3 members requested additional time for career discussions.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: false,
      category: 'meetings',
      priority: 'medium',
      sender: 'Team Assistant'
    },
    {
      id: '6',
      type: 'important',
      title: 'Employee Leave Requests',
      message: '4 team members have submitted vacation requests for next month. Please review and approve schedule coverage.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: true,
      category: 'requests',
      priority: 'medium',
      sender: 'HR Coordinator',
      dueDate: '2024-02-28'
    },
    {
      id: '7',
      type: 'urgent',
      title: 'Team Member Performance Issue',
      message: 'Performance improvement plan for team member John Smith requires your review and signature today.',
      timestamp: '3 days ago',
      read: true,
      actionRequired: true,
      category: 'performance',
      priority: 'high',
      sender: 'HR Business Partner',
      dueDate: '2024-02-20'
    },
    {
      id: '8',
      type: 'info',
      title: 'Team Analytics Report',
      message: 'Weekly team productivity report available. Productivity up 8%, collaboration metrics improved by 12%.',
      timestamp: '1 week ago',
      read: true,
      actionRequired: false,
      category: 'analytics',
      priority: 'low',
      sender: 'Data Analytics Team'
    }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'manager') {
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

  const managerCategories = ['team', 'projects', 'budget', 'meetings', 'goals', 'analytics', 'requests', 'performance']

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
        title="Manager Notifications - Annita"
        description="Manager notifications and team management alerts"
        keywords={['manager', 'notifications', 'team', 'alerts', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedNotifications
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificCategories={managerCategories}
        roleSpecificNotifications={managerNotifications}
      />
    </>
  )
}
