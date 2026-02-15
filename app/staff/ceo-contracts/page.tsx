'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SEOHead from '@/components/seo/SEOHead'
import SharedContracts from '@/components/staff/SharedContracts'

interface CEOContract {
  id: string
  title: string
  type: string
  category: string
  status: 'active' | 'expired' | 'pending' | 'signed' | 'draft'
  startDate: string
  endDate?: string
  signedDate?: string | undefined
  description: string
  documentUrl: string
  fileSize: string
  lastModified: string
  parties: string[]
  value?: string
  renewalDate?: string | undefined
  priority: 'high' | 'medium' | 'low'
  department: string
  assignedTo?: string
}

export default function CEOContractsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  const ceoContracts: CEOContract[] = [
    {
      id: 'CON-001',
      title: 'Strategic Partnership Agreement - TechCorp',
      type: 'partnership',
      category: 'strategic',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2027-01-15',
      signedDate: '2024-01-10',
      description: 'Multi-year strategic partnership for technology development and market expansion. Includes joint R&D initiatives and revenue sharing.',
      documentUrl: '/contracts/ceo/techcorp-partnership.pdf',
      fileSize: '2.4 MB',
      lastModified: '2024-01-10',
      parties: ['Annita Inc.', 'TechCorp International'],
      value: '$10,000,000',
      renewalDate: '2026-10-15',
      priority: 'high',
      department: 'Strategic Development',
      assignedTo: 'CEO Office'
    },
    {
      id: 'CON-002',
      title: 'Master Services Agreement - Global Solutions',
      type: 'vendor',
      category: 'operational',
      status: 'active',
      startDate: '2023-06-01',
      endDate: '2025-06-01',
      signedDate: '2023-05-28',
      description: 'Comprehensive services agreement for IT infrastructure, cloud services, and technical support across all business units.',
      documentUrl: '/contracts/ceo/global-services.pdf',
      fileSize: '1.8 MB',
      lastModified: '2023-05-28',
      parties: ['Annita Inc.', 'Global Solutions Ltd'],
      value: '$5,000,000',
      renewalDate: '2025-03-01',
      priority: 'medium',
      department: 'IT Operations',
      assignedTo: 'CTO Office'
    },
    {
      id: 'CON-003',
      title: 'Executive Employment Agreement - Sarah Chen',
      type: 'employment',
      category: 'executive',
      status: 'active',
      startDate: '2023-01-01',
      signedDate: '2022-12-15',
      description: 'Chief Technology Officer employment agreement including compensation, benefits, stock options, and performance incentives.',
      documentUrl: '/contracts/ceo/cto-employment.pdf',
      fileSize: '856 KB',
      lastModified: '2022-12-15',
      parties: ['Annita Inc.', 'Sarah Chen'],
      value: '$850,000/year',
      renewalDate: '2024-12-15',
      priority: 'high',
      department: 'Executive',
      assignedTo: 'HR Department'
    },
    {
      id: 'CON-004',
      title: 'Merger Agreement - DataSync Acquisition',
      type: 'acquisition',
      category: 'strategic',
      status: 'pending',
      startDate: '2024-03-01',
      signedDate: undefined,
      description: 'Acquisition agreement for DataSync Technologies, including asset purchase, intellectual property transfer, and employee retention.',
      documentUrl: '/contracts/ceo/datasync-acquisition.pdf',
      fileSize: '3.2 MB',
      lastModified: '2024-02-15',
      parties: ['Annita Inc.', 'DataSync Technologies'],
      value: '$25,000,000',
      renewalDate: undefined,
      priority: 'high',
      department: 'M&A',
      assignedTo: 'CEO Office'
    },
    {
      id: 'CON-005',
      title: 'Investment Agreement - Series C Funding',
      type: 'investment',
      category: 'financial',
      status: 'signed',
      startDate: '2023-09-01',
      signedDate: '2023-08-25',
      description: 'Series C investment agreement with venture capital firms for product expansion and market penetration.',
      documentUrl: '/contracts/ceo/series-c-funding.pdf',
      fileSize: '1.5 MB',
      lastModified: '2023-08-25',
      parties: ['Annita Inc.', 'Venture Partners', 'Growth Capital'],
      value: '$50,000,000',
      renewalDate: undefined,
      priority: 'high',
      department: 'Finance',
      assignedTo: 'CFO Office'
    },
    {
      id: 'CON-006',
      title: 'Board Member Agreement - Michael Roberts',
      type: 'employment',
      category: 'governance',
      status: 'active',
      startDate: '2022-03-15',
      signedDate: '2022-03-10',
      description: 'Independent board member agreement including compensation, responsibilities, and confidentiality obligations.',
      documentUrl: '/contracts/ceo/board-member.pdf',
      fileSize: '425 KB',
      lastModified: '2022-03-10',
      parties: ['Annita Inc.', 'Michael Roberts'],
      value: '$75,000/year',
      renewalDate: '2025-03-10',
      priority: 'medium',
      department: 'Governance',
      assignedTo: 'Corporate Secretary'
    },
    {
      id: 'CON-007',
      title: 'Real Estate Lease - Headquarters',
      type: 'property',
      category: 'operational',
      status: 'active',
      startDate: '2022-01-01',
      endDate: '2027-01-01',
      signedDate: '2021-12-20',
      description: 'Corporate headquarters lease agreement for 50,000 sq ft office space in downtown business district.',
      documentUrl: '/contracts/ceo/hq-lease.pdf',
      fileSize: '1.2 MB',
      lastModified: '2021-12-20',
      parties: ['Annita Inc.', 'Downtown Properties LLC'],
      value: '$2,400,000/year',
      renewalDate: '2026-10-20',
      priority: 'medium',
      department: 'Operations',
      assignedTo: 'Facilities Manager'
    },
    {
      id: 'CON-008',
      title: 'Joint Venture Agreement - Asian Markets',
      type: 'partnership',
      category: 'strategic',
      status: 'draft',
      startDate: '2024-04-01',
      signedDate: undefined,
      description: 'Proposed joint venture for market entry into Asian markets with local partner. Currently under legal review.',
      documentUrl: '/contracts/ceo/asian-jv-draft.pdf',
      fileSize: '2.8 MB',
      lastModified: '2024-02-10',
      parties: ['Annita Inc.', 'Asia Pacific Partners'],
      value: '$15,000,000',
      renewalDate: undefined,
      priority: 'medium',
      department: 'International',
      assignedTo: 'Business Development'
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

  const ceoCategories = ['strategic', 'operational', 'executive', 'acquisition', 'financial', 'governance', 'property', 'international']

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
        title="CEO Contracts - Annita"
        description="CEO contracts and agreements management"
        keywords={['ceo', 'contracts', 'agreements', 'legal', 'management']}
        noIndex={true}
        noFollow={true}
      />
      
      <SharedContracts
        userRole={userRole}
        employeeId={employeeId}
        onLogout={handleLogout}
        roleSpecificContracts={ceoContracts}
        roleSpecificCategories={ceoCategories}
        canManage={true}
      />
    </>
  )
}
