import React, { createContext, useContext, useMemo, useReducer } from 'react'

export type Professional = {
  id: string
  name: string
  specialty?: string
  image?: string
}

export type BookingState = {
  professional?: Professional
  serviceId?: string
  date?: string // ISO date YYYY-MM-DD
  time?: string // HH:mm
  fullName?: string
  phone?: string
}

const initialState: BookingState = {}

type Action =
  | { type: 'setProfessional'; professional: Professional }
  | { type: 'setService'; serviceId: string }
  | { type: 'setDate'; date: string }
  | { type: 'setTime'; time: string }
  | { type: 'setFullName'; fullName: string }
  | { type: 'setPhone'; phone: string }
  | { type: 'reset' }

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'setProfessional':
      return { ...state, professional: action.professional }
    case 'setDate':
      return { ...state, date: action.date, time: undefined }
    case 'setService':
      return { ...state, serviceId: action.serviceId }
    case 'setTime':
      return { ...state, time: action.time }
    case 'setFullName':
      return { ...state, fullName: action.fullName }
    case 'setPhone':
      return { ...state, phone: action.phone }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
