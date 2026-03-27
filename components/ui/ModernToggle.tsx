'use client'

import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'

const ModernToggle = () => {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Apply theme to document
    if (!isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-2 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        
        {/* Icon container */}
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center shadow-inner">
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-gray-700 dark:text-orange-400 transition-transform duration-300 group-hover:rotate-12" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-yellow-500 transition-transform duration-300 group-hover:rotate-12" />
          )}
        </div>
      </div>
    </button>
  )
}

export default ModernToggle
