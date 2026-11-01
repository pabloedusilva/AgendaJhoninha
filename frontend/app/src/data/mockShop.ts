export const mockShop = {
  id: 'shop_jhoninha_do_corte',
  name: 'Jhoninha do Corte - Agendamentos',
  slogan: 'Barbearia Premium',
  logo: '/assets/images/logos/jhoninhadocorte.png',

  barberName: 'Jhoninha do Corte',
  barberImage: '/assets/images/exemplo/profile11.jpg',

  phone: '5531985079718',
  instagram: 'jhoninha_do_corte',
  address: 'Rua das Flores, 123 – BH/MG',
  hours: {
    weekdays: { label: 'Seg – Sex', open: '08:00', close: '19:00' },
    saturday: { label: 'Sábado',   open: '08:00', close: '17:00' },
    sunday:   { label: 'Domingo',  closed: true },
  },
}

export function isShopOpen(): boolean {
  const now  = new Date()
  const day  = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  if (day >= 1 && day <= 5) return hour >= 8 && hour < 19
  if (day === 6)            return hour >= 8 && hour < 17
  return false
}
