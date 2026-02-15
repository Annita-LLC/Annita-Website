'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedNotifications from '@/components/staff/SharedNotifications'

interface COONotification {
  id: string
  type: 'urgent' | 'important' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  category: 'projects' | 'efficiency' | 'process' | 'facilities' | 'supply' | 'quality' | 'compliance' | 'reports'
  priority: 'high' | 'medium' | 'low'
  sender?: string
  dueDate?: string
}

export default function COONotificationsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const cooNotifications: COONotification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Production Line Critical Failure',
      message: 'Main production line at Facility A has experienced critical failure. Estimated downtime: 48 hours. Immediate action required.',
      timestamp: '30 minutes ago',
      read: false,
      actionRequired: true,
      category: 'projects',
      priority: 'high',
      sender: 'Plant Manager',
      dueDate: '2024-02-20'
    },
    {
      id: '2',
      type: 'important',
      title: 'Supply Chain Disruption Alert',
      message: 'Key supplier for electronic components has delayed shipment by 2 weeks. Affects 3 major product lines.',
      timestamp: '2 hours ago',
      read: false,
      actionRequired: true,
      category: 'supply',
      priority: 'high',
      sender: 'Supply Chain Manager',
      dueDate: '2024-02-22'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Quality Control Audit Findings',
      message: 'Q1 quality audit revealed 12 non-conformance issues requiring corrective action within 30 days.',
      timestamp: '4 hours ago',
      read: true,
      actionRequired: true,
      category: 'quality',
      priority: 'medium',
      sender: 'Quality Assurance',
      dueDate: '2024-03-20'
    },
    {
      id: '4',
      type: 'success',
      title: 'Operational Efficiency Improvement',
      message: 'Great news! Overall operational efficiency increased by 8.5% this quarter, exceeding target of 5%.',
      timestamp: '6 hours ago',
      read: true,
      actionRequired: false,
      category: 'efficiency',
      priority: 'low',
      sender: 'Operations Analytics'
    },
    {
      id: '5',
      type: 'info',
      title: 'New Process Automation Implemented',
      message: 'Automated inventory management system successfully deployed in all warehouses. Expected to reduce processing time by 40%.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: false,
      category: 'process',
      priority: 'medium',
      sender: 'Process Engineering'
    },
    {
      id: '6',
      type: 'important',
      title: 'Facility Maintenance Schedule',
      message: 'Annual facility maintenance scheduled for next month. Please approve budget and resource allocation.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: true,
      category: 'facilities',
      priority: 'medium',
      sender: 'Facilities Manager',
      dueDate: '2024-03-15'
    },
    {
      id: '7',
      type: 'urgent',
      title: 'Regulatory Compliance Deadline',
      message: 'OSHA compliance certification renewal due in 45 days. All facilities must pass inspection before deadline.',
      timestamp: '3 days ago',
      read: true,
      actionRequired: true,
      category: 'compliance',
      priority: 'high',
      sender: 'Compliance Officer',
      dueDate: '2024-04-05'
    },
    {
      id: '8',
      type: 'info',
      title: 'Monthly Operations Report Ready',
      message: 'February operations report is complete. Key metrics: production up 12%, defects down 8%, on-time delivery 96%.',
      timestamp: '1 week ago',
      read: true,
      actionRequired: false,
      category: 'reports',
      priority: 'low',
      sender: 'Operations Reporting'
    }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'coo') {
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

  const cooCategories = ['projects', 'efficiency', 'process', 'facilities', 'supply', 'quality', 'compliance', 'reports']

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
        title="COO Notifications - Annita"
        description="COO notifications and operations alerts management"
        keywords={['coo', 'notifications', 'operations', 'alerts', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedNotifications
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificCategories={cooCategories}
        roleSpecificNotifications={cooNotifications}
      />
    </>
  )
}
