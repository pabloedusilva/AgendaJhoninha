import type { AppNotification } from '../types'

const STORAGE_KEY = 'barber_notifications_v1'

function safeParse(json: string): unknown {
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}

function isNotification(value: any): value is AppNotification {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.kind === 'string' &&
    typeof value.title === 'string' &&
    typeof value.message === 'string' &&
    typeof value.createdAt === 'number'
  )
}

export function loadNotifications(): AppNotification[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  const parsed = safeParse(raw)
  if (!Array.isArray(parsed)) return []

  return parsed.filter(isNotification)
}

export function saveNotifications(items: AppNotification[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function clearNotificationsStorage(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}
