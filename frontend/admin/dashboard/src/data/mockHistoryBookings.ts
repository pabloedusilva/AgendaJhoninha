// Mock data para histórico de agendamentos
// TODO: Backend Integration - Remover quando integrar com API real

export interface Booking {
  id: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  clientName: string
  clientPhone: string
  professionalName: string
  professionalId: string
  serviceName: string
  serviceId: string
  price: number
  status: 'completed' | 'cancelled' | 'scheduled'
  cancelledBy?: 'admin' | 'client'
  cancelledAt?: string
  notes?: string
}

// Função para gerar dados mockados de histórico
export function getMockHistoryBookings(): Booking[] {
  const professionals = [
    { id: '1', name: 'Pablo Silva' },
    { id: '2', name: 'João Santos' },
    { id: '3', name: 'Carlos Mendes' }
  ]

  const services = [
    { id: '1', name: 'Corte Masculino', price: 50 },
    { id: '2', name: 'Barba', price: 35 },
    { id: '3', name: 'Corte + Barba', price: 75 },
    { id: '4', name: 'Corte Infantil', price: 40 },
    { id: '5', name: 'Platinado', price: 150 }
  ]

  const clients = [
    { name: 'Roberto Silva', phone: '(11) 98765-4321' },
    { name: 'Fernando Costa', phone: '(11) 97654-3210' },
    { name: 'Marcos Oliveira', phone: '(11) 96543-2109' },
    { name: 'André Santos', phone: '(11) 95432-1098' },
    { name: 'Lucas Ferreira', phone: '(11) 94321-0987' },
    { name: 'Pedro Alves', phone: '(11) 93210-9876' },
    { name: 'Bruno Lima', phone: '(11) 92109-8765' },
    { name: 'Rafael Souza', phone: '(11) 91098-7654' },
    { name: 'Gustavo Rocha', phone: '(11) 90987-6543' },
    { name: 'Thiago Martins', phone: '(11) 89876-5432' },
    { name: 'Diego Pereira', phone: '(11) 88765-4321' },
    { name: 'Rodrigo Dias', phone: '(11) 87654-3210' },
    { name: 'Felipe Gomes', phone: '(11) 86543-2109' },
    { name: 'Eduardo Ribeiro', phone: '(11) 85432-1098' },
    { name: 'Daniel Moreira', phone: '(11) 84321-0987' }
  ]

  const bookings: Booking[] = []
  let idCounter = 1

  // Gerar agendamentos para 2026
  // Outubro (mês atual no sistema)
  const octoberDays = [
    { date: '2026-10-01', slots: 8 },
    { date: '2026-10-02', slots: 9 },
    { date: '2026-10-03', slots: 7 },
    { date: '2026-10-05', slots: 10 },
    { date: '2026-10-06', slots: 8 },
    { date: '2026-10-07', slots: 9 },
    { date: '2026-10-08', slots: 7 },
    { date: '2026-10-09', slots: 8 },
    { date: '2026-10-10', slots: 6 },
    { date: '2026-10-12', slots: 9 },
    { date: '2026-10-13', slots: 8 },
    { date: '2026-10-14', slots: 7 },
    { date: '2026-10-15', slots: 10 },
    { date: '2026-10-16', slots: 9 },
    { date: '2026-10-17', slots: 8 }
  ]

  octoberDays.forEach(day => {
    for (let i = 0; i < day.slots; i++) {
      const hour = 9 + Math.floor(i * 10 / day.slots)
      const minute = (i * 30) % 60
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      const client = clients[Math.floor(Math.random() * clients.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      const professional = professionals[Math.floor(Math.random() * professionals.length)]
      
      // 85% concluídos, 15% cancelados
      const rand = Math.random()
      let status: 'completed' | 'cancelled' = 'completed'
      let cancelledBy: 'admin' | 'client' | undefined
      let cancelledAt: string | undefined

      if (rand > 0.85) {
        status = 'cancelled'
        cancelledBy = Math.random() > 0.5 ? 'admin' : 'client'
        cancelledAt = day.date
      }

      bookings.push({
        id: `hist_${idCounter++}`,
        date: day.date,
        time,
        clientName: client.name,
        clientPhone: client.phone,
        professionalName: professional.name,
        professionalId: professional.id,
        serviceName: service.name,
        serviceId: service.id,
        price: service.price,
        status,
        cancelledBy,
        cancelledAt
      })
    }
  })

  // Setembro (mês anterior)
  const septemberDays = [
    { date: '2026-09-01', slots: 7 },
    { date: '2026-09-02', slots: 8 },
    { date: '2026-09-03', slots: 9 },
    { date: '2026-09-04', slots: 7 },
    { date: '2026-09-05', slots: 6 },
    { date: '2026-09-07', slots: 8 },
    { date: '2026-09-08', slots: 9 },
    { date: '2026-09-09', slots: 10 },
    { date: '2026-09-10', slots: 8 },
    { date: '2026-09-11', slots: 7 },
    { date: '2026-09-12', slots: 6 },
    { date: '2026-09-14', slots: 9 },
    { date: '2026-09-15', slots: 8 },
    { date: '2026-09-16', slots: 10 },
    { date: '2026-09-17', slots: 9 },
    { date: '2026-09-18', slots: 8 },
    { date: '2026-09-19', slots: 7 },
    { date: '2026-09-21', slots: 8 },
    { date: '2026-09-22', slots: 9 },
    { date: '2026-09-23', slots: 10 },
    { date: '2026-09-24', slots: 8 },
    { date: '2026-09-25', slots: 7 },
    { date: '2026-09-26', slots: 6 },
    { date: '2026-09-28', slots: 9 },
    { date: '2026-09-29', slots: 8 },
    { date: '2026-09-30', slots: 10 }
  ]

  septemberDays.forEach(day => {
    for (let i = 0; i < day.slots; i++) {
      const hour = 9 + Math.floor(i * 10 / day.slots)
      const minute = (i * 30) % 60
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      const client = clients[Math.floor(Math.random() * clients.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      const professional = professionals[Math.floor(Math.random() * professionals.length)]
      
      const rand = Math.random()
      let status: 'completed' | 'cancelled' = 'completed'
      let cancelledBy: 'admin' | 'client' | undefined
      let cancelledAt: string | undefined

      if (rand > 0.85) {
        status = 'cancelled'
        cancelledBy = Math.random() > 0.5 ? 'admin' : 'client'
        cancelledAt = day.date
      }

      bookings.push({
        id: `hist_${idCounter++}`,
        date: day.date,
        time,
        clientName: client.name,
        clientPhone: client.phone,
        professionalName: professional.name,
        professionalId: professional.id,
        serviceName: service.name,
        serviceId: service.id,
        price: service.price,
        status,
        cancelledBy,
        cancelledAt
      })
    }
  })

  // Agosto
  const augustDays = [
    { date: '2026-08-03', slots: 8 },
    { date: '2026-08-04', slots: 9 },
    { date: '2026-08-05', slots: 7 },
    { date: '2026-08-06', slots: 8 },
    { date: '2026-08-07', slots: 10 },
    { date: '2026-08-10', slots: 9 },
    { date: '2026-08-11', slots: 8 },
    { date: '2026-08-12', slots: 7 },
    { date: '2026-08-13', slots: 9 },
    { date: '2026-08-14', slots: 10 },
    { date: '2026-08-17', slots: 8 },
    { date: '2026-08-18', slots: 9 },
    { date: '2026-08-19', slots: 7 },
    { date: '2026-08-20', slots: 8 },
    { date: '2026-08-21', slots: 6 },
    { date: '2026-08-24', slots: 10 },
    { date: '2026-08-25', slots: 9 },
    { date: '2026-08-26', slots: 8 },
    { date: '2026-08-27', slots: 7 },
    { date: '2026-08-28', slots: 9 },
    { date: '2026-08-31', slots: 8 }
  ]

  augustDays.forEach(day => {
    for (let i = 0; i < day.slots; i++) {
      const hour = 9 + Math.floor(i * 10 / day.slots)
      const minute = (i * 30) % 60
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      const client = clients[Math.floor(Math.random() * clients.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      const professional = professionals[Math.floor(Math.random() * professionals.length)]
      
      const rand = Math.random()
      let status: 'completed' | 'cancelled' = 'completed'
      let cancelledBy: 'admin' | 'client' | undefined
      let cancelledAt: string | undefined

      if (rand > 0.87) {
        status = 'cancelled'
        cancelledBy = Math.random() > 0.5 ? 'admin' : 'client'
        cancelledAt = day.date
      }

      bookings.push({
        id: `hist_${idCounter++}`,
        date: day.date,
        time,
        clientName: client.name,
        clientPhone: client.phone,
        professionalName: professional.name,
        professionalId: professional.id,
        serviceName: service.name,
        serviceId: service.id,
        price: service.price,
        status,
        cancelledBy,
        cancelledAt
      })
    }
  })

  // Alguns agendamentos de 2025 para ter mais de um ano no filtro
  const december2025Days = [
    { date: '2025-12-01', slots: 6 },
    { date: '2025-12-02', slots: 7 },
    { date: '2025-12-03', slots: 8 },
    { date: '2025-12-05', slots: 9 },
    { date: '2025-12-06', slots: 7 },
    { date: '2025-12-09', slots: 8 },
    { date: '2025-12-10', slots: 10 },
    { date: '2025-12-12', slots: 9 },
    { date: '2025-12-13', slots: 8 },
    { date: '2025-12-16', slots: 7 },
    { date: '2025-12-17', slots: 9 },
    { date: '2025-12-19', slots: 10 },
    { date: '2025-12-20', slots: 8 },
    { date: '2025-12-23', slots: 7 }
  ]

  december2025Days.forEach(day => {
    for (let i = 0; i < day.slots; i++) {
      const hour = 9 + Math.floor(i * 10 / day.slots)
      const minute = (i * 30) % 60
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      const client = clients[Math.floor(Math.random() * clients.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      const professional = professionals[Math.floor(Math.random() * professionals.length)]
      
      const rand = Math.random()
      let status: 'completed' | 'cancelled' = 'completed'
      let cancelledBy: 'admin' | 'client' | undefined
      let cancelledAt: string | undefined

      if (rand > 0.9) {
        status = 'cancelled'
        cancelledBy = Math.random() > 0.5 ? 'admin' : 'client'
        cancelledAt = day.date
      }

      bookings.push({
        id: `hist_${idCounter++}`,
        date: day.date,
        time,
        clientName: client.name,
        clientPhone: client.phone,
        professionalName: professional.name,
        professionalId: professional.id,
        serviceName: service.name,
        serviceId: service.id,
        price: service.price,
        status,
        cancelledBy,
        cancelledAt
      })
    }
  })

  return bookings
}
