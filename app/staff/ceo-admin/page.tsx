'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Users, Settings, Database, AlertTriangle, Search, Filter, Download, LogOut, Crown, Lock, Unlock, Eye, EyeOff, Trash2, Edit } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import CEODecisionModal from '@/components/staff/modals/CEODecisionModal'
import AdminPanel from '@/components/staff/AdminPanel'
import BoardMeetings from '@/components/staff/BoardMeetings'
import StrategicPlanning from '@/components/staff/StrategicPlanning'
import InvestorRelations from '@/components/staff/InvestorRelations'
import MarketAnalysis from '@/components/staff/MarketAnalysis'
import AssetManagement from '@/components/staff/AssetManagement'
import ContractManagement from '@/components/staff/ContractManagement'

interface SystemUser {
  id: string
  employeeId: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  permissions: string[]
  accessLevel: 'full' | 'limited' | 'read-only'
}

interface SystemModule {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'maintenance'
  users: number
  lastUpdated: string
  permissions: string[]
}

export default function CEOAdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState<'users' | 'modules' | 'permissions' | 'system'>('users')
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null)

  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    {
      id: 'USR-001',
      employeeId: 'E1001',
      name: 'John Smith',
      email: 'john.smith@annita.com',
      role: 'ceo',
      department: 'Executive',
      status: 'active',
      lastLogin: '2024-02-20 09:00 AM',
      permissions: ['full_system_access', 'user_management', 'system_configuration'],
      accessLevel: 'full'
    },
    {
      id: 'USR-002',
      employeeId: 'E1002',
      name: 'Sarah Chen',
      email: 'sarah.chen@annita.com',
      role: 'cfo',
      department: 'Finance',
      status: 'active',
      lastLogin: '2024-02-20 08:30 AM',
      permissions: ['financial_access', 'reporting', 'budget_management'],
      accessLevel: 'limited'
    },
    {
      id: 'USR-003',
      employeeId: 'E1003',
      name: 'Mike Johnson',
      email: 'mike.johnson@annita.com',
      role: 'cmo',
      department: 'Marketing',
      status: 'active',
      lastLogin: '2024-02-20 09:15 AM',
      permissions: ['marketing_access', 'campaign_management', 'analytics'],
      accessLevel: 'limited'
    },
    {
      id: 'USR-004',
      employeeId: 'E1004',
      name: 'Emily Davis',
      email: 'emily.davis@annita.com',
      role: 'coo',
      department: 'Operations',
      status: 'active',
      lastLogin: '2024-02-20 08:45 AM',
      permissions: ['operations_access', 'project_management', 'team_management'],
      accessLevel: 'limited'
    },
    {
      id: 'USR-005',
      employeeId: 'E1005',
      name: 'Alex Thompson',
      email: 'alex.thompson@annita.com',
      role: 'hr',
      department: 'Human Resources',
      status: 'active',
      lastLogin: '2024-02-20 09:30 AM',
      permissions: ['hr_access', 'employee_management', 'recruitment'],
      accessLevel: 'limited'
    },
    {
      id: 'USR-006',
      employeeId: 'E1006',
      name: 'Lisa Wang',
      email: 'lisa.wang@annita.com',
      role: 'manager',
      department: 'Engineering',
      status: 'inactive',
      lastLogin: '2024-02-15 05:00 PM',
      permissions: ['team_management', 'performance_review'],
      accessLevel: 'limited'
    }
  ])

  const [systemModules, setSystemModules] = useState<SystemModule[]>([
    {
      id: 'MOD-001',
      name: 'User Management',
      description: 'Complete user administration and access control',
      status: 'active',
      users: 45,
      lastUpdated: '2024-02-20',
      permissions: ['create_users', 'edit_users', 'delete_users', 'manage_permissions']
    },
    {
      id: 'MOD-002',
      name: 'Financial System',
      description: 'Financial management and reporting',
      status: 'active',
      users: 12,
      lastUpdated: '2024-02-19',
      permissions: ['view_financials', 'manage_budget', 'generate_reports']
    },
    {
      id: 'MOD-003',
      name: 'Marketing Platform',
      description: 'Marketing campaigns and analytics',
      status: 'active',
      users: 18,
      lastUpdated: '2024-02-18',
      permissions: ['campaign_management', 'analytics', 'content_management']
    },
    {
      id: 'MOD-004',
      name: 'Operations Dashboard',
      description: 'Operations management and monitoring',
      status: 'active',
      users: 25,
      lastUpdated: '2024-02-20',
      permissions: ['project_management', 'team_management', 'resource_allocation']
    },
    {
      id: 'MOD-005',
      name: 'HR Portal',
      description: 'Human resources management',
      status: 'active',
      users: 8,
      lastUpdated: '2024-02-17',
      permissions: ['employee_management', 'recruitment', 'benefits_admin']
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem('staff-authenticated')
    const role = localStorage.getItem('staff-role')
    const empId = localStorage.getItem('staff-employee-id')
    
    if (auth === 'true' && role === 'ceo') {
      setIsAuthenticated(true)
      setUserRole('ceo')
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

  const handleUserAction = (user: SystemUser, action: 'approve' | 'reject' | 'suspend' | 'activate') => {
    setSelectedUser(user)
    setIsDecisionModalOpen(true)
  }

  const handleDecision = (decision: any) => {
    // Handle the decision logic here
    console.log('Decision made:', decision, 'for user:', selectedUser)
    setIsDecisionModalOpen(false)
    setSelectedUser(null)
  }

  const userToRequest = (user: SystemUser | null) => {
    if (!user) return null
    return {
      id: user.id,
      title: `User Action: ${user.name}`,
      description: `Action requested for user ${user.name} from ${user.department}`,
      amount: user.status,
      department: user.department,
      priority: (user.accessLevel === 'full' ? 'urgent' : 'medium') as 'urgent' | 'medium' | 'low' | 'high',
      submittedBy: 'CEO',
      submittedDate: new Date().toISOString().split('T')[0]
    }
  }

  const filteredUsers = systemUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      case 'suspended': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'full': return 'bg-purple-100 text-purple-700'
      case 'limited': return 'bg-blue-100 text-blue-700'
      case 'read-only': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const roles = Array.from(new Set(systemUsers.map(user => user.role)))

  const activeUsers = systemUsers.filter(u => u.status === 'active').length
  const totalUsers = systemUsers.length
  const activeModules = systemModules.filter(m => m.status === 'active').length
  const totalModules = systemModules.length

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
        title="CEO Admin Panel - Annita"
        description="CEO super admin panel with full system control"
        keywords={['ceo', 'admin', 'super', 'control', 'management']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/staff/ceo-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">System Administration</h1>
                    <p className="text-sm text-gray-500">ID: {employeeId} | Super Admin</p>
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
          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-sm text-gray-500">System users</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
                <Crown className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              <p className="text-sm text-gray-500">Currently active</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">System Modules</h3>
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalModules}</p>
              <p className="text-sm text-gray-500">Total modules</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Modules</h3>
                <Database className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeModules}</p>
              <p className="text-sm text-gray-500">Running modules</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex space-x-8 px-6 pt-6">
              <button
                onClick={() => setActiveTab('users')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('modules')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'modules'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                System Modules
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'permissions'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Permissions
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'system'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                System Settings
              </button>
            </div>
          </div>

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Roles</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role.toUpperCase()}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>

                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                    Add User
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{user.email} • {user.employeeId}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(user.accessLevel)}`}>
                            {user.accessLevel.replace('-', ' ')} access
                          </span>
                          <span className="text-xs text-gray-500">{user.role.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">{user.lastLogin}</p>
                        <p className="text-sm text-gray-500">Last login</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="text-sm font-medium text-gray-900">{user.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Access Level</p>
                        <p className="text-sm text-gray-900">{user.accessLevel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Permissions</p>
                        <p className="text-sm text-gray-900">{user.permissions.length} permissions</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        User ID: {user.id}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 text-yellow-600 hover:text-yellow-700 text-sm">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        {user.status === 'active' ? (
                          <button className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:text-red-700 text-sm">
                            <Lock className="w-4 h-4" />
                            <span>Suspend</span>
                          </button>
                        ) : (
                          <button className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:text-green-700 text-sm">
                            <Unlock className="w-4 h-4" />
                            <span>Activate</span>
                          </button>
                        )}
                        <button className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:text-red-700 text-sm">
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Modules Tab */}
          {activeTab === 'modules' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">System Modules</h2>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  Configure Module
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {systemModules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{module.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                          {module.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{module.users}</p>
                        <p className="text-sm text-gray-500">Users</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-sm text-gray-900">{module.lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Permissions</p>
                        <p className="text-sm text-gray-900">{module.permissions.length}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Module Permissions</h4>
                      <div className="flex flex-wrap gap-1">
                        {module.permissions.map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Module ID: {module.id}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Configure
                        </button>
                        {module.status === 'active' ? (
                          <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                            Disable
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Enable
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Global Permissions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 mb-4">System Permissions</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">User Management</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">System Configuration</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Database Access</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">API Management</span>
                    </label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 mb-4">Role-Based Permissions</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">CEO Full Access</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">CFO Financial Access</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">CMO Marketing Access</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">COO Operations Access</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  Save Permissions
                </button>
              </div>
            </div>
          )}

          {/* System Settings Tab */}
          {activeTab === 'system' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">System Settings</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Require 2FA for all users</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Session Timeout</p>
                        <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                      </div>
                      <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 mb-4">System Maintenance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
                        <p className="text-sm text-gray-500">Put system in maintenance mode</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Backup Schedule</p>
                        <p className="text-sm text-gray-500">Automated daily backups</p>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Reset to Defaults
                  </button>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admin Panel Section */}
          <div className="mt-8">
            <AdminPanel userRole="ceo" />
          </div>

          {/* Board Meetings Section */}
          <div className="mt-8">
            <BoardMeetings userRole="ceo" />
          </div>

          {/* Strategic Planning Section */}
          <div className="mt-8">
            <StrategicPlanning userRole="ceo" />
          </div>

          {/* Investor Relations Section */}
          <div className="mt-8">
            <InvestorRelations userRole="ceo" />
          </div>

          {/* Market Analysis Section */}
          <div className="mt-8">
            <MarketAnalysis userRole="ceo" />
          </div>

          {/* Asset Management Section */}
          <div className="mt-8">
            <AssetManagement />
          </div>

          {/* Contract Management Section */}
          <div className="mt-8">
            <ContractManagement />
          </div>
        </main>

        {/* CEO Decision Modal */}
        <CEODecisionModal
          isOpen={isDecisionModalOpen}
          onClose={() => setIsDecisionModalOpen(false)}
          onSubmit={handleDecision}
          request={userToRequest(selectedUser) || undefined}
        />
      </div>
    </>
  )
}
