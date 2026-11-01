import { Check } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Booking {
  id: string
  clientName: string
  clientPhone: string
  professionalId: string
  professionalName: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  price: number
  status: 'scheduled' | 'completed' | 'cancelled'
}

interface CurrentBookingHighlightProps {
  booking: Booking
  onComplete?: (bookingId: string) => void
  onViewDetails?: (bookingId: string) => void
  onCancel?: (bookingId: string) => void
}

export default function CurrentBookingHighlight({ booking, onComplete, onViewDetails, onCancel }: CurrentBookingHighlightProps) {
  const [isCompleting, setIsCompleting] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isEntering, setIsEntering] = useState(true)

  // Animação de entrada quando o componente monta ou booking muda
  useEffect(() => {
    setIsEntering(true)
    const timer = setTimeout(() => setIsEntering(false), 800)
    return () => clearTimeout(timer)
  }, [booking.id])

  const dateObj = new Date(booking.date + 'T' + booking.time)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: '2-digit', 
    month: 'long',
    year: 'numeric'
  })

  const handleComplete = async () => {
    if (isCompleting || !onComplete) return
    
    setIsCompleting(true)
    
    // TODO: Backend Integration
    // PATCH /api/bookings/:id/complete - Mark booking as completed
    
    // Simula delay de processamento (backend)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mostra animação de sucesso
    setShowSuccessAnimation(true)
    
    // Aguarda animação de sucesso completa
    await new Promise(resolve => setTimeout(resolve, 1800))
    
    // Inicia animação de saída
    setShowSuccessAnimation(false)
    setIsExiting(true)
    
    // Aguarda animação de saída completa
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Chama callback para atualizar o estado
    onComplete(booking.id)
  }

  return (
    <div 
      className={`card border-gold/50 bg-gradient-to-br from-gold/10 to-transparent shadow-lg shadow-gold/5 relative overflow-hidden transition-all duration-600 ease-out ${
        isExiting 
          ? 'opacity-0 scale-95 -translate-y-8 pointer-events-none' 
          : isEntering
          ? 'opacity-0 scale-95 translate-y-8'
          : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{
        animation: isEntering ? 'slide-in-from-bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' : undefined,
        maxHeight: isExiting ? '0px' : '1000px',
        marginBottom: isExiting ? '0px' : undefined,
        paddingTop: isExiting ? '0px' : undefined,
        paddingBottom: isExiting ? '0px' : undefined,
        borderWidth: isExiting ? '0px' : undefined,
      }}
    >
      {/* Brilho sutil animado no fundo */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent"
        style={{
          animation: 'shimmer 3s ease-in-out infinite'
        }}
      />

      {/* Animação de Sucesso Overlay */}
      {showSuccessAnimation && (
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 50%, transparent 100%)',
            backdropFilter: 'blur(4px)',
            animation: 'fade-in 0.3s ease-out'
          }}
        >
          <div className="relative">
            {/* Ondas de sucesso expandindo */}
            <div 
              className="absolute inset-0 rounded-full bg-gold/20"
              style={{ 
                animation: 'success-wave 1.5s cubic-bezier(0, 0, 0.2, 1) forwards'
              }} 
            />
            <div 
              className="absolute inset-0 rounded-full bg-gold/15"
              style={{ 
                animation: 'success-wave 1.5s cubic-bezier(0, 0, 0.2, 1) 0.2s forwards'
              }} 
            />
            
            {/* Círculo principal com check */}
            <div 
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl"
              style={{
                animation: 'success-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                boxShadow: '0 20px 60px -10px rgba(212,175,55,0.6), 0 0 30px rgba(212,175,55,0.4)'
              }}
            >
              {/* Checkmark animado com traço suave */}
              <svg 
                className="w-12 h-12 text-[#0a0a0a]"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  strokeDasharray: '50',
                  strokeDashoffset: '50',
                  animation: 'checkmark-draw 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.3s forwards'
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>

              {/* Partículas de confete */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gold"
                    style={{
                      top: '50%',
                      left: '50%',
                      animation: `confetti-${i % 4} 1s ease-out ${0.6 + i * 0.05}s forwards`,
                      opacity: 0
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 relative z-[1]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <h3 className="text-gold font-semibold text-sm uppercase tracking-wide">Em andamento</h3>
        </div>
        
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl md:text-4xl font-display text-text font-bold">{booking.time}</span>
              <span className="text-3xl md:text-4xl font-display text-text font-bold">{booking.clientName}</span>
            </div>
            <span className="text-text-dim text-sm capitalize">{formattedDate}</span>
          </div>
          
          <div className="grid gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dim">Profissional:</span>
              <span className="text-text font-medium">{booking.professionalName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dim">Serviço:</span>
              <span className="text-text font-medium">{booking.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dim">Valor:</span>
              <span className="text-gold font-semibold">R$ {booking.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        {(onComplete || onViewDetails || onCancel) && (
          <div className="pt-2 border-t border-border/50 grid gap-2">
            {/* Botão Concluir */}
            {onComplete && (
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold border transition-all duration-300 w-full ${
                  isCompleting
                    ? 'bg-gold/20 border-gold/50 text-gold cursor-wait scale-[0.98]'
                    : 'bg-gradient-to-r from-gold/10 to-yellow-600/10 border-gold/30 text-gold hover:from-gold/20 hover:to-yellow-600/20 hover:border-gold hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-[0.98]'
                }`}
              >
                {isCompleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    <span>Concluindo...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Concluir</span>
                  </>
                )}
              </button>
            )}

            {/* Botão Ver Detalhes */}
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(booking.id)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold border bg-transparent text-text border-text/20 hover:border-text/40 hover:bg-surface transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] w-full"
              >
                Ver detalhes
              </button>
            )}

            {/* Botão Cancelar */}
            {onCancel && (
              <button
                onClick={() => onCancel(booking.id)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold border bg-transparent border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] w-full"
              >
                Cancelar agendamento
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-from-bottom {
          0% {
            opacity: 0;
            transform: translateY(32px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes success-wave {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes success-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkmark-draw {
          from {
            stroke-dashoffset: 50;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes confetti-0 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-40px, -60px) scale(1);
            opacity: 0;
          }
        }

        @keyframes confetti-1 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(40px, -60px) scale(1);
            opacity: 0;
          }
        }

        @keyframes confetti-2 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(-60px, 30px) scale(1);
            opacity: 0;
          }
        }

        @keyframes confetti-3 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(60px, 30px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
