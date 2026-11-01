/**
 * Mock Notifications Data
 *
 * Este arquivo contém dados de exemplo para notificações.
 * Será removido quando a integração com backend for implementada.
 *
 * TODO: Backend Integration
 * - Substituir por chamadas à API: GET /api/notifications
 * - Implementar leitura/remoção/limpar tudo
 */

import type { AppNotification } from '@barber/features/notifications/types'

function dayISO(offsetDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().split('T')[0]
}

function at(dateISO: string, time: string): number {
  // dateISO = YYYY-MM-DD
  return new Date(`${dateISO}T${time}:00`).getTime()
}

/**
 * Gera 10 notificações de exemplo (mockup).
 */
export const getMockNotifications = (): AppNotification[] => {
  const today = dayISO(0)
  const tomorrow = dayISO(1)
  const yesterday = dayISO(-1)

  return [
    {
      id: 'mock-ntf-001',
      kind: 'booking_created',
      title: 'Novo agendamento',
      message: `João Silva • Corte + Barba • qua., ${yesterday.split('-')[2]} de jan. • 14:30`,
      createdAt: at(yesterday, '16:49'),
      data: {
        bookingId: 'mock-booking-1',
        clientName: 'João Silva',
        serviceName: 'Corte + Barba',
        date: yesterday,
        time: '14:30',
        status: 'scheduled'
      }
    },
    {
      id: 'mock-ntf-002',
      kind: 'booking_created',
      title: 'Novo agendamento',
      message: `Pedro Santos • Corte Social • qua., ${yesterday.split('-')[2]} de jan. • 15:00`,
      createdAt: at(yesterday, '16:49'),
      data: {
        bookingId: 'mock-booking-2',
        clientName: 'Pedro Santos',
        serviceName: 'Corte Social',
        date: yesterday,
        time: '15:00',
        status: 'scheduled'
      }
    },
    {
      id: 'mock-ntf-003',
      kind: 'booking_created',
      title: 'Novo agendamento',
      message: `Carlos Oliveira • Barba Completa • qua., ${yesterday.split('-')[2]} de jan. • 16:30`,
      createdAt: at(yesterday, '16:49'),
      data: {
        bookingId: 'mock-booking-3',
        clientName: 'Carlos Oliveira',
        serviceName: 'Barba Completa',
        date: yesterday,
        time: '16:30',
        status: 'scheduled'
      }
    },
    {
      id: 'mock-ntf-004',
      kind: 'booking_created',
      title: 'Novo agendamento',
      message: `Rafael Costa • Corte + Barba • qua., ${yesterday.split('-')[2]} de jan. • 17:00`,
      createdAt: at(yesterday, '16:49'),
      data: {
        bookingId: 'mock-booking-4',
        clientName: 'Rafael Costa',
        serviceName: 'Corte + Barba',
        date: yesterday,
        time: '17:00',
        status: 'scheduled'
      }
    },

    {
      id: 'mock-ntf-005',
      kind: 'booking_upcoming',
      title: 'Agendamento chegando',
      message: `Hoje • 09:30 • Marcelo Lima • Corte Social`,
      createdAt: at(today, '08:10'),
      data: {
        bookingId: 'mock-booking-5',
        clientName: 'Marcelo Lima',
        serviceName: 'Corte Social',
        date: today,
        time: '09:30',
        status: 'scheduled'
      }
    },
    {
      id: 'mock-ntf-006',
      kind: 'booking_created',
      title: 'Novo agendamento',
      message: `Hoje • 11:00 • Ana Beatriz • Barba Completa`,
      createdAt: at(today, '09:02'),
      data: {
        bookingId: 'mock-booking-6',
        clientName: 'Ana Beatriz',
        serviceName: 'Barba Completa',
        date: today,
        time: '11:00',
        status: 'scheduled'
      }
    },
    {
      id: 'mock-ntf-007',
      kind: 'booking_cancelled',
      title: 'Agendamento cancelado',
      message: `Hoje • 13:30 • Bruno Alves • Corte + Barba`,
      createdAt: at(today, '10:21'),
      data: {
        bookingId: 'mock-booking-7',
        clientName: 'Bruno Alves',
        serviceName: 'Corte + Barba',
        date: today,
        time: '13:30',
        status: 'cancelled'
      }
    },
    {
      id: 'mock-ntf-008',
      kind: 'booking_created',
      title: 'Novo agendamento',
      message: `Hoje • 16:00 • Lucas Pereira • Corte Navalhado`,
      createdAt: at(today, '12:05'),
      data: {
        bookingId: 'mock-booking-8',
        clientName: 'Lucas Pereira',
        serviceName: 'Corte Navalhado',
        date: today,
        time: '16:00',
        status: 'scheduled'
      }
    },
    {
      id: 'mock-ntf-009',
      kind: 'booking_upcoming',
      title: 'Agendamento amanhã',
      message: `Amanhã • 10:00 • Thiago Souza • Corte + Barba`,
      createdAt: at(today, '14:18'),
      data: {
        bookingId: 'mock-booking-9',
        clientName: 'Thiago Souza',
        serviceName: 'Corte + Barba',
        date: tomorrow,
        time: '10:00',
        status: 'scheduled'
      }
    },
    {
      id: 'mock-ntf-010',
      kind: 'booking_created',
      title: 'Novo agendamento',
      message: `Amanhã • 14:00 • Fernanda Rocha • Corte Social`,
      createdAt: at(today, '15:30'),
      data: {
        bookingId: 'mock-booking-10',
        clientName: 'Fernanda Rocha',
        serviceName: 'Corte Social',
        date: tomorrow,
        time: '14:00',
        status: 'scheduled'
      }
    }
  ]
}

export const getMockNotificationById = (id: string): AppNotification | undefined => {
  return getMockNotifications().find((n) => n.id === id)
}
