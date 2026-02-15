'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Truck, TrendingUp, AlertCircle, Search, Filter, Download, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import SupplyChainManagement from '@/components/staff/SupplyChainManagement'

interface COOSupplier {
  id: string
  name: string
  type: 'raw-materials' | 'components' | 'services' | 'logistics' | 'equipment'
  status: 'active' | 'inactive' | 'under-review' | 'terminated'
  rating: number
  contractValue: string
  deliveryTime: string
  qualityScore: number
  reliability: number
  contactPerson: string
  email: string
  phone: string
  location: string
  lastDelivery: string
  products: string[]
}

export default function COOSupplyPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [suppliers, setSuppliers] = useState<COOSupplier[]>([
    {
      id: 'SUP-001',
      name: 'Global Materials Corp',
      type: 'raw-materials',
      status: 'active',
      rating: 4.8,
      contractValue: '$2,500,000',
      deliveryTime: '3-5 days',
      qualityScore: 96,
      reliability: 98,
      contactPerson: 'Michael Roberts',
      email: 'michael.roberts@globalmaterials.com',
      phone: '+1-555-0101',
      location: 'Houston, TX',
      lastDelivery: '2024-02-14',
      products: ['Steel Components', 'Aluminum Parts', 'Copper Wiring']
    },
    {
      id: 'SUP-002',
      name: 'Tech Components Ltd',
      type: 'components',
      status: 'active',
      rating: 4.5,
      contractValue: '$1,800,000',
      deliveryTime: '5-7 days',
      qualityScore: 92,
      reliability: 95,
      contactPerson: 'Sarah Chen',
      email: 'sarah.chen@techcomponents.com',
      phone: '+1-555-0102',
      location: 'San Jose, CA',
      lastDelivery: '2024-02-13',
      products: ['Electronic Boards', 'Sensors', 'Microchips']
    },
    {
      id: 'SUP-003',
      name: 'Fast Logistics Inc',
      type: 'logistics',
      status: 'active',
      rating: 4.2,
      contractValue: '$750,000',
      deliveryTime: '1-2 days',
      qualityScore: 88,
      reliability: 92,
      contactPerson: 'David Kim',
      email: 'david.kim@fastlogistics.com',
      phone: '+1-555-0103',
      location: 'Chicago, IL',
      lastDelivery: '2024-02-15',
      products: ['Freight Services', 'Warehousing', 'Last Mile Delivery']
    },
    {
      id: 'SUP-004',
      name: 'Industrial Equipment Co',
      type: 'equipment',
      status: 'under-review',
      rating: 3.8,
      contractValue: '$1,200,000',
      deliveryTime: '10-14 days',
      qualityScore: 85,
      reliability: 78,
      contactPerson: 'Emily Davis',
      email: 'emily.davis@industrial.com',
      phone: '+1-555-0104',
      location: 'Detroit, MI',
      lastDelivery: '2024-02-08',
      products: ['Machinery', 'Tools', 'Safety Equipment']
    },
    {
      id: 'SUP-005',
      name: 'Professional Services Group',
      type: 'services',
      status: 'active',
      rating: 4.6,
      contractValue: '$450,000',
      deliveryTime: 'On-demand',
      qualityScore: 94,
      reliability: 96,
      contactPerson: 'Alex Thompson',
      email: 'alex.thompson@proservices.com',
      phone: '+1-555-0105',
      location: 'Boston, MA',
      lastDelivery: '2024-02-12',
      products: ['Consulting', 'Maintenance', 'Training']
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

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || supplier.type === filterType
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      case 'under-review': return 'bg-yellow-100 text-yellow-700'
      case 'terminated': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'raw-materials': return 'bg-blue-100 text-blue-700'
      case 'components': return 'bg-purple-100 text-purple-700'
      case 'services': return 'bg-green-100 text-green-700'
      case 'logistics': return 'bg-orange-100 text-orange-700'
      case 'equipment': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const supplierTypes = Array.from(new Set(suppliers.map(supplier => supplier.type)))

  const totalContractValue = suppliers.reduce((sum, supplier) => {
    return sum + parseFloat(supplier.contractValue.replace(/[$,]/g, ''))
  }, 0)

  const avgRating = suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length
  const avgReliability = suppliers.reduce((sum, supplier) => sum + supplier.reliability, 0) / suppliers.length

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
        title="COO Supply Chain Management - Annita"
        description="COO supply chain management and supplier relationships"
        keywords={['coo', 'supply chain', 'suppliers', 'logistics', 'procurement']}
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
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Supply Chain Management</h1>
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
          {/* Supply Chain Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Suppliers</h3>
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
              <p className="text-sm text-gray-500">Active partnerships</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contract Value</h3>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalContractValue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Total contracts</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Rating</h3>
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <p className={`text-2xl font-bold ${getRatingColor(avgRating)}`}>{avgRating.toFixed(1)}</p>
              <p className="text-sm text-gray-500">Supplier performance</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reliability</h3>
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{avgReliability.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">On-time delivery</p>
            </div>
          </div>

          {/* Suppliers List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Supplier Network</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search suppliers..."
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
                  {supplierTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="under-review">Under Review</option>
                  <option value="terminated">Terminated</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredSuppliers.map((supplier) => (
                <div key={supplier.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{supplier.name}</h3>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                          {supplier.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(supplier.type)}`}>
                          {supplier.type.charAt(0).toUpperCase() + supplier.type.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">{supplier.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getRatingColor(supplier.rating)}`}>
                        {supplier.rating} ⭐
                      </p>
                      <p className="text-sm text-gray-500">Rating</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Contract Value</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.contractValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Time</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.deliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quality Score</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.qualityScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reliability</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.reliability}%</p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Quality</span>
                        <span className="text-xs font-medium text-gray-900">{supplier.qualityScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-green-500"
                          style={{ width: `${supplier.qualityScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Reliability</span>
                        <span className="text-xs font-medium text-gray-900">{supplier.reliability}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-blue-500"
                          style={{ width: `${supplier.reliability}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Rating</span>
                        <span className="text-xs font-medium text-gray-900">{supplier.rating}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-purple-500"
                          style={{ width: `${(supplier.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Products/Services</h4>
                    <div className="flex flex-wrap gap-1">
                      {supplier.products.map((product, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Contact: {supplier.contactPerson} • {supplier.email}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Supply Chain Management Section */}
          <div className="mt-8">
            <SupplyChainManagement />
          </div>
        </main>
      </div>
    </>
  )
}
