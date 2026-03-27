import { useState } from 'react'
import { validateEmail, validatePhone, sanitizeInput } from '@/lib/types'

interface FormSubmissionState {
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
  success: boolean
  errorType: 'network' | 'database' | 'general' | null
}

interface UseFormSubmissionOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
  validateForm?: (formData: any) => string | null
}

export function useFormSubmission(options: UseFormSubmissionOptions = {}) {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    success: false,
    errorType: null
  })

  const submitForm = async (formType: string, formData: any) => {
    try {
      setState(prev => ({
        ...prev,
        isSubmitting: true,
        error: null,
        success: false
      }))

      // Validate form data
      if (options.validateForm) {
        const validationError = options.validateForm(formData)
        if (validationError) {
          throw new Error(validationError)
        }
      }

      // Basic validation
      if (formData.email && !validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      if (formData.phone && !validatePhone(formData.phone)) {
        throw new Error('Please enter a valid phone number')
      }

      // Sanitize text inputs
      const sanitizedData = Object.keys(formData).reduce((acc, key) => {
        const value = formData[key]
        if (typeof value === 'string') {
          acc[key] = sanitizeInput(value)
        } else {
          acc[key] = value
        }
        return acc
      }, {} as any)

      // Submit to Next.js API route which forwards to backend
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType,
          ...sanitizedData
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        success: true,
        error: null
      }))

      // Call success callback
      if (options.onSuccess) {
        options.onSuccess(result.data)
      }

      return result.data

    } catch (error) {
      let errorMessage = 'An unexpected error occurred'
      let errorType: 'network' | 'database' | 'general' = 'general'

      if (error instanceof Error) {
        errorMessage = error.message
        
        // Detect error type based on error message
        if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('connection')) {
          errorType = 'network'
          errorMessage = 'Network connection issue. Please check your internet connection and try again.'
        } else if (error.message.includes('database') || error.message.includes('connection') || error.message.includes('timeout')) {
          errorType = 'database'
          errorMessage = 'Our database is temporarily unavailable. Please try again in a few minutes.'
        }
      }
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        success: false,
        error: errorMessage,
        errorType
      }))

      // Call error callback
      if (options.onError) {
        options.onError(errorMessage)
      }

      throw error
    }
  }

  const reset = () => {
    setState({
      isSubmitting: false,
      isSubmitted: false,
      error: null,
      success: false,
      errorType: null
    })
  }

  return {
    ...state,
    submitForm,
    reset
  }
}

// Predefined validation functions for common forms
export const formValidations = {
  contact: (formData: any) => {
    if (!formData.firstName?.trim()) return 'First name is required'
    if (!formData.lastName?.trim()) return 'Last name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.message?.trim()) return 'Message is required'
    if (formData.message?.length < 10) return 'Message must be at least 10 characters'
    return null
  },

  career: (formData: any) => {
    if (!formData.first_name?.trim()) return 'First name is required'
    if (!formData.last_name?.trim()) return 'Last name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.position?.trim()) return 'Position is required'
    if (!formData.message?.trim()) return 'Cover letter is required'
    if (formData.message?.length < 50) return 'Cover letter must be at least 50 characters'
    return null
  },

  support: (formData: any) => {
    if (!formData.issue_type) return 'Issue type is required'
    if (!formData.title?.trim()) return 'Title is required'
    if (!formData.description?.trim()) return 'Description is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (formData.description?.length < 20) return 'Description must be at least 20 characters'
    return null
  },

  business: (formData: any) => {
    if (!formData.name?.trim()) return 'Name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.message?.trim()) return 'Message is required'
    return null
  },

  sales: (formData: any) => {
    if (!formData.first_name?.trim()) return 'First name is required'
    if (!formData.last_name?.trim()) return 'Last name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.goals?.trim()) return 'Business goals are required'
    return null
  },

  solution: (formData: any) => {
    if (!formData.name?.trim()) return 'Full name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.projectType?.trim()) return 'Project type is required'
    if (!formData.requirements?.trim()) return 'Project requirements are required'
    if (formData.requirements?.length < 50) return 'Project requirements must be at least 50 characters'
    return null
  },

  pricing: (formData: any) => {
    if (!formData.name?.trim()) return 'Name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.selected_plan) return 'Please select a plan'
    return null
  },

  the100_youth: (formData: any) => {
    if (!formData.first_name?.trim()) return 'First name is required'
    if (!formData.last_name?.trim()) return 'Last name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.age || formData.age < 18 || formData.age > 35) return 'Age must be between 18 and 35'
    if (!formData.education?.trim()) return 'Education is required'
    if (!formData.goals?.trim()) return 'Goals are required'
    if (!formData.motivation?.trim()) return 'Motivation is required'
    return null
  },

  the100_partner: (formData: any) => {
    if (!formData.organization_name?.trim()) return 'Organization name is required'
    if (!formData.contact_person?.trim()) return 'Contact person is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.partnership_goals?.trim()) return 'Partnership goals are required'
    return null
  },

  the100_mentor: (formData: any) => {
    if (!formData.first_name?.trim()) return 'First name is required'
    if (!formData.last_name?.trim()) return 'Last name is required'
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.expertise_areas?.trim()) return 'Areas of expertise are required'
    if (!formData.experience_summary?.trim()) return 'Experience summary is required'
    return null
  },

  newsletter: (formData: any) => {
    if (!formData.email?.trim()) return 'Email is required'
    return null
  },

  download: (formData: any) => {
    if (!formData.email?.trim()) return 'Email is required'
    if (!formData.platform?.trim()) return 'Please select a platform'
    return null
  }
}
