'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building, MapPin, Users, DollarSign, AlertCircle, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import FacilityManagement from '@/components/staff/FacilityManagement'

interface COOFacility {
  id: string
  name: string
  type: 'headquarters' | 'warehouse' | 'manufacturing' | 'office' | 'distribution'
  location: string
  size: string
  capacity: number
  currentOccupancy: number
  status: 'active' | 'maintenance' | 'renovation' | 'planned'
  manager: string
  operatingCosts: string
  utilization: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  lastInspection: string
  departments: string[]
}

export default function COOFacilitiesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [facilities, setFacilities] = useState<COOFacility[]>([
    {
      id: 'FAC-001',
      name: 'Corporate Headquarters',
      type: 'headquarters',
      location: 'New York, NY',
      size: '125,000 sq ft',
      capacity: 500,
      currentOccupancy: 425,
      status: 'active',
      manager: 'John Smith',
      operatingCosts: '$125,000/month',
      utilization: 85,
      condition: 'excellent',
      lastInspection: '2024-02-01',
      departments: ['Executive', 'Finance', 'HR', 'Marketing', 'IT']
    },
    {
      id: 'FAC-002',
      name: 'Main Warehouse',
      type: 'warehouse',
      location: 'Newark, NJ',
      size: '250,000 sq ft',
      capacity: 150,
      currentOccupancy: 120,
      status: 'active',
      manager: 'Sarah Chen',
      operatingCosts: '$45,000/month',
      utilization: 80,
      condition: 'good',
      lastInspection: '2024-01-15',
      departments: ['Logistics', 'Warehouse Operations', 'Quality Control']
    },
    {
      id: 'FAC-003',
      name: 'Manufacturing Plant',
      type: 'manufacturing',
      location: 'Philadelphia, PA',
      size: '400,000 sq ft',
      capacity: 300,
      currentOccupancy: 275,
      status: 'active',
      manager: 'Mike Johnson',
      operatingCosts: '$180,000/month',
      utilization: 92,
      condition: 'good',
      lastInspection: '2024-02-10',
      departments: ['Production', 'Engineering', 'Maintenance', 'Quality']
    },
    {
      id: 'FAC-004',
      name: 'West Coast Office',
      type: 'office',
      location: 'San Francisco, CA',
      size: '45,000 sq ft',
      capacity: 200,
      currentOccupancy: 150,
      status: 'active',
      manager: 'Emily Davis',
      operatingCosts: '$35,000/month',
      utilization: 75,
      condition: 'excellent',
      lastInspection: '2024-01-20',
      departments: ['Sales', 'Customer Support', 'Regional Management']
    },
    {
      id: 'FAC-005',
      name: 'Distribution Center',
      type: 'distribution',
      location: 'Chicago, IL',
      size: '180,000 sq ft',
      capacity: 100,
      currentOccupancy: 85,
      status: 'maintenance',
      manager: 'Alex Thompson',
      operatingCosts: '$28,000/month',
      utilization: 85,
      condition: 'fair',
      lastInspection: '2024-02-05',
      departments: ['Distribution', 'Fulfillment', 'Shipping']
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'coo') {
      setIsAuthenticated(true)
      setUserRole('coo')
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

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || facility.type === filterType
    const matchesStatus = filterStatus === 'all' || facility.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'maintenance': return 'bg-yellow-100 text-yellow-700'
      case 'renovation': return 'bg-orange-100 text-orange-700'
      case 'planned': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'headquarters': return 'bg-purple-100 text-purple-700'
      case 'warehouse': return 'bg-blue-100 text-blue-700'
      case 'manufacturing': return 'bg-green-100 text-green-700'
      case 'office': return 'bg-orange-100 text-orange-700'
      case 'distribution': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-700'
      case 'good': return 'bg-blue-100 text-blue-700'
      case 'fair': return 'bg-yellow-100 text-yellow-700'
      case 'poor': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600'
    if (utilization >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  const facilityTypes = Array.from(new Set(facilities.map(facility => facility.type)))

  const totalCapacity = facilities.reduce((sum, facility) => sum + facility.capacity, 0)
  const totalOccupancy = facilities.reduce((sum, facility) => sum + facility.currentOccupancy, 0)
  const avgUtilization = (totalOccupancy / totalCapacity) * 100

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
        title="COO Facilities Management - Annita"
        description="COO facilities management and building operations"
        keywords={['coo', 'facilities', 'management', 'buildings', 'operations']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/coo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Facilities Management</h1>
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
          {/* Facilities Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Facilities</h3>
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{facilities.length}</p>
              <p className="text-sm text-gray-500">Active locations</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Capacity</h3>
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalCapacity.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Person capacity</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Occupancy</h3>
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalOccupancy.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{avgUtilization.toFixed(1)}% utilization</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {facilities.filter(f => f.status === 'maintenance').length}
              </p>
              <p className="text-sm text-gray-500">Under maintenance</p>
            </div>
          </div>

          {/* Facilities List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Facilities Inventory</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search facilities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  {facilityTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="renovation">Renovation</option>
                  <option value="planned">Planned</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredFacilities.map((facility) => (
                <div key={facility.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{facility.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status)}`}>
                          {facility.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(facility.type)}`}>
                          {facility.type.charAt(0).toUpperCase() + facility.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(facility.condition)}`}>
                          {facility.condition}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{facility.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getUtilizationColor(facility.utilization)}`}>
                        {facility.utilization}%
                      </p>
                      <p className="text-sm text-gray-500">Utilization</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="text-sm font-medium text-gray-900">{facility.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Capacity</p>
                      <p className="text-sm font-medium text-gray-900">{facility.currentOccupancy} / {facility.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Operating Costs</p>
                      <p className="text-sm font-medium text-gray-900">{facility.operatingCosts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="text-sm text-gray-900">{facility.manager}</p>
                    </div>
                  </div>

                  {/* Utilization Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Space Utilization</span>
                      <span className="text-sm text-gray-900">{facility.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          facility.utilization >= 90 ? 'bg-red-500' :
                          facility.utilization >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${facility.utilization}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Departments */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Departments</h4>
                    <div className="flex flex-wrap gap-1">
                      {facility.departments.slice(0, 3).map((dept, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {dept}
                        </span>
                      ))}
                      {facility.departments.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{facility.departments.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last inspection: {facility.lastInspection}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFacilities.length === 0 && (
              <div className="text-center py-12">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Facility Management Section */}
          <div className="mt-8">
            <FacilityManagement />
          </div>
        </main>
      </div>
    </>
  )
}
