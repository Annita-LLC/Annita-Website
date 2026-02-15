'use client'

// Utility functions for employee ID validation and management
export class EmployeeIdValidator {
  private static readonly STORAGE_KEY = 'registered-employee-ids'

  // Get all registered employee IDs
  static getRegisteredIds(): string[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Check if an employee ID is already taken
  static isIdTaken(employeeId: string): boolean {
    const registeredIds = this.getRegisteredIds()
    return registeredIds.includes(employeeId.toUpperCase())
  }

  // Register a new employee ID
  static registerId(employeeId: string): boolean {
    const normalizedId = employeeId.toUpperCase()
    
    if (this.isIdTaken(normalizedId)) {
      return false // ID already exists
    }

    try {
      const registeredIds = this.getRegisteredIds()
      registeredIds.push(normalizedId)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(registeredIds))
      return true
    } catch {
      return false
    }
  }

  // Generate a unique employee ID
  static generateUniqueId(): string {
    let attempts = 0
    const maxAttempts = 100

    while (attempts < maxAttempts) {
      const timestamp = Date.now()
      const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      const candidateId = `ANN-${timestamp.toString().slice(-6)}-${randomSuffix}`
      
      if (!this.isIdTaken(candidateId)) {
        return candidateId
      }
      
      attempts++
    }

    // Fallback if we can't generate a unique ID
    throw new Error('Unable to generate unique employee ID')
  }

  // Validate employee ID format
  static validateFormat(employeeId: string): { isValid: boolean; error?: string } {
    if (!employeeId) {
      return { isValid: false, error: 'Employee ID is required' }
    }

    const normalizedId = employeeId.toUpperCase().trim()
    
    if (normalizedId.length < 3) {
      return { isValid: false, error: 'Employee ID must be at least 3 characters' }
    }

    if (normalizedId.length > 20) {
      return { isValid: false, error: 'Employee ID must be less than 20 characters' }
    }

    // Allow alphanumeric characters and hyphens
    if (!/^[A-Z0-9-]+$/.test(normalizedId)) {
      return { isValid: false, error: 'Employee ID can only contain letters, numbers, and hyphens' }
    }

    return { isValid: true }
  }

  // Complete validation (format + uniqueness)
  static validateEmployeeId(employeeId: string): { isValid: boolean; error?: string } {
    // First check format
    const formatValidation = this.validateFormat(employeeId)
    if (!formatValidation.isValid) {
      return formatValidation
    }

    // Then check uniqueness
    const normalizedId = employeeId.toUpperCase().trim()
    if (this.isIdTaken(normalizedId)) {
      return { isValid: false, error: 'This Employee ID is already taken' }
    }

    return { isValid: true }
  }

  // Remove an employee ID (for testing/admin purposes)
  static removeId(employeeId: string): boolean {
    try {
      const registeredIds = this.getRegisteredIds()
      const normalizedId = employeeId.toUpperCase()
      const index = registeredIds.indexOf(normalizedId)
      
      if (index > -1) {
        registeredIds.splice(index, 1)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(registeredIds))
        return true
      }
      
      return false
    } catch {
      return false
    }
  }

  // Clear all registered IDs (for testing)
  static clearAllIds(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}
