import type { ReactNode } from 'react'
import { handleImageError } from '../utils/imageHelpers'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col relative">
      {/* Background image - fixed at top, behind all content */}
      <div className="hero-background"></div>
      
      {/* Header removido conforme solicitação para manter o código limpo */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-10 relative z-10">
        {children}
      </main>
      <footer id="contato" className="site-footer mt-auto relative z-10">
        <div className="footer-inner">
          <p className="footer-credit">
            Desenvolvido por <a href="https://github.com/pabloedusilva" target="_blank" rel="noopener noreferrer" className="footer-developer">Pablo Silva</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
