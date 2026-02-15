'use client'

import { useState } from 'react'
import { X, Crown, AlertTriangle, CheckCircle, XCircle, DollarSign, Users, TrendingUp } from 'lucide-react'

interface CEODecisionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (decision: any) => void
  request?: {
    id: string
    title: string
    description: string
    amount?: string
    department: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    submittedBy: string
    submittedDate: string
  }
}

export default function CEODecisionModal({ isOpen, onClose, onSubmit, request }: CEODecisionModalProps) {
  const [decision, setDecision] = useState<'approve' | 'reject' | 'defer' | null>(null)
  const [comments, setComments] = useState('')
  const [conditions, setConditions] = useState('')

  if (!request) {
    return null
  }

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!decision) {
      alert('Please select a decision')
      return
    }

    onSubmit({
      requestId: request.id,
      decision: decision!,
      comments,
      conditions: decision === 'approve' ? conditions : '',
      timestamp: new Date().toISOString()
    })

    onClose()
    setDecision(null)
    setComments('')
    setConditions('')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700'
      case 'high': return 'bg-orange-100 text-orange-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-red-500 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Executive Decision</h2>
              <p className="text-sm text-gray-500">Review and approve strategic request</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Request Details */}
        <div className="p-6 border-b border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                {request.priority.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{request.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Department:</span>
                <span className="ml-2 font-medium text-gray-900">{request.department}</span>
              </div>
              <div>
                <span className="text-gray-500">Submitted by:</span>
                <span className="ml-2 font-medium text-gray-900">{request.submittedBy}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <span className="ml-2 font-medium text-gray-900">{request.submittedDate}</span>
              </div>
              {request.amount && (
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <span className="ml-2 font-medium text-gray-900">${request.amount}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decision Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Decision Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Executive Decision *
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setDecision('approve')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  decision === 'approve'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CheckCircle className={`w-6 h-6 mx-auto mb-2 ${
                  decision === 'approve' ? 'text-green-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  decision === 'approve' ? 'text-green-700' : 'text-gray-700'
                }`}>
                  Approve
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDecision('reject')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  decision === 'reject'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <XCircle className={`w-6 h-6 mx-auto mb-2 ${
                  decision === 'reject' ? 'text-red-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  decision === 'reject' ? 'text-red-700' : 'text-gray-700'
                }`}>
                  Reject
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDecision('defer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  decision === 'defer'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <AlertTriangle className={`w-6 h-6 mx-auto mb-2 ${
                  decision === 'defer' ? 'text-yellow-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  decision === 'defer' ? 'text-yellow-700' : 'text-gray-700'
                }`}>
                  Defer
                </span>
              </button>
            </div>
          </div>

          {/* Executive Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Executive Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Provide executive rationale for this decision..."
            />
          </div>

          {/* Conditions (for approval) */}
          {decision === 'approve' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Conditions (Optional)
              </label>
              <textarea
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Specify any conditions or requirements for approval..."
              />
            </div>
          )}

          {/* Impact Assessment */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Impact Assessment</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700">Financial Impact</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700">Team Impact</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700">Strategic Impact</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit Decision
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
