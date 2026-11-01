import { useState } from 'react'
import type { Service, ServiceFormData } from '../../types/service.types'
import { SERVICE_IMAGES } from '../../constants/serviceImages'
import ImageWithFallback from '../ui/ImageWithFallback'

interface ServiceFormProps {
  initialData?: Service | null
  onSubmit: (data: ServiceFormData) => void
  onCancel: () => void
  isEdit?: boolean
}

export default function ServiceForm({ initialData, onSubmit, onCancel, isEdit = false }: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: initialData?.name || '',
    price: initialData?.price?.toString() || '',
    duration: initialData?.duration?.toString() || '',
    image: initialData?.image || SERVICE_IMAGES[0]
  })
  const [showImageGallery, setShowImageGallery] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="card">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Nome do Serviço</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
              placeholder="Ex: Corte de cabelo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Duração (minutos)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
              placeholder="30"
              required
            />
          </div>
        </div>

        {/* Image Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-text mb-4">Imagem do Serviço</label>
          <div className="grid gap-4">
            <div className="aspect-video rounded-xl overflow-hidden bg-surface border border-border">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowImageGallery(!showImageGallery)}
              className="btn btn-outline"
            >
              {showImageGallery ? 'Fechar Galeria' : 'Escolher Imagem'}
            </button>
          </div>

          {/* Image Gallery */}
          {showImageGallery && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-2 sm:p-4 bg-surface rounded-xl border border-border">
              {SERVICE_IMAGES.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, image: img })
                    setShowImageGallery(false)
                  }}
                  className={`min-w-0 aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    formData.image === img
                      ? 'border-gold'
                      : 'border-border hover:border-gold/50'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt="Service image"
                    containerClassName="aspect-square"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline flex-1"
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary flex-1">
          {isEdit ? 'Salvar Alterações' : 'Criar Serviço'}
        </button>
      </div>
    </form>
  )
}
