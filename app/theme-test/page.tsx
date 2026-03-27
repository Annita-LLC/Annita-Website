'use client'

import { useState } from 'react'
import { useTheme } from '@/lib/theme'
import ThemeTest from '@/components/ui/ThemeTest'

export default function ThemeTestPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--content-bg)] text-[var(--text-primary)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Dark Mode Test Page</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            Current theme: {theme} (resolved: {resolvedTheme})
          </p>
          
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setTheme('light')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Light Mode
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Dark Mode
            </button>
            <button
              onClick={() => setTheme('system')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              System Mode
            </button>
          </div>
        </div>

        <ThemeTest />
      </div>
    </div>
  )
}
