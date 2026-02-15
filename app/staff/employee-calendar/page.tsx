'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin, Users, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import CompanyCalendar from '@/components/staff/CompanyCalendar'

interface EmployeeEvent {
  id: string
  title: string
  type: 'meeting' | 'training' | 'deadline' | 'holiday' | 'personal'
  date: string
  time: string
  duration: string
  location: string
  isVirtual: boolean
  attendees?: string[]
  description: string
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  reminder: boolean
}

export default function EmployeeCalendarPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [events, setEvents] = useState<EmployeeEvent[]>([
    {
      id: 'EVT-001',
      title: 'Team Standup Meeting',
      type: 'meeting',
      date: '2024-02-20',
      time: '9:00 AM',
      duration: '30 minutes',
      location: 'Virtual',
      isVirtual: true,
      attendees: ['John Smith', 'Sarah Chen', 'Mike Johnson', 'Manager'],
      description: 'Daily team sync to discuss progress and blockers',
      status: 'upcoming',
      priority: 'medium',
      reminder: true
    },
    {
      id: 'EVT-002',
      title: 'React Advanced Training',
      type: 'training',
      date: '2024-02-21',
      time: '2:00 PM',
      duration: '2 hours',
      location: 'Conference Room A',
      isVirtual: false,
      attendees: ['Sarah Chen', 'Training Team'],
      description: 'Advanced React concepts and best practices workshop',
      status: 'upcoming',
      priority: 'medium',
      reminder: true
    },
    {
      id: 'EVT-003',
      title: 'Project Deadline - E-commerce Redesign',
      type: 'deadline',
      date: '2024-02-22',
      time: '5:00 PM',
      duration: 'All day',
      location: 'N/A',
      isVirtual: false,
      description: 'Final deadline for e-commerce platform redesign project',
      status: 'upcoming',
      priority: 'high',
      reminder: true
    },
    {
      id: 'EVT-004',
      title: '1-on-1 with Manager',
      type: 'meeting',
      date: '2024-02-23',
      time: '10:00 AM',
      duration: '1 hour',
      location: 'Manager Office',
      isVirtual: false,
      attendees: ['Manager'],
      description: 'Monthly performance review and goal discussion',
      status: 'upcoming',
      priority: 'high',
      reminder: true
    },
    {
      id: 'EVT-005',
      title: 'Company Holiday - Presidents Day',
      type: 'holiday',
      date: '2024-02-19',
      time: 'All day',
      duration: 'All day',
      location: 'N/A',
      isVirtual: false,
      description: 'Company holiday - office closed',
      status: 'completed',
      priority: 'low',
      reminder: false
    },
    {
      id: 'EVT-006',
      title: 'Team Building Event',
      type: 'personal',
      date: '2024-02-24',
      time: '3:00 PM',
      duration: '3 hours',
      location: 'Off-site',
      isVirtual: false,
      attendees: ['Entire Team'],
      description: 'Quarterly team building activity and social event',
      status: 'upcoming',
      priority: 'medium',
      reminder: true
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'employee') {
      setIsAuthenticated(true)
      setUserRole('employee')
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

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || event.type === filterType
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      case 'in-progress': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-700'
      case 'training': return 'bg-green-100 text-green-700'
      case 'deadline': return 'bg-red-100 text-red-700'
      case 'holiday': return 'bg-purple-100 text-purple-700'
      case 'personal': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const eventTypes = Array.from(new Set(events.map(event => event.type)))

  const upcomingCount = events.filter(e => e.status === 'upcoming').length
  const todayCount = events.filter(e => e.date === new Date().toISOString().split('T')[0]).length
  const thisWeekCount = events.filter(e => {
    const eventDate = new Date(e.date)
    const today = new Date()
    const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return eventDate >= today && eventDate <= weekEnd
  }).length

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
        title="Employee Calendar - Annita"
        description="Employee calendar and event management"
        keywords={['employee', 'calendar', 'events', 'schedule', 'meetings']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/employee-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Calendar</h1>
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

        <main className="container mx-auto px-4 py-8">
          {/* Calendar Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
              <p className="text-sm text-gray-500">Events scheduled</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Today</h3>
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
              <p className="text-sm text-gray-500">Today's events</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">This Week</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{thisWeekCount}</p>
              <p className="text-sm text-gray-500">Events this week</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Month</h3>
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
              </p>
              <p className="text-sm text-gray-500">Current month</p>
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Events</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search events..."
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
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`}></div>
                          <span className="text-xs text-gray-500">{event.priority} priority</span>
                        </div>
                        {event.reminder && (
                          <span className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>Reminder set</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{event.time}</p>
                      <p className="text-sm text-gray-500">{event.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{event.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm text-gray-900">
                        {event.isVirtual ? (
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Virtual</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-sm text-gray-900">{event.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Event ID</p>
                      <p className="text-sm text-gray-900">{event.id}</p>
                    </div>
                  </div>

                  {/* Attendees */}
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attendees</h4>
                      <div className="flex flex-wrap gap-1">
                        {event.attendees.map((attendee, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {event.status === 'upcoming' && '⏰ Upcoming event'}
                      {event.status === 'in-progress' && '🔄 In progress'}
                      {event.status === 'completed' && '✅ Completed'}
                      {event.status === 'cancelled' && '❌ Cancelled'}
                    </div>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Company Calendar Section */}
          <div className="mt-8">
            <CompanyCalendar />
          </div>
        </main>
      </div>
    </>
  )
}
