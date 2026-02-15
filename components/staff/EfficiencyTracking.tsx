'use client'

import { useState } from 'react'
import { Zap, TrendingUp, Clock, Target, BarChart3, CheckCircle, AlertTriangle, Users, Calendar, Activity, Eye } from 'lucide-react'

interface EfficiencyMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface ProcessEfficiency {
  id: string
  process: string
  department: string
  currentTime: number
  targetTime: number
  efficiency: number
  status: 'on-track' | 'improving' | 'needs-attention' | 'critical'
  lastUpdated: string
  improvement: number
}

interface WorkflowOptimization {
  id: string
  title: string
  description: string
  potentialSavings: string
  implementationTime: string
  priority: 'high' | 'medium' | 'low'
  status: 'proposed' | 'in-progress' | 'completed'
  assignedTo: string
}

export default function EfficiencyTracking() {
  const [activeTab, setActiveTab] = useState<'overview' | 'processes' | 'optimizations' | 'analytics'>('overview')

  const metrics: EfficiencyMetric[] = [
    {
      id: '1',
      title: 'Overall Efficiency',
      value: '87%',
      change: 5.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Process Time Reduction',
      value: '23%',
      change: 12.8,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <Clock className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Cost Savings',
      value: '$450K',
      change: 18.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Active Optimizations',
      value: '12',
      change: 3,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Target className="w-6 h-6" />
    }
  ]

  const processes: ProcessEfficiency[] = [
    {
      id: '1',
      process: 'Employee Onboarding',
      department: 'HR',
      currentTime: 12,
      targetTime: 8,
      efficiency: 67,
      status: 'improving',
      lastUpdated: '2024-02-10',
      improvement: 15
    },
    {
      id: '2',
      process: 'Invoice Processing',
      department: 'Finance',
      currentTime: 3,
      targetTime: 1,
      efficiency: 33,
      status: 'needs-attention',
      lastUpdated: '2024-02-12',
      improvement: -5
    },
    {
      id: '3',
      process: 'Customer Support Response',
      department: 'Customer Service',
      currentTime: 4,
      targetTime: 2,
      efficiency: 50,
      status: 'on-track',
      lastUpdated: '2024-02-08',
      improvement: 8
    },
    {
      id: '4',
      process: 'Product Development Cycle',
      department: 'Engineering',
      currentTime: 45,
      targetTime: 30,
      efficiency: 67,
      status: 'improving',
      lastUpdated: '2024-02-15',
      improvement: 22
    },
    {
      id: '5',
      process: 'Contract Review',
      department: 'Legal',
      currentTime: 14,
      targetTime: 7,
      efficiency: 50,
      status: 'critical',
      lastUpdated: '2024-02-14',
      improvement: -12
    }
  ]

  const optimizations: WorkflowOptimization[] = [
    {
      id: '1',
      title: 'Automate Invoice Processing',
      description: 'Implement AI-powered invoice processing to reduce manual data entry and approval cycles',
      potentialSavings: '$120K annually',
      implementationTime: '3 months',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Finance Team'
    },
    {
      id: '2',
      title: 'Streamline Onboarding Process',
      description: 'Create digital onboarding workflows with automated document collection and training assignments',
      potentialSavings: '$85K annually',
      implementationTime: '2 months',
      priority: 'high',
      status: 'proposed',
      assignedTo: 'HR Team'
    },
    {
      id: '3',
      title: 'Implement Chatbot for Support',
      description: 'Deploy AI chatbot to handle routine customer inquiries and reduce support ticket volume',
      potentialSavings: '$95K annually',
      implementationTime: '1 month',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'IT Team'
    },
    {
      id: '4',
      title: 'Optimize Meeting Scheduling',
      description: 'Implement smart scheduling system to reduce meeting conflicts and improve resource utilization',
      potentialSavings: '$45K annually',
      implementationTime: '1 month',
      priority: 'medium',
      status: 'proposed',
      assignedTo: 'Operations Team'
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'processes', label: 'Process Tracking', icon: <Activity className="w-4 h-4" /> },
    { id: 'optimizations', label: 'Optimizations', icon: <Zap className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-700'
      case 'improving': return 'bg-blue-100 text-blue-700'
      case 'needs-attention': return 'bg-yellow-100 text-yellow-700'
      case 'critical': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getOptimizationStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'proposed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Efficiency Tracking</h2>
              <p className="text-sm text-gray-600">Monitor and optimize operational efficiency across departments</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              <Zap className="w-4 h-4" />
              <span>Identify Opportunities</span>
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
                  ? 'bg-white text-yellow-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Efficiency Status</h3>
                <div className="space-y-4">
                  {processes.slice(0, 4).map((process) => (
                    <div key={process.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          process.status === 'on-track' ? 'bg-green-100 text-green-600' :
                          process.status === 'improving' ? 'bg-blue-100 text-blue-600' :
                          process.status === 'needs-attention' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {process.status === 'on-track' ? <CheckCircle className="w-4 h-4" /> :
                           process.status === 'critical' ? <AlertTriangle className="w-4 h-4" /> :
                           <Clock className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{process.process}</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Most Improved Process</span>
                    <span className="text-sm font-medium text-green-600">Product Development (+22%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Biggest Opportunity</span>
                    <span className="text-sm font-medium text-red-600">Contract Review (-12%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Improvement</span>
                        <span className="text-sm font-medium text-blue-600">+7.6%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Processes Needing Attention</span>
                    <span className="text-sm font-medium text-yellow-600">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Process Efficiency Tracking</h3>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Departments</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Engineering</option>
                  <option>Customer Service</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  <Activity className="w-4 h-4" />
                  <span>Add Process</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {processes.map((process) => (
                <div key={process.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        process.status === 'on-track' ? 'bg-green-100 text-green-600' :
                        process.status === 'improving' ? 'bg-blue-100 text-blue-600' :
                        process.status === 'needs-attention' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {process.status === 'on-track' ? <CheckCircle className="w-5 h-5" /> :
                         process.status === 'critical' ? <AlertTriangle className="w-5 h-5" /> :
                         <Clock className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{process.process}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                            {process.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{process.department}</span>
                          <span>•</span>
                          <span>Updated {process.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          process.improvement > 0 ? 'bg-green-100 text-green-700' :
                          process.improvement < 0 ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {process.improvement > 0 ? '+' : ''}{process.improvement}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">improvement</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Time</p>
                      <p className="text-lg font-semibold text-gray-900">{process.currentTime} days</p>
                      <p className="text-xs text-gray-500">vs target: {process.targetTime} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Efficiency Score</p>
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
                      <p className="text-sm text-gray-600">Time Saved</p>
                      <p className="text-lg font-semibold text-green-600">
                        {process.currentTime < process.targetTime ?
                          `${process.targetTime - process.currentTime} days` :
                          'Target not met'
                        }
                      </p>
                      <p className="text-xs text-gray-500">potential savings</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <BarChart3 className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Target className="w-4 h-4" />
                        <span>Set Targets</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>Track Progress</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Zap className="w-4 h-4" />
                        <span>Optimize</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'optimizations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Workflow Optimizations</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                <Zap className="w-4 h-4" />
                <span>Propose Optimization</span>
              </button>
            </div>

            <div className="space-y-4">
              {optimizations.map((optimization) => (
                <div key={optimization.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{optimization.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(optimization.priority)}`}>
                          {optimization.priority} priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOptimizationStatusColor(optimization.status)}`}>
                          {optimization.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{optimization.description}</p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div>
                          <span className="text-gray-500">Potential Savings:</span>
                          <span className="font-medium text-green-600 ml-1">{optimization.potentialSavings}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Implementation:</span>
                          <span className="font-medium text-gray-900 ml-1">{optimization.implementationTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Assigned to:</span>
                          <span className="font-medium text-gray-900 ml-1">{optimization.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {optimization.status === 'proposed' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                      )}
                      {optimization.status === 'in-progress' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <TrendingUp className="w-4 h-4" />
                          <span>Track Progress</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Trends</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Overall Efficiency', current: 87, previous: 82, trend: 'up' },
                    { metric: 'Process Automation', current: 65, previous: 58, trend: 'up' },
                    { metric: 'Time to Completion', current: 12, previous: 15, trend: 'up' },
                    { metric: 'Error Reduction', current: 23, previous: 18, trend: 'up' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        <p className="text-xs text-gray-500">
                          {item.trend === 'up' ? '+' : '-'}{Math.abs(item.current - item.previous)} from last period
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.current}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                <div className="space-y-4">
                  {[
                    { department: 'Engineering', efficiency: 89, processes: 8 },
                    { department: 'HR', efficiency: 76, processes: 5 },
                    { department: 'Finance', efficiency: 82, processes: 6 },
                    { department: 'Customer Service', efficiency: 91, processes: 4 },
                    { department: 'Marketing', efficiency: 85, processes: 7 }
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
                        <span>{dept.processes} processes tracked</span>
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
