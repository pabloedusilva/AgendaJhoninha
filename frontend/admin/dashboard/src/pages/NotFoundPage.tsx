import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-bg to-bg-soft px-4">
      <div className="max-w-md w-full text-center">
        {/* Número 404 grande e clean */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[140px] font-bold leading-none tracking-tighter text-gold/20 select-none">
            404
          </h1>
        </div>

        {/* Conteúdo */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-text">
            Página não encontrada
          </h2>
          <p className="text-text/50 text-base leading-relaxed">
            A página que você procura não existe ou foi movida.
          </p>
        </div>

        {/* Botão */}
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-gold hover:bg-gold-600 text-bg font-medium rounded-full transition-colors text-base inline-block"
        >
          Ir ao Dashboard
        </button>
      </div>
    </div>
  )
}
