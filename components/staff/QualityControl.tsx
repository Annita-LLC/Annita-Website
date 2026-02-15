'use client'

import { useState } from 'react'
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Target, BarChart3, Clock, Users, Plus, Search, Filter } from 'lucide-react'

interface QualityMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface QualityCheck {
  id: string
  process: string
  type: 'incoming' | 'in-process' | 'final' | 'audit'
  status: 'passed' | 'failed' | 'pending' | 'in-progress'
  inspector: string
  date: string
  defects: number
  totalItems: number
  notes: string
  correctiveActions: string[]
}

interface QualityIssue {
  id: string
  title: string
  severity: 'critical' | 'major' | 'minor'
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  reportedBy: string
  reportedDate: string
  description: string
  rootCause: string
  resolution: string
  preventiveActions: string[]
  affectedProcesses: string[]
}

export default function QualityControl() {
  const [activeTab, setActiveTab] = useState<'overview' | 'checks' | 'issues' | 'analytics'>('overview')
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)

  const metrics: QualityMetric[] = [
    {
      id: '1',
      title: 'Quality Score',
      value: '94.2%',
      change: 2.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Defect Rate',
      value: '1.8%',
      change: -0.5,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <XCircle className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'On-Time Delivery',
      value: '97.5%',
      change: 1.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Clock className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Customer Satisfaction',
      value: '4.7/5',
      change: 0.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Users className="w-6 h-6" />
    }
  ]

  const qualityChecks: QualityCheck[] = [
    {
      id: '1',
      process: 'Raw Material Inspection',
      type: 'incoming',
      status: 'passed',
      inspector: 'John Smith',
      date: '2024-02-15',
      defects: 2,
      totalItems: 500,
      notes: 'Minor surface imperfections found, within acceptable limits',
      correctiveActions: ['Increased inspection frequency', 'Supplier quality review']
    },
    {
      id: '2',
      process: 'Assembly Line Quality Check',
      type: 'in-process',
      status: 'failed',
      inspector: 'Sarah Johnson',
      date: '2024-02-14',
      defects: 15,
      totalItems: 200,
      notes: 'Calibration issues detected in station 3',
      correctiveActions: ['Equipment recalibration', 'Operator retraining', 'Additional monitoring']
    },
    {
      id: '3',
      process: 'Final Product Inspection',
      type: 'final',
      status: 'in-progress',
      inspector: 'Mike Chen',
      date: '2024-02-15',
      defects: 0,
      totalItems: 150,
      notes: 'Inspection in progress',
      correctiveActions: []
    },
    {
      id: '4',
      process: 'Monthly Quality Audit',
      type: 'audit',
      status: 'pending',
      inspector: 'Emma Davis',
      date: '2024-02-20',
      defects: 0,
      totalItems: 0,
      notes: 'Scheduled monthly audit',
      correctiveActions: []
    }
  ]

  const qualityIssues: QualityIssue[] = [
    {
      id: '1',
      title: 'Packaging Material Defects',
      severity: 'major',
      status: 'investigating',
      reportedBy: 'Quality Control Team',
      reportedDate: '2024-02-10',
      description: 'Increased number of packaging defects affecting product presentation',
      rootCause: 'Supplier material quality degradation',
      resolution: '',
      preventiveActions: ['Supplier audit', 'Alternative supplier evaluation', 'Quality specifications update'],
      affectedProcesses: ['Packaging', 'Final Inspection']
    },
    {
      id: '2',
      title: 'Assembly Line Calibration Drift',
      severity: 'critical',
      status: 'resolved',
      reportedBy: 'Production Manager',
      reportedDate: '2024-02-08',
      description: 'Automated assembly line showing calibration drift affecting precision',
      rootCause: 'Temperature fluctuations in production area',
      resolution: 'Installed environmental controls and automated calibration checks',
      preventiveActions: ['Regular calibration monitoring', 'Environmental monitoring system', 'Predictive maintenance alerts'],
      affectedProcesses: ['Assembly', 'Quality Control']
    },
    {
      id: '3',
      title: 'Documentation Errors',
      severity: 'minor',
      status: 'open',
      reportedBy: 'Compliance Officer',
      reportedDate: '2024-02-12',
      description: 'Minor documentation inconsistencies in batch records',
      rootCause: 'Training gap in documentation procedures',
      resolution: '',
      preventiveActions: ['Documentation training refresh', 'Digital workflow implementation'],
      affectedProcesses: ['Documentation', 'Compliance']
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'checks', label: 'Quality Checks', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'issues', label: 'Issues', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-700'
      case 'failed': return 'bg-red-100 text-red-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700'
      case 'major': return 'bg-orange-100 text-orange-700'
      case 'minor': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getIssueStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700'
      case 'investigating': return 'bg-yellow-100 text-yellow-700'
      case 'resolved': return 'bg-green-100 text-green-700'
      case 'closed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Quality Control</h2>
              <p className="text-sm text-gray-600">Monitor and maintain product and process quality standards</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Check</span>
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
                  ? 'bg-white text-green-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {metric.icon}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'increase' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4 rotate-180" />
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quality Checks</h3>
                <div className="space-y-4">
                  {qualityChecks.slice(0, 3).map((check) => (
                    <div key={check.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          check.status === 'passed' ? 'bg-green-100 text-green-600' :
                          check.status === 'failed' ? 'bg-red-100 text-red-600' :
                          check.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {getStatusIcon(check.status)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{check.process}</p>
                          <p className="text-xs text-gray-500">{check.date} • {check.inspector}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {check.defects}/{check.totalItems}
                        </p>
                        <p className="text-xs text-gray-500">defects</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Issues Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Open Issues</span>
                    <span className="text-sm font-medium text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Under Investigation</span>
                    <span className="text-sm font-medium text-yellow-600">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Resolved This Month</span>
                    <span className="text-sm font-medium text-green-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Critical Issues</span>
                    <span className="text-sm font-medium text-red-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Quality Checks</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search checks..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>Incoming</option>
                  <option>In-Process</option>
                  <option>Final</option>
                  <option>Audit</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Check</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {qualityChecks.map((check) => (
                <div key={check.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        check.status === 'passed' ? 'bg-green-100 text-green-600' :
                        check.status === 'failed' ? 'bg-red-100 text-red-600' :
                        check.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {getStatusIcon(check.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{check.process}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(check.status)}`}>
                            {check.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{check.type}</span>
                          <span>•</span>
                          <span>{check.date}</span>
                          <span>•</span>
                          <span>Inspector: {check.inspector}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Quality Results</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {check.totalItems > 0 ? `${check.defects}/${check.totalItems}` : 'Pending'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {check.totalItems > 0 ? `${((check.defects / check.totalItems) * 100).toFixed(1)}% defect rate` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(check.status)}`}>
                          {check.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Actions Required</p>
                      <p className="text-sm font-medium text-gray-900">{check.correctiveActions.length}</p>
                      <p className="text-xs text-gray-500">corrective actions</p>
                    </div>
                  </div>

                  {check.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Notes</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{check.notes}</p>
                    </div>
                  )}

                  {check.correctiveActions.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Corrective Actions</p>
                      <ul className="space-y-1">
                        {check.correctiveActions.map((action, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Target className="w-4 h-4" />
                        <span>Follow Up</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Quality Issues</h3>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>Investigating</option>
                  <option>Resolved</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Report Issue</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {qualityIssues.map((issue) => (
                <div key={issue.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{issue.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIssueStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Reported by: {issue.reportedBy}</span>
                        <span>•</span>
                        <span>{issue.reportedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Description</p>
                    <p className="text-sm text-gray-700">{issue.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Affected Processes</p>
                      <div className="flex flex-wrap gap-1">
                        {issue.affectedProcesses.map((process, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {process}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Root Cause</p>
                      <p className="text-sm text-gray-700">{issue.rootCause || 'Under investigation'}</p>
                    </div>
                  </div>

                  {selectedIssue === issue.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Resolution</h6>
                          <p className="text-sm text-gray-700">{issue.resolution || 'Not yet resolved'}</p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Preventive Actions</h6>
                          <ul className="space-y-1">
                            {issue.preventiveActions.map((action, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                        <span>View Timeline</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Update Status</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Assign Team</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Trends</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Overall Quality Score', current: 94.2, previous: 92.1, trend: 'up' },
                    { metric: 'Defect Rate', current: 1.8, previous: 2.3, trend: 'up' },
                    { metric: 'First Pass Yield', current: 95.7, previous: 94.5, trend: 'up' },
                    { metric: 'Customer Complaints', current: 12, previous: 18, trend: 'up' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        <p className="text-xs text-gray-500">
                          {item.trend === 'up' ? '+' : '-'}{Math.abs(item.current - item.previous).toFixed(1)} from last period
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.current}{typeof item.current === 'number' && item.current > 10 ? '%' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality by Process</h3>
                <div className="space-y-4">
                  {[
                    { process: 'Raw Material Inspection', score: 96.5, defects: 2 },
                    { process: 'Assembly Line', score: 93.2, defects: 15 },
                    { process: 'Final Inspection', score: 97.8, defects: 3 },
                    { process: 'Packaging', score: 91.4, defects: 8 },
                    { process: 'Shipping', score: 95.1, defects: 5 }
                  ].map((process, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{process.process}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{process.score}%</p>
                          <p className="text-xs text-gray-500">quality score</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{process.defects} defects found</span>
                        <span className={`px-2 py-1 rounded-full ${
                          process.score >= 95 ? 'bg-green-100 text-green-700' :
                          process.score >= 90 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {process.score >= 95 ? 'Excellent' :
                           process.score >= 90 ? 'Good' : 'Needs Attention'}
                        </span>
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
