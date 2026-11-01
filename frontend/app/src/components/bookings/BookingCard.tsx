import { Booking, BookingStatus } from '../../types/bookings'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface BookingCardProps {
  booking: Booking
  onCancel?: (bookingId: string) => void
}

const statusConfig: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  scheduled: { label: 'Agendado', color: 'text-blue-400', bg: 'bg-blue-400/15 border-blue-400/30' },
  completed: { label: 'Concluído', color: 'text-green-400', bg: 'bg-green-400/15 border-green-400/30' },
  cancelled: { label: 'Cancelado', color: 'text-red-400', bg: 'bg-red-400/15 border-red-400/30' }
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  const dateObj = new Date(booking.date + 'T' + booking.time)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  })
  
  const status = statusConfig[booking.status]

  return (
    <Card className="hover:border-gold/30 transition">
      <div className="grid gap-3 min-w-0">
        <div className="flex items-start justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-lg font-semibold text-text">{booking.time}</div>
            <div className="text-sm text-text/70 capitalize truncate">{formattedDate}</div>
          </div>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border whitespace-nowrap flex-shrink-0 ${status.bg} ${status.color}`}>
            {status.label}
          </span>
        </div>

        <div className="grid gap-1.5 text-sm min-w-0">
          <div className="flex justify-between gap-2 min-w-0">
            <span className="text-text/70 flex-shrink-0">Profissional:</span>
            <span className="text-text font-medium text-right truncate">{booking.professionalName}</span>
          </div>
          <div className="flex justify-between gap-2 min-w-0">
            <span className="text-text/70 flex-shrink-0">Serviço:</span>
            <span className="text-text font-medium text-right truncate">{booking.serviceName}</span>
          </div>
          <div className="flex justify-between gap-2 min-w-0">
            <span className="text-text/70 flex-shrink-0">Valor:</span>
            <span className="text-gold font-semibold text-right">R$ {booking.price.toFixed(2)}</span>
          </div>
        </div>

        {booking.status === 'scheduled' && onCancel && (
          <div className="pt-2 border-t border-border">
            <Button
              variant="outline"
              className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400"
              onClick={() => onCancel(booking.id)}
            >
              Cancelar agendamento
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
