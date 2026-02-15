'use client'

import { useState } from 'react'
import { X, User, FileText, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'

interface EmployeeRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  employeeId: string
}

export default function EmployeeRequestModal({ isOpen, onClose, onSubmit, employeeId }: EmployeeRequestModalProps) {
  const [requestType, setRequestType] = useState<'leave' | 'expense' | 'training' | 'equipment' | 'hr' | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urgency: 'normal',
    amount: '',
    startDate: '',
    endDate: '',
    category: '',
    details: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!requestType) {
      newErrors.requestType = 'Please select a request type'
    }

    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.description) newErrors.description = 'Description is required'

    // Type-specific validation
    if (requestType === 'leave' && (!formData.startDate || !formData.endDate)) {
      newErrors.dates = 'Start and end dates are required'
    }

    if (requestType === 'expense' && !formData.amount) {
      newErrors.amount = 'Amount is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      ...formData,
      requestType,
      employeeId,
      submittedDate: new Date().toISOString()
    })

    onClose()
    resetForm()
  }

  const resetForm = () => {
    setRequestType(null)
    setFormData({
      title: '',
      description: '',
      urgency: 'normal',
      amount: '',
      startDate: '',
      endDate: '',
      category: '',
      details: ''
    })
    setErrors({})
  }

  const renderRequestTypeSelection = () => (
    <div className="grid grid-cols-2 gap-4">
      {[
        { type: 'leave', label: 'Leave Request', icon: Calendar, color: 'blue' },
        { type: 'expense', label: 'Expense Report', icon: DollarSign, color: 'green' },
        { type: 'training', label: 'Training Request', icon: User, color: 'purple' },
        { type: 'equipment', label: 'Equipment Request', icon: FileText, color: 'orange' },
        { type: 'hr', label: 'HR Issue', icon: AlertCircle, color: 'red' }
      ].map(({ type, label, icon: Icon, color }) => (
        <button
          key={type}
          type="button"
          onClick={() => setRequestType(type as any)}
          className={`p-4 rounded-lg border-2 transition-all ${
            requestType === type
              ? `border-${color}-500 bg-${color}-50`
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Icon className={`w-6 h-6 mx-auto mb-2 ${
            requestType === type ? `text-${color}-600` : 'text-gray-400'
          }`} />
          <span className={`text-sm font-medium ${
            requestType === type ? `text-${color}-700` : 'text-gray-700'
          }`}>
            {label}
          </span>
        </button>
      ))}
    </div>
  )

  const renderFormFields = () => {
    switch (requestType) {
      case 'leave':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select leave type</option>
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal Leave</option>
                <option value="emergency">Emergency Leave</option>
                <option value="bereavement">Bereavement Leave</option>
                <option value="parental">Parental Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            {errors.dates && <p className="text-red-500 text-sm">{errors.dates}</p>}
          </>
        )

      case 'expense':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expense Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select category</option>
                <option value="travel">Travel & Transportation</option>
                <option value="meals">Meals & Entertainment</option>
                <option value="supplies">Office Supplies</option>
                <option value="training">Training & Development</option>
                <option value="equipment">Equipment & Software</option>
                <option value="communication">Communication</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0.00"
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            </div>
          </>
        )

      case 'training':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Type
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select training type</option>
                <option value="technical">Technical Skills</option>
                <option value="soft">Soft Skills</option>
                <option value="compliance">Compliance & Safety</option>
                <option value="leadership">Leadership & Management</option>
                <option value="certification">Professional Certification</option>
                <option value="conference">Conference & Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </>
        )

      case 'equipment':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Type
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select equipment type</option>
                <option value="computer">Computer/Laptop</option>
                <option value="phone">Mobile Phone</option>
                <option value="monitor">Monitor</option>
                <option value="printer">Printer/Scanner</option>
                <option value="software">Software License</option>
                <option value="furniture">Office Furniture</option>
                <option value="other">Other Equipment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Justification
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Explain why this equipment is needed..."
              />
            </div>
          </>
        )

      case 'hr':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select issue category</option>
                <option value="policy">Policy Question</option>
                <option value="benefits">Benefits Inquiry</option>
                <option value="payroll">Payroll Issue</option>
                <option value="workplace">Workplace Issue</option>
                <option value="accommodation">Accommodation Request</option>
                <option value="complaint">Formal Complaint</option>
                <option value="other">Other HR Matter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confidentiality Level
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="normal">Normal</option>
                <option value="confidential">Confidential</option>
                <option value="urgent">Urgent & Confidential</option>
              </select>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Submit Request</h2>
              <p className="text-sm text-gray-500">Employee ID: {employeeId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Request Type Selection */}
          {!requestType ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What type of request would you like to submit?
              </label>
              {renderRequestTypeSelection()}
              {errors.requestType && <p className="text-red-500 text-sm mt-2">{errors.requestType}</p>}
            </div>
          ) : (
            <>
              {/* Selected Type Display */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-700">
                    Request Type: {requestType.charAt(0).toUpperCase() + requestType.slice(1)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRequestType(null)}
                    className="text-orange-600 hover:text-orange-700 text-sm"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Common Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Brief title for your request"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Provide all relevant details for your request..."
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              {/* Type-specific Fields */}
              {renderFormFields()}

              {/* Urgency Level */}
              {requestType !== 'hr' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              )}
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            {requestType && (
              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Request
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
