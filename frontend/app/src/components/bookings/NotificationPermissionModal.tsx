import { createPortal } from 'react-dom'
import { useEffect, useState, useRef } from 'react'
import Button from '../ui/Button'

interface NotificationPermissionModalProps {
  onAllow: () => void
  onDeny: () => void
}

export default function NotificationPermissionModal({ onAllow, onDeny }: NotificationPermissionModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsOpen(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    setStartY(e.clientY)
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'none'
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const y = Math.max(0, e.clientY - startY)
    setCurrentY(y)
    if (drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${y}px)`
    }
  }

  const handlePointerUp = () => {
    if (!dragging) return
    if (drawerRef.current) {
      drawerRef.current.style.transition = ''
    }
    if (currentY >= 90) {
      handleClose()
    } else {
      if (drawerRef.current) {
        drawerRef.current.style.transform = ''
      }
    }
    setDragging(false)
    setCurrentY(0)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onDeny, 300) // Wait for animation to complete
  }

  const handleAllow = () => {
    setIsOpen(false)
    setTimeout(onAllow, 300) // Wait for animation to complete
  }

  const handleOverlayClick = () => handleClose()

  return createPortal(
    <div className="fixed inset-0 z-[2147483647]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={handleOverlayClick}
      />

      {/* Drawer Container - Always bottom aligned */}
      <div className="drawer-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
        <div
          ref={drawerRef}
          className={`drawer ${isOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Permissão de Notificações"
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '580px',
            maxHeight: 'auto'
          }}
        >
          {/* Drag Handle */}
          <div
            className="drawer-handle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Arraste para fechar"
            title="Arraste para fechar"
          />

          {/* Content */}
          <div className="drawer-inner" style={{ padding: '2rem 1.5rem 1.5rem' }}>
            <div className="grid gap-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 grid place-items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-gold">
                    <path 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h2 className="font-display text-gold text-2xl mb-2">
                  Ativar Notificações?
                </h2>
                <p className="text-text/70 text-sm leading-relaxed">
                  Receba lembretes sobre seus agendamentos e fique sempre informado quando houver novidades
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="w-full hover:bg-surface/60 transition-colors"
                >
                  <span className="text-sm">Agora não</span>
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAllow}
                  className="w-full relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm font-semibold">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2.5} 
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                      />
                    </svg>
                    Ativar
                  </span>
                </Button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-text/50 text-center leading-relaxed">
                Você pode alterar essa preferência a qualquer momento nas configurações do navegador
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
