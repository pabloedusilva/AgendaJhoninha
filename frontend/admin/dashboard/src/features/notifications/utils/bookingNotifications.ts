import type { Booking } from '@barber/data/mockBookings'
import type { AppNotification, NotificationKind } from '../types'

function formatDatePT(dateStr?: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  })
}

export function createNotificationFromBooking(
  booking: Booking,
  kind: NotificationKind
): Omit<AppNotification, 'id'> {
  const when = `${formatDatePT(booking.date)} • ${booking.time}`

  if (kind === 'booking_cancelled') {
    return {
      kind,
      title: 'Agendamento cancelado',
      message: `${booking.clientName} • ${booking.serviceName} • ${when}`,
      createdAt: Date.now(),
      data: {
        bookingId: booking.id,
        clientName: booking.clientName,
        serviceName: booking.serviceName,
        date: booking.date,
        time: booking.time,
        status: booking.status
      }
    }
  }

  if (kind === 'booking_upcoming') {
    return {
      kind,
      title: 'Agendamento chegando',
      message: `${booking.clientName} • ${booking.serviceName} • ${when}`,
      createdAt: Date.now(),
      data: {
        bookingId: booking.id,
        clientName: booking.clientName,
        serviceName: booking.serviceName,
        date: booking.date,
        time: booking.time,
        status: booking.status
      }
    }
  }

  return {
    kind: 'booking_created',
    title: 'Novo agendamento',
    message: `${booking.clientName} • ${booking.serviceName} • ${when}`,
    createdAt: Date.now(),
    data: {
      bookingId: booking.id,
      clientName: booking.clientName,
      serviceName: booking.serviceName,
      date: booking.date,
      time: booking.time,
      status: booking.status
    }
  }
}
