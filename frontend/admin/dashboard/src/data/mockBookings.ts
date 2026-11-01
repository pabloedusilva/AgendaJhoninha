/**
 * Mock Bookings Data
 * 
 * Este arquivo contém dados de exemplo para agendamentos.
 * Será removido quando a integração com banco de dados for implementada.
 * 
 * TODO: Backend Integration
 * - Substituir por chamadas à API: GET /api/bookings
 * - Implementar CRUD completo de agendamentos
 */

export interface Booking {
  id: string
  clientName: string
  clientPhone: string
  professionalId: string
  professionalName: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  price: number
  status: 'scheduled' | 'completed' | 'cancelled'
  cancelledBy?: 'client' | 'admin'
  cancelledAt?: string
}

/**
 * Gera agendamentos de exemplo para hoje
 * @returns Array de agendamentos mockados
 */
export const getMockBookings = (): Booking[] => {
  // Data fixa: 18 de outubro de 2026
  const fixedDate = '2026-10-18'

  return [
    {
      id: 'mock-booking-1',
      clientName: 'Pedro Henrique',
      clientPhone: '(11) 98765-4321',
      professionalId: 'barber-1',
      professionalName: 'Jhoninha',
      serviceId: 'service-1',
      serviceName: 'Corte + Barba',
      date: fixedDate,
      time: '22:30',
      price: 60.00,
      status: 'scheduled'
    },
    {
      id: 'mock-booking-2',
      clientName: 'Lucas Oliveira',
      clientPhone: '(11) 97654-3210',
      professionalId: 'barber-1',
      professionalName: 'Jhoninha',
      serviceId: 'service-2',
      serviceName: 'Corte Social',
      date: fixedDate,
      time: '23:00',
      price: 35.00,
      status: 'scheduled'
    },
    {
      id: 'mock-booking-3',
      clientName: 'Gabriel Souza',
      clientPhone: '(11) 96543-2109',
      professionalId: 'barber-1',
      professionalName: 'Jhoninha',
      serviceId: 'service-3',
      serviceName: 'Barba Completa',
      date: fixedDate,
      time: '23:30',
      price: 40.00,
      status: 'scheduled'
    }
  ]
}

/**
 * Obtém um agendamento específico por ID
 * @param bookingId - ID do agendamento
 * @returns Agendamento encontrado ou undefined
 */
export const getMockBookingById = (bookingId: string): Booking | undefined => {
  return getMockBookings().find(booking => booking.id === bookingId)
}
