'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, Eye, EyeOff, AlertCircle, Hash, Shield } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import EmployeeProfileSetup from '@/components/staff/EmployeeProfileSetup'

interface EmployeeProfile {
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  role: string
  reportsTo: string
  hireDate: string
  location: string
  emergencyContact: string
  emergencyPhone: string
}

export default function StaffLoginPage() {
  const [employeeId, setEmployeeId] = useState('')
  const [secretPin, setSecretPin] = useState('')
  const [role, setRole] = useState('employee')
  const [department, setDepartment] = useState('')
  const [reportsTo, setReportsTo] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [pendingAuth, setPendingAuth] = useState<{ employeeId: string; role: string; department: string; reportsTo: string } | null>(null)
  const router = useRouter()

  const isCLevel = role === 'ceo' || role === 'cfo' || role === 'cmo' || role === 'coo'

  const departments = [
    'Executive Management',
    'Finance & Accounting',
    'Marketing & Sales',
    'Operations',
    'Human Resources',
    'IT & Technology',
    'Legal & Compliance',
    'Research & Development',
    'Customer Service',
    'Administration'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Placeholder validation - replace with actual authentication
      if (employeeId && secretPin && role) {
        // For non-executives, validate department and reports to
        if (!isCLevel) {
          if (!department || !reportsTo) {
            setError('Please select your department and specify who you report to')
            setIsLoading(false)
            return
          }
        }
        
        if (isCLevel) {
          // C-level executives get direct access
          localStorage.setItem('staff-authenticated', 'true')
          localStorage.setItem('staff-employee-id', employeeId)
          localStorage.setItem('staff-role', role)
          
          // Redirect to role-specific dashboard
          switch (role) {
            case 'ceo':
              router.push('/staff/ceo-dashboard')
              break
            case 'cfo':
              router.push('/staff/cfo-dashboard')
              break
            case 'cmo':
              router.push('/staff/cmo-dashboard')
              break
            case 'coo':
              router.push('/staff/coo-dashboard')
              break
            default:
              router.push('/staff/employee-dashboard')
          }
        } else {
          // Regular employees need to complete profile setup
          setPendingAuth({ employeeId, role, department, reportsTo })
          setShowProfileSetup(true)
        }
      } else {
        setError('Please fill in all required fields')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileComplete = (profile: EmployeeProfile) => {
    // Store profile information
    localStorage.setItem('employee-profile', JSON.stringify(profile))
    
    // Clear incomplete profile flags
    localStorage.removeItem('profile-incomplete')
    localStorage.removeItem('profile-skip-time')
    
    // Complete authentication
    if (pendingAuth) {
      localStorage.setItem('staff-authenticated', 'true')
      localStorage.setItem('staff-employee-id', pendingAuth.employeeId)
      localStorage.setItem('staff-role', pendingAuth.role)
      
      // Redirect to role-specific dashboard
      switch (pendingAuth.role) {
        case 'ceo':
          router.push('/staff/ceo-dashboard')
          break
        case 'cfo':
          router.push('/staff/cfo-dashboard')
          break
        case 'cmo':
          router.push('/staff/cmo-dashboard')
          break
        case 'coo':
          router.push('/staff/coo-dashboard')
          break
        case 'hr':
          router.push('/staff/hr-dashboard')
          break
        case 'manager':
          router.push('/staff/manager-dashboard')
          break
        case 'employee':
          router.push('/staff/employee-dashboard')
          break
        default:
          router.push('/staff/employee-dashboard')
      }
    }
  }

  const handleProfileSkip = () => {
    // Store incomplete profile flag
    localStorage.setItem('profile-incomplete', 'true')
    localStorage.setItem('profile-skip-time', Date.now().toString())
    
    // Complete authentication but mark profile as incomplete
    if (pendingAuth) {
      localStorage.setItem('staff-authenticated', 'true')
      localStorage.setItem('staff-employee-id', pendingAuth.employeeId)
      localStorage.setItem('staff-role', pendingAuth.role)
      
      // Redirect to restricted dashboard
      switch (pendingAuth.role) {
        case 'hr':
          router.push('/staff/hr-dashboard?restricted=true')
          break
        case 'manager':
          router.push('/staff/manager-dashboard?restricted=true')
          break
        case 'employee':
          router.push('/staff/employee-dashboard?restricted=true')
          break
        default:
          router.push('/staff/employee-dashboard?restricted=true')
      }
    }
  }

  const handleProfileCancel = () => {
    setShowProfileSetup(false)
    setPendingAuth(null)
    setIsLoading(false)
  }

  return (
    <>
      <SEOHead
        title="Staff Login - Annita"
        description="Staff login portal for Annita employees"
        keywords={['staff', 'login', 'employee', 'portal']}
        noIndex={true}
        noFollow={true}
      />
      
      {showProfileSetup ? (
        <EmployeeProfileSetup
          onProfileComplete={handleProfileComplete}
          onCancel={handleProfileCancel}
          onSkip={handleProfileSkip}
          initialData={pendingAuth ? {
            department: pendingAuth.department,
            reportsTo: pendingAuth.reportsTo
          } : undefined}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8 sm:py-12 pt-20 sm:pt-24">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Staff Portal</h1>
              <p className="text-gray-400">
                {isCLevel ? 'Executive Access' : 'Employee Login'}
              </p>
              {isCLevel && (
                <div className="mt-2 p-2 bg-purple-900/30 rounded-lg border border-purple-700/50">
                  <p className="text-xs text-purple-300">Direct access for C-level executives</p>
                </div>
              )}
            </div>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Employee ID Field */}
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300 mb-2">
                    Employee ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="employeeId"
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                      required
                      className="block w-full pl-10 pr-3 py-3 text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all uppercase"
                      placeholder="EMP001"
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Secret PIN Field */}
                <div>
                  <label htmlFor="secretPin" className="block text-sm font-medium text-gray-300 mb-2">
                    Secret PIN
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="secretPin"
                      type={showPassword ? 'text' : 'password'}
                      value={secretPin}
                      onChange={(e) => setSecretPin(e.target.value)}
                      required
                      maxLength={6}
                      className="block w-full pl-10 pr-12 py-3 text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="••••••"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Role Selector */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="block w-full pl-10 pr-10 py-3 text-base bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      disabled={isLoading}
                    >
                      <option value="employee" className="bg-gray-800 text-white">Employee</option>
                      <option value="manager" className="bg-gray-800 text-white">Manager</option>
                      <option value="hr" className="bg-gray-800 text-white">HR</option>
                      <option value="cfo" className="bg-gray-800 text-white">CFO (Chief Financial Officer)</option>
                      <option value="cmo" className="bg-gray-800 text-white">CMO (Chief Marketing Officer)</option>
                      <option value="coo" className="bg-gray-800 text-white">COO (Chief Operating Officer)</option>
                      <option value="ceo" className="bg-gray-800 text-white">CEO (Chief Executive Officer)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Department Field - Only for non-executives */}
                {!isCLevel && (
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-2">
                      Department <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required={!isCLevel}
                        className="block w-full pl-10 pr-10 py-3 text-base bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="" className="bg-gray-800 text-white">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept} className="bg-gray-800 text-white">{dept}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reports To Field - Only for non-executives */}
                {!isCLevel && (
                  <div>
                    <label htmlFor="reportsTo" className="block text-sm font-medium text-gray-300 mb-2">
                      Reports To <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="reportsTo"
                        type="text"
                        value={reportsTo}
                        onChange={(e) => setReportsTo(e.target.value)}
                        required={!isCLevel}
                        className="block w-full pl-10 pr-3 py-3 text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Manager name or position"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg text-base font-semibold hover:from-orange-600 hover:to-red-600 active:from-orange-700 active:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? 'Signing in...' : (isCLevel ? 'Access Executive Portal' : 'Sign In & Complete Profile')}
                </button>
              </form>

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  {isCLevel ? 'Executive access verified' : 'Profile setup required for employees'}
                </p>
              </div>
            </div>

            {/* Additional Links */}
            <div className="mt-8 text-center space-y-3">
              <button
                onClick={() => router.push('/staff/register')}
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
              >
                Create Account
              </button>
              <div>
                <button
                  onClick={() => router.push('/')}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

