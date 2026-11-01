import { createPortal } from 'react-dom'
import type { Service, ServiceFormData } from '../../types/service.types'
import ServiceForm from './ServiceForm'

interface ServiceModalProps {
  isOpen: boolean
  editingService: Service | null
  onClose: () => void
  onSubmit: (data: ServiceFormData) => void
}

export default function ServiceModal({ isOpen, editingService, onClose, onSubmit }: ServiceModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="modal-fullscreen overflow-y-scroll">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-gold mb-2">
              {editingService ? 'Editar Serviço' : 'Novo Serviço'}
            </h2>
            <p className="text-text-dim">Preencha os dados do serviço</p>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hover:bg-surface flex items-center justify-center text-text-dim hover:text-text transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <ServiceForm
          initialData={editingService}
          onSubmit={onSubmit}
          onCancel={onClose}
          isEdit={!!editingService}
        />
      </div>
    </div>,
    document.body
  )
}
