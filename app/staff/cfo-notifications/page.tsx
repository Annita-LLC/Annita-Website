'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedNotifications from '@/components/staff/SharedNotifications'

interface CFONotification {
  id: string
  type: 'urgent' | 'important' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  category: 'budget' | 'payroll' | 'expenses' | 'compliance' | 'reporting' | 'investments'
  priority: 'high' | 'medium' | 'low'
  sender?: string
  dueDate?: string
}

export default function CFONotificationsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const cfoNotifications: CFONotification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Budget Approval Required',
      message: 'Q4 marketing budget of $500K requires your approval before end of week. Marketing team has submitted detailed ROI projections.',
      timestamp: '1 hour ago',
      read: false,
      actionRequired: true,
      category: 'budget',
      priority: 'high',
      sender: 'Marketing Department',
      dueDate: '2024-02-23'
    },
    {
      id: '2',
      type: 'important',
      title: 'Payroll Processing',
      message: 'Monthly payroll processing scheduled for tomorrow. Please review and approve all overtime requests.',
      timestamp: '2 hours ago',
      read: false,
      actionRequired: true,
      category: 'payroll',
      priority: 'high',
      sender: 'HR Payroll Team',
      dueDate: '2024-02-21'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Expense Report Over Budget',
      message: 'Engineering department expenses exceeded budget by 15% this month. Please review and approve additional funds.',
      timestamp: '3 hours ago',
      read: true,
      actionRequired: true,
      category: 'expenses',
      priority: 'medium',
      sender: 'Finance Team',
      dueDate: '2024-02-22'
    },
    {
      id: '4',
      type: 'info',
      title: 'Investment Portfolio Update',
      message: 'Q4 investment portfolio performance: +12.3% return. Outperforming market by 4.2%.',
      timestamp: '5 hours ago',
      read: true,
      actionRequired: false,
      category: 'investments',
      priority: 'low',
      sender: 'Investment Manager'
    },
    {
      id: '5',
      type: 'success',
      title: 'Financial Report Completed',
      message: 'Monthly financial report has been completed and submitted to the board. All KPIs met or exceeded.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: false,
      category: 'reporting',
      priority: 'low',
      sender: 'Finance Analytics'
    },
    {
      id: '6',
      type: 'important',
      title: 'Compliance Audit Reminder',
      message: 'Annual financial compliance audit scheduled for next month. Please prepare all necessary documentation.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: true,
      category: 'compliance',
      priority: 'medium',
      sender: 'Compliance Office',
      dueDate: '2024-03-15'
    },
    {
      id: '7',
      type: 'info',
      title: 'Tax Planning Meeting',
      message: 'Q4 tax planning meeting scheduled for Friday at 2 PM. Please prepare tax projections and strategies.',
      timestamp: '3 days ago',
      read: true,
      actionRequired: false,
      category: 'reporting',
      priority: 'medium',
      sender: 'Tax Department'
    },
    {
      id: '8',
      type: 'urgent',
      title: 'Cash Flow Alert',
      message: 'Cash flow projection shows potential shortfall in Q1. Please review and adjust spending forecasts.',
      timestamp: '4 days ago',
      read: true,
      actionRequired: true,
      category: 'budget',
      priority: 'high',
      sender: 'Treasury Department',
      dueDate: '2024-02-25'
    }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cfo') {
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

  const cfoCategories = ['budget', 'payroll', 'expenses', 'compliance', 'reporting', 'investments']

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
        title="CFO Notifications - Annita"
        description="CFO notifications and financial alerts management"
        keywords={['cfo', 'notifications', 'financial', 'alerts', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedNotifications
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificCategories={cfoCategories}
        roleSpecificNotifications={cfoNotifications}
      />
    </>
  )
}
