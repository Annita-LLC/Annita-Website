'use client'

import { useState } from 'react'
import { User, Building, Briefcase, Users, Mail, Phone, MapPin, Calendar, AlertCircle, CheckCircle } from 'lucide-react'
import { EmployeeIdValidator } from './EmployeeIdValidator'

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

interface EmployeeProfileSetupProps {
  onProfileComplete: (profile: EmployeeProfile) => void
  onCancel: () => void
  onSkip?: () => void
  initialData?: {
    department?: string
    reportsTo?: string
  }
}

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

const positions = [
  'Executive',
  'Director',
  'Manager',
  'Senior Specialist',
  'Specialist',
  'Coordinator',
  'Assistant',
  'Intern'
]

const locations = [
  'Headquarters - New York',
  'West Coast Office - San Francisco',
  'European Office - London',
  'Asia Pacific Office - Singapore',
  'Remote - Work From Home'
]

export default function EmployeeProfileSetup({ onProfileComplete, onCancel, onSkip, initialData }: EmployeeProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<Partial<EmployeeProfile>>({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: initialData?.department || '',
    position: '',
    role: 'employee',
    reportsTo: initialData?.reportsTo || '',
    hireDate: '',
    location: '',
    emergencyContact: '',
    emergencyPhone: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        // Validate employee ID format and uniqueness
        const idValidation = EmployeeIdValidator.validateEmployeeId(profile.employeeId || '')
        if (!idValidation.isValid) {
          newErrors.employeeId = idValidation.error || 'Employee ID is required'
        }
        
        if (!profile.firstName) newErrors.firstName = 'First name is required'
        if (!profile.lastName) newErrors.lastName = 'Last name is required'
        if (!profile.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Invalid email format'
        if (!profile.department) newErrors.department = 'Department is required'
        if (!profile.position) newErrors.position = 'Position is required'
        if (!profile.reportsTo) newErrors.reportsTo = 'Reports to is required'
        break
      case 2:
        if (!profile.hireDate) newErrors.hireDate = 'Hire date is required'
        if (!profile.location) newErrors.location = 'Location is required'
        if (!profile.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required'
        if (!profile.emergencyPhone) newErrors.emergencyPhone = 'Emergency phone is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1)
      } else {
        // Register the employee ID to prevent duplicates
        const normalizedId = profile.employeeId?.toUpperCase()
        if (normalizedId && !EmployeeIdValidator.isIdTaken(normalizedId)) {
          EmployeeIdValidator.registerId(normalizedId)
          onProfileComplete(profile as EmployeeProfile)
        } else {
          setErrors({ employeeId: 'Employee ID is already taken or invalid' })
        }
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateProfile = (field: keyof EmployeeProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal & Work Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profile.employeeId}
                    onChange={(e) => updateProfile('employeeId', e.target.value.toUpperCase())}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.employeeId ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="EMP001"
                  />
                  {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="john.doe@annita.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => updateProfile('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => updateProfile('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={profile.department}
                    onChange={(e) => updateProfile('department', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={profile.position}
                    onChange={(e) => updateProfile('position', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none ${errors.position ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Position</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reports To <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profile.reportsTo}
                    onChange={(e) => updateProfile('reportsTo', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.reportsTo ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Manager Name"
                  />
                  {errors.reportsTo && <p className="text-red-500 text-xs mt-1">{errors.reportsTo}</p>}
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hire Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={profile.hireDate}
                    onChange={(e) => updateProfile('hireDate', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.hireDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.hireDate && <p className="text-red-500 text-xs mt-1">{errors.hireDate}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profile.emergencyContact}
                  onChange={(e) => updateProfile('emergencyContact', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Emergency Contact Name"
                />
                {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={profile.emergencyPhone}
                  onChange={(e) => updateProfile('emergencyPhone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+1 (555) 987-6543"
                />
                {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of 2</span>
              <span className="text-sm text-gray-500">Employee Profile Setup</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              {onSkip && (
                <button
                  onClick={onSkip}
                  className="px-4 py-2 text-yellow-600 bg-yellow-50 border border-yellow-300 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  Skip for Now
                </button>
              )}
            </div>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              {currentStep === 2 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
