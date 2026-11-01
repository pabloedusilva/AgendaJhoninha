import type { Service } from '../../types/service.types'
import ImageWithFallback from '../ui/ImageWithFallback'

interface ServiceCardProps {
  service: Service
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
}

export default function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className="card card-hover group">
      <ImageWithFallback
        src={service.image}
        alt={service.name}
        containerClassName="aspect-video mb-4 bg-surface"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <h3 className="text-xl font-semibold text-text mb-2">{service.name}</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-gold">{formatCurrency(service.price)}</span>
        <span className="text-sm text-text-dim">{service.duration} min</span>
      </div>
      <div className="flex gap-2 pt-4 border-t border-border">
        <button
          onClick={() => onEdit(service)}
          className="btn btn-outline flex-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="btn btn-outline text-red-400 border-red-500/20 hover:bg-red-500/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
