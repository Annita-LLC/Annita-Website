'use client'

import { useState, useEffect } from 'react'
import V1MarketplaceModal from './V1MarketplaceModal'

export default function V1MarketplaceModalWrapper() {
  const [isV1ModalOpen, setIsV1ModalOpen] = useState(false)

  useEffect(() => {
    // Show V1 marketplace modal after a delay on any page
    const timer = setTimeout(() => {
      setIsV1ModalOpen(true)
    }, 5000) // Show after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <V1MarketplaceModal
      isOpen={isV1ModalOpen}
      onClose={() => setIsV1ModalOpen(false)}
    />
  )
}
