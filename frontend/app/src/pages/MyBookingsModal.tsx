import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyBookings } from '@context/MyBookingsContext'
import MyBookingsPage from './MyBookingsPage'
import { createPortal } from 'react-dom'

/**
 * Wrapper component for My Bookings feature
 * Redirects to home if user info is not available
 */
export default function MyBookingsModal() {
  const navigate = useNavigate()
  const { setUserPhone } = useMyBookings()

  // Check if user already has info stored, otherwise redirect to home
  useEffect(() => {
    const storedName = localStorage.getItem('clientName')
    const storedPhone = localStorage.getItem('clientPhone')
    
    if (!storedName || !storedPhone) {
      // Redirect to home where the modal will be shown
      navigate('/')
      return
    }
    
    const digits = storedPhone.replace(/\D/g, '')
    if (digits.length === 10 || digits.length === 11) {
      setUserPhone(digits)
    } else {
      // Invalid phone, redirect to home
      navigate('/')
    }
  }, [setUserPhone, navigate])

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] bg-bg overflow-hidden">
        <div className="relative w-full h-dvh overflow-y-auto overflow-x-hidden">
          <div className="absolute top-3 left-3 z-10">
          <button
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-surface text-text hover:-translate-y-px transition"
            onClick={() => navigate('/')}
            aria-label="Voltar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
          <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8 pt-16 box-border">
            <div className="w-full overflow-x-hidden">
              <MyBookingsPage />
            </div>
          </div>
        </div>
      </div>,
      document.body
  )
}
