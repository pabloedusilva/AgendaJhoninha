import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyBookings } from '@context/MyBookingsContext'
import { fetchUserBookings } from '@data/mockBookings'
import FilterTabs from '@components/bookings/FilterTabs'
import BookingCard from '@components/bookings/BookingCard'
import CancelConfirmModal from '@components/bookings/CancelConfirmModal'
import NotificationPermissionModal from '@components/bookings/NotificationPermissionModal'
import Button from '@components/ui/Button'
import { useNotificationPermission } from '@/hooks/useNotificationPermission'
import type { Booking } from '@/types/bookings'

export default function MyBookingsPage() {
  const navigate = useNavigate()
  const { userPhone, filter, setFilter, bookings, setBookings, isLoading, setIsLoading } = useMyBookings()
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [hasCheckedNotifications, setHasCheckedNotifications] = useState(false)
  
  const { shouldShowModal, requestPermission, denyPermission, resetPreference } = useNotificationPermission()

  // Cleanup: Reset "disabled" preference when leaving the page
  useEffect(() => {
    return () => {
      const preference = localStorage.getItem('notification_preference')
      // Only reset if user denied (disabled), keep if enabled
      if (preference === 'disabled') {
        resetPreference()
      }
    }
  }, [resetPreference])

  // Check notifications only once when component mounts
  useEffect(() => {
    if (!userPhone || hasCheckedNotifications) return

    // Check if we should show notification modal
    if (shouldShowModal()) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowNotificationModal(true)
        setHasCheckedNotifications(true)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setHasCheckedNotifications(true)
    }
  }, [userPhone, shouldShowModal, hasCheckedNotifications])

  // Load bookings independently
  useEffect(() => {
    if (!userPhone || !hasCheckedNotifications) return

    // Fetch bookings from API (currently mock)
    const loadBookings = async () => {
      setIsLoading(true)
      try {
        const data = await fetchUserBookings(userPhone)
        setBookings(data.bookings)
      } catch (error) {
        console.error('Failed to load bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [userPhone, hasCheckedNotifications, setBookings, setIsLoading])

  const handleAllowNotifications = async () => {
    await requestPermission()
    setShowNotificationModal(false)
  }

  const handleDenyNotifications = () => {
    denyPermission()
    setShowNotificationModal(false)
  }

  const handleCancelBooking = async (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId)
    if (booking) {
      setBookingToCancel(booking)
    }
  }

  const confirmCancelBooking = async () => {
    if (!bookingToCancel) return

    // TODO: Replace with actual API call when backend is ready
    // DELETE /api/bookings/{bookingToCancel.id} or PATCH /api/bookings/{bookingToCancel.id} with status: 'cancelled'
    
    // Update localStorage
    const localBookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
    const updatedLocalBookings = localBookings.map((b: any) => 
      b.id === bookingToCancel.id ? { ...b, status: 'cancelled' } : b
    )
    localStorage.setItem('userBookings', JSON.stringify(updatedLocalBookings))
    
    // Update state
    const updatedBookings = bookings.map(b => 
      b.id === bookingToCancel.id ? { ...b, status: 'cancelled' as const } : b
    )
    setBookings(updatedBookings)
    setBookingToCancel(null)
  }

  const filteredBookings = useMemo(() => {
    if (filter.status === 'all') return bookings
    return bookings.filter(b => b.status === filter.status)
  }, [bookings, filter])

  if (isLoading) {
    return (
      <div className="grid gap-8 md:gap-10">
        <div className="text-center">
          <h1 className="font-display text-gold text-4xl md:text-5xl">Meus Agendamentos</h1>
          <p className="text-text/70 mt-2">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:gap-10 w-full min-w-0">
      <div className="text-center">
        <h1 className="font-display text-gold text-4xl md:text-5xl">Meus Agendamentos</h1>
        <p className="text-text/70 mt-2">Visualize e gerencie todos os seus agendamentos</p>
      </div>

      <div className="grid gap-6 md:gap-7 w-full min-w-0">
        <div className="grid gap-4">
          <div className="grid gap-3">
            <h2 className="text-text/90 font-semibold text-lg">Histórico</h2>
            <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-text/50 text-lg mb-4">
                {filter.status === 'all' 
                  ? 'Nenhum agendamento encontrado'
                  : `Nenhum agendamento ${filter.status === 'scheduled' ? 'agendado' : filter.status === 'completed' ? 'concluído' : 'cancelado'}`
                }
              </div>
              <Button variant="primary" onClick={() => navigate('/agendar')}>
                Fazer novo agendamento
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar ao início
          </Button>
        </div>
      </div>

      {bookingToCancel && (
        <CancelConfirmModal
          onConfirm={confirmCancelBooking}
          onCancel={() => setBookingToCancel(null)}
          bookingTime={bookingToCancel.time}
          bookingDate={bookingToCancel.date}
        />
      )}

      {showNotificationModal && (
        <NotificationPermissionModal
          onAllow={handleAllowNotifications}
          onDeny={handleDenyNotifications}
        />
      )}
    </div>
  )
}
