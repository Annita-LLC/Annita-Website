'use client'

import { useState } from 'react'
import { Target, Plus, TrendingUp, CheckCircle2, Clock, AlertCircle, Calendar, BarChart3 } from 'lucide-react'

export default function GoalsObjectives({ userRole }: { userRole?: string }) {
  const [activeView, setActiveView] = useState<'active' | 'completed' | 'all'>('active')

  const goals = [
    { id: 1, title: 'Complete Q4 Product Launch', category: 'Project', progress: 85, deadline: '2024-12-31', status: 'on-track', priority: 'high', description: 'Launch new product features and ensure all testing is complete' },
    { id: 2, title: 'Improve Team Collaboration', category: 'Professional Development', progress: 60, deadline: '2025-01-15', status: 'on-track', priority: 'medium', description: 'Implement new collaboration tools and processes' },
    { id: 3, title: 'Complete Advanced Training Course', category: 'Learning', progress: 100, deadline: '2024-12-20', status: 'completed', priority: 'medium', description: 'Finish the Advanced React Development course' },
    { id: 4, title: 'Increase Client Satisfaction Score', category: 'Performance', progress: 45, deadline: '2025-02-28', status: 'at-risk', priority: 'high', description: 'Achieve 95% client satisfaction rating' },
  ]

  const filteredGoals = goals.filter(goal => {
    if (activeView === 'active') return goal.status !== 'completed'
    if (activeView === 'completed') return goal.status === 'completed'
    return true
  })

  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.status === 'completed').length,
    onTrack: goals.filter(g => g.status === 'on-track').length,
    atRisk: goals.filter(g => g.status === 'at-risk').length,
    avgProgress: Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Goals & Objectives</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Set and track your personal and professional goals</p>
        </div>
        <button
          onClick={() => alert('Create New Goal\n\nIn production, this would open a form to create a new goal.')}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-xs sm:text-sm font-medium transition-colors touch-manipulation flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Total Goals</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Completed</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">On Track</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.onTrack}</p>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Avg Progress</p>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.avgProgress}%</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex space-x-2">
          {[
            { id: 'active' as const, label: 'Active', count: stats.onTrack + stats.atRisk },
            { id: 'completed' as const, label: 'Completed', count: stats.completed },
            { id: 'all' as const, label: 'All Goals', count: stats.total },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors touch-manipulation ${
                activeView === view.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {view.label} ({view.count})
            </button>
          ))}
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">{goal.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">{goal.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">{goal.category}</span>
                  <span className={`px-2 py-1 rounded ${
                    goal.priority === 'high' ? 'bg-red-100 text-red-700' :
                    goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {goal.priority} priority
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due: {goal.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                {goal.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : goal.status === 'at-risk' ? (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <Clock className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span className="font-semibold">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    goal.progress === 100 ? 'bg-green-500' :
                    goal.status === 'at-risk' ? 'bg-red-500' :
                    'bg-orange-500'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => alert(`Updating progress for ${goal.title}\n\nIn production, this would open a form to update goal progress.`)}
                className="flex-1 px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-xs sm:text-sm font-medium transition-colors touch-manipulation"
              >
                Update Progress
              </button>
              <button
                onClick={() => alert(`Viewing details for ${goal.title}\n\nIn production, this would show detailed goal information.`)}
                className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs sm:text-sm font-medium transition-colors touch-manipulation"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <Target className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Goals Found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Get started by creating your first goal!</p>
          <button
            onClick={() => alert('Create New Goal\n\nIn production, this would open a form to create a new goal.')}
            className="px-4 sm:px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium transition-colors touch-manipulation"
          >
            Create Your First Goal
          </button>
        </div>
      )}
    </div>
  )
}

