import { useEffect, useMemo, useRef, useState } from 'react'
import type { AppNotification } from '@barber/features/notifications/types'

type Props = {
  item: AppNotification
  onRemove: (id: string) => void
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export default function NotificationSwipeItem({ item, onRemove }: Props) {
  const start = useRef<{ x: number; y: number } | null>(null)
  const [dx, setDx] = useState(0)
  const dxRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [active, setActive] = useState(false)
  const [leaving, setLeaving] = useState(false)

  const createdLabel = useMemo(() => formatTime(item.createdAt), [item.createdAt])

  const threshold = 90

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const setDxSmooth = (next: number) => {
    dxRef.current = next
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      setDx(dxRef.current)
    })
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (leaving) return
    // Se o usuário estiver clicando no botão, não inicia gesto de swipe.
    const target = e.target as HTMLElement
    if (target?.closest('button')) return
    start.current = { x: e.clientX, y: e.clientY }
    setActive(true)
    setDx(0)
    dxRef.current = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!active || !start.current || leaving) return
    const deltaX = e.clientX - start.current.x
    const deltaY = e.clientY - start.current.y

    // Só começa a arrastar quando estiver claramente horizontal
    if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) return
    if (Math.abs(deltaY) > Math.abs(deltaX) * 1.2) return

    setDxSmooth(Math.max(-160, Math.min(160, deltaX)))
  }

  const finishDismiss = () => {
    setLeaving(true)
    const direction = dxRef.current >= 0 ? 1 : -1
    setDx(direction * 420)
    window.setTimeout(() => onRemove(item.id), 180)
  }

  const handlePointerUp = () => {
    if (!active || leaving) return
    setActive(false)
    if (Math.abs(dxRef.current) >= threshold) {
      finishDismiss()
      return
    }
    setDx(0)
    dxRef.current = 0
  }

  const progress = Math.min(1, Math.abs(dx) / threshold)
  const showLeft = dx > 12
  const showRight = dx < -12
  // Intensidade mais sutil (visual mais próximo do mock):
  // - precisa de mais arrasto para "acender" forte
  // - curva mais suave
  const intensity = Math.min(1, Math.abs(dx) / 200)
  const power = Math.pow(intensity, 0.9)

  return (
    <div className="relative">
      {/* Background actions */}
      <div className="absolute inset-0 rounded-2xl border border-border overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gradient-to-r from-red-500/22 via-transparent to-red-500/22"
          style={{ opacity: 0.10 + 0.36 * power }}
        />

        {/* Side glow (mais forte no lado do gesto) */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${96 + 56 * power}px`,
            opacity: showLeft ? 0.08 + 0.52 * power : 0,
            filter: 'blur(14px)'
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-red-500/55 to-transparent" />
        </div>
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: `${96 + 56 * power}px`,
            opacity: showRight ? 0.08 + 0.52 * power : 0,
            filter: 'blur(14px)'
          }}
        >
          <div className="h-full w-full bg-gradient-to-l from-red-500/55 to-transparent" />
        </div>

        {/* Left action */}
        <div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center"
            style={{
              opacity: showLeft ? 0.15 + 0.85 * progress : 0,
              transform: `translate3d(${(-6 + 6 * progress).toFixed(2)}px, 0, 0) scale(${(0.9 + 0.1 * progress).toFixed(3)})`,
              backgroundColor: `rgba(239, 68, 68, ${0.03 + 0.10 * power})`,
              borderColor: `rgba(239, 68, 68, ${0.14 + 0.18 * power})`
            }}
          >
            <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
              />
            </svg>
          </div>
        </div>

        {/* Right action */}
        <div className="absolute inset-y-0 right-0 w-16 flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center"
            style={{
              opacity: showRight ? 0.15 + 0.85 * progress : 0,
              transform: `translate3d(${(6 - 6 * progress).toFixed(2)}px, 0, 0) scale(${(0.9 + 0.1 * progress).toFixed(3)})`,
              backgroundColor: `rgba(239, 68, 68, ${0.03 + 0.10 * power})`,
              borderColor: `rgba(239, 68, 68, ${0.14 + 0.18 * power})`
            }}
          >
            <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative rounded-2xl border border-border bg-[#141414] px-4 py-3 will-change-transform transition-[transform] ${
          active ? 'duration-0' : leaving ? 'duration-200 ease-in' : 'duration-300 ease-[cubic-bezier(0.2,0.9,0.2,1)]'
        }`}
        style={{ transform: `translate3d(${dx}px, 0, 0)`, touchAction: 'pan-y' }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-none w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-text font-semibold leading-tight truncate">{item.title}</p>
              <span className="text-[11px] text-text-dim flex-none">{createdLabel}</span>
            </div>
            <p className="text-sm text-text-dim mt-1 leading-snug">
              {item.message}
            </p>

            <div className="mt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                onPointerDown={(e) => e.stopPropagation()}
                className="hidden sm:inline-flex items-center justify-center text-[11px] font-semibold text-red-300/80 hover:text-red-200 transition-colors"
                aria-label="Remover notificação"
                title="Remover"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
