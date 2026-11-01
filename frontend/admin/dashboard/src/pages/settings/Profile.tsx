import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Trash2, Bell, BellOff } from 'lucide-react'
import { useNotification } from '../../contexts/NotificationContext'
import { formatPhone } from '../../utils/format'
import { useNavbarPreference, type NavbarStyle } from '../../hooks/useNavbarPreference'

// TODO: Backend Integration
// GET /api/settings/profile - Get barbershop profile
// PUT /api/settings/profile - Update barbershop profile

interface BarbershopProfile {
  name: string
  instagram: string
  whatsapp: string
  bookingLink: string
  showInstagram: boolean
  showWhatsapp: boolean
}

function NavbarStyleSelector() {
  const { navbarStyle, setNavbarStyle } = useNavbarPreference()

  const options: { id: NavbarStyle; label: string; description: string; preview: React.ReactNode }[] = [
    {
      id: 'option1',
      label: 'Barra inferior',
      description: 'Navegação compacta na parte inferior da tela, estilo app mobile clássico.',
      preview: (
        <div className="w-full h-full flex flex-col overflow-hidden rounded-lg bg-[#0f0f10]">
          <div className="bg-[#0a0a0a] border-b border-[#1e1e1e] px-3 py-2 flex items-center justify-between">
            <div className="h-2 w-16 rounded bg-gold/50" />
            <div className="w-3 h-3 rounded-full bg-gold/30 border border-gold/40" />
          </div>
          <div className="flex-1 px-3 py-2 flex flex-col gap-2 overflow-hidden">
            <div className="grid grid-cols-3 gap-1.5">
              {[true, false, false].map((accent, i) => (
                <div key={i} className={`rounded-md p-1.5 flex flex-col gap-1 ${accent ? 'bg-gold/10 border border-gold/20' : 'bg-white/5 border border-white/[0.08]'}`}>
                  <div className={`h-1.5 w-5 rounded ${accent ? 'bg-gold/70' : 'bg-white/20'}`} />
                  <div className={`h-1 w-3 rounded ${accent ? 'bg-gold/40' : 'bg-white/10'}`} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {[1, 0.6, 0.4].map((op, i) => (
                <div key={i} className="flex items-center gap-1.5 py-0.5 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold/20 flex-shrink-0" />
                  <div className="h-1 flex-1 rounded bg-white/15" style={{ opacity: op }} />
                  <div className="h-1 w-4 rounded bg-white/10" style={{ opacity: op }} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#080808] border-t border-[#2a2a2a] px-1 py-1.5 flex items-center justify-around">
            {[
              { active: true,  d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { active: false, d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { active: false, d: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z' },
              { active: false, d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { active: false, d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 px-1.5 py-0.5">
                <svg className={`w-3.5 h-3.5 ${item.active ? 'text-gold' : 'text-white/25'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.d} />
                </svg>
                <div className={`h-0.5 w-3 rounded-full ${item.active ? 'bg-gold' : 'bg-transparent'}`} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'option2',
      label: 'Menu lateral',
      description: 'Sidebar deslizante com animação de inclinação, estilo app premium.',
      preview: (
        <div className="w-full h-full flex overflow-hidden rounded-lg bg-[#0f0f10]">
          <div className="w-[36%] bg-[#090909] border-r border-[#1e1e1e] flex flex-col">
            <div className="px-2 pt-2 pb-1.5 flex items-center gap-1.5 border-b border-[#1e1e1e]">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold to-yellow-700 flex-shrink-0 shadow-sm shadow-gold/30" />
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="h-1 w-full rounded bg-white/35" />
                <div className="h-0.5 w-2/3 rounded bg-white/15" />
              </div>
            </div>
            <div className="flex flex-col gap-0.5 p-1.5 flex-1">
              {[
                { active: true,  d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { active: false, d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { active: false, d: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z' },
                { active: false, d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                { active: false, d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-1 px-1.5 py-1 rounded-lg ${item.active ? 'bg-gold/15' : ''}`}>
                  <svg className={`w-2.5 h-2.5 flex-shrink-0 ${item.active ? 'text-gold' : 'text-white/25'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.d} />
                  </svg>
                  <div className={`h-0.5 flex-1 rounded ${item.active ? 'bg-gold/60' : 'bg-white/12'}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <div className="bg-[#0a0a0a]/90 border-b border-[#1e1e1e] px-2 py-1.5 flex items-center gap-1.5">
              <div className="flex flex-col gap-0.5 w-3">
                <div className="h-0.5 w-full rounded bg-white/40" />
                <div className="h-0.5 w-3/4 rounded bg-white/25" />
                <div className="h-0.5 w-1/2 rounded bg-white/15" />
              </div>
              <div className="h-2 w-10 rounded bg-gold/45 ml-0.5" />
              <div className="ml-auto w-3 h-3 rounded-full bg-white/10 border border-white/15" />
            </div>
            <div className="flex-1 p-2 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-1">
                <div className="rounded-md bg-gold/10 border border-gold/20 p-1.5 flex flex-col gap-1">
                  <div className="h-1.5 w-5 rounded bg-gold/60" />
                  <div className="h-1 w-3 rounded bg-gold/30" />
                </div>
                <div className="rounded-md bg-white/5 border border-white/[0.08] p-1.5 flex flex-col gap-1">
                  <div className="h-1.5 w-4 rounded bg-white/25" />
                  <div className="h-1 w-3 rounded bg-white/12" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {[1, 0.7, 0.4].map((op, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gold/20 flex-shrink-0" style={{ opacity: op }} />
                    <div className="h-0.5 flex-1 rounded bg-white/15" style={{ opacity: op }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map(opt => {
        const isSelected = navbarStyle === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setNavbarStyle(opt.id)}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40
              ${isSelected
                ? 'border-gold shadow-lg shadow-gold/20 bg-gradient-to-b from-[#1e1a10] to-[#141414]'
                : 'border-border bg-surface hover:border-gold/40'
              }`}
          >
            <div className="w-full h-[160px] p-2 bg-[#0c0c0c]">
              {opt.preview}
            </div>

            <div className="flex items-start justify-between gap-3 p-4">
              <div className="flex-1 min-w-0">
                <p className={`font-display text-base uppercase tracking-wider leading-tight ${isSelected ? 'text-gold' : 'text-text'}`}>
                  {opt.label}
                </p>
                <p className="text-xs text-text-dim mt-1 leading-snug">{opt.description}</p>
              </div>

              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${isSelected ? 'border-gold bg-gold' : 'border-border bg-transparent group-hover:border-gold/50'}`}>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-[#1b1408]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

            {isSelected && (
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-gold text-[#1b1408] text-[10px] font-bold uppercase tracking-widest rounded-full">
                Ativo
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}




export default function Profile() {
  const { showSuccess, showError } = useNotification()
  const [profile, setProfile] = useState<BarbershopProfile>({
    name: 'Jhoninha do Corte',
    instagram: '@jhoninhadocorte',
    whatsapp: '(00) 00000-0000',
    // Link de agendamento de exemplo (futuro: será gerado pelo backend com ID único da barbearia)
    bookingLink: 'https://app.example.com.br/#/barbearia/exemplo123',
    showInstagram: true,
    showWhatsapp: true
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [tempProfile, setTempProfile] = useState(profile)
  const [cacheSize, setCacheSize] = useState<number>(0)
  const [isCalculatingCache, setIsCalculatingCache] = useState(false)
  const [isClearingCache, setIsClearingCache] = useState(false)
  const [showClearCacheModal, setShowClearCacheModal] = useState(false)
  const [showCacheSuccessModal, setShowCacheSuccessModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    // Verifica tanto localStorage quanto permissão do navegador
    const stored = localStorage.getItem('notifications_enabled') === 'true'
    const browserPermission = 'Notification' in window ? Notification.permission === 'granted' : false
    return stored && browserPermission
  })
  const [isTogglingNotifications, setIsTogglingNotifications] = useState(false)

  useEffect(() => {
    document.title = 'Agenda Jhoninha | Perfil da Barbearia';
    loadProfile()
    calculateCacheSize()
    checkNotificationPermission()

    // Monitora mudanças de permissão quando usuário retorna à aba
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkNotificationPermission()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Monitora mudanças de permissão em tempo real (se disponível)
    if ('permissions' in navigator && 'Notification' in window) {
      navigator.permissions.query({ name: 'notifications' as PermissionName }).then((permissionStatus) => {
        // Sincroniza estado inicial
        syncNotificationState(permissionStatus.state)
        
        // Adiciona listener para mudanças
        permissionStatus.addEventListener('change', () => {
          syncNotificationState(permissionStatus.state)
        })
      }).catch((err) => {
        console.warn('[Notifications] Permissions API não disponível:', err)
      })
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Sincroniza estado com permissão real do navegador
  const syncNotificationState = (permissionState: PermissionState | string) => {
    const storedPreference = localStorage.getItem('notifications_enabled') === 'true'
    
    if (permissionState === 'granted' && storedPreference) {
      // Permissão concedida e usuário quer receber
      setNotificationsEnabled(true)
    } else if (permissionState === 'denied' || permissionState === 'prompt') {
      // Permissão negada ou ainda não solicitada
      setNotificationsEnabled(false)
      if (storedPreference) {
        // Atualiza localStorage se estava ativado mas permissão foi removida
        localStorage.setItem('notifications_enabled', 'false')
      }
    }
  }

  // Verifica permissão de notificação ao carregar
  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      const permission = Notification.permission
      const storedPreference = localStorage.getItem('notifications_enabled') === 'true'
      
      if (permission === 'granted' && storedPreference) {
        // Permissão concedida e preferência salva
        setNotificationsEnabled(true)
      } else if (permission === 'denied' || permission === 'default') {
        // Permissão negada ou não solicitada
        setNotificationsEnabled(false)
        // Limpa localStorage se permissão foi revogada
        if (storedPreference && permission === 'denied') {
          localStorage.setItem('notifications_enabled', 'false')
        }
      }
    }
  }

  const loadProfile = () => {
    setIsLoading(true)
    try {
      const profileRaw = localStorage.getItem('barbershop_profile')
      if (profileRaw) {
        const loaded = JSON.parse(profileRaw)
        setProfile(loaded)
        setTempProfile(loaded)
      } else {
        localStorage.setItem('barbershop_profile', JSON.stringify(profile))
        setTempProfile(profile)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateCacheSize = async () => {
    setIsCalculatingCache(true)
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate()
        const usageInMB = (estimate.usage || 0) / (1024 * 1024)
        setCacheSize(usageInMB)
      }
    } catch (error) {
      console.error('Erro ao calcular tamanho do cache:', error)
    } finally {
      setIsCalculatingCache(false)
    }
  }

  const toggleNotifications = async () => {
    if (isTogglingNotifications) return
    
    // Verifica se o navegador suporta notificações
    if (!('Notification' in window)) {
      alert('Seu navegador não suporta notificações push.')
      return
    }
    
    setIsTogglingNotifications(true)
    
    try {
      const newState = !notificationsEnabled
      
      if (newState) {
        // ATIVANDO notificações - solicita permissão
        const permission = await Notification.requestPermission()
        
        if (permission === 'granted') {
          // Permissão concedida
          setNotificationsEnabled(true)
          localStorage.setItem('notifications_enabled', 'true')
          
          // TODO: Backend Integration
          // POST /api/settings/notifications/enable
          // Registrar token de push notification no backend
          
          // Mostra notificação de teste
          new Notification('Notificações Ativadas! 🔔', {
            body: 'Você receberá alertas sobre agendamentos e atualizações importantes.',
            icon: '/assets/images/logos/logo.png',
            badge: '/assets/images/logos/logo.png',
            tag: 'notifications-enabled',
            requireInteraction: false
          })
        } else if (permission === 'denied') {
          // Permissão negada permanentemente
          setNotificationsEnabled(false)
          localStorage.setItem('notifications_enabled', 'false')
          alert('Você bloqueou as notificações. Para ativar, vá nas configurações do navegador e permita notificações para este site.')
        } else {
          // Permissão não foi decidida (dismissed)
          setNotificationsEnabled(false)
          localStorage.setItem('notifications_enabled', 'false')
        }
      } else {
        // DESATIVANDO notificações
        setNotificationsEnabled(false)
        localStorage.setItem('notifications_enabled', 'false')
        
        // TODO: Backend Integration
        // POST /api/settings/notifications/disable
        // Remover token de push notification do backend
      }
    } catch (error) {
      setNotificationsEnabled(false)
      localStorage.setItem('notifications_enabled', 'false')
      alert('Erro ao configurar notificações. Tente novamente.')
    } finally {
      setIsTogglingNotifications(false)
    }
  }

  const handleClearCache = async () => {
    setIsClearingCache(true)
    try {
      // Limpa todos os caches
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(name => caches.delete(name)))
      }

      // Recalcula o tamanho
      await calculateCacheSize()

      setShowClearCacheModal(false)
      setShowCacheSuccessModal(true)
      showSuccess('Cache limpo!', 'Todos os dados em cache foram removidos.')
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
      showError('Erro ao limpar cache', 'Não foi possível limpar o cache. Tente novamente.')
    } finally {
      setIsClearingCache(false)
    }
  }

  const handleSave = () => {
    setIsSaving(true)
    try {
      localStorage.setItem('barbershop_profile', JSON.stringify(tempProfile))
      setProfile(tempProfile)
      setTimeout(() => {
        setIsSaving(false)
        setModalOpen(false)
        showSuccess('Perfil atualizado!', 'As informações foram salvas com sucesso.')
      }, 500)
    } catch (error) {
      console.error('Error saving profile:', error)
      setIsSaving(false)
      showError('Erro ao salvar', 'Não foi possível salvar o perfil. Tente novamente.')
    }
  }

  const toggleInstagramVisibility = () => {
    const updatedProfile = { ...profile, showInstagram: !profile.showInstagram }
    setProfile(updatedProfile)
    localStorage.setItem('barbershop_profile', JSON.stringify(updatedProfile))
  }

  const toggleWhatsappVisibility = () => {
    const updatedProfile = { ...profile, showWhatsapp: !profile.showWhatsapp }
    setProfile(updatedProfile)
    localStorage.setItem('barbershop_profile', JSON.stringify(updatedProfile))
  }

  const openEditModal = () => {
    setTempProfile(profile)
    setModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-dim">Carregando configurações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">Configurações da Barbearia</h1>
          <p className="text-text-dim">Gerencie as informações do seu estabelecimento</p>
        </div>
        <button onClick={openEditModal} className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>
      </div>

      {/* Profile Display */}
      <div className="animate-fade-in-delayed">
        {/* Info Cards - Mobile: stacked, MD+: side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Name */}
          <div className="card flex-1 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-text mb-3">Nome da Barbearia</h3>
            <p className="text-2xl font-bold text-gold">{profile.name}</p>
          </div>

          {/* Instagram */}
          <div className={`card flex-1 flex flex-col justify-center relative transition-all duration-300 ${!profile.showInstagram ? 'opacity-40 grayscale' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-text">Instagram</h3>
              <button
                onClick={toggleInstagramVisibility}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  profile.showInstagram 
                    ? 'bg-gold' 
                    : 'bg-surface border border-border'
                }`}
                title={profile.showInstagram ? 'Ocultar na página de agendamento' : 'Exibir na página de agendamento'}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                    profile.showInstagram ? 'left-[26px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-text">{profile.instagram}</span>
            </div>
          </div>

          {/* WhatsApp */}
          <div className={`card flex-1 flex flex-col justify-center relative transition-all duration-300 ${!profile.showWhatsapp ? 'opacity-40 grayscale' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-text">WhatsApp</h3>
              <button
                onClick={toggleWhatsappVisibility}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  profile.showWhatsapp 
                    ? 'bg-gold' 
                    : 'bg-surface border border-border'
                }`}
                title={profile.showWhatsapp ? 'Ocultar na página de agendamento' : 'Exibir na página de agendamento'}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                    profile.showWhatsapp ? 'left-[26px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-text">{formatPhone(profile.whatsapp)}</span>
            </div>
          </div>
        </div>

        {/* Link de Agendamento - Full Width */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-text mb-4">Link de Agendamento</h3>
          <p className="text-sm text-text-dim mb-4">Compartilhe este link com seus clientes para que possam agendar serviços</p>
          
          {/* Link Display */}
          <div className="bg-surface border border-border rounded-full p-4 mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-text font-mono text-xs sm:text-sm break-all flex-1">{profile.bookingLink}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(profile.bookingLink)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-full text-gold font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20"
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copiar Link</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => window.open(profile.bookingLink, '_blank')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-600 hover:to-gold rounded-full text-bg font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Abrir Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Push Notifications Section */}
      <div className="animate-fade-in-delayed">
        <h2 className="text-2xl font-bold text-text mb-4">Notificações</h2>
        <div className={`card transition-all duration-300 ${!notificationsEnabled ? 'opacity-40 grayscale' : ''}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                {notificationsEnabled ? (
                  <Bell className="w-5 h-5 text-gold" />
                ) : (
                  <BellOff className="w-5 h-5 text-text-dim" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-text">Notificações Push</h3>
                <p className="text-xs text-text-dim mt-0.5">
                  Receba alertas sobre agendamentos e atualizações
                </p>
              </div>
            </div>
            <button
              onClick={toggleNotifications}
              disabled={isTogglingNotifications}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                notificationsEnabled 
                  ? 'bg-gold' 
                  : 'bg-surface border border-border'
              } ${isTogglingNotifications ? 'opacity-50 cursor-not-allowed' : ''}`}
              role="switch"
              aria-checked={notificationsEnabled}
              aria-label="Alternar notificações"
              title={notificationsEnabled ? 'Desativar notificações' : 'Ativar notificações'}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                  notificationsEnabled ? 'left-[26px]' : 'left-0.5'
                }`}
              >
                {isTogglingNotifications && (
                  <svg className="absolute inset-0 m-auto h-3 w-3 text-gold animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Style Section */}
      <div className="animate-fade-in-delayed">
        <h2 className="text-2xl font-bold text-text mb-4">Estilo da Navegação</h2>
        <p className="text-sm text-text-dim mb-6">
          Escolha o estilo de menu que prefere. A preferência é salva neste dispositivo.
        </p>

        <NavbarStyleSelector />
      </div>

      {/* Cache Management Section */}
      <div className="animate-fade-in-delayed">
        <h2 className="text-2xl font-bold text-text mb-4">Armazenamento e Cache</h2>
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-text">Cache do Navegador</h3>
                  <p className="text-sm text-text-dim">
                    {isCalculatingCache ? (
                      'Calculando...'
                    ) : (
                      `${cacheSize.toFixed(2)} MB armazenados`
                    )}
                  </p>
                </div>
              </div>
              <p className="text-xs text-text-dim mt-2">
                O cache armazena dados localmente para melhorar o desempenho do aplicativo. 
                Limpar o cache pode resolver problemas, mas fará o app carregar mais devagar na próxima vez.
              </p>
            </div>
            <button
              onClick={() => setShowClearCacheModal(true)}
              disabled={isClearingCache || isCalculatingCache}
              className="btn btn-outline text-red-400 border-red-500/20 hover:bg-red-500/10 flex items-center justify-center gap-2 w-full sm:w-auto sm:shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              <span>Limpar Cache</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal - Fullscreen */}
      {modalOpen && (
        createPortal(
          <div className="modal-fullscreen">
            <div className="max-w-2xl mx-auto px-4 pt-6 pb-4 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-gold mb-2">Editar Configurações</h2>
                <p className="text-text-dim">Atualize as informações da sua barbearia</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hover:bg-surface flex items-center justify-center text-text-dim hover:text-text transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="grid gap-6">
              <div className="card">
                {/* Form Fields */}
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Nome da Barbearia</label>
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                      placeholder="Ex: Barbearia Elite"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Instagram</label>
                    <input
                      type="text"
                      value={tempProfile.instagram}
                      onChange={(e) => setTempProfile({ ...tempProfile, instagram: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                      placeholder="@usuario"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">WhatsApp</label>
                    <input
                      type="tel"
                      value={tempProfile.whatsapp}
                      onChange={(e) => setTempProfile({ ...tempProfile, whatsapp: formatPhone(e.target.value) })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn btn-primary flex-1"
                >
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
            </div>
          </div>,
          document.body
        )
      )}

      {/* Clear Cache Confirmation Modal */}
      {showClearCacheModal && (
        createPortal(
          <div className="modal-overlay" onClick={() => setShowClearCacheModal(false)}>
            <div className="modal-content p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-text mb-4">Limpar Cache</h3>
            <p className="text-text-dim mb-6">
              Tem certeza que deseja limpar o cache? Isso pode fazer com que o aplicativo carregue mais devagar na próxima vez.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearCacheModal(false)}
                className="btn btn-outline flex-1"
                disabled={isClearingCache}
              >
                Cancelar
              </button>
              <button
                onClick={handleClearCache}
                className="btn btn-danger flex-1"
                disabled={isClearingCache}
              >
                {isClearingCache ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Limpando...
                  </>
                ) : (
                  'Limpar Cache'
                )}
              </button>
            </div>
            </div>
          </div>,
          document.body
        )
      )}

      {/* Cache Success Modal */}
      {showCacheSuccessModal && (
        createPortal(
          <div className="modal-overlay" onClick={() => setShowCacheSuccessModal(false)}>
            <div className="modal-content p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Cache Limpo!</h3>
              <p className="text-text-dim mb-6">
                O cache foi limpo com sucesso. Agora você tem {cacheSize.toFixed(2)} MB armazenados.
              </p>
              <button
                onClick={() => setShowCacheSuccessModal(false)}
                className="btn btn-primary w-full"
              >
                Fechar
              </button>
            </div>
            </div>
          </div>,
          document.body
        )
      )}

    </div>
  )
}
