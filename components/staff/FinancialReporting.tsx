'use client'

import { useState } from 'react'
import { FileText, TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Download, Printer, Share2, Filter, Plus, Search, CheckCircle } from 'lucide-react'

interface FinancialReport {
  id: string
  title: string
  type: 'income-statement' | 'balance-sheet' | 'cash-flow' | 'budget' | 'forecast' | 'variance'
  period: string
  status: 'draft' | 'review' | 'approved' | 'published'
  createdDate: string
  lastModified: string
  preparedBy: string
  reviewedBy?: string
  keyMetrics: {
    revenue?: number
    expenses?: number
    profit?: number
    assets?: number
    liabilities?: number
    equity?: number
  }
}

interface ReportMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function FinancialReporting() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'templates' | 'analytics'>('overview')
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const reports: FinancialReport[] = [
    {
      id: '1',
      title: 'Q4 2024 Income Statement',
      type: 'income-statement',
      period: 'Q4 2024',
      status: 'approved',
      createdDate: '2024-02-01',
      lastModified: '2024-02-15',
      preparedBy: 'John Smith',
      reviewedBy: 'Sarah Johnson',
      keyMetrics: {
        revenue: 2500000,
        expenses: 1850000,
        profit: 650000
      }
    },
    {
      id: '2',
      title: 'December 2024 Balance Sheet',
      type: 'balance-sheet',
      period: 'December 2024',
      status: 'published',
      createdDate: '2024-01-15',
      lastModified: '2024-02-10',
      preparedBy: 'Mike Chen',
      reviewedBy: 'David Wilson',
      keyMetrics: {
        assets: 8500000,
        liabilities: 4200000,
        equity: 4300000
      }
    },
    {
      id: '3',
      title: '2025 Budget Forecast',
      type: 'forecast',
      period: '2025',
      status: 'review',
      createdDate: '2024-01-20',
      lastModified: '2024-02-12',
      preparedBy: 'Emma Davis',
      keyMetrics: {
        revenue: 3200000,
        expenses: 2800000,
        profit: 400000
      }
    },
    {
      id: '4',
      title: 'Budget vs Actual - Q4 2024',
      type: 'variance',
      period: 'Q4 2024',
      status: 'draft',
      createdDate: '2024-02-08',
      lastModified: '2024-02-14',
      preparedBy: 'Lisa Wong',
      keyMetrics: {
        revenue: 2500000,
        expenses: 1850000,
        profit: 650000
      }
    }
  ]

  const metrics: ReportMetric[] = [
    {
      id: '1',
      title: 'Reports Generated',
      value: '47',
      change: 8,
      changeType: 'increase',
      period: 'this month',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'On-Time Submissions',
      value: '92%',
      change: 5.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Average Review Time',
      value: '3.2 days',
      change: -0.8,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Compliance Rate',
      value: '98%',
      change: 2.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: <CheckCircle className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'templates', label: 'Templates', icon: <FileText className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'approved': return 'bg-blue-100 text-blue-700'
      case 'review': return 'bg-yellow-100 text-yellow-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income-statement': return 'bg-blue-100 text-blue-700'
      case 'balance-sheet': return 'bg-green-100 text-green-700'
      case 'cash-flow': return 'bg-purple-100 text-purple-700'
      case 'budget': return 'bg-orange-100 text-orange-700'
      case 'forecast': return 'bg-pink-100 text-pink-700'
      case 'variance': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Financial Reporting</h2>
              <p className="text-sm text-gray-600">Generate, manage, and distribute financial reports</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Report</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {metric.icon}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'increase' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4 rotate-180" />
                      )}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                  <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
                  <p className="text-xs text-gray-500">{metric.period}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-4">
                  {reports.slice(0, 4).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          report.status === 'published' ? 'bg-green-100 text-green-600' :
                          report.status === 'approved' ? 'bg-blue-100 text-blue-600' :
                          report.status === 'review' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{report.title}</p>
                          <p className="text-xs text-gray-500">{report.period} • {report.preparedBy}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Status Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Published Reports</span>
                    <span className="text-sm font-medium text-green-600">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Under Review</span>
                    <span className="text-sm font-medium text-yellow-600">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Draft Reports</span>
                    <span className="text-sm font-medium text-gray-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overdue Reports</span>
                    <span className="text-sm font-medium text-red-600">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Reports</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>Income Statement</option>
                  <option>Balance Sheet</option>
                  <option>Cash Flow</option>
                  <option>Budget</option>
                  <option>Variance</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Approved</option>
                  <option>Review</option>
                  <option>Draft</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Report</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        report.status === 'published' ? 'bg-green-100 text-green-600' :
                        report.status === 'approved' ? 'bg-blue-100 text-blue-600' :
                        report.status === 'review' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                            {report.type.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>Prepared by: {report.preparedBy}</span>
                          {report.reviewedBy && (
                            <>
                              <span>•</span>
                              <span>Reviewed by: {report.reviewedBy}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>Last modified: {report.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Key Metrics</p>
                      <div className="space-y-1 text-sm">
                        {report.keyMetrics.revenue && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Revenue:</span>
                            <span className="font-medium">${report.keyMetrics.revenue.toLocaleString()}</span>
                          </div>
                        )}
                        {report.keyMetrics.profit && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Profit:</span>
                            <span className="font-medium text-green-600">${report.keyMetrics.profit.toLocaleString()}</span>
                          </div>
                        )}
                        {report.keyMetrics.assets && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Assets:</span>
                            <span className="font-medium">${report.keyMetrics.assets.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Report Details</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize">{report.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-medium">{report.createdDate}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Actions</p>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-1 text-blue-600 hover:text-blue-700 text-xs font-medium border border-blue-200 rounded">
                            View
                          </button>
                          <button className="flex-1 px-3 py-1 text-green-600 hover:text-green-700 text-xs font-medium border border-green-200 rounded">
                            Edit
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-1 text-purple-600 hover:text-purple-700 text-xs font-medium border border-purple-200 rounded">
                            <Download className="w-3 h-3 inline mr-1" />
                            Export
                          </button>
                          <button className="flex-1 px-3 py-1 text-orange-600 hover:text-orange-700 text-xs font-medium border border-orange-200 rounded">
                            <Share2 className="w-3 h-3 inline mr-1" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedReport === report.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Report Summary</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Financial Highlights</h6>
                          <div className="space-y-2 text-sm">
                            {report.keyMetrics.revenue && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Revenue:</span>
                                <span className="font-bold text-gray-900">${report.keyMetrics.revenue.toLocaleString()}</span>
                              </div>
                            )}
                            {report.keyMetrics.expenses && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Expenses:</span>
                                <span className="font-bold text-gray-900">${report.keyMetrics.expenses.toLocaleString()}</span>
                              </div>
                            )}
                            {report.keyMetrics.profit && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Net Profit:</span>
                                <span className="font-bold text-green-600">${report.keyMetrics.profit.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Report Information</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Report Type:</span>
                              <span className="font-medium capitalize">{report.type.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reporting Period:</span>
                              <span className="font-medium">{report.period}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Approval Status:</span>
                              <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        <span>Generate PDF</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Share2 className="w-4 h-4" />
                        <span>Share Report</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {report.status === 'draft' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          <span>Submit for Review</span>
                        </button>
                      )}
                      {report.status === 'review' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve Report</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Income Statement</h4>
                <p className="text-sm text-gray-600 mb-4">Standard income statement template with revenue, expenses, and profit calculations</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Most Used</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Monthly</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Balance Sheet</h4>
                <p className="text-sm text-gray-600 mb-4">Comprehensive balance sheet showing assets, liabilities, and equity</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Quarterly</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">GAAP Compliant</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Cash Flow Statement</h4>
                <p className="text-sm text-gray-600 mb-4">Detailed cash flow analysis with operating, investing, and financing activities</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Complex</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Required</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Budget Variance</h4>
                <p className="text-sm text-gray-600 mb-4">Compare actual performance against budgeted amounts with variance analysis</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Critical</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Monthly</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Financial Forecast</h4>
                <p className="text-sm text-gray-600 mb-4">Future financial projections with scenario analysis and assumptions</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">Advanced</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Annual</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Custom Report</h4>
                <p className="text-sm text-gray-600 mb-4">Build a custom report with specific metrics and formatting requirements</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Flexible</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">On-Demand</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reporting Analytics</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Average Report Generation Time', value: '4.2 hours', change: -0.8 },
                    { metric: 'Reports Published On Time', value: '92%', change: 5.2 },
                    { metric: 'Review Cycle Duration', value: '3.2 days', change: -0.5 },
                    { metric: 'Stakeholder Satisfaction', value: '4.6/5', change: 0.3 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        {item.change && (
                          <p className="text-xs text-gray-500">
                            {item.change > 0 ? '+' : ''}{item.change} from last period
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Distribution</h3>
                <div className="space-y-4">
                  {[
                    { channel: 'Email Distribution', count: 1250, percentage: 65 },
                    { channel: 'Portal Access', count: 890, percentage: 45 },
                    { channel: 'Print Copies', count: 150, percentage: 8 },
                    { channel: 'API Integration', count: 320, percentage: 17 }
                  ].map((channel, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{channel.channel}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{channel.count}</p>
                          <p className="text-xs text-gray-500">recipients</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{channel.percentage}% of total distribution</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${channel.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
