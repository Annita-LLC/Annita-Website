'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedNotifications from '@/components/staff/SharedNotifications'

interface HRNotification {
  id: string
  type: 'urgent' | 'important' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  category: 'employees' | 'recruitment' | 'onboarding' | 'benefits' | 'payroll' | 'training' | 'compliance' | 'requests'
  priority: 'high' | 'medium' | 'low'
  sender?: string
  dueDate?: string
}

export default function HRNotificationsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const hrNotifications: HRNotification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Employee Relations Issue - Engineering Team',
      message: 'Critical conflict reported between team members in Engineering department. Immediate mediation required.',
      timestamp: '45 minutes ago',
      read: false,
      actionRequired: true,
      category: 'employees',
      priority: 'high',
      sender: 'Engineering Manager',
      dueDate: '2024-02-20'
    },
    {
      id: '2',
      type: 'important',
      title: 'Open Positions - Critical Roles',
      message: '5 critical positions remain unfilled for over 30 days. Please review and approve expedited hiring process.',
      timestamp: '2 hours ago',
      read: false,
      actionRequired: true,
      category: 'recruitment',
      priority: 'high',
      sender: 'Recruitment Team',
      dueDate: '2024-02-25'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Benefits Enrollment Deadline',
      message: 'Q1 benefits enrollment period ends this Friday. 35% of employees have not yet completed enrollment.',
      timestamp: '4 hours ago',
      read: true,
      actionRequired: true,
      category: 'benefits',
      priority: 'medium',
      sender: 'Benefits Administration',
      dueDate: '2024-02-23'
    },
    {
      id: '4',
      type: 'success',
      title: 'New Hire Onboarding Complete',
      message: 'All 12 new hires from January batch have successfully completed onboarding. Satisfaction score: 4.6/5.',
      timestamp: '6 hours ago',
      read: true,
      actionRequired: false,
      category: 'onboarding',
      priority: 'low',
      sender: 'Onboarding Coordinator'
    },
    {
      id: '5',
      type: 'info',
      title: 'Training Program Update',
      message: 'Leadership development program for Q2 is now finalized. 25 managers enrolled across all departments.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: false,
      category: 'training',
      priority: 'medium',
      sender: 'Training Department'
    },
    {
      id: '6',
      type: 'important',
      title: 'Payroll Processing Reminder',
      message: 'Monthly payroll processing begins tomorrow. Please ensure all timesheets and approvals are completed.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: true,
      category: 'payroll',
      priority: 'high',
      sender: 'Payroll Department',
      dueDate: '2024-02-21'
    },
    {
      id: '7',
      type: 'urgent',
      title: 'Compliance Training Required',
      message: 'Annual harassment prevention training deadline approaching. 40% of staff still need to complete mandatory training.',
      timestamp: '3 days ago',
      read: true,
      actionRequired: true,
      category: 'compliance',
      priority: 'high',
      sender: 'Compliance Officer',
      dueDate: '2024-03-01'
    },
    {
      id: '8',
      type: 'info',
      title: 'Employee Requests Summary',
      message: 'This week: 8 vacation requests, 3 leave of absence, 2 accommodation requests. All pending your approval.',
      timestamp: '1 week ago',
      read: true,
      actionRequired: false,
      category: 'requests',
      priority: 'medium',
      sender: 'HR Assistant'
    }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'hr') {
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

  const hrCategories = ['employees', 'recruitment', 'onboarding', 'benefits', 'payroll', 'training', 'compliance', 'requests']

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
        title="HR Notifications - Annita"
        description="HR notifications and human resources alerts management"
        keywords={['hr', 'notifications', 'human resources', 'alerts', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedNotifications
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificCategories={hrCategories}
        roleSpecificNotifications={hrNotifications}
      />
    </>
  )
}
