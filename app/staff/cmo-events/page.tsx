'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, MapPin, Users, DollarSign, Clock, Search, Filter, Download, Plus, TrendingUp, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import EventManagement from '@/components/staff/EventManagement'

interface CMOEvent {
  id: string
  name: string
  type: 'conference' | 'webinar' | 'workshop' | 'trade-show' | 'networking' | 'product-launch'
  status: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  location: string
  format: 'in-person' | 'virtual' | 'hybrid'
  expectedAttendees: number
  registeredAttendees: number
  budget: string
  spent: string
  description: string
  organizer: string
  team: string[]
  objectives: string[]
}

export default function CMOEventsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterFormat, setFilterFormat] = useState('all')

  const [events, setEvents] = useState<CMOEvent[]>([
    {
      id: 'EVT-001',
      name: 'Tech Innovation Summit 2024',
      type: 'conference',
      status: 'planning',
      startDate: '2024-06-15',
      endDate: '2024-06-17',
      location: 'San Francisco Convention Center',
      format: 'hybrid',
      expectedAttendees: 1500,
      registeredAttendees: 234,
      budget: '$250,000',
      spent: '$45,000',
      description: 'Annual technology conference featuring industry leaders and innovation showcases',
      organizer: 'Jessica Martinez',
      team: ['Events Team', 'Marketing Team', 'Sales Team'],
      objectives: ['Lead Generation', 'Brand Awareness', 'Partnership Development']
    },
    {
      id: 'EVT-002',
      name: 'Digital Marketing Masterclass',
      type: 'webinar',
      status: 'confirmed',
      startDate: '2024-03-20',
      endDate: '2024-03-20',
      location: 'Virtual Event',
      format: 'virtual',
      expectedAttendees: 500,
      registeredAttendees: 412,
      budget: '$25,000',
      spent: '$18,000',
      description: 'Educational webinar on advanced digital marketing strategies',
      organizer: 'Sarah Chen',
      team: ['Content Team', 'Digital Marketing Team'],
      objectives: ['Lead Generation', 'Thought Leadership', 'Customer Education']
    },
    {
      id: 'EVT-003',
      name: 'Product Launch Event',
      type: 'product-launch',
      status: 'planning',
      startDate: '2024-04-10',
      endDate: '2024-04-10',
      location: 'New York Headquarters',
      format: 'in-person',
      expectedAttendees: 200,
      registeredAttendees: 89,
      budget: '$75,000',
      spent: '$22,000',
      description: 'Exclusive product launch event for key customers and media',
      organizer: 'Mike Johnson',
      team: ['Product Team', 'PR Team', 'Events Team'],
      objectives: ['Product Awareness', 'Media Coverage', 'Customer Acquisition']
    },
    {
      id: 'EVT-004',
      name: 'B2B Networking Mixer',
      type: 'networking',
      status: 'completed',
      startDate: '2024-02-08',
      endDate: '2024-02-08',
      location: 'Austin Convention Center',
      format: 'in-person',
      expectedAttendees: 300,
      registeredAttendees: 267,
      budget: '$35,000',
      spent: '$33,500',
      description: 'Quarterly networking event for B2B prospects and partners',
      organizer: 'Emily Davis',
      team: ['Sales Team', 'Marketing Team'],
      objectives: ['Lead Generation', 'Relationship Building', 'Partner Acquisition']
    },
    {
      id: 'EVT-005',
      name: 'Marketing Automation Workshop',
      type: 'workshop',
      status: 'in-progress',
      startDate: '2024-02-25',
      endDate: '2024-02-25',
      location: 'Virtual Event',
      format: 'virtual',
      expectedAttendees: 150,
      registeredAttendees: 134,
      budget: '$15,000',
      spent: '$12,000',
      description: 'Hands-on workshop for marketing automation best practices',
      organizer: 'Alex Thompson',
      team: ['Training Team', 'Product Team'],
      objectives: ['Customer Education', 'Product Adoption', 'Upselling Opportunities']
    },
    {
      id: 'EVT-006',
      name: 'Industry Trade Show 2024',
      type: 'trade-show',
      status: 'planning',
      startDate: '2024-05-12',
      endDate: '2024-05-14',
      location: 'Las Vegas Convention Center',
      format: 'in-person',
      expectedAttendees: 5000,
      registeredAttendees: 0,
      budget: '$150,000',
      spent: '$25,000',
      description: 'Major industry trade show with booth and speaking opportunities',
      organizer: 'Jessica Martinez',
      team: ['Events Team', 'Sales Team', 'Product Team'],
      objectives: ['Brand Exposure', 'Lead Generation', 'Competitive Intelligence']
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'cmo') {
      setIsAuthenticated(true)
      setUserRole('cmo')
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
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || event.type === filterType
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    const matchesFormat = filterFormat === 'all' || event.format === filterFormat
    
    return matchesSearch && matchesType && matchesStatus && matchesFormat
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700'
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-purple-100 text-purple-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-purple-100 text-purple-700'
      case 'webinar': return 'bg-blue-100 text-blue-700'
      case 'workshop': return 'bg-green-100 text-green-700'
      case 'trade-show': return 'bg-orange-100 text-orange-700'
      case 'networking': return 'bg-pink-100 text-pink-700'
      case 'product-launch': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'in-person': return 'bg-green-100 text-green-700'
      case 'virtual': return 'bg-blue-100 text-blue-700'
      case 'hybrid': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const eventTypes = Array.from(new Set(events.map(event => event.type)))

  const totalBudget = events.reduce((sum, event) => {
    return sum + parseFloat(event.budget.replace(/[$,]/g, ''))
  }, 0)

  const totalSpent = events.reduce((sum, event) => {
    return sum + parseFloat(event.spent.replace(/[$,]/g, ''))
  }, 0)

  const totalExpectedAttendees = events.reduce((sum, event) => sum + event.expectedAttendees, 0)
  const totalRegisteredAttendees = events.reduce((sum, event) => sum + event.registeredAttendees, 0)

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
        title="CMO Events Management - Annita"
        description="CMO events management and marketing activities"
        keywords={['cmo', 'events', 'marketing', 'conferences', 'webinars']}
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
                  onClick={() => router.push('/staff/cmo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Events Management</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Create Event</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Events Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Budget</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Event budget allocation</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{((totalSpent / totalBudget) * 100).toFixed(1)}% utilized</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Expected Attendees</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalExpectedAttendees.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Across all events</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Registered</h3>
                <Calendar className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalRegisteredAttendees.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Current registrations</p>
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Marketing Events</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Types</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterFormat}
                  onChange={(e) => setFilterFormat(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Formats</option>
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="planning">Planning</option>
                  <option value="confirmed">Confirmed</option>
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1).replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(event.format)}`}>
                          {event.format.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{event.budget}</p>
                      <p className="text-sm text-gray-500">{event.spent} spent</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {event.startDate} {event.startDate !== event.endDate ? `- ${event.endDate}` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm text-gray-900">{event.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Attendees</p>
                      <p className="text-sm font-medium text-gray-900">
                        {event.registeredAttendees} / {event.expectedAttendees}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Organizer</p>
                      <p className="text-sm text-gray-900">{event.organizer}</p>
                    </div>
                  </div>

                  {/* Registration Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Registration Progress</span>
                      <span className="text-sm text-gray-900">
                        {((event.registeredAttendees / event.expectedAttendees) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-pink-500 transition-all"
                        style={{ width: `${Math.min((event.registeredAttendees / event.expectedAttendees) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Event Objectives */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Event Objectives</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.objectives.map((objective, index) => (
                        <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                          {objective}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Team: {event.team.join(', ')}</span>
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
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

          {/* Event Management Section */}
          <div className="mt-8">
            <EventManagement />
          </div>
        </main>
      </div>
    </>
  )
}
