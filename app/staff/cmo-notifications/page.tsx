'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedNotifications from '@/components/staff/SharedNotifications'

interface CMONotification {
  id: string
  type: 'urgent' | 'important' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  category: 'campaigns' | 'analytics' | 'budget' | 'brand' | 'content' | 'social' | 'events' | 'partners'
  priority: 'high' | 'medium' | 'low'
  sender?: string
  dueDate?: string
}

export default function CMONotificationsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const cmoNotifications: CMONotification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Q1 Campaign Performance Below Target',
      message: 'Spring campaign is underperforming by 22%. Immediate strategy adjustment required to meet quarterly goals.',
      timestamp: '1 hour ago',
      read: false,
      actionRequired: true,
      category: 'campaigns',
      priority: 'high',
      sender: 'Campaign Analytics Team',
      dueDate: '2024-02-22'
    },
    {
      id: '2',
      type: 'important',
      title: 'Brand Guidelines Update Required',
      message: 'Annual brand review scheduled for next week. Please prepare updated brand guidelines and visual identity standards.',
      timestamp: '3 hours ago',
      read: false,
      actionRequired: true,
      category: 'brand',
      priority: 'medium',
      sender: 'Brand Manager',
      dueDate: '2024-02-28'
    },
    {
      id: '3',
      type: 'success',
      title: 'Social Media Engagement Record High',
      message: 'Congratulations! This week\'s social media engagement reached an all-time high of 45% increase across all platforms.',
      timestamp: '5 hours ago',
      read: true,
      actionRequired: false,
      category: 'social',
      priority: 'low',
      sender: 'Social Media Team'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Marketing Budget Overrun Alert',
      message: 'Q1 marketing budget usage at 85% with 6 weeks remaining. Please review and adjust spending forecasts.',
      timestamp: '1 day ago',
      read: true,
      actionRequired: true,
      category: 'budget',
      priority: 'medium',
      sender: 'Finance Department',
      dueDate: '2024-02-25'
    },
    {
      id: '5',
      type: 'info',
      title: 'New Content Calendar Approved',
      message: 'Q2 content calendar has been approved by executive team. Ready for implementation and distribution.',
      timestamp: '2 days ago',
      read: true,
      actionRequired: false,
      category: 'content',
      priority: 'low',
      sender: 'Content Strategy Team'
    },
    {
      id: '6',
      type: 'important',
      title: 'Partnership Agreement Ready for Review',
      message: 'Strategic partnership with TechInfluencers is ready for your review. $500K annual value with co-marketing benefits.',
      timestamp: '3 days ago',
      read: true,
      actionRequired: true,
      category: 'partners',
      priority: 'high',
      sender: 'Business Development',
      dueDate: '2024-02-26'
    },
    {
      id: '7',
      type: 'urgent',
      title: 'Industry Conference Speaking Opportunity',
      message: 'Invited to speak at Marketing Summit 2024. Panel discussion on "Future of Digital Marketing". Response required by Friday.',
      timestamp: '4 days ago',
      read: true,
      actionRequired: true,
      category: 'events',
      priority: 'medium',
      sender: 'Events Coordinator',
      dueDate: '2024-02-23'
    },
    {
      id: '8',
      type: 'success',
      title: 'Marketing Analytics Dashboard Live',
      message: 'New real-time analytics dashboard is now live. Provides instant insights into campaign performance and ROI metrics.',
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
    
    if (auth === 'true' && role === 'cmo') {
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

  const cmoCategories = ['campaigns', 'analytics', 'budget', 'brand', 'content', 'social', 'events', 'partners']

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
        title="CMO Notifications - Annita"
        description="CMO notifications and marketing alerts management"
        keywords={['cmo', 'notifications', 'marketing', 'alerts', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedNotifications
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificCategories={cmoCategories}
        roleSpecificNotifications={cmoNotifications}
      />
    </>
  )
}
