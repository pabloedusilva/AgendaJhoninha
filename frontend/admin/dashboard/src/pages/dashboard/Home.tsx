import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrentBookingHighlight from '@/components/bookings/CurrentBookingHighlight'
import { getMockBookings, type Booking } from '@barber/data/mockBookings'

// TODO: Backend Integration - Replace localStorage with API calls
// GET /api/stats/overview - Dashboard statistics
// GET /api/bookings/current - Get current booking in progress

interface DashboardStats {
  totalBarbers: number
  totalClients: number
  bookingsMonth: number
  bookingsWeek: number
  bookingsToday: number
}

export default function DashboardHome() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    totalBarbers: 1,
    totalClients: 0,
    bookingsMonth: 0,
    bookingsWeek: 0,
    bookingsToday: 0
  })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    document.title = 'Agenda Jhoninha | Home'
  }, [])

  useEffect(() => {
    loadDashboardData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const loadDashboardData = () => {
    setIsLoading(true)
    try {
      const allBookings = getMockBookings()
      localStorage.setItem('userBookings', JSON.stringify(allBookings))

      // Data fixa: 18 de outubro de 2026
      const todayDate = '2026-10-18'
      const today = new Date(todayDate)
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

      const scheduledBookings = allBookings.filter(b => b.status === 'scheduled')
      const uniqueClients = new Set(scheduledBookings.map(b => b.clientPhone))

      const bookingsToday = scheduledBookings.filter(b => b.date === todayDate).length

      const bookingsWeek = scheduledBookings.filter(b => {
        const bookingDate = new Date(b.date)
        return bookingDate >= weekAgo
      }).length

      const bookingsMonth = scheduledBookings.filter(b => {
        const bookingDate = new Date(b.date)
        return bookingDate >= monthStart
      }).length

      setStats({
        totalBarbers: 1,
        totalClients: uniqueClients.size,
        bookingsMonth,
        bookingsWeek,
        bookingsToday
      })

      setBookings(allBookings)
    } catch (error) {
      const allBookings = getMockBookings()
      localStorage.setItem('userBookings', JSON.stringify(allBookings))
      setBookings(allBookings)
    } finally {
      setIsLoading(false)
    }
  }

  // Agendamento em andamento (mais próximo do horário atual)
  const currentBooking = useMemo(() => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    
    // Data fixa: 18 de outubro de 2026
    const todayDate = '2026-10-18'
    
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-dim">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  const formattedDate = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">
            Dashboard
          </h1>
          <p className="text-text-dim">
            Visão geral da sua barbearia
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] md:text-xs text-text-dim">
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-mono text-gold">{formattedTime}</span>
          <span className="opacity-40">•</span>
          <span className="font-mono">{formattedDate}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in-delayed">
        {/* Agendamentos Hoje - DESTACADO */}
        <div className="stat-card card-hover group relative overflow-hidden bg-gradient-to-br from-gold/5 via-bg-soft to-bg-soft border-gold/30 shadow-lg shadow-gold/5 hover:shadow-gold/10 transition-all duration-300 hover:border-gold/50 col-span-2 md:col-span-2 lg:col-span-1">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-gold text-sm mb-1 font-bold">
                Hoje
              </p>
              <p className="text-3xl font-bold text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">{stats.bookingsToday}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-lg shadow-gold/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Barbeiros */}
        <div className="stat-card card-hover group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-text-dim text-sm mb-1">Barbeiros</p>
              <p className="text-3xl font-bold text-text">{stats.totalBarbers}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Clientes */}
        <div className="stat-card card-hover group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-text-dim text-sm mb-1">Clientes</p>
              <p className="text-3xl font-bold text-text">{stats.totalClients}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Agendamentos da Semana */}
        <div className="stat-card card-hover group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-text-dim text-sm mb-1">Semana</p>
              <p className="text-3xl font-bold text-text">{stats.bookingsWeek}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Agendamentos do Mês */}
        <div className="stat-card card-hover group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-text-dim text-sm mb-1">Mês</p>
              <p className="text-3xl font-bold text-text">{stats.bookingsMonth}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Agendamento em Andamento */}
      <div className="animate-fade-in-delayed">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-text">Agendamento em Andamento</h2>
          <button
            onClick={() => navigate('/agendamentos')}
            className="text-gold hover:text-gold-600 text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            Ver todos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {currentBooking ? (
          <div 
            onClick={() => navigate('/agendamentos')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <CurrentBookingHighlight 
              booking={currentBooking}
            />
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-text-dim">Nenhum agendamento em andamento</p>
          </div>
        )}
      </div>
    </div>
  )
}
