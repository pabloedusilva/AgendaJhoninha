import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import DashboardLayout from './layout/DashboardLayout'
import AuthLayout from '@auth/layout/AuthLayout'

// Auth Pages
import Login from '@auth/pages/Login'
import Logout from '@auth/pages/Logout'

// Dashboard Pages
import DashboardHome from '@barber/pages/dashboard/Home'
import BookingsList from '@barber/pages/schedule/BookingsList'
import BookingDetails from '@barber/pages/schedule/BookingDetails'
import History from '@barber/pages/schedule/History'
import ServicesList from '@barber/pages/services/ListServices'
import ProfessionalsList from '@barber/pages/settings/Staff'
import WorkingHoursSettings from '@barber/pages/settings/WorkingHours'
import BarbershopSettings from '@barber/pages/settings/Profile'
import AccountSettings from '@barber/pages/settings/Account'
import NotFoundPage from '@barber/pages/NotFoundPage'
import OfflinePage from '@barber/pages/offline/OfflinePage'

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const goOffline = () => navigate('/offline', { replace: true })
    const goOnline  = () => navigate('/dashboard', { replace: true })

    if (!navigator.onLine) goOffline()

    window.addEventListener('offline', goOffline)
    window.addEventListener('online',  goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online',  goOnline)
    }
  }, [navigate])

  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="logout" element={<Logout />} />

        {/* Dashboard Routes (Protected) */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
        </Route>

        <Route path="agendamentos" element={<DashboardLayout />}>
          <Route index element={<BookingsList />} />
          <Route path=":id" element={<BookingDetails />} />
        </Route>

        <Route path="historico" element={<DashboardLayout />}>
          <Route index element={<History />} />
        </Route>

        <Route path="servicos" element={<DashboardLayout />}>
          <Route index element={<ServicesList />} />
        </Route>

        <Route path="profissionais" element={<DashboardLayout />}>
          <Route index element={<ProfessionalsList />} />
        </Route>

        <Route path="horarios" element={<DashboardLayout />}>
          <Route index element={<WorkingHoursSettings />} />
        </Route>

        <Route path="configuracoes" element={<DashboardLayout />}>
          <Route index element={<BarbershopSettings />} />
        </Route>

        <Route path="conta" element={<DashboardLayout />}>
          <Route index element={<AccountSettings />} />
        </Route>

        {/* Offline page */}
        <Route path="offline" element={<OfflinePage />} />

        {/* Redirect empty path to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}