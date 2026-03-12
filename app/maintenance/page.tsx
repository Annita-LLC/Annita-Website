'use client'

import { useState, useEffect, memo, useCallback } from 'react'
import { Construction, Clock, Activity, Zap, AlertCircle, Home, ArrowLeft, Building, Shield, FileText, Database, Truck, FileCheck, BarChart3, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { SimpleThemeToggle } from '@/components/ui/ThemeToggle'

const tasks = [
  { id: 1, name: 'Database Optimization', status: 'completed', icon: Database },
  { id: 2, name: 'API Migration', status: 'completed', icon: Zap },
  { id: 3, name: 'Security Enhancement', status: 'completed', icon: Shield },
  { id: 4, name: 'Customs Portal Development', status: 'in-progress', icon: Building },
  { id: 5, name: 'Trade Management System', status: 'in-progress', icon: FileText },
  { id: 6, name: 'Cargo Tracking Platform', status: 'pending', icon: Truck },
  { id: 7, name: 'Document Processing Engine', status: 'pending', icon: FileCheck },
  { id: 8, name: 'Compliance Analytics Dashboard', status: 'pending', icon: BarChart3 },
  { id: 9, name: 'Cloud Infrastructure Setup', status: 'pending', icon: Database },
  { id: 10, name: 'Frontend Rebuild', status: 'pending', icon: Construction },
  { id: 11, name: 'Performance Testing', status: 'pending', icon: Activity },
  { id: 12, name: 'Final Deployment', status: 'pending', icon: CheckCircle2 }
]

const MaintenancePage = memo(() => {
  const [timeLeft, setTimeLeft] = useState({ days: 21, hours: 0, minutes: 0, seconds: 0 })
  const [currentTask, setCurrentTask] = useState(0)

  const updateCountdown = useCallback(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 21)
    targetDate.setHours(23, 59, 59, 999)

    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }
  }, [])

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500'
      case 'in-progress': return 'text-yellow-500'
      case 'pending': return 'text-[var(--text-tertiary)]'
      default: return 'text-[var(--text-tertiary)]'
    }
  }, [])

  const getStatusBg = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 border-green-500/20'
      case 'in-progress': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'pending': return 'bg-[var(--bg-tertiary)]/50 border-[var(--border-primary)]'
      default: return 'bg-[var(--bg-tertiary)]/50 border-[var(--border-primary)]'
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000)
    const taskInterval = setInterval(() => {
      setCurrentTask(prev => (prev + 1) % tasks.length)
    }, 4000)

    return () => {
      clearInterval(interval)
      clearInterval(taskInterval)
    }
  }, [updateCountdown])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 relative">
      <Link href="/" className="absolute top-8 left-8 inline-flex items-center px-4 py-2 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-primary)] rounded-lg hover:bg-[var(--bg-secondary)]/70 transition-all duration-300 text-[var(--text-primary)]">
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="absolute top-8 right-8">
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-primary)]">
          <SimpleThemeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center w-full pt-16">
        <div className="bg-[var(--bg-secondary)]/50 backdrop-blur-sm rounded-2xl p-8 border border-[var(--border-primary)]">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[var(--brand-primary)]/10 rounded-full">
              <Construction className="w-12 h-12 text-[var(--brand-primary)] animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Annita v3.0 is Coming Soon
          </h1>

          <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            We're upgrading to Annita v3.0 - The future of Africa's digital ecosystem.
          </p>

          <div className="bg-[var(--bg-secondary)]/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[var(--border-primary)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center justify-center">
              <Clock className="w-8 h-8 mr-3 text-[var(--brand-primary)]" />
              Launching in
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">Seconds</div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)]/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[var(--border-primary)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center justify-center">
              <Activity className="w-8 h-8 mr-3 text-[var(--brand-primary)]" />
              System Status
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border ${getStatusBg(task.status)} ${
                    currentTask === index ? 'ring-2 ring-orange-400 ring-opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <task.icon className={`w-6 h-6 mr-3 ${getStatusColor(task.status)}`} />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-[var(--text-primary)] text-sm">{task.name}</div>
                      <div className="text-xs text-[var(--text-secondary)] capitalize">{task.status.replace('-', ' ')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)]/50 border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Important Notice</h3>
            </div>
            <p className="text-[var(--text-primary)] text-sm leading-relaxed">
              Annita v1.0 will be <span className="font-bold text-orange-500">permanently shutdown</span> when v3.0 launches.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default MaintenancePage
