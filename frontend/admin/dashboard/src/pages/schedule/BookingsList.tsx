import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { getMockBookings, type Booking } from '@barber/data/mockBookings'
import { useNotifications } from '@barber/features/notifications/hooks/useNotifications'
import CurrentBookingHighlight from '@/components/bookings/CurrentBookingHighlight'

// TODO: Backend Integration
// GET /api/bookings - List all bookings with filters
// DELETE /api/bookings/:id - Cancel booking
// PATCH /api/bookings/:id/complete - Mark booking as completed

export default function BookingsList() {
  const navigate = useNavigate()
  const { addFromBooking } = useNotifications()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [todayBookings, setTodayBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<'scheduled' | 'completed' | 'cancelled'>('scheduled')
  const [isLoading, setIsLoading] = useState(true)
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Agenda Jhoninha | Agendamentos';
    loadBookings()
  }, [])

  useEffect(() => {
    filterTodayBookings()
  }, [filter, bookings])

  const getTodayDateString = () => {
    // Data fixa: 18 de outubro de 2026
    return '2026-10-18'
  }

  const loadBookings = () => {
    setIsLoading(true)
    try {
      // FORÇA a data de 18 de outubro de 2026
      // Remove dados antigos e carrega novos dados mockados
      const mockData = getMockBookings()
      localStorage.setItem('userBookings', JSON.stringify(mockData))
      setBookings(mockData)
    } catch (error) {
      // Em caso de erro, usa dados mockados
      const allBookings = getMockBookings()
      setBookings(allBookings)
      localStorage.setItem('userBookings', JSON.stringify(allBookings))
    } finally {
      setIsLoading(false)
    }
  }

  const filterTodayBookings = () => {
    const todayDate = getTodayDateString()
    let filtered = bookings.filter(b => b.date === todayDate)

    // Status filter (não tem mais 'all')
    filtered = filtered.filter(b => b.status === filter)

    // Sort by time (earliest first)
    filtered.sort((a, b) => {
      const timeA = a.time.split(':').map(Number)
      const timeB = b.time.split(':').map(Number)
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1])
    })

    setTodayBookings(filtered)
  }

  // Agendamento em andamento (mais próximo do horário atual)
  const currentBooking = useMemo(() => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const todayDate = getTodayDateString()
    
    const scheduled = bookings
      .filter(b => b.status === 'scheduled' && b.date === todayDate)
      .map(b => {
        const [hours, minutes] = b.time.split(':').map(Number)
        const bookingTime = hours * 60 + minutes
        return { ...b, minutesFromNow: bookingTime - currentTime }
      })
      .filter(b => b.minutesFromNow >= 0)
      .sort((a, b) => a.minutesFromNow - b.minutesFromNow)
    
    return scheduled.length > 0 ? scheduled[0] : null
  }, [bookings])

  const handleCompleteBooking = (bookingId: string) => {
    try {
      // TODO: Backend Integration
      // PATCH /api/bookings/:id/complete - Mark booking as completed
      
      const toComplete = bookings.find((b) => b.id === bookingId)
      const updated = bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'completed' as const } : b
      )
      localStorage.setItem('userBookings', JSON.stringify(updated))
      setBookings(updated)

      if (toComplete) {
        addFromBooking({ ...toComplete, status: 'completed' }, 'booking_completed')
      }
    } catch (error) {
      console.error('Error completing booking:', error)
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    setBookingToCancel(bookingId)
  }

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return

    try {
      // TODO: Backend Integration
      // DELETE /api/bookings/:id - Cancel booking
      
      const toCancel = bookings.find((b) => b.id === bookingToCancel)
      const updated = bookings.map(b =>
        b.id === bookingToCancel ? { 
          ...b, 
          status: 'cancelled' as const,
          cancelledBy: 'admin' as const,
          cancelledAt: new Date().toISOString()
        } : b
      )
      localStorage.setItem('userBookings', JSON.stringify(updated))
      setBookings(updated)

      if (toCancel) {
        addFromBooking({ 
          ...toCancel, 
          status: 'cancelled',
          cancelledBy: 'admin',
          cancelledAt: new Date().toISOString()
        }, 'booking_cancelled')
      }
      setBookingToCancel(null)
    } catch (error) {
      console.error('Error cancelling booking:', error)
    }
  }

  const formatTodayDate = () => {
    // Data fixa formatada: Domingo, 18 de Outubro de 2026
    return 'Domingo, 18 de Outubro de 2026'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-dim">Carregando agendamentos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">
          Agendamentos
        </h1>
        <p className="text-text-dim capitalize">
          {formatTodayDate()}
        </p>
      </div>

      {/* Status Filter - Rounded Buttons */}
      <div className="animate-fade-in-delayed overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="inline-flex gap-2 bg-[#0a0a0a] p-1 rounded-full min-w-max">
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              filter === 'scheduled'
                ? 'bg-gold text-[#0a0a0a]'
                : 'bg-transparent text-text-dim hover:text-text'
            }`}
          >
            Agendados
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-gold text-[#0a0a0a]'
                : 'bg-transparent text-text-dim hover:text-text'
            }`}
          >
            Concluídos
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              filter === 'cancelled'
                ? 'bg-gold text-[#0a0a0a]'
                : 'bg-transparent text-text-dim hover:text-text'
            }`}
          >
            Cancelados
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {todayBookings.length === 0 ? (
        <div className="card text-center py-12 animate-fade-in-delayed">
          <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-text-dim">Nenhum agendamento para hoje</p>
        </div>
      ) : (
        <div className="grid gap-4 animate-fade-in-delayed">
          {todayBookings.map((booking, index) => {
            const dateObj = new Date(booking.date + 'T' + booking.time)
            const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'short',
              year: 'numeric'
            })
            
            const statusConfig = {
              scheduled: { label: 'Agendado', color: 'text-blue-400', bg: 'bg-blue-400/15 border-blue-400/30' },
              completed: { label: 'Concluído', color: 'text-green-400', bg: 'bg-green-400/15 border-green-400/30' },
              cancelled: { label: 'Cancelado', color: 'text-red-400', bg: 'bg-red-400/15 border-red-400/30' }
            }
            const status = statusConfig[booking.status]
            
            // Verifica se é o agendamento em andamento
            const isCurrentBooking = currentBooking?.id === booking.id
            
            // Usa componente especial para o agendamento em andamento
            if (isCurrentBooking) {
              return (
                <div key={booking.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CurrentBookingHighlight 
                    booking={booking}
                    onComplete={handleCompleteBooking}
                    onViewDetails={(id) => navigate(`/agendamentos/${id}`)}
                    onCancel={handleCancelBooking}
                  />
                </div>
              )
            }
            
            // Cards normais
            return (
              <div
                key={booking.id}
                className="bg-[#141414] border border-border rounded-2xl shadow-[var(--shadow)] p-5 transition-all duration-500 hover:border-gold/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid gap-3">
                  {/* Header - Hora e Nome do Cliente juntos */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-text">{booking.time}</span>
                        <span className="text-lg font-semibold text-text uppercase">{booking.clientName}</span>
                      </div>
                      <div className="text-sm text-text/70 capitalize">{formattedDate}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Informações */}
                  <div className="grid gap-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text/70">Telefone:</span>
                      <span className="text-text font-medium">{booking.clientPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text/70">Profissional:</span>
                      <span className="text-text font-medium">{booking.professionalName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text/70">Serviço:</span>
                      <span className="text-text font-medium">{booking.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text/70">Valor:</span>
                      <span className="text-gold font-semibold">R$ {booking.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="pt-2 border-t border-border grid gap-2">
                    <button
                      onClick={() => navigate(`/agendamentos/${booking.id}`)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold border bg-transparent text-text border-border transition hover:-translate-y-px w-full"
                    >
                      Ver detalhes
                    </button>
                    {booking.status === 'scheduled' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold border bg-transparent border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400 transition hover:-translate-y-px w-full"
                      >
                        Cancelar agendamento
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {bookingToCancel && (
        createPortal(
          <div className="modal-overlay" onClick={() => setBookingToCancel(null)}>
            <div className="modal-content p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-semibold text-text mb-4">Cancelar Agendamento</h3>
              <p className="text-text-dim mb-6">
                Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setBookingToCancel(null)}
                  className="btn btn-outline flex-1"
                >
                  Voltar
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className="btn btn-danger flex-1"
                >
                  Cancelar Agendamento
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </div>
  )
}
