import { useEffect, useState } from 'react'
import { useServices } from '../../hooks/useServices'
import { useNotification } from '../../contexts/NotificationContext'
import type { Service, ServiceFormData } from '../../types/service.types'
import { ServiceCard, ServiceModal, DeleteConfirmModal } from '../../components/Services'

export default function ListServices() {
  const { services, isLoading, createService, updateService, deleteService } = useServices()
  const { showSuccess, showError } = useNotification()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Agenda Jhoninha | Serviços'
  }, [])

  const handleOpenAddModal = () => {
    setEditingService(null)
    setModalOpen(true)
  }

  const handleOpenEditModal = (service: Service) => {
    setEditingService(service)
    setModalOpen(true)
  }

  const handleSubmit = (formData: ServiceFormData) => {
    try {
      if (editingService) {
        updateService(editingService.id, {
          name: formData.name,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
          image: formData.image
        })
        showSuccess('Serviço atualizado!', 'As alterações foram salvas com sucesso.')
      } else {
        createService({
          name: formData.name,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
          image: formData.image
        })
        showSuccess('Serviço adicionado!', 'O novo serviço foi cadastrado com sucesso.')
      }
      setModalOpen(false)
    } catch (error) {
      showError('Erro ao salvar', 'Não foi possível salvar o serviço. Tente novamente.')
    }
  }

  const handleDeleteConfirm = () => {
    if (deleteServiceId) {
      try {
        deleteService(deleteServiceId)
        showSuccess('Serviço excluído!', 'O serviço foi removido com sucesso.')
        setDeleteServiceId(null)
      } catch (error) {
        showError('Erro ao excluir', 'Não foi possível excluir o serviço. Tente novamente.')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-dim">Carregando serviços...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">Serviços</h1>
          <p className="text-text-dim">Gerencie os serviços da sua barbearia</p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Serviço
        </button>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
          </div>
          <p className="text-text-dim">Nenhum serviço cadastrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-delayed">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={handleOpenEditModal}
              onDelete={setDeleteServiceId}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <ServiceModal
        isOpen={modalOpen}
        editingService={editingService}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteServiceId}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteServiceId(null)}
      />
    </div>
  )
}
