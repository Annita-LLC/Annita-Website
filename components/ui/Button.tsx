import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'gradient' | 'glass' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    children, 
    onClick,
    disabled,
    type = 'button',
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden"
    
    const variants = {
      primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-orange-500",
      secondary: "bg-orange-400 hover:bg-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-orange-400",
      accent: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-orange-500",
      outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-white",
      ghost: "text-orange-700 hover:bg-orange-100 focus:ring-orange-500 hover:shadow-md transform hover:-translate-y-0.5 dark:text-orange-300 dark:hover:bg-orange-900/20",
      gradient: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-orange-500",
      glass: "bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 text-orange-700 hover:bg-orange-500/20 focus:ring-orange-500/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:text-orange-300 dark:bg-orange-400/10 dark:border-orange-400/20 dark:hover:bg-orange-400/20",
      white: "bg-white text-orange-600 hover:bg-orange-50 focus:ring-orange-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-xl",
      xl: "px-10 py-5 text-xl rounded-2xl"
    }

    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    )

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        
        <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
