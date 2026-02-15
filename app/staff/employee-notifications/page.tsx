'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedNotifications from '@/components/staff/SharedNotifications'
import MessagingChat from '@/components/staff/MessagingChat'

interface EmployeeNotification {
  id: string
  type: 'urgent' | 'important' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  category: 'requests' | 'contracts' | 'benefits' | 'training' | 'profile' | 'calendar' | 'work' | 'company'
  priority: 'high' | 'medium' | 'low'
  sender?: string
  dueDate?: string
}

export default function EmployeeNotificationsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const employeeNotifications: EmployeeNotification[] = [
    {
      id: '1',
      type: 'important',
      title: 'Timesheet Approval Required',
      message: 'Your timesheet for week of Feb 12-16 requires approval. Please submit by end of day tomorrow.',
      timestamp: '2 hours ago',
      read: false,
      actionRequired: true,
      category: 'work',
      priority: 'high',
      sender: 'Manager',
      dueDate: '2024-02-21'
    },
    {
      id: '2',
      type: 'info',
      title: 'Training Enrollment Confirmation',
      message: 'You have been successfully enrolled in "Advanced Communication Skills" training starting March 1st.',
      timestamp: '4 hours ago',
      read: false,
      actionRequired: false,
      category: 'training',
      priority: 'medium',
      sender: 'Training Department'
    },
    {
      id: '3',
      type: 'success',
      title: 'Performance Review Completed',
      message: 'Your Q1 performance review has been completed. Overall rating: Exceeds Expectations. View detailed feedback.',
      timestamp: '6 hours ago',
      read: true,
      actionRequired: false,
      category: 'profile',
      priority: 'medium',
      sender: 'Manager'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Benefits Enrollment Deadline',
      message: 'Open enrollment for benefits ends this Friday. Please review and select your coverage options.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: true,
      category: 'benefits',
      priority: 'high',
      sender: 'HR Benefits Team',
      dueDate: '2024-02-23'
    },
    {
      id: '5',
      type: 'info',
      title: 'Company Holiday Schedule',
      message: '2024 holiday calendar has been updated. New company-wide holiday added on June 15th for Team Building Day.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: false,
      category: 'company',
      priority: 'low',
      sender: 'HR Communications'
    },
    {
      id: '6',
      type: 'important',
      title: 'Contract Renewal Notice',
      message: 'Your employment contract expires on June 30th. Renewal discussions will begin next month. Please prepare any questions.',
      timestamp: '3 days ago',
      read: true,
      actionRequired: true,
      category: 'contracts',
      priority: 'medium',
      sender: 'HR Department',
      dueDate: '2024-03-15'
    },
    {
      id: '7',
      type: 'info',
      title: 'Team Meeting Invitation',
      message: 'Weekly team sync meeting scheduled for Thursday at 2 PM. Agenda: project updates and Q2 planning.',
      timestamp: '4 days ago',
      read: true,
      actionRequired: false,
      category: 'calendar',
      priority: 'low',
      sender: 'Team Lead'
    },
    {
      id: '8',
      type: 'success',
      title: 'Request Approved',
      message: 'Your professional development request for online course has been approved. Budget: $2,500.',
      timestamp: '1 week ago',
      read: true,
      actionRequired: false,
      category: 'requests',
      priority: 'low',
      sender: 'Manager'
    }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'employee') {
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

  const employeeCategories = ['requests', 'contracts', 'benefits', 'training', 'profile', 'calendar', 'work', 'company']

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
        title="Employee Notifications - Annita"
        description="Employee notifications and personal alerts management"
        keywords={['employee', 'notifications', 'personal', 'alerts', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedNotifications
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificCategories={employeeCategories}
        roleSpecificNotifications={employeeNotifications}
      />

      {/* Messaging Chat Section */}
      <div className="container mx-auto px-4 py-8">
        <MessagingChat />
      </div>
    </>
  )
}
