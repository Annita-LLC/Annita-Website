'use client'

import { useState } from 'react'
import { Users, UserPlus, TrendingUp, BarChart3, Search, Filter, Plus, Edit, Eye, Calendar, Award, Briefcase, Mail, Phone } from 'lucide-react'

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  status: 'active' | 'inactive' | 'on-leave' | 'terminated'
  hireDate: string
  manager: string
  salary: number
  performance: {
    rating: number
    lastReview: string
    nextReview: string
  }
  skills: string[]
  certifications: string[]
}

interface EmployeeMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function EmployeeManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'recruitment' | 'analytics'>('overview')
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  const employees: Employee[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      status: 'active',
      hireDate: '2022-03-15',
      manager: 'Mike Chen',
      salary: 125000,
      performance: {
        rating: 4.8,
        lastReview: '2024-01-15',
        nextReview: '2024-07-15'
      },
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
      certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional']
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 234-5678',
      position: 'Product Manager',
      department: 'Product',
      status: 'active',
      hireDate: '2021-08-20',
      manager: 'Lisa Wong',
      salary: 135000,
      performance: {
        rating: 4.6,
        lastReview: '2024-02-01',
        nextReview: '2024-08-01'
      },
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
      certifications: ['Certified Scrum Product Owner', 'Google Analytics']
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      phone: '+1 (555) 345-6789',
      position: 'Marketing Specialist',
      department: 'Marketing',
      status: 'on-leave',
      hireDate: '2023-01-10',
      manager: 'David Wilson',
      salary: 75000,
      performance: {
        rating: 4.2,
        lastReview: '2024-01-20',
        nextReview: '2024-07-20'
      },
      skills: ['Digital Marketing', 'SEO', 'Content Creation', 'Social Media'],
      certifications: ['Google Ads Certification', 'HubSpot Marketing']
    },
    {
      id: '4',
      name: 'Alex Rivera',
      email: 'alex.rivera@company.com',
      phone: '+1 (555) 456-7890',
      position: 'HR Manager',
      department: 'Human Resources',
      status: 'active',
      hireDate: '2020-11-05',
      manager: 'Jennifer Lee',
      salary: 95000,
      performance: {
        rating: 4.9,
        lastReview: '2024-02-10',
        nextReview: '2024-08-10'
      },
      skills: ['HR Management', 'Employee Relations', 'Recruitment', 'Compliance'],
      certifications: ['SHRM-CP', 'PHR Certification']
    }
  ]

  const metrics: EmployeeMetric[] = [
    {
      id: '1',
      title: 'Total Employees',
      value: '247',
      change: 8,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Average Performance',
      value: '4.3/5',
      change: 0.2,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: <Award className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Employee Turnover',
      value: '8.5%',
      change: -1.2,
      changeType: 'decrease',
      period: 'vs last year',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Open Positions',
      value: '12',
      change: -3,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <Briefcase className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'employees', label: 'Employees', icon: <Users className="w-4 h-4" /> },
    { id: 'recruitment', label: 'Recruitment', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      case 'on-leave': return 'bg-yellow-100 text-yellow-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Employee Management</h2>
              <p className="text-sm text-gray-600">Comprehensive employee lifecycle management and analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Add Employee</span>
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
                  ? 'bg-white text-purple-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
                <div className="space-y-4">
                  {[
                    { department: 'Engineering', count: 85, percentage: 34 },
                    { department: 'Sales', count: 45, percentage: 18 },
                    { department: 'Marketing', count: 32, percentage: 13 },
                    { department: 'HR', count: 28, percentage: 11 },
                    { department: 'Finance', count: 25, percentage: 10 },
                    { department: 'Operations', count: 32, percentage: 13 }
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{dept.department}</p>
                          <p className="text-xs text-gray-500">{dept.count} employees</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{dept.percentage}%</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${dept.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {employees.sort((a, b) => b.performance.rating - a.performance.rating).slice(0, 4).map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                          <p className="text-xs text-gray-500">{employee.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getPerformanceColor(employee.performance.rating)}`}>
                          {employee.performance.rating}/5
                        </p>
                        <p className="text-xs text-gray-500">rating</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Employee Directory</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Employee</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        employee.status === 'active' ? 'bg-green-100 text-green-600' :
                        employee.status === 'on-leave' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{employee.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                            {employee.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{employee.position}</span>
                          <span>•</span>
                          <span>{employee.department}</span>
                          <span>•</span>
                          <span>Hired: {employee.hireDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{employee.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{employee.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Manager</p>
                      <p className="text-sm font-medium text-gray-900">{employee.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-lg font-semibold ${getPerformanceColor(employee.performance.rating)}`}>
                          {employee.performance.rating}/5
                        </p>
                        <span className="text-xs text-gray-500">rating</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Next review: {employee.performance.nextReview}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Salary</p>
                      <p className="text-lg font-semibold text-gray-900">${employee.salary.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">annual</p>
                    </div>
                  </div>

                  {selectedEmployee === employee.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Employee Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Skills</h6>
                          <div className="flex flex-wrap gap-1">
                            {employee.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Certifications</h6>
                          <div className="flex flex-wrap gap-1">
                            {employee.certifications.map((cert, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h6 className="text-sm font-medium text-gray-900 mb-2">Performance History</h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Review:</span>
                            <span className="font-medium">{employee.performance.lastReview}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next Review:</span>
                            <span className="font-medium">{employee.performance.nextReview}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Rating:</span>
                            <span className={`font-medium ${getPerformanceColor(employee.performance.rating)}`}>
                              {employee.performance.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Edit className="w-4 h-4" />
                        <span>Edit Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Review</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Award className="w-4 h-4" />
                        <span>Performance</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <Briefcase className="w-4 h-4" />
                        <span>Documents</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recruitment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recruitment Pipeline</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Post Job</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Senior Developer</h4>
                <p className="text-sm text-gray-600 mb-4">Full-stack developer with 5+ years experience</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Urgent</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">$130K-$160K</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Product Manager</h4>
                <p className="text-sm text-gray-600 mb-4">Experienced PM with SaaS background</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">High Priority</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">$120K-$150K</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Marketing Coordinator</h4>
                <p className="text-sm text-gray-600 mb-4">Digital marketing specialist</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Medium Priority</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">$60K-$80K</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Candidate Pipeline</h4>
              <div className="space-y-3">
                {[
                  { name: 'Alice Johnson', position: 'Senior Developer', stage: 'Technical Interview', rating: 4.2 },
                  { name: 'Bob Smith', position: 'Product Manager', stage: 'Final Interview', rating: 4.5 },
                  { name: 'Carol Davis', position: 'Marketing Coordinator', stage: 'Phone Screen', rating: 3.8 },
                  { name: 'David Wilson', position: 'Senior Developer', stage: 'Offer Extended', rating: 4.7 }
                ].map((candidate, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.position} • {candidate.stage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{candidate.rating}/5</p>
                      <p className="text-xs text-gray-500">rating</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">HR Analytics</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Time to Hire', value: '24 days', change: -3, trend: 'improving' },
                    { metric: 'Offer Acceptance Rate', value: '78%', change: 5, trend: 'improving' },
                    { metric: 'Employee Satisfaction', value: '4.2/5', change: 0.1, trend: 'stable' },
                    { metric: 'Training Completion Rate', value: '85%', change: 8, trend: 'improving' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        <p className="text-xs text-gray-500">
                          {item.change > 0 ? '+' : ''}{item.change} from last period
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Diversity & Inclusion</h3>
                <div className="space-y-4">
                  {[
                    { category: 'Gender Diversity', female: 52, male: 48, status: 'Balanced' },
                    { category: 'Age Distribution', under30: 35, age30to50: 55, over50: 10, status: 'Good Mix' },
                    { category: 'Ethnic Diversity', caucasian: 60, asian: 20, hispanic: 12, other: 8, status: 'Improving' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{item.category}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Balanced' ? 'bg-green-100 text-green-700' :
                          item.status === 'Good Mix' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Distribution metrics available in detailed reports
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
