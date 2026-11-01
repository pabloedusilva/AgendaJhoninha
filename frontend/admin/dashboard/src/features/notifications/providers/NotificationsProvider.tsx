import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getMockNotifications } from '@barber/data/mockNotifications'
import type { Booking } from '@barber/data/mockBookings'
import type { AppNotification, NotificationKind } from '../types'
import { createNotificationFromBooking } from '../utils/bookingNotifications'
import { loadNotifications, saveNotifications } from '../utils/notifications.storage'

type NotificationsContextValue = {
  notifications: AppNotification[]
  count: number
  add: (notification: Omit<AppNotification, 'id'>) => string
  addFromBooking: (booking: Booking, kind: NotificationKind) => string
  remove: (id: string) => void
  clearAll: () => void
  markRead: (id: string) => void
  markAllRead: () => void
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (crypto as any).randomUUID()
  }
  return `ntf_${Math.random().toString(36).slice(2)}_${Date.now()}`
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => loadNotifications())

  // Seed inicial: se não houver nada salvo ainda, usa apenas o mock de notificações (arquivo removível).
  useEffect(() => {
    if (notifications.length > 0) return

    const seeded = getMockNotifications()
    setNotifications(seeded)
    saveNotifications(seeded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    saveNotifications(notifications)
  }, [notifications])

  const add = useCallback((notification: Omit<AppNotification, 'id'>) => {
    const id = newId()
    setNotifications((prev) => [{ id, ...notification }, ...prev])
    return id
  }, [])

  const addFromBooking = useCallback(
    (booking: Booking, kind: NotificationKind) => {
      return add(createNotificationFromBooking(booking, kind))
    },
    [add]
  )

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, readAt: n.readAt ?? Date.now() } : n))
    )
  }, [])

  const markAllRead = useCallback(() => {
    const now = Date.now()
    setNotifications((prev) => prev.map((n) => ({ ...n, readAt: n.readAt ?? now })))
  }, [])

  const value = useMemo<NotificationsContextValue>(
    () => ({
      notifications,
      count: notifications.length,
      add,
      addFromBooking,
      remove,
      clearAll,
      markRead,
      markAllRead
    }),
    [notifications, add, addFromBooking, remove, clearAll, markRead, markAllRead]
  )

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotificationsContext(): NotificationsContextValue {
  const ctx = useContext(NotificationsContext)
  if (!ctx) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }
  return ctx
}
