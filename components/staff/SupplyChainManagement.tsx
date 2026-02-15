'use client'

import { useState } from 'react'
import { Truck, Package, MapPin, Clock, TrendingUp, AlertTriangle, CheckCircle, DollarSign, BarChart3, Users, Plus, Search, Filter } from 'lucide-react'

interface SupplyChainMetric {
  id: string
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: React.ReactNode
}

interface Supplier {
  id: string
  name: string
  category: 'raw-materials' | 'packaging' | 'equipment' | 'services' | 'logistics'
  status: 'active' | 'pending' | 'suspended' | 'terminated'
  location: string
  rating: number
  onTimeDelivery: number
  qualityScore: number
  lastDelivery: string
  contractValue: number
  leadTime: number
}

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  location: string
  lastUpdated: string
  turnoverRate: number
  supplier: string
}

interface Shipment {
  id: string
  trackingNumber: string
  supplier: string
  status: 'ordered' | 'in-transit' | 'delivered' | 'delayed' | 'cancelled'
  origin: string
  destination: string
  estimatedArrival: string
  actualArrival?: string
  items: {
    name: string
    quantity: number
    value: number
  }[]
  totalValue: number
}

export default function SupplyChainManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'suppliers' | 'inventory' | 'shipments'>('overview')
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)

  const metrics: SupplyChainMetric[] = [
    {
      id: '1',
      title: 'On-Time Delivery',
      value: '94.2%',
      change: 2.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Clock className="w-6 h-6" />
    },
    {
      id: '2',
      title: 'Inventory Turnover',
      value: '8.5x',
      change: 1.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Package className="w-6 h-6" />
    },
    {
      id: '3',
      title: 'Supply Chain Cost',
      value: '$2.4M',
      change: -5.8,
      changeType: 'decrease',
      period: 'vs last month',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: '4',
      title: 'Active Suppliers',
      value: '156',
      change: 12,
      changeType: 'increase',
      period: 'vs last month',
      icon: <Users className="w-6 h-6" />
    }
  ]

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Global Materials Corp',
      category: 'raw-materials',
      status: 'active',
      location: 'Germany',
      rating: 4.8,
      onTimeDelivery: 96,
      qualityScore: 94,
      lastDelivery: '2024-02-12',
      contractValue: 850000,
      leadTime: 14
    },
    {
      id: '2',
      name: 'Packaging Solutions Ltd',
      category: 'packaging',
      status: 'active',
      location: 'USA',
      rating: 4.6,
      onTimeDelivery: 98,
      qualityScore: 92,
      lastDelivery: '2024-02-10',
      contractValue: 420000,
      leadTime: 7
    },
    {
      id: '3',
      name: 'Tech Equipment Inc',
      category: 'equipment',
      status: 'pending',
      location: 'Japan',
      rating: 0,
      onTimeDelivery: 0,
      qualityScore: 0,
      lastDelivery: '',
      contractValue: 1250000,
      leadTime: 21
    }
  ]

  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Steel Alloy Sheets',
      sku: 'STL-001-50MM',
      category: 'Raw Materials',
      currentStock: 2500,
      minStock: 1000,
      maxStock: 5000,
      unit: 'sheets',
      location: 'Warehouse A',
      lastUpdated: '2024-02-15',
      turnoverRate: 12,
      supplier: 'Global Materials Corp'
    },
    {
      id: '2',
      name: 'Packaging Boxes',
      sku: 'PKG-002-LARGE',
      category: 'Packaging',
      currentStock: 15000,
      minStock: 5000,
      maxStock: 20000,
      unit: 'boxes',
      location: 'Warehouse B',
      lastUpdated: '2024-02-14',
      turnoverRate: 25,
      supplier: 'Packaging Solutions Ltd'
    },
    {
      id: '3',
      name: 'Circuit Boards',
      sku: 'ELE-003-V2',
      category: 'Electronics',
      currentStock: 800,
      minStock: 500,
      maxStock: 2000,
      unit: 'units',
      location: 'Warehouse C',
      lastUpdated: '2024-02-13',
      turnoverRate: 8,
      supplier: 'Tech Components Inc'
    }
  ]

  const shipments: Shipment[] = [
    {
      id: '1',
      trackingNumber: 'SH-2024-00123',
      supplier: 'Global Materials Corp',
      status: 'in-transit',
      origin: 'Hamburg, Germany',
      destination: 'Los Angeles, USA',
      estimatedArrival: '2024-02-18',
      items: [
        { name: 'Steel Alloy Sheets', quantity: 1000, value: 15000 },
        { name: 'Aluminum Rods', quantity: 500, value: 7500 }
      ],
      totalValue: 22500
    },
    {
      id: '2',
      trackingNumber: 'SH-2024-00124',
      supplier: 'Packaging Solutions Ltd',
      status: 'delivered',
      origin: 'Chicago, USA',
      destination: 'Los Angeles, USA',
      estimatedArrival: '2024-02-12',
      actualArrival: '2024-02-11',
      items: [
        { name: 'Packaging Boxes', quantity: 5000, value: 2500 },
        { name: 'Labels', quantity: 10000, value: 1000 }
      ],
      totalValue: 3500
    },
    {
      id: '3',
      trackingNumber: 'SH-2024-00125',
      supplier: 'Tech Equipment Inc',
      status: 'delayed',
      origin: 'Tokyo, Japan',
      destination: 'Los Angeles, USA',
      estimatedArrival: '2024-02-20',
      items: [
        { name: 'Assembly Robots', quantity: 2, value: 250000 },
        { name: 'Control Systems', quantity: 5, value: 75000 }
      ],
      totalValue: 325000
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'suppliers', label: 'Suppliers', icon: <Users className="w-4 h-4" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="w-4 h-4" /> },
    { id: 'shipments', label: 'Shipments', icon: <Truck className="w-4 h-4" /> }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'suspended': return 'bg-red-100 text-red-700'
      case 'terminated': return 'bg-gray-100 text-gray-700'
      case 'in-transit': return 'bg-blue-100 text-blue-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'delayed': return 'bg-red-100 text-red-700'
      case 'cancelled': return 'bg-gray-100 text-gray-700'
      case 'ordered': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStockStatus = (current: number, min: number, max: number) => {
    if (current <= min) return { color: 'bg-red-100 text-red-700', status: 'Low Stock' }
    if (current >= max) return { color: 'bg-yellow-100 text-yellow-700', status: 'Overstock' }
    return { color: 'bg-green-100 text-green-700', status: 'Optimal' }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Supply Chain Management</h2>
              <p className="text-sm text-gray-600">Manage suppliers, inventory, and logistics operations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Order</span>
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
                  ? 'bg-white text-blue-600 shadow-sm'
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
                <div key={metric.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Supply Chain Alerts</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                        <p className="text-xs text-gray-500">Steel Alloy Sheets below minimum threshold</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Delayed Shipment</p>
                        <p className="text-xs text-gray-500">Tech Equipment Inc shipment delayed by 2 days</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">On-Time Delivery</p>
                        <p className="text-xs text-gray-500">95% of suppliers meeting delivery targets</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Suppliers</h3>
                <div className="space-y-4">
                  {suppliers.filter(s => s.status === 'active').slice(0, 3).map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                          <p className="text-xs text-gray-500">{supplier.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{supplier.rating}/5</p>
                        <p className="text-xs text-gray-500">rating</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Supplier Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search suppliers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Categories</option>
                  <option>Raw Materials</option>
                  <option>Packaging</option>
                  <option>Equipment</option>
                  <option>Services</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Supplier</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        supplier.status === 'active' ? 'bg-green-100 text-green-600' :
                        supplier.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{supplier.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                            {supplier.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{supplier.category.replace('-', ' ')}</span>
                          <span>•</span>
                          <span>{supplier.location}</span>
                          <span>•</span>
                          <span>{supplier.leadTime} day lead time</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedSupplier(selectedSupplier === supplier.id ? null : supplier.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Performance Rating</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-gray-900">
                          {supplier.rating > 0 ? `${supplier.rating}/5` : 'Pending'}
                        </p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-4 h-4 ${
                                star <= supplier.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">On-Time Delivery</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {supplier.onTimeDelivery > 0 ? `${supplier.onTimeDelivery}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quality Score</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {supplier.qualityScore > 0 ? `${supplier.qualityScore}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contract Value</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${supplier.contractValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {selectedSupplier === supplier.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Supplier Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Performance Metrics</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Delivery:</span>
                              <span className="font-medium">{supplier.lastDelivery || 'No deliveries yet'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Lead Time:</span>
                              <span className="font-medium">{supplier.leadTime} days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Quality Score:</span>
                              <span className="font-medium">{supplier.qualityScore}%</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium">{supplier.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category:</span>
                              <span className="font-medium capitalize">{supplier.category.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(supplier.status)}`}>
                                {supplier.status}
                              </span>
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
                        <span>View Analytics</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Package className="w-4 h-4" />
                        <span>Order History</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Contact</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>Performance Review</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Inventory Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Locations</option>
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                  <option>Warehouse C</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {inventoryItems.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.minStock, item.maxStock)
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            {stockStatus.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>SKU: {item.sku}</span>
                          <span>•</span>
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{item.currentStock.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{item.unit}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Stock Levels</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-900">{item.currentStock.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Current</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.minStock.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Min</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.maxStock.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Max</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Stock Level</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.currentStock <= item.minStock ? 'bg-red-500' :
                              item.currentStock >= item.maxStock ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {((item.currentStock / item.maxStock) * 100).toFixed(0)}% of max capacity
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Turnover Rate</p>
                        <p className="text-lg font-semibold text-gray-900">{item.turnoverRate}x</p>
                        <p className="text-xs text-gray-500">per year</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Updated</p>
                        <p className="text-sm font-medium text-gray-900">{item.lastUpdated}</p>
                        <p className="text-xs text-gray-500">{item.supplier}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <BarChart3 className="w-4 h-4" />
                          <span>View History</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                          <Package className="w-4 h-4" />
                          <span>Stock Adjustment</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                          <TrendingUp className="w-4 h-4" />
                          <span>Reorder Point</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Set Alert</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'shipments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Shipment Tracking</h3>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                  <option>Delayed</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Track Shipment</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {shipments.map((shipment) => (
                <div key={shipment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{shipment.trackingNumber}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                          {shipment.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{shipment.supplier}</span>
                        <span>•</span>
                        <span>{shipment.origin} → {shipment.destination}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${shipment.totalValue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">total value</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Timeline</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated:</span>
                          <span className="font-medium">{shipment.estimatedArrival}</span>
                        </div>
                        {shipment.actualArrival && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Actual:</span>
                            <span className="font-medium">{shipment.actualArrival}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Items ({shipment.items.length})</p>
                      <div className="space-y-1 text-sm max-h-20 overflow-y-auto">
                        {shipment.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-gray-600 truncate">{item.name}:</span>
                            <span className="font-medium">{item.quantity}</span>
                          </div>
                        ))}
                        {shipment.items.length > 3 && (
                          <div className="text-gray-500">+{shipment.items.length - 3} more items</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status Details</p>
                      <p className={`text-sm font-medium px-2 py-1 rounded-full text-center ${getStatusColor(shipment.status)}`}>
                        {shipment.status.replace('-', ' ').toUpperCase()}
                      </p>
                      {shipment.status === 'delayed' && (
                        <p className="text-xs text-red-600 mt-1">Check with carrier for updates</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>View Route</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Truck className="w-4 h-4" />
                        <span>Carrier Details</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>Update ETA</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        <Package className="w-4 h-4" />
                        <span>View Items</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
