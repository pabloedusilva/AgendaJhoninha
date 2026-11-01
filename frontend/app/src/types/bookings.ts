/**
 * Types for My Bookings feature
 * Prepared for future backend integration
 */

export type BookingStatus = 'scheduled' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  professionalName: string
  serviceName: string
  date: string // ISO format YYYY-MM-DD
  time: string // HH:mm
  status: BookingStatus
  clientName: string
  clientPhone: string
  price: number
  createdAt: string // ISO timestamp
}

export interface BookingsFilter {
  status: BookingStatus | 'all'
}

export interface BookingsAPIResponse {
  bookings: Booking[]
  nextBooking?: Booking
}
