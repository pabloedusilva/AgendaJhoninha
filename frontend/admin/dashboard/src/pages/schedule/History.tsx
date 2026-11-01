import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMockHistoryBookings, type Booking } from '@barber/data/mockHistoryBookings'

// TODO: Backend Integration
// GET /api/bookings/history?page=1&limit=10&year=2026&month=10&status=completed
// Query params: page, limit, year, month, status

const ITEMS_PER_PAGE = 10

export default function History() {
  const navigate = useNavigate()
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Filtros
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'cancelled'>('all')
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    document.title = 'Agenda Jhoninha | Histórico de Agendamentos'
    loadHistory()
  }, [])

  const loadHistory = () => {
    setIsLoading(true)
    try {
      // TODO: Backend Integration
      // Aqui virá a chamada para a API
      const mockData = getMockHistoryBookings()
      setAllBookings(mockData)
    } catch (error) {
      console.error('Error loading history:', error)
      const mockData = getMockHistoryBookings()
      setAllBookings(mockData)
    } finally {
      setIsLoading(false)
    }
  }

  // Filtragem dos dados
  const filteredBookings = useMemo(() => {
    let filtered = [...allBookings]

    // Filtro por ano
    filtered = filtered.filter(booking => {
      const bookingYear = new Date(booking.date).getFullYear()
      return bookingYear === selectedYear
    })

    // Filtro por mês
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(booking => {
        const bookingMonth = new Date(booking.date).getMonth() + 1
        return bookingMonth === selectedMonth
      })
    }

    // Filtro por status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === selectedStatus)
    }

    // Ordenar por data (mais recente primeiro)
    filtered.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time).getTime()
      const dateB = new Date(b.date + 'T' + b.time).getTime()
      return dateB - dateA
    })

    return filtered
  }, [allBookings, selectedYear, selectedMonth, selectedStatus])

  // Paginação
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE)
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredBookings.slice(startIndex, endIndex)
  }, [filteredBookings, currentPage])

  // Reset página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedYear, selectedMonth, selectedStatus])

  // Anos disponíveis (para o filtro)
  const availableYears = useMemo(() => {
    const years = new Set(allBookings.map(b => new Date(b.date).getFullYear()))
    return Array.from(years).sort((a, b) => b - a)
  }, [allBookings])

  // Meses do ano
  const months = [
    { value: 'all', label: 'Todos os meses' },
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' }
  ]

  // Estatísticas
  const stats = useMemo(() => {
    const total = filteredBookings.length
    const completed = filteredBookings.filter(b => b.status === 'completed').length
    const cancelled = filteredBookings.filter(b => b.status === 'cancelled').length
    const totalRevenue = filteredBookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.price, 0)

    return { total, completed, cancelled, totalRevenue }
  }, [filteredBookings])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Mostrar todas as páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Mostrar com reticências
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      pages.push(totalPages)
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* Botão Anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border border-border bg-surface text-text disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold hover:text-gold transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Números das páginas */}
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-text-dim">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === currentPage

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`min-w-[40px] h-10 px-3 rounded-lg border font-medium transition-all ${
                isActive
                  ? 'border-gold bg-gold text-[#0a0a0a]'
                  : 'border-border bg-surface text-text hover:border-gold hover:text-gold'
              }`}
            >
              {pageNumber}
            </button>
          )
        })}

        {/* Botão Próximo */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border border-border bg-surface text-text disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold hover:text-gold transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-dim">Carregando histórico...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">
          Histórico de Agendamentos
        </h1>
        <p className="text-text-dim">
          Visualize e gerencie todos os agendamentos passados
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-delayed">
        <div className="card">
          <p className="text-text-dim text-sm mb-1">Total</p>
          <p className="text-2xl font-bold text-text">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-text-dim text-sm mb-1">Concluídos</p>
          <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
        </div>
        <div className="card">
          <p className="text-text-dim text-sm mb-1">Cancelados</p>
          <p className="text-2xl font-bold text-red-400">{stats.cancelled}</p>
        </div>
        <div className="card">
          <p className="text-text-dim text-sm mb-1">Receita</p>
          <p className="text-2xl font-bold text-gold">R$ {stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card animate-fade-in-delayed">
        <h3 className="text-lg font-semibold text-text mb-4">Filtros</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro de Ano */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">Ano</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:border-gold transition-colors"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Filtro de Mês */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">Mês</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:border-gold transition-colors"
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>

          {/* Filtro de Status */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'completed' | 'cancelled')}
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:border-gold transition-colors"
            >
              <option value="all">Todos os status</option>
              <option value="completed">Concluídos</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="animate-fade-in-delayed">
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-dim text-sm">
            Mostrando {paginatedBookings.length} de {filteredBookings.length} agendamentos
          </p>
          {filteredBookings.length > 0 && (
            <p className="text-text-dim text-sm">
              Página {currentPage} de {totalPages}
            </p>
          )}
        </div>

        {/* Lista de Agendamentos */}
        {paginatedBookings.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-text-dim">Nenhum agendamento encontrado com os filtros selecionados</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {paginatedBookings.map((booking) => {
              const dateObj = new Date(booking.date + 'T' + booking.time)
              const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short',
                year: 'numeric',
                weekday: 'short'
              })
              
              const statusConfig = {
                completed: { 
                  label: 'Concluído', 
                  color: 'text-green-400', 
                  bg: 'bg-green-400/15 border-green-400/30',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )
                },
                cancelled: { 
                  label: 'Cancelado', 
                  color: 'text-red-400', 
                  bg: 'bg-red-400/15 border-red-400/30',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )
                },
                scheduled: { 
                  label: 'Agendado', 
                  color: 'text-blue-400', 
                  bg: 'bg-blue-400/15 border-blue-400/30',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              }
              const status = statusConfig[booking.status]

              return (
                <div
                  key={booking.id}
                  className="card card-hover cursor-pointer"
                  onClick={() => navigate(`/agendamentos/${booking.id}`)}
                >
                  <div className="grid gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xl font-bold text-text">{booking.time}</span>
                          <span className="text-lg font-semibold text-text uppercase">{booking.clientName}</span>
                        </div>
                        <p className="text-sm text-text-dim capitalize">{formattedDate}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${status.bg} ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </div>
                    </div>

                    {/* Informações em grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-text-dim mb-1">Telefone</p>
                        <p className="text-sm text-text font-medium">{booking.clientPhone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-dim mb-1">Profissional</p>
                        <p className="text-sm text-text font-medium">{booking.professionalName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-dim mb-1">Serviço</p>
                        <p className="text-sm text-text font-medium">{booking.serviceName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-dim mb-1">Valor</p>
                        <p className="text-sm text-gold font-bold">R$ {booking.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Informação adicional para cancelados */}
                    {booking.status === 'cancelled' && booking.cancelledBy && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs text-red-400/70">
                          Cancelado por: {booking.cancelledBy === 'admin' ? 'Administrador' : 'Cliente'}
                          {booking.cancelledAt && ` • ${new Date(booking.cancelledAt).toLocaleDateString('pt-BR')}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Paginação */}
        {renderPagination()}
      </div>
    </div>
  )
}
