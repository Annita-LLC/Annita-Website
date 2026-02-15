'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Clock, Calendar, TrendingUp, TrendingDown, Search, Filter, Download, LogOut, UserCheck, UserX } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

interface AttendanceRecord {
  id: string
  employeeId: string
  name: string
  role: string
  department: string
  date: string
  checkIn: string
  checkOut?: string
  status: 'present' | 'absent' | 'late' | 'early-leave'
  workHours: string
  overtime?: string
  location: string
  notes?: string
}

export default function LiveAttendancePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('today')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState('')
  const [excuse, setExcuse] = useState('')

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    {
      id: 'ATT-001',
      employeeId: 'E1001',
      name: 'John Smith',
      role: 'Senior Developer',
      department: 'Engineering',
      date: '2024-02-20',
      checkIn: '09:00 AM',
      checkOut: '06:15 PM',
      status: 'present',
      workHours: '9h 15m',
      overtime: '15m',
      location: 'Office'
    },
    {
      id: 'ATT-002',
      employeeId: 'E1002',
      name: 'Sarah Chen',
      role: 'UX Designer',
      department: 'Design',
      date: '2024-02-20',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      status: 'late',
      workHours: '8h 45m',
      location: 'Office',
      notes: 'Traffic delay'
    },
    {
      id: 'ATT-003',
      employeeId: 'E1003',
      name: 'Mike Johnson',
      role: 'Marketing Specialist',
      department: 'Marketing',
      date: '2024-02-20',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      status: 'early-leave',
      workHours: '8h 45m',
      location: 'Office',
      notes: 'Personal appointment'
    },
    {
      id: 'ATT-004',
      employeeId: 'E1004',
      name: 'Emily Davis',
      role: 'Junior Developer',
      department: 'Engineering',
      date: '2024-02-20',
      checkIn: '09:00 AM',
      status: 'present',
      workHours: 'In progress',
      location: 'Remote'
    },
    {
      id: 'ATT-005',
      employeeId: 'E1005',
      name: 'Alex Thompson',
      role: 'Data Analyst',
      department: 'Analytics',
      date: '2024-02-20',
      checkIn: 'N/A',
      status: 'absent',
      workHours: '0h',
      location: 'N/A',
      notes: 'Sick leave'
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role) {
      setIsAuthenticated(true)
      setUserRole(role)
      setEmployeeId(empId || '')
    } else {
      router.push('/staff/login')
    }

    // Update current time every minute
    const timeInterval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      // Check if it's past 9:30 AM and mark absent if not checked in
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const isPast930 = (currentHour > 9) || (currentHour === 9 && currentMinute >= 30)
      
      if (isPast930 && !hasCheckedIn && role) {
        // Check if user already has attendance record for today
        const today = now.toISOString().split('T')[0]
        const existingRecord = attendance.find(record => 
          record.employeeId === empId && record.date === today
        )
        
        if (!existingRecord && role === 'employee') {
          // Auto-mark as absent for employees who haven't checked in
          const newAbsentRecord: AttendanceRecord = {
            id: `ATT-${Date.now()}`,
            employeeId: empId || '',
            name: 'Current User',
            role: role,
            department: 'Unknown',
            date: today,
            checkIn: 'N/A',
            status: 'absent',
            workHours: '0h',
            location: 'N/A',
            notes: 'Automatically marked absent - no check-in by 9:30 AM'
          }
          setAttendance(prev => [newAbsentRecord, ...prev])
        }
      }
    }, 60000) // Update every minute

    return () => clearInterval(timeInterval)
  }, [router, hasCheckedIn, attendance])

  const handleCheckIn = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const today = now.toISOString().split('T')[0]
    
    setCheckInTime(timeString)
    setHasCheckedIn(true)
    
    // Add or update attendance record
    const newRecord: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      employeeId: employeeId,
      name: 'Current User',
      role: userRole,
      department: 'Unknown',
      date: today,
      checkIn: timeString,
      status: 'present',
      workHours: 'In progress',
      location: 'Office'
    }
    
    setAttendance(prev => {
      const existingIndex = prev.findIndex(record => 
        record.employeeId === employeeId && record.date === today
      )
      
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = newRecord
        return updated
      } else {
        return [newRecord, ...prev]
      }
    })
  }

  const handleCheckOut = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const today = now.toISOString().split('T')[0]
    
    if (checkInTime) {
      // Calculate work hours
      const checkIn = new Date(`${today} ${checkInTime}`)
      const checkOut = new Date(`${today} ${timeString}`)
      const diffMs = checkOut.getTime() - checkIn.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      const workHours = `${diffHours}h ${diffMinutes}m`
      
      // Update attendance record
      setAttendance(prev => prev.map(record => {
        if (record.employeeId === employeeId && record.date === today) {
          return {
            ...record,
            checkOut: timeString,
            workHours,
            status: 'present' as const
          }
        }
        return record
      }))
    }
    
    setHasCheckedIn(false)
    setCheckInTime('')
    setExcuse('')
  }

  const handleMarkAbsent = () => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    
    const newAbsentRecord: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      employeeId: employeeId,
      name: 'Current User',
      role: userRole,
      department: 'Unknown',
      date: today,
      checkIn: 'N/A',
      status: 'absent',
      workHours: '0h',
      location: 'N/A',
      notes: excuse || 'No excuse provided'
    }
    
    setAttendance(prev => {
      const existingIndex = prev.findIndex(record => 
        record.employeeId === employeeId && record.date === today
      )
      
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = newAbsentRecord
        return updated
      } else {
        return [newAbsentRecord, ...prev]
      }
    })
    
    setExcuse('')
  }

  const handleLogout = () => {
    localStorage.removeItem('staff-authenticated')
    localStorage.removeItem('staff-employee-id')
    localStorage.removeItem('staff-role')
    router.push('/staff/login')
  }

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700'
      case 'absent': return 'bg-red-100 text-red-700'
      case 'late': return 'bg-yellow-100 text-yellow-700'
      case 'early-leave': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const canManage = userRole === 'ceo' || userRole === 'hr'
  const departments = Array.from(new Set(attendance.map(record => record.department)))

  const presentCount = attendance.filter(r => r.status === 'present').length
  const absentCount = attendance.filter(r => r.status === 'absent').length
  const lateCount = attendance.filter(r => r.status === 'late').length
  const totalEmployees = attendance.length

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
        title="Live Attendance - Annita"
        description="Live attendance monitoring and management"
        keywords={['attendance', 'monitoring', 'live', 'tracking', 'management']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Live Attendance</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId} | Role: {userRole}</p>
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

        {/* Attendance Signing Section */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-sm text-gray-500">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {userRole === 'employee' && (
                  <>
                    {!hasCheckedIn ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Enter excuse (optional)"
                          value={excuse}
                          onChange={(e) => setExcuse(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        />
                        <button
                          onClick={handleCheckIn}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                        >
                          <UserCheck className="w-4 h-4" />
                          <span>Check In</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          Checked in: {checkInTime}
                        </span>
                        <button
                          onClick={handleCheckOut}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <UserX className="w-4 h-4" />
                          <span>Check Out</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
                
                {userRole !== 'employee' && (
                  <div className="text-sm text-gray-500">
                    {userRole === 'ceo' && 'CEO View - Full System Access'}
                    {userRole === 'hr' && 'HR View - Attendance Management'}
                    {userRole === 'cfo' && 'CFO View - Financial Oversight'}
                    {userRole === 'cmo' && 'CMO View - Marketing Attendance'}
                    {userRole === 'coo' && 'COO View - Operations Attendance'}
                    {userRole === 'manager' && 'Manager View - Team Attendance'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          {/* Attendance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Present</h3>
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{presentCount}</p>
              <p className="text-sm text-gray-500">Checked in today</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Absent</h3>
                <UserX className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{absentCount}</p>
              <p className="text-sm text-gray-500">Not checked in</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Late</h3>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{lateCount}</p>
              <p className="text-sm text-gray-500">Late arrivals</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
              <p className="text-sm text-gray-500">Total employees</p>
            </div>
          </div>

          {/* Attendance Management */}
          {canManage && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Mark All Present
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  Send Reminders
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Generate Report
                </button>
              </div>
            </div>
          )}

          {/* Attendance Records */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="early-leave">Early Leave</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAttendance.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{record.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{record.role} • {record.department}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status.replace('-', ' ').charAt(0).toUpperCase() + record.status.replace('-', ' ').slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">ID: {record.employeeId}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{record.workHours}</p>
                      <p className="text-sm text-gray-500">Work hours</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Check In</p>
                      <p className="text-sm font-medium text-gray-900">{record.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Check Out</p>
                      <p className="text-sm text-gray-900">{record.checkOut || 'Not checked out'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm text-gray-900">{record.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Overtime</p>
                      <p className="text-sm text-gray-900">{record.overtime || 'None'}</p>
                    </div>
                  </div>

                  {record.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600">{record.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Date: {record.date}
                    </div>
                    {canManage && (
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredAttendance.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
