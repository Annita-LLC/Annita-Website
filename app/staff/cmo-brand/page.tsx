'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Palette, Shield, TrendingUp, Search, Filter, Download, Eye, Upload, LogOut } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import BrandManagement from '@/components/staff/BrandManagement'

interface CMOBrandAsset {
  id: string
  name: string
  type: 'logo' | 'guidelines' | 'template' | 'image' | 'video' | 'presentation'
  category: string
  description: string
  fileUrl: string
  fileSize: string
  format: string
  uploadDate: string
  lastModified: string
  downloads: number
  status: 'active' | 'archived' | 'pending'
  access: 'public' | 'internal' | 'restricted'
}

export default function CMOBrandPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [brandAssets, setBrandAssets] = useState<CMOBrandAsset[]>([
    {
      id: 'BRD-001',
      name: 'Primary Logo - Full Color',
      type: 'logo',
      category: 'Logos',
      description: 'Official company logo in full color version',
      fileUrl: '/assets/logo-primary-color.svg',
      fileSize: '245 KB',
      format: 'SVG',
      uploadDate: '2024-01-15',
      lastModified: '2024-02-10',
      downloads: 156,
      status: 'active',
      access: 'public'
    },
    {
      id: 'BRD-002',
      name: 'Brand Guidelines 2024',
      type: 'guidelines',
      category: 'Guidelines',
      description: 'Complete brand identity guidelines and usage rules',
      fileUrl: '/assets/brand-guidelines-2024.pdf',
      fileSize: '8.4 MB',
      format: 'PDF',
      uploadDate: '2024-01-20',
      lastModified: '2024-02-01',
      downloads: 89,
      status: 'active',
      access: 'internal'
    },
    {
      id: 'BRD-003',
      name: 'PowerPoint Template',
      type: 'template',
      category: 'Templates',
      description: 'Official company presentation template',
      fileUrl: '/assets/ppt-template.pptx',
      fileSize: '12.1 MB',
      format: 'PPTX',
      uploadDate: '2024-01-25',
      lastModified: '2024-02-05',
      downloads: 67,
      status: 'active',
      access: 'internal'
    },
    {
      id: 'BRD-004',
      name: 'Product Photography Pack',
      type: 'image',
      category: 'Images',
      description: 'High-quality product images for marketing use',
      fileUrl: '/assets/product-photos.zip',
      fileSize: '156 MB',
      format: 'ZIP',
      uploadDate: '2024-02-01',
      lastModified: '2024-02-08',
      downloads: 45,
      status: 'active',
      access: 'internal'
    },
    {
      id: 'BRD-005',
      name: 'Brand Video - 30 Second',
      type: 'video',
      category: 'Videos',
      description: 'Company brand video for social media and website',
      fileUrl: '/assets/brand-video-30s.mp4',
      fileSize: '45.2 MB',
      format: 'MP4',
      uploadDate: '2024-02-05',
      lastModified: '2024-02-12',
      downloads: 28,
      status: 'active',
      access: 'public'
    },
    {
      id: 'BRD-006',
      name: 'Email Newsletter Template',
      type: 'template',
      category: 'Templates',
      description: 'HTML template for email marketing campaigns',
      fileUrl: '/assets/email-template.html',
      fileSize: '125 KB',
      format: 'HTML',
      uploadDate: '2024-02-08',
      lastModified: '2024-02-14',
      downloads: 34,
      status: 'pending',
      access: 'internal'
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

  const filteredAssets = brandAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || asset.type === filterType
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'archived': return 'bg-gray-100 text-gray-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'logo': return 'bg-purple-100 text-purple-700'
      case 'guidelines': return 'bg-blue-100 text-blue-700'
      case 'template': return 'bg-green-100 text-green-700'
      case 'image': return 'bg-orange-100 text-orange-700'
      case 'video': return 'bg-pink-100 text-pink-700'
      case 'presentation': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'public': return 'bg-green-100 text-green-700'
      case 'internal': return 'bg-yellow-100 text-yellow-700'
      case 'restricted': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const assetTypes = Array.from(new Set(brandAssets.map(asset => asset.type)))
  const categories = Array.from(new Set(brandAssets.map(asset => asset.category)))

  const totalDownloads = brandAssets.reduce((sum, asset) => sum + asset.downloads, 0)
  const activeAssets = brandAssets.filter(asset => asset.status === 'active').length
  const totalSize = brandAssets.reduce((sum, asset) => {
    const size = parseFloat(asset.fileSize.replace(/[^0-9.]/g, ''))
    const unit = asset.fileSize.match(/[A-Z]/i)?.[0]
    return sum + (unit === 'GB' ? size * 1024 : unit === 'MB' ? size : size / 1024)
  }, 0)

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
        title="CMO Brand Management - Annita"
        description="CMO brand assets and identity management"
        keywords={['cmo', 'brand', 'assets', 'identity', 'guidelines']}
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
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Brand Management</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload Asset</span>
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
          {/* Brand Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Assets</h3>
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{brandAssets.length}</p>
              <p className="text-sm text-gray-500">Brand assets</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Assets</h3>
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeAssets}</p>
              <p className="text-sm text-gray-500">Currently available</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Downloads</h3>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
              <p className="text-sm text-gray-500">Asset downloads</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Storage Used</h3>
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{(totalSize / 1024).toFixed(1)} GB</p>
              <p className="text-sm text-gray-500">Total storage</p>
            </div>
          </div>

          {/* Brand Assets */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Brand Assets</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search assets..."
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
                  {assetTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="archived">Archived</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{asset.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{asset.description}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                          {asset.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(asset.type)}`}>
                          {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(asset.access)}`}>
                          {asset.access}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Format</p>
                      <p className="text-sm font-medium text-gray-900">{asset.format}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="text-sm font-medium text-gray-900">{asset.fileSize}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Downloads</p>
                      <p className="text-sm font-medium text-gray-900">{asset.downloads}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="text-sm text-gray-900">{asset.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Uploaded: {asset.uploadDate}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No brand assets found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Brand Management Section */}
          <div className="mt-8">
            <BrandManagement />
          </div>
        </main>
      </div>
    </>
  )
}
