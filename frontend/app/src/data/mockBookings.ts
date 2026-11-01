import { Booking } from '../types/bookings'

/**
 * Mock data for bookings
 * TODO: Replace with real API calls when backend is ready
 * 
 * API endpoint structure (future):
 * GET /api/bookings?phone={phone}
 * Response: { bookings: Booking[], nextBooking?: Booking }
 */

export const mockBookings: Booking[] = [
  {
    id: 'bk_001',
    professionalName: 'Bruno Silva',
    serviceName: 'Corte de cabelo',
    date: '2025-12-05',
    time: '14:00',
    status: 'scheduled',
    clientName: 'João Silva',
    clientPhone: '31999999999',
    price: 35.0,
    createdAt: '2025-11-28T10:30:00Z'
  },
  {
    id: 'bk_002',
    professionalName: 'Marcos Vieira',
    serviceName: 'Barba/Acabamento',
    date: '2025-12-10',
    time: '16:30',
    status: 'scheduled',
    clientName: 'João Silva',
    clientPhone: '31999999999',
    price: 25.0,
    createdAt: '2025-11-29T14:20:00Z'
  },
  {
    id: 'bk_003',
    professionalName: 'Bruno Silva',
    serviceName: 'Degradê',
    date: '2025-11-25',
    time: '10:00',
    status: 'completed',
    clientName: 'João Silva',
    clientPhone: '31999999999',
    price: 45.0,
    createdAt: '2025-11-20T09:15:00Z'
  },
  {
    id: 'bk_004',
    professionalName: 'Ana Paula',
    serviceName: 'Sobrancelha',
    date: '2025-11-18',
    time: '15:00',
    status: 'cancelled',
    clientName: 'João Silva',
    clientPhone: '31999999999',
    price: 15.0,
    createdAt: '2025-11-15T11:45:00Z'
  },
  {
    id: 'bk_005',
    professionalName: 'Bruno Silva',
    serviceName: 'Corte de cabelo',
    date: '2025-11-10',
    time: '09:30',
    status: 'completed',
    clientName: 'João Silva',
    clientPhone: '31999999999',
    price: 35.0,
    createdAt: '2025-11-05T16:00:00Z'
  }
]

/**
 * Simulates API call to fetch user bookings
 * @param phone - User's phone number
 * @returns Promise with bookings data
 */
export async function fetchUserBookings(phone: string): Promise<{ bookings: Booking[]; nextBooking?: Booking }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // TODO: Replace with actual API call when backend is ready
  // GET /api/bookings?phone={phone}
  
  // Normalize phone number (remove all non-digits)
  const normalizedPhone = phone.replace(/\D/g, '')
  
  // Get bookings from localStorage (temporary solution)
  const localBookings = JSON.parse(localStorage.getItem('userBookings') || '[]') as Booking[]
  
  // Combine with mock data
  const allBookings = [...localBookings, ...mockBookings]
  
  // Filter bookings by phone (normalize both sides)
  const userBookings = allBookings.filter(b => b.clientPhone.replace(/\D/g, '') === normalizedPhone)
  
  // Find next scheduled booking
  const scheduled = userBookings
    .filter(b => b.status === 'scheduled')
    .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
  
  const nextBooking = scheduled.length > 0 ? scheduled[0] : undefined
  
  return {
    bookings: userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    nextBooking
  }
}
