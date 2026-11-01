import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { ToastProvider } from './providers/ToastProvider'
import { NotificationsProvider } from '@barber/features/notifications/providers/NotificationsProvider'
import { NotificationProvider } from '@barber/contexts/NotificationContext'
import { NavbarPreferenceProvider } from './providers/NavbarPreferenceProvider'
import { initPWA } from '@barber/utils/pwa'
import '@barber/styles/index.css'

// Inicializa PWA
initPWA()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <NavbarPreferenceProvider>
        <NotificationProvider>
          <ToastProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </ToastProvider>
        </NotificationProvider>
      </NavbarPreferenceProvider>
    </HashRouter>
  </StrictMode>
)
