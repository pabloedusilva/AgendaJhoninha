import { createContext, useContext, useState, ReactNode } from 'react'
import { Booking, BookingsFilter } from '../types/bookings'

interface MyBookingsContextValue {
  userPhone: string | null
  setUserPhone: (phone: string) => void
  filter: BookingsFilter
  setFilter: (filter: BookingsFilter) => void
  bookings: Booking[]
  setBookings: (bookings: Booking[]) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const MyBookingsContext = createContext<MyBookingsContextValue | undefined>(undefined)

export function MyBookingsProvider({ children }: { children: ReactNode }) {
  const [userPhone, setUserPhone] = useState<string | null>(null)
  const [filter, setFilter] = useState<BookingsFilter>({ status: 'all' })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <MyBookingsContext.Provider
      value={{
        userPhone,
        setUserPhone,
        filter,
        setFilter,
        bookings,
        setBookings,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </MyBookingsContext.Provider>
  )
}

export function useMyBookings() {
  const ctx = useContext(MyBookingsContext)
  if (!ctx) throw new Error('useMyBookings must be used within MyBookingsProvider')
  return ctx
}
