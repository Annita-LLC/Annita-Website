'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Building2, Briefcase, Calendar, MapPin, FileText, CheckCircle2, Download, ArrowLeft, AlertCircle } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import { EmployeeIdValidator } from '@/components/staff/EmployeeIdValidator'

export default function StaffRegisterPage() {
  const [step, setStep] = useState<'form' | 'pending' | 'approved' | 'credentials'>('form')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    supervisorName: '',
    hireDate: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState<{ employeeId: string; secretCode: string } | null>(null)
  const router = useRouter()

  const departments = [
    'Executive Management',
    'Human Resources',
    'Finance & Accounting',
    'Sales & Marketing',
    'Operations',
    'IT & Technology',
    'Customer Service',
    'Legal & Compliance',
    'Research & Development',
    'Product Management',
    'Quality Assurance',
    'Supply Chain',
    'Business Development',
    'Administration',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'position', 'hireDate']
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])

      if (missingFields.length > 0) {
        setError('Please fill in all required fields')
        setIsLoading(false)
        return
      }

      // In production, this would submit to backend for approval
      // For demo, simulate approval process
      setStep('pending')
    } catch (err) {
      setError('Unable to submit registration. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = () => {
    // In production, this would be done by admin/HR
    // Generate unique credentials with better format
    const employeeId = EmployeeIdValidator.generateUniqueId()
    const secretCode = Math.floor(100000 + Math.random() * 900000).toString()

    setCredentials({ employeeId, secretCode })
    setStep('credentials')
  }

  const handleDownload = () => {
    if (!credentials) return

    const content = `Annita Staff Portal - New Account Credentials\n\nEmployee Information:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDepartment: ${formData.department}\nPosition: ${formData.position}\n\n---\n\nYour Login Credentials:\n\nEmployee ID: ${credentials.employeeId}\nSecret Code: ${credentials.secretCode}\n\n---\n\nImportant Instructions:\n1. Please keep these credentials secure and confidential\n2. You can change your secret code after first login in Profile Settings\n3. If you forget your credentials, use the "Forgot Credentials" option on the login page\n4. Login at: /staff/login\n\nGenerated: ${new Date().toLocaleString()}\n\n---\nAnnita LLC - Staff Portal\nWelcome to the team!`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `annita-credentials-${credentials.employeeId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <SEOHead
        title="Staff Registration - Annita"
        description="Register for a new staff account"
        keywords={['staff', 'register', 'signup', 'account']}
        noIndex={true}
        noFollow={true}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 lg:py-12 pt-16 sm:pt-20 lg:pt-24">
        <div className="w-full max-w-2xl">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Staff Registration</h1>
            <p className="text-sm text-gray-400">
              {step === 'form' && 'Request staff account'}
              {step === 'pending' && 'Registration pending'}
              {step === 'approved' && 'Registration approved'}
              {step === 'credentials' && 'Account created'}
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Staff Registration</h1>
            <p className="text-base text-gray-400">
              {step === 'form' && 'Fill in your details to request a staff account'}
              {step === 'pending' && 'Your registration is pending approval'}
              {step === 'approved' && 'Your registration has been approved'}
              {step === 'credentials' && 'Your account has been created'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-3 sm:p-4 lg:p-6 xl:p-8">
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white border-b border-white/20 pb-2">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          required
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          placeholder="John"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          required
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          placeholder="Doe"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          required
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          placeholder="john.doe@annita.com"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          required
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          placeholder="+231 77 123 4567"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-3">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                        placeholder="Monrovia, Liberia"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Employment Information */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white border-b border-white/20 pb-2">Employment Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="department" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Department <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <select
                          id="department"
                          value={formData.department}
                          onChange={(e) => updateFormData('department', e.target.value)}
                          required
                          className="block w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer touch-manipulation"
                          disabled={isLoading}
                        >
                          <option value="" className="bg-gray-800 text-white">Select Department</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept} className="bg-gray-800 text-white">{dept}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Position/Job Title <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="position"
                          type="text"
                          value={formData.position}
                          onChange={(e) => updateFormData('position', e.target.value)}
                          required
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          placeholder="Software Engineer"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="supervisorName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Supervisor/Manager Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="supervisorName"
                          type="text"
                          value={formData.supervisorName}
                          onChange={(e) => updateFormData('supervisorName', e.target.value)}
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          placeholder="Jane Smith"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hireDate" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Hire Date <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="hireDate"
                          type="date"
                          value={formData.hireDate}
                          onChange={(e) => updateFormData('hireDate', e.target.value)}
                          required
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white border-b border-white/20 pb-2">Emergency Contact</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="emergencyContact" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        id="emergencyContact"
                        type="text"
                        value={formData.emergencyContact}
                        onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                        className="block w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                        placeholder="Contact Name"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="emergencyPhone" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Emergency Contact Phone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          id="emergencyPhone"
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                          className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all touch-manipulation"
                          placeholder="+231 77 123 4567"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-semibold hover:from-orange-600 hover:to-red-600 active:from-orange-700 active:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg touch-manipulation"
                >
                  {isLoading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            )}

            {step === 'pending' && (
              <div className="space-y-6 text-center">
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6">
                  <FileText className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Registration Submitted</h3>
                  <p className="text-sm text-yellow-300 mb-4">
                    Your registration request has been submitted and is pending approval from HR/Admin.
                  </p>
                  <p className="text-xs text-gray-400">
                    You will receive an email notification once your account has been approved.
                  </p>
                </div>

                {/* Demo: Simulate approval for testing */}
                <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
                  <p className="text-xs text-blue-300 mb-3">
                    <strong>Demo Mode:</strong> Click the button below to simulate admin approval (for testing purposes only).
                  </p>
                  <button
                    onClick={handleApprove}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium touch-manipulation"
                  >
                    Simulate Approval
                  </button>
                </div>

                <button
                  onClick={() => router.push('/staff/login')}
                  className="text-sm text-gray-400 hover:text-white transition-colors touch-manipulation"
                >
                  Back to Login
                </button>
              </div>
            )}

            {step === 'credentials' && credentials && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-400">Account created successfully! Your credentials are ready.</p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 sm:p-6 space-y-4 border border-white/10">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Employee ID</label>
                    <p className="text-lg sm:text-xl font-bold text-white font-mono">{credentials.employeeId}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Secret Code</label>
                    <p className="text-lg sm:text-xl font-bold text-white font-mono tracking-widest">{credentials.secretCode}</p>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                  <p className="text-xs sm:text-sm text-yellow-300">
                    <strong>Important:</strong> Please download and save these credentials securely. You will need them to login to the staff portal.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownload}
                    className="w-full sm:flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-lg touch-manipulation"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Credentials</span>
                  </button>
                  <button
                    onClick={() => router.push('/staff/login')}
                    className="w-full sm:flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-semibold hover:from-orange-600 hover:to-red-600 active:from-orange-700 active:to-red-700 transition-all duration-200 shadow-lg touch-manipulation"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/staff/login')}
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center space-x-2 touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

