import { useState, useEffect, useCallback } from 'react'

interface NotificationPermissionState {
  permission: NotificationPermission
  isSupported: boolean
}

const PREFERENCE_KEY = 'notification_preference'

export function useNotificationPermission() {
  const [state, setState] = useState<NotificationPermissionState>({
    permission: 'Notification' in window ? Notification.permission : 'denied',
    isSupported: 'Notification' in window
  })

  useEffect(() => {
    // Listen for permission changes (if supported)
    if ('permissions' in navigator && 'Notification' in window) {
      navigator.permissions.query({ name: 'notifications' as PermissionName })
        .then((permissionStatus) => {
          // Update initial state
          setState(prev => ({ 
            ...prev, 
            permission: permissionStatus.state as NotificationPermission 
          }))
          
          // Listen for changes
          permissionStatus.addEventListener('change', () => {
            setState(prev => ({ 
              ...prev, 
              permission: permissionStatus.state as NotificationPermission 
            }))
          })
        })
        .catch((err) => {
          console.warn('[Notifications] Permissions API not available:', err)
        })
    }
  }, [])

  const shouldShowModal = useCallback(() => {
    // Show modal if:
    // 1. Notifications are supported
    // 2. Permission is not granted
    const preference = localStorage.getItem(PREFERENCE_KEY)
    return (
      state.isSupported && 
      state.permission !== 'granted' &&
      preference !== 'enabled'
    )
  }, [state.isSupported, state.permission])

  const requestPermission = useCallback(async () => {
    if (!state.isSupported) {
      console.warn('[Notifications] Not supported in this browser')
      return false
    }

    try {
      // Request permission
      const permission = await Notification.requestPermission()
      setState(prev => ({ ...prev, permission }))

      if (permission === 'granted') {
        localStorage.setItem(PREFERENCE_KEY, 'enabled')
        
        // Show a test notification
        new Notification('Notificações Ativadas! 🔔', {
          body: 'Você receberá lembretes sobre seus agendamentos.',
          icon: '/assets/images/logos/logo.png',
          badge: '/assets/images/logos/logo.png',
          tag: 'notification-enabled',
          requireInteraction: false
        })
        
        return true
      } else {
        localStorage.setItem(PREFERENCE_KEY, 'disabled')
        return false
      }
    } catch (error) {
      console.error('[Notifications] Error requesting permission:', error)
      localStorage.setItem(PREFERENCE_KEY, 'disabled')
      return false
    }
  }, [state.isSupported])

  const denyPermission = useCallback(() => {
    // Mark as denied for this session only (will show again on next visit)
    localStorage.setItem(PREFERENCE_KEY, 'disabled')
  }, [])

  const resetPreference = useCallback(() => {
    // Remove preference to show modal again
    localStorage.removeItem(PREFERENCE_KEY)
  }, [])

  return {
    ...state,
    shouldShowModal,
    requestPermission,
    denyPermission,
    resetPreference
  }
}
