import { Link, useNavigate } from 'react-router-dom'
import Button from '@components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div>
      {/* Header idêntico ao das páginas legais */}
      <header className="site-header">
        <Link to="/" className="back-arrow" aria-label="Voltar ao início">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
        <div style={{ height: 56 }}></div>
      </header>

      <main className="min-h-[70vh] flex items-center justify-center px-4">
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
          <Button
            variant="primary"
            className="py-3 px-6 text-base"
            onClick={() => navigate('/')}
          >
            Voltar ao início
          </Button>
        </div>
      </main>
    </div>
  )
}
