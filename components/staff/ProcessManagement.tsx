'use client'

import { useState } from 'react'
import { Workflow, Target, Clock, TrendingUp, AlertTriangle, CheckCircle, Users, BarChart3, Settings, Plus, Search, Filter } from 'lucide-react'

interface Process {
  id: string
  name: string
  department: string
  category: 'operational' | 'administrative' | 'financial' | 'hr' | 'it' | 'sales'
  status: 'active' | 'under-review' | 'deprecated' | 'draft'
  owner: string
  steps: number
  averageTime: number
  efficiency: number
  lastUpdated: string
  automationLevel: number
  riskLevel: 'low' | 'medium' | 'high'
  description: string
}

interface ProcessMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface ProcessImprovement {
  id: string
  processName: string
  improvement: string
  potentialBenefit: string
  implementationEffort: 'low' | 'medium' | 'high'
  priority: 'low' | 'medium' | 'high'
  status: 'proposed' | 'approved' | 'in-progress' | 'completed'
  assignedTo: string
}

export default function ProcessManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'processes' | 'improvements' | 'analytics'>('overview')
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)

  const processes: Process[] = [
    {
      id: '1',
      name: 'Employee Onboarding',
      department: 'HR',
      category: 'hr',
      status: 'active',
      owner: 'Sarah Johnson',
      steps: 12,
      averageTime: 21,
      efficiency: 78,
      lastUpdated: '2024-02-10',
      automationLevel: 45,
      riskLevel: 'medium',
      description: 'Complete employee onboarding process from offer to first day'
    },
    {
      id: '2',
      name: 'Invoice Processing',
      department: 'Finance',
      category: 'financial',
      status: 'under-review',
      owner: 'Mike Chen',
      steps: 8,
      averageTime: 5,
      efficiency: 65,
      lastUpdated: '2024-02-12',
      automationLevel: 25,
      riskLevel: 'high',
      description: 'Process vendor invoices from receipt to payment'
    },
    {
      id: '3',
      name: 'Customer Order Fulfillment',
      department: 'Operations',
      category: 'operational',
      status: 'active',
      owner: 'Emma Davis',
      steps: 15,
      averageTime: 3,
      efficiency: 89,
      lastUpdated: '2024-02-08',
      automationLevel: 72,
      riskLevel: 'low',
      description: 'End-to-end order processing from receipt to delivery'
    },
    {
      id: '4',
      name: 'IT Service Request',
      department: 'IT',
      category: 'it',
      status: 'active',
      owner: 'Alex Rivera',
      steps: 6,
      averageTime: 2,
      efficiency: 92,
      lastUpdated: '2024-02-15',
      automationLevel: 85,
      riskLevel: 'low',
      description: 'Handle IT support requests and issue resolution'
    },
    {
      id: '5',
      name: 'Performance Review Cycle',
      department: 'HR',
      category: 'hr',
      status: 'deprecated',
      owner: 'Lisa Wong',
      steps: 18,
      averageTime: 45,
      efficiency: 55,
      lastUpdated: '2024-01-20',
      automationLevel: 15,
      riskLevel: 'medium',
      description: 'Annual performance review and feedback process'
    }
  ]

  const improvements: ProcessImprovement[] = [
    {
      id: '1',
      processName: 'Invoice Processing',
      improvement: 'Implement AI-powered data extraction and approval routing',
      potentialBenefit: '$150K annual savings, 60% faster processing',
      implementationEffort: 'high',
      priority: 'high',
      status: 'approved',
      assignedTo: 'Finance Team'
    },
    {
      id: '2',
      processName: 'Employee Onboarding',
      improvement: 'Create digital onboarding portal with automated task assignment',
      potentialBenefit: '$95K annual savings, 40% faster onboarding',
      implementationEffort: 'medium',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'HR Team'
    },
    {
      id: '3',
      processName: 'Customer Order Fulfillment',
      improvement: 'Integrate inventory management with order processing',
      potentialBenefit: '$75K annual savings, 25% faster fulfillment',
      implementationEffort: 'low',
      priority: 'medium',
      status: 'proposed',
      assignedTo: 'Operations Team'
    },
    {
      id: '4',
      processName: 'IT Service Request',
      improvement: 'Deploy chatbot for routine request handling',
      potentialBenefit: '$50K annual savings, 50% faster resolution',
      implementationEffort: 'low',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'IT Team'
    }
  ]

  const metrics: ProcessMetric[] = [
    {
      id: '1',
      title: 'Active Processes',
      value: '47',
      change: 3,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Workflow className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Average Efficiency',
      value: '82%',
      change: 5.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Target className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Automation Level',
      value: '68%',
      change: 8.7,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <Settings className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Process Improvements',
      value: '12',
      change: 4,
      changeType: 'increase',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'processes', label: 'Processes', icon: <Workflow className="w-4 h-4" /> },
    { id: 'improvements', label: 'Improvements', icon: <Target className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'under-review': return 'bg-yellow-100 text-yellow-700'
      case 'deprecated': return 'bg-red-100 text-red-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'high': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'high': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getImprovementStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'approved': return 'bg-purple-100 text-purple-700'
      case 'proposed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Process Management</h2>
              <p className="text-sm text-gray-600">Monitor, optimize, and improve business processes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Process</span>
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
                  ? 'bg-white text-cyan-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Status Overview</h3>
                <div className="space-y-4">
                  {processes.slice(0, 4).map((process) => (
                    <div key={process.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          process.status === 'active' ? 'bg-green-100 text-green-600' :
                          process.status === 'under-review' ? 'bg-yellow-100 text-yellow-600' :
                          process.status === 'deprecated' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <Workflow className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{process.name}</p>
                          <p className="text-xs text-gray-500">{process.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{process.efficiency}%</p>
                        <p className="text-xs text-gray-500">efficient</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Opportunities</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">High Priority Improvements</span>
                    <span className="text-sm font-medium text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Processes Under Review</span>
                    <span className="text-sm font-medium text-yellow-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Automation</span>
                    <span className="text-sm font-medium text-blue-600">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Deprecated Processes</span>
                    <span className="text-sm font-medium text-gray-600">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Processes</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search processes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Departments</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>IT</option>
                  <option>Operations</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Process</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {processes.map((process) => (
                <div key={process.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        process.status === 'active' ? 'bg-green-100 text-green-600' :
                        process.status === 'under-review' ? 'bg-yellow-100 text-yellow-600' :
                        process.status === 'deprecated' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Workflow className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{process.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                            {process.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(process.riskLevel)}`}>
                            {process.riskLevel} risk
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{process.department}</span>
                          <span>•</span>
                          <span>Owner: {process.owner}</span>
                          <span>•</span>
                          <span>Updated: {process.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedProcess(selectedProcess === process.id ? null : process.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Steps</p>
                      <p className="text-lg font-semibold text-gray-900">{process.steps}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Avg. Time</p>
                      <p className="text-lg font-semibold text-gray-900">{process.averageTime} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Efficiency</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-gray-900">{process.efficiency}%</p>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              process.efficiency >= 80 ? 'bg-green-500' :
                              process.efficiency >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${process.efficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Automation</p>
                      <p className="text-lg font-semibold text-blue-600">{process.automationLevel}%</p>
                    </div>
                  </div>

                  {selectedProcess === process.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Process Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Description</h6>
                          <p className="text-sm text-gray-700">{process.description}</p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Process Category:</span>
                              <span className="font-medium capitalize">{process.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk Level:</span>
                              <span className={`font-medium px-2 py-1 rounded-full text-xs ${getRiskColor(process.riskLevel)}`}>
                                {process.riskLevel}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Automation Potential:</span>
                              <span className="font-medium">{100 - process.automationLevel}%</span>
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
                        <span>Analytics</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Workflow className="w-4 h-4" />
                        <span>View Workflow</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Team</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Target className="w-4 h-4" />
                        <span>Optimize</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <Settings className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'improvements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Process Improvements</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Propose Improvement</span>
              </button>
            </div>

            <div className="space-y-4">
              {improvements.map((improvement) => (
                <div key={improvement.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{improvement.processName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(improvement.priority)}`}>
                          {improvement.priority} priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImprovementStatusColor(improvement.status)}`}>
                          {improvement.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{improvement.improvement}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Assigned to: {improvement.assignedTo}</span>
                        <span>•</span>
                        <span>Effort: {improvement.implementationEffort}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{improvement.potentialBenefit}</p>
                      <p className="text-xs text-gray-500">potential benefit</p>
                    </div>
                  </div>

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
                        <Clock className="w-4 h-4" />
                        <span>Track Progress</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Team</span>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Performance Analytics</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Overall Process Efficiency', value: '82%', change: 5.2 },
                    { metric: 'Average Process Time', value: '12 days', change: -8.3 },
                    { metric: 'Automation Adoption Rate', value: '68%', change: 8.7 },
                    { metric: 'Process Improvement Rate', value: '23%', change: 12.1 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        {item.change && (
                          <p className="text-xs text-gray-500">
                            {item.change > 0 ? '+' : ''}{item.change}% from last period
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                <div className="space-y-4">
                  {[
                    { department: 'Operations', efficiency: 89, processes: 12 },
                    { department: 'IT', efficiency: 92, processes: 8 },
                    { department: 'Finance', efficiency: 78, processes: 10 },
                    { department: 'HR', efficiency: 76, processes: 9 },
                    { department: 'Sales', efficiency: 85, processes: 6 }
                  ].map((dept, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{dept.department}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{dept.efficiency}%</p>
                          <p className="text-xs text-gray-500">efficient</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{dept.processes} processes</span>
                        <span className={`px-2 py-1 rounded-full ${
                          dept.efficiency >= 85 ? 'bg-green-100 text-green-700' :
                          dept.efficiency >= 75 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {dept.efficiency >= 85 ? 'Excellent' :
                           dept.efficiency >= 75 ? 'Good' : 'Needs Work'}
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
