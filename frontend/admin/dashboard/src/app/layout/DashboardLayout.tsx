import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useOfflineDetection } from '@barber/hooks/useOfflineDetection'
import NotificationsBell from '@barber/components/notifications/NotificationsBell'
import NotificationsPanel from '@barber/components/notifications/NotificationsPanel'
import { useNotifications } from '@barber/features/notifications/hooks/useNotifications'
import { useNavbarPreference } from '@barber/hooks/useNavbarPreference'
import NavbarV2 from '@barber/components/layout/NavbarV2'

export default function DashboardLayout() {
  const { navbarStyle } = useNavbarPreference()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)

  const { count: notificationsCount } = useNotifications()
  
  // Detecta quando o usuário fica offline
  useOfflineDetection()

  const handleLogout = () => {
    // TODO: Backend integration - Call logout API
    // DELETE /api/auth/session or POST /api/auth/logout
    localStorage.removeItem('barber_auth_demo')
    localStorage.removeItem('barber_remember')
    navigate('/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'Agendamentos',
      path: '/agendamentos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Histórico',
      path: '/historico',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Serviços',
      path: '/servicos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      )
    },
    {
      label: 'Profissionais',
      path: '/profissionais',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'Horários',
      path: '/horarios',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Configurações',
      path: '/configuracoes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      label: 'Minha Conta',
      path: '/conta',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ]

  // iOS PWA: BODY/#root não rolam; apenas o <main data-app-scroll> é o container de scroll.
  // Delegate rendering to NavbarV2 when Option 2 is selected
  if (navbarStyle === 'option2') {
    return <NavbarV2 />
  }

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-bg to-bg-soft overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-border z-50">
        <div className="flex flex-col h-full w-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="w-full">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src="/assets/images/logos/jhoninhadocorte.png"
                  alt="Jhoninha do Corte"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gold text-[#1b1408] font-semibold shadow-lg shadow-gold/20'
                          : 'text-text-dim hover:text-text hover:bg-surface'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Column */}
      <div className="lg:ml-64 flex h-full flex-col">
        {/* Top Bar */}
        <header className="flex-none z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-border pt-safe">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Logo for Mobile */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="w-24 h-10 overflow-hidden rounded-lg">
                <img
                  src="/assets/images/logos/jhoninhadocorte.png"
                  alt="Jhoninha do Corte"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <NotificationsBell
                count={notificationsCount}
                onClick={() => {
                  setShowNotifications(true)
                }}
              />
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-all hover:scale-105"
                title="Sair"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content (única área rolável) */}
        <main data-app-scroll className="scroll-container flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation (sem position:fixed; evita bugs de touch/scroll no iOS) */}
        <nav className="lg:hidden flex-none z-40 bottom-nav">
          <div className="relative bg-black/95 backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1 px-4 py-4 pb-safe min-w-max">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex-1 min-w-[75px]"
                  >
                    {({ isActive }) => (
                      <div className="relative">
                        {isActive && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gold rounded-full"></div>
                        )}
                        <div className="flex flex-col items-center gap-2 py-2.5">
                          <div className={`transition-all duration-300 text-xl ${
                            isActive ? 'text-gold scale-110' : 'text-text-dim'
                          }`}>
                            {item.icon}
                          </div>
                          <span className={`text-[9px] font-semibold tracking-tight transition-colors duration-300 ${
                            isActive ? 'text-gold' : 'text-text-dim/70'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      </div>
    </div>
  )
}

