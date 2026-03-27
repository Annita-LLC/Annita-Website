'use client'

import { useTheme } from '@/lib/theme'

/**
 * Dark mode utility components and hooks for enhanced theming
 * This provides easy access to CSS variables and theme-aware components
 */

export function useDarkMode() {
  const { resolvedTheme } = useTheme()
  return {
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    theme: resolvedTheme
  }
}

/**
 * Theme-aware text component that automatically adapts to dark/light mode
 */
export function ThemeText({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'muted' | 'accent' | 'inverse'
  className?: string
  [key: string]: any
}) {
  const variantClasses = {
    primary: 'text-[var(--text-primary)]',
    secondary: 'text-[var(--text-secondary)]',
    muted: 'text-[var(--text-muted)]',
    accent: 'text-[var(--text-accent)]',
    inverse: 'text-[var(--text-inverse)]'
  }

  return (
    <span className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}

/**
 * Theme-aware background component
 */
export function ThemeBg({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  className?: string
  [key: string]: any
}) {
  const variantClasses = {
    primary: 'bg-[var(--content-bg)]',
    secondary: 'bg-[var(--content-bg-secondary)]',
    tertiary: 'bg-[var(--content-bg-tertiary)]'
  }

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}

/**
 * Theme-aware border component
 */
export function ThemeBorder({ 
  children, 
  className = '',
  ...props 
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) {
  return (
    <div className={`border border-[var(--content-border)] ${className}`} {...props}>
      {children}
    </div>
  )
}

/**
 * Theme-aware link component
 */
export function ThemeLink({ 
  children, 
  href,
  className = '',
  ...props 
}: {
  children: React.ReactNode
  href: string
  className?: string
  [key: string]: any
}) {
  return (
    <a 
      href={href}
      className={`text-[var(--text-link)] hover:text-[var(--text-link-hover)] transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Theme-aware brand color component
 */
export function BrandColor({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  className?: string
  [key: string]: any
}) {
  const variantClasses = {
    primary: 'text-[var(--brand-primary)]',
    secondary: 'text-[var(--brand-secondary)]',
    accent: 'text-[var(--brand-accent)]',
    success: 'text-[var(--brand-success)]',
    warning: 'text-[var(--brand-warning)]',
    error: 'text-[var(--brand-error)]'
  }

  return (
    <span className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}

/**
 * Theme-aware brand background component
 */
export function BrandBg({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  className?: string
  [key: string]: any
}) {
  const variantClasses = {
    primary: 'bg-[var(--brand-primary)]',
    secondary: 'bg-[var(--brand-secondary)]',
    accent: 'bg-[var(--brand-accent)]',
    success: 'bg-[var(--brand-success)]',
    warning: 'bg-[var(--brand-warning)]',
    error: 'bg-[var(--brand-error)]'
  }

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}

/**
 * Utility class names for easy theme-aware styling
 */
export const themeClasses = {
  // Text colors
  text: {
    primary: 'text-[var(--text-primary)]',
    secondary: 'text-[var(--text-secondary)]',
    muted: 'text-[var(--text-muted)]',
    accent: 'text-[var(--text-accent)]',
    inverse: 'text-[var(--text-inverse)]',
    link: 'text-[var(--text-link)]',
    linkHover: 'hover:text-[var(--text-link-hover)]'
  },
  
  // Background colors
  bg: {
    primary: 'bg-[var(--content-bg)]',
    secondary: 'bg-[var(--content-bg-secondary)]',
    tertiary: 'bg-[var(--content-bg-tertiary)]'
  },
  
  // Border colors
  border: {
    default: 'border-[var(--content-border)]',
    focus: 'focus:border-[var(--brand-primary)]'
  },
  
  // Brand colors
  brand: {
    primary: 'text-[var(--brand-primary)]',
    secondary: 'text-[var(--brand-secondary)]',
    accent: 'text-[var(--brand-accent)]',
    success: 'text-[var(--brand-success)]',
    warning: 'text-[var(--brand-warning)]',
    error: 'text-[var(--brand-error)]'
  },
  
  // Brand backgrounds
  brandBg: {
    primary: 'bg-[var(--brand-primary)]',
    secondary: 'bg-[var(--brand-secondary)]',
    accent: 'bg-[var(--brand-accent)]',
    success: 'bg-[var(--brand-success)]',
    warning: 'bg-[var(--brand-warning)]',
    error: 'bg-[var(--brand-error)]'
  }
}

/**
 * Helper function to combine theme classes with Tailwind classes
 */
export function themeClass(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Custom hook for theme-aware CSS-in-JS styles
 */
export function useThemeStyles() {
  const { isDark } = useDarkMode()
  
  return {
    getTextColor: (variant: 'primary' | 'secondary' | 'muted' | 'accent' | 'inverse') => {
      const colors = {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        accent: 'var(--text-accent)',
        inverse: 'var(--text-inverse)'
      }
      return colors[variant]
    },
    
    getBgColor: (variant: 'primary' | 'secondary' | 'tertiary') => {
      const colors = {
        primary: 'var(--content-bg)',
        secondary: 'var(--content-bg-secondary)',
        tertiary: 'var(--content-bg-tertiary)'
      }
      return colors[variant]
    },
    
    getBrandColor: (variant: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error') => {
      const colors = {
        primary: 'var(--brand-primary)',
        secondary: 'var(--brand-secondary)',
        accent: 'var(--brand-accent)',
        success: 'var(--brand-success)',
        warning: 'var(--brand-warning)',
        error: 'var(--brand-error)'
      }
      return colors[variant]
    }
  }
}
