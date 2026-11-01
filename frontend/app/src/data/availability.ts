import { Professional } from '@context/BookingContext'

export const professionals: Professional[] = [
  { id: '1', name: 'Jhoninha do Corte', specialty: 'Barbeiro', image: '/assets/images/exemplo/profile11.jpg' }
]

export const services = [
  { id: 'svc_cut', name: 'Corte de cabelo', price: 35.0, duration: 45, image: '/assets/images/services/servico-cabelo-preto.jpg' },
  { id: 'svc_barbe', name: 'Barba/Acabamento', price: 25.0, duration: 30, image: '/assets/images/services/servico-barba-preto.jpg' },
  { id: 'svc_sobr', name: 'Sobrancelha', price: 15.0, duration: 30, image: '/assets/images/services/servico-sobrancelha-preto.jpg' },
  { id: 'svc_pig', name: 'Pigmentação', price: 60.0, duration: 60, image: '/assets/images/services/servico-maquina-preto.jpg' },
  { id: 'svc_degrade', name: 'Degradê', price: 45.0, duration: 45, image: '/assets/images/services/servico-corte2-preto.jpg' },
  { id: 'svc_kids', name: 'Infantil', price: 30.0, duration: 30, image: '/assets/images/services/servico-corte-infantil-preto.jpg' }
]

/**
 * Gera horários disponíveis dinamicamente de acordo com a duração do serviço.
 * Segunda a sábado: 08:00-12:00 e 14:00-20:00
 * Domingo: sem horários
 */
export function generateTimeSlots(dateISO: string, durationMinutes: number): string[] {
  const [y, m, d] = dateISO.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const dayOfWeek = date.getDay()
  
  // Domingo = 0, sem horários
  if (dayOfWeek === 0) return []
  
  const slots: string[] = []
  const periods = [
    { start: 8 * 60, end: 12 * 60 },     // 08:00 - 12:00
    { start: 14 * 60, end: 20 * 60 }     // 14:00 - 20:00
  ]
  
  for (const period of periods) {
    let current = period.start
    while (current + durationMinutes <= period.end) {
      const hours = Math.floor(current / 60)
      const mins = current % 60
      const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
      slots.push(timeStr)
      current += durationMinutes
    }
  }
  
  return slots
}

// Availability agora é gerado dinamicamente, mas mantemos estrutura para compatibilidade
export const availability: Record<string, Record<string, string[]>> = {}
