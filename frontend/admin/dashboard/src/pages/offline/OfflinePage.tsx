import { WifiOff } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-bg to-bg-soft px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone grande no lugar dos números */}
        <div className="mb-8 flex items-center justify-center">
          <WifiOff
            className="text-gold/20 select-none"
            style={{ width: 140, height: 140 }}
            strokeWidth={1.5}
          />
        </div>

        {/* Conteúdo */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-text">
            Sem conexão
          </h2>
          <p className="text-text/50 text-base leading-relaxed">
            Você está offline. Verifique sua conexão e tente novamente.
          </p>
        </div>

        {/* Botão */}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gold hover:bg-gold-600 text-bg font-sans font-medium rounded-full transition-colors text-base inline-block"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
