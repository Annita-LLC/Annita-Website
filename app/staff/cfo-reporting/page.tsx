'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PieChart, BarChart3, TrendingUp, Download, Calendar, Search, Filter, FileText, Eye, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import FinancialReporting from '@/components/staff/FinancialReporting'

interface CFOReport {
  id: string
  title: string
  type: 'monthly' | 'quarterly' | 'annual' | 'ad-hoc' | 'board' | 'investor'
  status: 'draft' | 'in-review' | 'approved' | 'published'
  generatedDate: string
  dueDate: string
  author: string
  department: string
  description: string
  fileSize: string
  format: 'PDF' | 'Excel' | 'PowerPoint'
  recipients: number
}

export default function CFOReportingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterFormat, setFilterFormat] = useState('all')

  const [reports, setReports] = useState<CFOReport[]>([
    {
      id: 'RPT-001',
      title: 'Q4 2023 Financial Statements',
      type: 'quarterly',
      status: 'published',
      generatedDate: '2024-01-15',
      dueDate: '2024-01-31',
      author: 'CFO Office',
      department: 'Finance & Accounting',
      description: 'Complete quarterly financial statements with management discussion and analysis',
      fileSize: '2.4 MB',
      format: 'PDF',
      recipients: 12
    },
    {
      id: 'RPT-002',
      title: 'Annual Budget Report 2024',
      type: 'annual',
      status: 'in-review',
      generatedDate: '2024-02-10',
      dueDate: '2024-02-20',
      author: 'Budget Team',
      department: 'Finance & Accounting',
      description: 'Comprehensive annual budget with departmental breakdowns and forecasts',
      fileSize: '5.1 MB',
      format: 'Excel',
      recipients: 8
    },
    {
      id: 'RPT-003',
      title: 'Board of Directors Financial Presentation',
      type: 'board',
      status: 'approved',
      generatedDate: '2024-02-08',
      dueDate: '2024-02-15',
      author: 'CFO Office',
      department: 'Finance & Accounting',
      description: 'Quarterly board presentation with key financial metrics and strategic initiatives',
      fileSize: '8.7 MB',
      format: 'PowerPoint',
      recipients: 5
    },
    {
      id: 'RPT-004',
      title: 'Investor Relations Package',
      type: 'investor',
      status: 'published',
      generatedDate: '2024-02-05',
      dueDate: '2024-02-10',
      author: 'IR Team',
      department: 'Finance & Accounting',
      description: 'Monthly investor package with performance updates and market analysis',
      fileSize: '3.2 MB',
      format: 'PDF',
      recipients: 25
    },
    {
      id: 'RPT-005',
      title: 'Cash Flow Analysis Report',
      type: 'monthly',
      status: 'draft',
      generatedDate: '2024-02-14',
      dueDate: '2024-02-28',
      author: 'Treasury Team',
      department: 'Finance & Accounting',
      description: 'Detailed cash flow analysis with forecasting and liquidity metrics',
      fileSize: '1.8 MB',
      format: 'Excel',
      recipients: 6
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cfo') {
      setIsAuthenticated(true)
      setUserRole('cfo')
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

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || report.type === filterType
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    const matchesFormat = filterFormat === 'all' || report.format === filterFormat
    
    return matchesSearch && matchesType && matchesStatus && matchesFormat
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700'
      case 'in-review': return 'bg-yellow-100 text-yellow-700'
      case 'approved': return 'bg-blue-100 text-blue-700'
      case 'published': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'monthly': return 'bg-blue-100 text-blue-700'
      case 'quarterly': return 'bg-purple-100 text-purple-700'
      case 'annual': return 'bg-green-100 text-green-700'
      case 'ad-hoc': return 'bg-orange-100 text-orange-700'
      case 'board': return 'bg-red-100 text-red-700'
      case 'investor': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return '📄'
      case 'Excel': return '📊'
      case 'PowerPoint': return '📈'
      default: return '📄'
    }
  }

  const reportTypes = Array.from(new Set(reports.map(report => report.type)))

  const publishedCount = reports.filter(r => r.status === 'published').length
  const inReviewCount = reports.filter(r => r.status === 'in-review').length
  const draftCount = reports.filter(r => r.status === 'draft').length

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
        title="CFO Financial Reports - Annita"
        description="CFO financial reports and document management"
        keywords={['cfo', 'reports', 'financial', 'statements', 'documents']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/cfo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Financial Reports</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Reports Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Reports</h3>
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              <p className="text-sm text-gray-500">All financial reports</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Published</h3>
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{publishedCount}</p>
              <p className="text-sm text-gray-500">Available to stakeholders</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">In Review</h3>
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{inReviewCount}</p>
              <p className="text-sm text-gray-500">Under review</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Drafts</h3>
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{draftCount}</p>
              <p className="text-sm text-gray-500">In preparation</p>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Financial Reports</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Types</option>
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterFormat}
                  onChange={(e) => setFilterFormat(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Formats</option>
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="PowerPoint">PowerPoint</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="in-review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="published">Published</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1).replace('-', ' ')}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {getFormatIcon(report.format)} {report.format}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{report.fileSize}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Author</p>
                      <p className="text-sm font-medium text-gray-900">{report.author}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-sm text-gray-900">{report.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Generated</p>
                      <p className="text-sm text-gray-900">{report.generatedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className={`text-sm font-medium ${
                        new Date(report.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {report.dueDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{report.recipients} recipients</span>
                      <span>•</span>
                      <span>Format: {report.format}</span>
                    </div>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Financial Reporting Section */}
          <div className="mt-8">
            <FinancialReporting />
          </div>
        </main>
      </div>
    </>
  )
}
