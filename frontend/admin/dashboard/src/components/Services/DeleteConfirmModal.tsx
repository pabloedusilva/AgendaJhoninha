import { createPortal } from 'react-dom'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold text-text mb-4">Excluir Serviço</h3>
        <p className="text-text-dim mb-6">
          Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="btn btn-outline flex-1"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger flex-1"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
