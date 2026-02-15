'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, Users, Video, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import OneOnOneMeetings from '@/components/staff/OneOnOneMeetings'

interface ManagerMeeting {
  id: string
  title: string
  type: '1-on-1' | 'team' | 'project' | 'client' | 'review'
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  date: string
  time: string
  duration: string
  location: string
  isVirtual: boolean
  attendees: string[]
  organizer: string
  description: string
  agenda: string[]
  notes?: string
  actionItems?: string[]
  followUp?: string
}

export default function ManagerMeetingsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('all')

  const [meetings, setMeetings] = useState<ManagerMeeting[]>([
    {
      id: 'MTG-001',
      title: 'Q1 Performance Review - John Smith',
      type: '1-on-1',
      status: 'completed',
      date: '2024-02-15',
      time: '10:00 AM',
      duration: '1 hour',
      location: 'Conference Room A',
      isVirtual: false,
      attendees: ['John Smith', 'Manager'],
      organizer: 'Manager',
      description: 'Quarterly performance review and goal setting',
      agenda: ['Performance discussion', 'Goal review', 'Development planning', 'Feedback session'],
      notes: 'Excellent performance. Exceeded targets in 3 out of 4 KPIs. Discussing promotion track.',
      actionItems: ['Update performance goals', 'Schedule leadership training', 'Prepare promotion paperwork'],
      followUp: 'Follow-up meeting scheduled for March 15 to review progress on new goals.'
    },
    {
      id: 'MTG-002',
      title: 'Team Weekly Standup',
      type: 'team',
      status: 'scheduled',
      date: '2024-02-20',
      time: '9:00 AM',
      duration: '30 minutes',
      location: 'Virtual',
      isVirtual: true,
      attendees: ['John Smith', 'Sarah Chen', 'Mike Johnson', 'Emily Davis', 'Alex Thompson', 'Manager'],
      organizer: 'Manager',
      description: 'Weekly team sync to discuss progress and blockers',
      agenda: ['Project updates', 'Blocker discussion', 'Upcoming priorities', 'Q&A']
    },
    {
      id: 'MTG-003',
      title: 'E-commerce Platform Project Review',
      type: 'project',
      status: 'scheduled',
      date: '2024-02-22',
      time: '2:00 PM',
      duration: '1.5 hours',
      location: 'Conference Room B',
      isVirtual: false,
      attendees: ['John Smith', 'Sarah Chen', 'Emily Davis', 'Stakeholder', 'Manager'],
      organizer: 'Manager',
      description: 'Project progress review and milestone planning',
      agenda: ['Current status review', 'Milestone assessment', 'Risk discussion', 'Next steps planning']
    },
    {
      id: 'MTG-004',
      title: 'Client Presentation - New Feature Demo',
      type: 'client',
      status: 'completed',
      date: '2024-02-10',
      time: '3:00 PM',
      duration: '2 hours',
      location: 'Client Office',
      isVirtual: false,
      attendees: ['Sarah Chen', 'Mike Johnson', 'Client Team', 'Manager'],
      organizer: 'Manager',
      description: 'Demonstration of new e-commerce features to key client',
      agenda: ['Feature demo', 'Q&A session', 'Feedback collection', 'Next steps discussion'],
      notes: 'Client very impressed with new features. Positive feedback on UI improvements.',
      actionItems: ['Implement client feedback', 'Schedule follow-up demo', 'Prepare proposal for additional features'],
      followUp: 'Client requested follow-up demo for advanced features on March 1.'
    },
    {
      id: 'MTG-005',
      title: 'Monthly Team Performance Review',
      type: 'review',
      status: 'scheduled',
      date: '2024-02-28',
      time: '11:00 AM',
      duration: '2 hours',
      location: 'Conference Room A',
      isVirtual: false,
      attendees: ['John Smith', 'Sarah Chen', 'Mike Johnson', 'Emily Davis', 'Alex Thompson', 'Manager'],
      organizer: 'Manager',
      description: 'Monthly team performance metrics and goal alignment',
      agenda: ['Performance metrics review', 'Goal progress assessment', 'Team challenges', 'Recognition and rewards']
    },
    {
      id: 'MTG-006',
      title: '1-on-1 - Sarah Chen',
      type: '1-on-1',
      status: 'cancelled',
      date: '2024-02-12',
      time: '2:00 PM',
      duration: '1 hour',
      location: 'Office',
      isVirtual: false,
      attendees: ['Sarah Chen', 'Manager'],
      organizer: 'Manager',
      description: 'Regular check-in and career development discussion',
      agenda: ['Work progress review', 'Career goals discussion', 'Feedback session', 'Development planning'],
      notes: 'Cancelled due to urgent client meeting. Rescheduled for February 19.',
      actionItems: [],
      followUp: 'Rescheduled for February 19 at 2:00 PM.'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'manager') {
      setIsAuthenticated(true)
      setUserRole('manager')
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

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.attendees.some(attendee => attendee.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || meeting.type === filterType
    const matchesStatus = filterStatus === 'all' || meeting.status === filterStatus
    const matchesDate = filterDate === 'all' || 
                         (filterDate === 'today' && meeting.date === new Date().toISOString().split('T')[0]) ||
                         (filterDate === 'upcoming' && new Date(meeting.date) > new Date()) ||
                         (filterDate === 'past' && new Date(meeting.date) < new Date())
    
    return matchesSearch && matchesType && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      case 'rescheduled': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case '1-on-1': return 'bg-purple-100 text-purple-700'
      case 'team': return 'bg-blue-100 text-blue-700'
      case 'project': return 'bg-green-100 text-green-700'
      case 'client': return 'bg-orange-100 text-orange-700'
      case 'review': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const meetingTypes = Array.from(new Set(meetings.map(meeting => meeting.type)))

  const scheduledCount = meetings.filter(m => m.status === 'scheduled').length
  const completedCount = meetings.filter(m => m.status === 'completed').length
  const cancelledCount = meetings.filter(m => m.status === 'cancelled').length
  const todayCount = meetings.filter(m => m.date === new Date().toISOString().split('T')[0]).length

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
        title="Manager 1-on-1 Meetings - Annita"
        description="Manager 1-on-1 meetings and team meeting management"
        keywords={['manager', 'meetings', '1-on-1', 'team', 'scheduling']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/manager-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">1-on-1 Meetings</h1>
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
          {/* Meetings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Scheduled</h3>
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{scheduledCount}</p>
              <p className="text-sm text-gray-500">Upcoming meetings</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              <p className="text-sm text-gray-500">Past meetings</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Today</h3>
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
              <p className="text-sm text-gray-500">Meetings today</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cancelled</h3>
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{cancelledCount}</p>
              <p className="text-sm text-gray-500">Cancelled meetings</p>
            </div>
          </div>

          {/* Meetings List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Meeting Schedule</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search meetings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Types</option>
                  {meetingTypes.map(type => (
                    <option key={type} value={type}>{type.replace('-', ' ').charAt(0).toUpperCase() + type.replace('-', ' ').slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredMeetings.map((meeting) => (
                <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{meeting.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{meeting.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(meeting.type)}`}>
                          {meeting.type.replace('-', ' ').charAt(0).toUpperCase() + meeting.type.replace('-', ' ').slice(1)}
                        </span>
                        {meeting.isVirtual && (
                          <span className="flex items-center space-x-1 text-xs text-gray-500">
                            <Video className="w-3 h-3" />
                            <span>Virtual</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{meeting.time}</p>
                      <p className="text-sm text-gray-500">{meeting.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{meeting.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm text-gray-900">{meeting.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Organizer</p>
                      <p className="text-sm text-gray-900">{meeting.organizer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Attendees</p>
                      <p className="text-sm text-gray-900">{meeting.attendees.length} people</p>
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attendees</h4>
                    <div className="flex flex-wrap gap-1">
                      {meeting.attendees.map((attendee, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Agenda */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Agenda</h4>
                    <div className="space-y-1">
                      {meeting.agenda.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                      {meeting.agenda.length > 3 && (
                        <div className="text-sm text-gray-500">+{meeting.agenda.length - 3} more agenda items</div>
                      )}
                    </div>
                  </div>

                  {/* Notes for completed meetings */}
                  {meeting.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Meeting Notes</h4>
                      <p className="text-sm text-gray-600">{meeting.notes}</p>
                    </div>
                  )}

                  {/* Action Items */}
                  {meeting.actionItems && meeting.actionItems.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Action Items</h4>
                      <div className="space-y-1">
                        {meeting.actionItems.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Follow Up */}
                  {meeting.followUp && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Follow Up</h4>
                      <p className="text-sm text-gray-600">{meeting.followUp}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Meeting ID: {meeting.id}
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMeetings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* One-on-One Meetings Section */}
          <div className="mt-8">
            <OneOnOneMeetings userRole="manager" />
          </div>
        </main>
      </div>
    </>
  )
}
