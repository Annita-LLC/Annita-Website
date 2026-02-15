'use client'

import { useState } from 'react'
import { Calendar, Users, MapPin, Clock, TrendingUp, DollarSign, CheckCircle, AlertCircle, Play, Pause, Settings, Plus, Search, Filter, Eye } from 'lucide-react'

interface Event {
  id: string
  name: string
  type: 'conference' | 'webinar' | 'workshop' | 'networking' | 'launch' | 'training'
  status: 'draft' | 'planned' | 'active' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  location: string
  isVirtual: boolean
  capacity: number
  registered: number
  budget: number
  revenue: number
  description: string
  speakers: string[]
  targetAudience: string
  goals: string[]
}

interface EventMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'calendar' | 'analytics'>('overview')
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const events: Event[] = [
    {
      id: '1',
      name: 'Annual Product Launch Conference',
      type: 'conference',
      status: 'planned',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      location: 'San Francisco Convention Center',
      isVirtual: false,
      capacity: 500,
      registered: 325,
      budget: 75000,
      revenue: 125000,
      description: 'Annual product launch event showcasing new features and roadmap',
      speakers: ['CEO John Smith', 'CTO Sarah Johnson', 'Product Lead Mike Chen'],
      targetAudience: 'Enterprise customers and partners',
      goals: ['Generate $150K in sales leads', 'Increase brand awareness by 25%', 'Launch 3 new products']
    },
    {
      id: '2',
      name: 'Customer Success Webinar Series',
      type: 'webinar',
      status: 'active',
      startDate: '2024-02-20',
      endDate: '2024-02-20',
      location: 'Zoom Webinar',
      isVirtual: true,
      capacity: 1000,
      registered: 750,
      budget: 5000,
      revenue: 0,
      description: 'Monthly webinar series sharing customer success stories and best practices',
      speakers: ['Customer Success Manager Emma Davis'],
      targetAudience: 'Existing customers and prospects',
      goals: ['Improve customer retention by 15%', 'Generate 50 qualified leads', 'Increase product adoption']
    },
    {
      id: '3',
      name: 'Partner Training Workshop',
      type: 'workshop',
      status: 'completed',
      startDate: '2024-02-10',
      endDate: '2024-02-10',
      location: 'Company Headquarters',
      isVirtual: false,
      capacity: 50,
      registered: 45,
      budget: 8000,
      revenue: 0,
      description: 'Hands-on training session for channel partners',
      speakers: ['Partner Manager Alex Rivera', 'Technical Trainer Lisa Wong'],
      targetAudience: 'Channel partners and resellers',
      goals: ['Improve partner certification rates', 'Increase partner sales by 20%', 'Enhance partner satisfaction']
    }
  ]

  const metrics: EventMetric[] = [
    {
      id: '1',
      title: 'Total Attendees',
      value: '1,120',
      change: 18.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Event ROI',
      value: '245%',
      change: 12.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Events This Month',
      value: '8',
      change: 4,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Revenue Generated',
      value: '$187K',
      change: -3.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <DollarSign className="w-6 h-6" />
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <Eye className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'planned': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-purple-100 text-purple-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />
      case 'planned': return <Clock className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Event Management</h2>
              <p className="text-sm text-gray-600">Plan, execute, and analyze events and webinars</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
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
                  ? 'bg-white text-orange-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {events.filter(event => event.status === 'planned' || event.status === 'active').slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          event.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {getStatusIcon(event.status)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.name}</p>
                          <p className="text-xs text-gray-500">{event.startDate} • {event.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{event.registered}/{event.capacity}</p>
                        <p className="text-xs text-gray-500">registered</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Highest Attendance</span>
                    <span className="text-sm font-medium text-green-600">Product Launch (500)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best ROI</span>
                    <span className="text-sm font-medium text-green-600">245%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Most Revenue</span>
                    <span className="text-sm font-medium text-blue-600">$187K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Satisfaction</span>
                    <span className="text-sm font-medium text-purple-600">4.6/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Events</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>Conference</option>
                  <option>Webinar</option>
                  <option>Workshop</option>
                  <option>Networking</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Event</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.status === 'active' ? 'bg-green-100 text-green-600' :
                        event.status === 'planned' ? 'bg-blue-100 text-blue-600' :
                        event.status === 'completed' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{event.type}</span>
                          <span>•</span>
                          <span>{event.startDate} - {event.endDate}</span>
                          <span>•</span>
                          <span>{event.isVirtual ? 'Virtual' : event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      <button
                        onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Registration</p>
                      <p className="text-lg font-semibold text-gray-900">{event.registered}/{event.capacity}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {((event.registered / event.capacity) * 100).toFixed(0)}% capacity
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Financials</p>
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">${event.budget.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Budget</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-green-600">${event.revenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Target Audience</p>
                      <p className="text-sm font-medium text-gray-900">{event.targetAudience}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Speakers: {event.speakers.length}
                      </p>
                    </div>
                  </div>

                  {selectedEvent === event.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Event Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Description</h6>
                          <p className="text-sm text-gray-700">{event.description}</p>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Goals</h6>
                          <ul className="space-y-1">
                            {event.goals.map((goal, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h6 className="text-sm font-medium text-gray-900 mb-2">Speakers</h6>
                        <div className="flex flex-wrap gap-2">
                          {event.speakers.map((speaker, index) => (
                            <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                              {speaker}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Settings className="w-4 h-4" />
                        <span>Manage</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Attendees</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {event.status === 'planned' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                          <Play className="w-4 h-4" />
                          <span>Start Event</span>
                        </button>
                      )}
                      {event.status === 'active' && (
                        <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                          <Pause className="w-4 h-4" />
                          <span>Pause</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 px-3 py-1 text-orange-600 hover:text-orange-700 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>Analytics</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Event Calendar</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Month View
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Schedule Event</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { date: '2024-02-20', day: 'Tue', events: ['Customer Success Webinar', 'Partner Training Session'] },
                { date: '2024-02-25', day: 'Sun', events: ['Product Demo Day'] },
                { date: '2024-03-01', day: 'Fri', events: ['Industry Conference Prep'] },
                { date: '2024-03-15', day: 'Fri', events: ['Annual Product Launch Conference'] },
                { date: '2024-03-22', day: 'Fri', events: ['Customer Advisory Board Meeting'] },
                { date: '2024-04-05', day: 'Fri', events: ['Spring Webinar Series'] }
              ].map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{day.day}</p>
                      <p className="text-xs text-gray-500">{day.date}</p>
                    </div>
                    <span className="text-sm font-medium text-orange-600">{day.events.length} events</span>
                  </div>
                  <div className="space-y-2">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <p className="text-xs text-gray-700 truncate">{event}</p>
                      </div>
                    ))}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance Overview</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Total Registrations', value: '1,120', change: 18.7 },
                    { metric: 'Average Attendance Rate', value: '87%', change: 12.5 },
                    { metric: 'Event Satisfaction', value: '4.6/5', change: 8.3 },
                    { metric: 'Lead Generation', value: '387', change: 15.7 }
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Type Performance</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Webinars', attendance: 750, satisfaction: 4.7, roi: 380 },
                    { type: 'Conferences', attendance: 500, satisfaction: 4.5, roi: 245 },
                    { type: 'Workshops', attendance: 95, satisfaction: 4.8, roi: 320 },
                    { type: 'Networking', attendance: 150, satisfaction: 4.2, roi: 180 }
                  ].map((type, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{type.type}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{type.attendance}</p>
                          <p className="text-xs text-gray-500">attendees</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Satisfaction: {type.satisfaction}/5</span>
                        <span>ROI: {type.roi}%</span>
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
