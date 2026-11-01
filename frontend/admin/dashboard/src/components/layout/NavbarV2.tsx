import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useOfflineDetection } from '@barber/hooks/useOfflineDetection'
import NotificationsBell from '@barber/components/notifications/NotificationsBell'
import NotificationsPanel from '@barber/components/notifications/NotificationsPanel'
import { useNotifications } from '@barber/features/notifications/hooks/useNotifications'

// ── NavItem definition ────────────────────────────────────────────────────────
interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Agendamentos',
    path: '/agendamentos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Histórico',
    path: '/historico',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Serviços',
    path: '/servicos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
  {
    label: 'Profissionais',
    path: '/profissionais',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: 'Horários',
    path: '/horarios',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Configurações',
    path: '/configuracoes',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Minha Conta',
    path: '/conta',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// NavbarV2 – drawer-style sidebar layout
// ═══════════════════════════════════════════════════════════════════════════════
export default function NavbarV2() {
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const { count: notificationsCount } = useNotifications()

  useOfflineDetection()

  // Close sidebar when route changes
  const location = useLocation()
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('barber_auth_demo')
    localStorage.removeItem('barber_remember')
    navigate('/login')
  }

  return (
    <div className="navv2-shell">
      {/* ── Sidebar ── */}
      <aside className={`navv2-sidebar${sidebarOpen ? ' open' : ''}`}>

        {/* Close button (mobile only) */}
        <div className="flex items-center justify-between gap-3 mb-5 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="navv2-hamburger-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}>
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Logo Header */}
        <div className="w-full mb-4 px-2">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src="/assets/images/logos/jhoninhadocorte.png"
              alt="Jhoninha do Corte"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/70 mb-3" />

        {/* Navigation */}
        <nav className="flex flex-col gap-[5px] flex-1 overflow-y-auto overflow-x-hidden py-1 scrollbar-hide">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `navv2-menu-item${isActive ? ' active' : ''}`
              }
            >
              <span className="navv2-menu-icon">{item.icon}</span>
              <span className="navv2-menu-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer – Logout */}
        <div className="pt-4 mt-2 border-t border-border/80">
          <button type="button" className="navv2-logout-btn" onClick={handleLogout}>
            <span className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}>
                <path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M14 17l5-5-5-5M19 12H9" />
              </svg>
            </span>
            <span className="navv2-logout-label">Sair</span>
          </button>
        </div>
      </aside>

      {/* ── Main column ── */}
      <div className="navv2-main-col">

        {/* Click-catcher: closes sidebar when user taps the tilted content area */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Top bar */}
        <header className="flex-none z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-border pt-safe">
          <div className="flex items-center gap-3 px-4 md:px-6 py-4">
            {/* Hamburger (mobile/tablet) */}
            <button
              type="button"
              aria-label="Abrir menu"
              className={`navv2-hamburger-btn lg:hidden ${sidebarOpen ? 'is-hidden' : ''}`}
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}>
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>

            {/* Notifications – always visible in topbar, aligned right */}
            <div className="ml-auto flex items-center">
              <NotificationsBell
                count={notificationsCount}
                onClick={() => { setShowNotifications(true) }}
              />
            </div>
          </div>

        </header>

        {/* Page content */}
        <main data-app-scroll className="scroll-container flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        <NotificationsPanel
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>

      {/* Dark overlay (mobile) – clicking outside closes sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
