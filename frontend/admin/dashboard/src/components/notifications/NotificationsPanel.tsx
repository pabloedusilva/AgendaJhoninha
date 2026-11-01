import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNotifications } from '@barber/features/notifications/hooks/useNotifications'
import NotificationSwipeItem from './NotificationSwipeItem'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsPanel({ isOpen, onClose }: Props) {
  const { notifications, count, clearAll, remove } = useNotifications()

  const drawerRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
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
      onClose()
    } else {
      if (drawerRef.current) {
        drawerRef.current.style.transform = ''
      }
    }
    setDragging(false)
    setCurrentY(0)
  }

  const handleOverlayClick = () => onClose()

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[2147483646]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleOverlayClick} />

      {/* Mobile: bottom sheet (igual PWA Install) */}
      <div className="lg:hidden drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div
          ref={drawerRef}
          className={`drawer ${isOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Notificações"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="drawer-handle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            aria-label="Arraste para fechar"
            title="Arraste para fechar"
          />

          <div className="drawer-header">
            <h3 className="flex items-center gap-2">
              <span>Notificações</span>
              {count > 0 && (
                <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-2 rounded-full bg-gold text-[#1b1408] text-xs font-extrabold">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </h3>

            <div className="flex items-center gap-2">
              {count > 0 && (
                <button type="button" className="btn btn-outline !px-3 !py-2 text-xs" onClick={clearAll}>
                  Limpar tudo
                </button>
              )}

              <button onClick={onClose} className="drawer-close" aria-label="Fechar">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="drawer-content scrollbar-modern">
            <div className="drawer-inner">
              {count === 0 ? (
                <div className="card bg-surface/30 border-border/60 text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-text font-semibold">Sem notificações</p>
                  <p className="text-sm text-text-dim mt-1">Quando houver novos agendamentos, eles aparecem aqui.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {notifications.map((n) => (
                    <NotificationSwipeItem key={n.id} item={n} onRemove={remove} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: painel no canto (como antes) */}
      <div className="hidden lg:block absolute inset-0" onClick={onClose}>
        <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
          <section
            className="w-[520px] bg-[#0f0f10] border border-border rounded-3xl shadow-2xl shadow-black/60 overflow-hidden animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Notificações"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
              <div className="min-w-0">
                <h3 className="text-text font-semibold tracking-tight flex items-center gap-2">
                  <span>Notificações</span>
                  {count > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-2 rounded-full bg-gold text-[#1b1408] text-xs font-extrabold">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-text-dim mt-0.5">{count === 0 ? 'Tudo em dia' : 'Agendamentos recentes'}</p>
              </div>

              <div className="flex items-center gap-2">
                {count > 0 && (
                  <button type="button" className="btn btn-outline !px-3 !py-2 text-xs" onClick={clearAll}>
                    Limpar tudo
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl border border-border bg-surface/40 hover:bg-surface/60 transition-colors flex items-center justify-center"
                  aria-label="Fechar"
                >
                  <svg className="w-5 h-5 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-4 py-4">
              {count === 0 ? (
                <div className="card bg-surface/30 border-border/60 text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-text font-semibold">Sem notificações</p>
                  <p className="text-sm text-text-dim mt-1">Quando houver novos agendamentos, eles aparecem aqui.</p>
                </div>
              ) : (
                <div className="max-h-[520px] overflow-y-auto scroll-container scrollbar-modern pr-1">
                  <div className="grid gap-3">
                    {notifications.map((n) => (
                      <NotificationSwipeItem key={n.id} item={n} onRemove={remove} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body
  )
}
