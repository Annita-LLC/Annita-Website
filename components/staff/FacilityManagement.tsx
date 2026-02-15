'use client'

import { useState } from 'react'
import { Building, MapPin, Users, Wrench, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp, BarChart3, Calendar, Plus, Search, Filter, Eye } from 'lucide-react'

interface Facility {
  id: string
  name: string
  type: 'office' | 'warehouse' | 'retail' | 'data-center' | 'manufacturing'
  location: string
  capacity: number
  occupancy: number
  status: 'operational' | 'maintenance' | 'under-construction' | 'closed'
  lastMaintenance: string
  nextMaintenance: string
  costPerSqFt: number
  squareFootage: number
  amenities: string[]
}

interface MaintenanceRequest {
  id: string
  facilityId: string
  facilityName: string
  type: 'repair' | 'preventive' | 'emergency' | 'upgrade'
  priority: 'low' | 'medium' | 'high' | 'critical'
  description: string
  reportedDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'scheduled'
  assignedTo: string
  estimatedCost: number
  completionDate?: string
}

interface FacilityMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function FacilityManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'facilities' | 'maintenance' | 'analytics'>('overview')
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null)

  const facilities: Facility[] = [
    {
      id: '1',
      name: 'Headquarters Office',
      type: 'office',
      location: 'Downtown Business District',
      capacity: 500,
      occupancy: 425,
      status: 'operational',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      costPerSqFt: 45,
      squareFootage: 25000,
      amenities: ['Conference Rooms', 'Cafeteria', 'Gym', 'Parking', 'Security']
    },
    {
      id: '2',
      name: 'North Warehouse',
      type: 'warehouse',
      location: 'Industrial Park North',
      capacity: 100000,
      occupancy: 75000,
      status: 'operational',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      costPerSqFt: 12,
      squareFootage: 100000,
      amenities: ['Loading Docks', 'Forklifts', 'Climate Control', 'Security Systems']
    },
    {
      id: '3',
      name: 'Data Center Alpha',
      type: 'data-center',
      location: 'Tech Campus',
      capacity: 200,
      occupancy: 180,
      status: 'maintenance',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-02-25',
      costPerSqFt: 150,
      squareFootage: 10000,
      amenities: ['Redundant Power', 'Cooling Systems', 'Security', 'Backup Generators']
    }
  ]

  const maintenanceRequests: MaintenanceRequest[] = [
    {
      id: '1',
      facilityId: '3',
      facilityName: 'Data Center Alpha',
      type: 'repair',
      priority: 'high',
      description: 'Cooling system malfunction in server room B',
      reportedDate: '2024-02-12',
      status: 'in-progress',
      assignedTo: 'Facilities Team',
      estimatedCost: 25000,
      completionDate: '2024-02-18'
    },
    {
      id: '2',
      facilityId: '1',
      facilityName: 'Headquarters Office',
      type: 'preventive',
      priority: 'medium',
      description: 'Annual HVAC system inspection and cleaning',
      reportedDate: '2024-02-08',
      status: 'scheduled',
      assignedTo: 'HVAC Contractors',
      estimatedCost: 15000
    },
    {
      id: '3',
      facilityId: '2',
      facilityName: 'North Warehouse',
      type: 'upgrade',
      priority: 'low',
      description: 'Install energy-efficient LED lighting throughout facility',
      reportedDate: '2024-01-25',
      status: 'pending',
      assignedTo: 'Electrical Team',
      estimatedCost: 35000
    }
  ]

  const metrics: FacilityMetric[] = [
    {
      id: '1',
      title: 'Total Facilities',
      value: '24',
      change: 2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Building className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Average Occupancy',
      value: '87%',
      change: 3.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Maintenance Cost',
      value: '$125K',
      change: -8.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Active Maintenance',
      value: '8',
      change: 1,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Wrench className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'facilities', label: 'Facilities', icon: <Building className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Maintenance', icon: <Wrench className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700'
      case 'maintenance': return 'bg-yellow-100 text-yellow-700'
      case 'under-construction': return 'bg-blue-100 text-blue-700'
      case 'closed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700'
      case 'high': return 'bg-orange-100 text-orange-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'scheduled': return 'bg-yellow-100 text-yellow-700'
      case 'pending': return 'bg-gray-100 text-gray-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'office': return <Building className="w-4 h-4" />
      case 'warehouse': return <Building className="w-4 h-4" />
      case 'data-center': return <Building className="w-4 h-4" />
      case 'retail': return <Building className="w-4 h-4" />
      case 'manufacturing': return <Building className="w-4 h-4" />
      default: return <Building className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Facility Management</h2>
              <p className="text-sm text-gray-600">Manage facilities, maintenance, and operations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Facility</span>
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
                <div key={metric.id} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border border-green-100">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Status Overview</h3>
                <div className="space-y-4">
                  {facilities.map((facility) => (
                    <div key={facility.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          facility.status === 'operational' ? 'bg-green-100 text-green-600' :
                          facility.status === 'maintenance' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getTypeIcon(facility.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{facility.name}</p>
                          <p className="text-xs text-gray-500">{facility.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{facility.occupancy}/{facility.capacity}</p>
                        <p className="text-xs text-gray-500">occupied</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Alerts</h3>
                <div className="space-y-4">
                  {maintenanceRequests.filter(req => req.status !== 'completed').slice(0, 3).map((request) => (
                    <div key={request.id} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{request.facilityName}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{request.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Reported: {request.reportedDate}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getMaintenanceStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Facilities</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search facilities..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>Office</option>
                  <option>Warehouse</option>
                  <option>Data Center</option>
                  <option>Retail</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Facility</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {facilities.map((facility) => (
                <div key={facility.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        facility.status === 'operational' ? 'bg-green-100 text-green-600' :
                        facility.status === 'maintenance' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getTypeIcon(facility.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{facility.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status)}`}>
                            {facility.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{facility.type}</span>
                          <span>•</span>
                          <span>{facility.location}</span>
                          <span>•</span>
                          <span>{facility.squareFootage.toLocaleString()} sq ft</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedFacility(selectedFacility === facility.id ? null : facility.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Occupancy</p>
                      <p className="text-lg font-semibold text-gray-900">{facility.occupancy}/{facility.capacity}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(facility.occupancy / facility.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {((facility.occupancy / facility.capacity) * 100).toFixed(0)}% occupied
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cost Analysis</p>
                      <p className="text-lg font-semibold text-gray-900">${facility.costPerSqFt}/sq ft</p>
                      <p className="text-xs text-gray-500">
                        Total cost: ${(facility.costPerSqFt * facility.squareFootage).toLocaleString()}/year
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Maintenance Schedule</p>
                      <p className="text-sm font-medium text-gray-900">Last: {facility.lastMaintenance}</p>
                      <p className="text-sm font-medium text-blue-600">Next: {facility.nextMaintenance}</p>
                    </div>
                  </div>

                  {selectedFacility === facility.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Facility Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Amenities</h6>
                          <div className="flex flex-wrap gap-1">
                            {facility.amenities.map((amenity, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Utilization Rate:</span>
                              <span className="font-medium">{((facility.occupancy / facility.capacity) * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cost Efficiency:</span>
                              <span className="font-medium">${facility.costPerSqFt}/sq ft</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Maintenance Status:</span>
                              <span className="font-medium text-green-600">Up to date</span>
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
                        <Wrench className="w-4 h-4" />
                        <span>Maintenance</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Occupants</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Location</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Maintenance Requests</h3>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Request</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{request.facilityName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaintenanceStatusColor(request.status)}`}>
                          {request.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="capitalize">{request.type}</span>
                        <span>•</span>
                        <span>Assigned to: {request.assignedTo}</span>
                        <span>•</span>
                        <span>Reported: {request.reportedDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${request.estimatedCost.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">estimated cost</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark Complete</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>Update Status</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <DollarSign className="w-4 h-4" />
                        <span>Cost Tracking</span>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Performance</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Average Occupancy Rate', value: '87%', change: 3.5 },
                    { metric: 'Maintenance Cost per Sq Ft', value: '$4.50', change: -8.2 },
                    { metric: 'Facility Utilization', value: '92%', change: 2.1 },
                    { metric: 'Energy Efficiency Rating', value: 'A-', change: 0 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                        {item.change !== 0 && (
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Analytics</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Preventive Maintenance', count: 45, cost: '$89K', status: 'On Track' },
                    { type: 'Repair Requests', count: 23, cost: '$156K', status: 'Under Budget' },
                    { type: 'Emergency Repairs', count: 8, cost: '$67K', status: 'Over Budget' },
                    { type: 'Facility Upgrades', count: 5, cost: '$234K', status: 'On Schedule' }
                  ].map((type, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{type.type}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          type.status === 'On Track' ? 'bg-green-100 text-green-700' :
                          type.status === 'Under Budget' ? 'bg-blue-100 text-blue-700' :
                          type.status === 'Over Budget' ? 'bg-red-100 text-red-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {type.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{type.count} requests</span>
                        <span>{type.cost} total cost</span>
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
