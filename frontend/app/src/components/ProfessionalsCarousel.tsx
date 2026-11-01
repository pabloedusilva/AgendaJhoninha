import { Professional } from '@context/BookingContext'
import { handleImageError } from '../utils/imageHelpers'

export default function ProfessionalsCarousel({ items, activeId, onSelect }: { items: Professional[]; activeId?: string; onSelect: (p: Professional) => void }) {
  const isSingleProfessional = items.length === 1
  
  return (
    <div className={`${isSingleProfessional ? 'flex justify-center' : 'overflow-x-auto no-scrollbar'}`}>
      <div className={`${isSingleProfessional ? 'flex justify-center' : 'flex gap-3 snap-x snap-mandatory pb-2'}`}>
        {items.map((pro) => (
          <button
            key={pro.id}
            className={`${isSingleProfessional ? '' : 'snap-center flex-shrink-0'} w-64 card p-4 text-left transition border hover:-translate-y-0.5 hover:shadow-brand ${
              activeId === pro.id ? 'border-gold ring-2 ring-gold/30' : 'border-border'
            }`}
            onClick={() => onSelect(pro)}
          >
            <div className="h-44 md:h-48 rounded-xl bg-surface border border-border mb-3 overflow-hidden">
              <img
                src="/assets/images/professionals/Jhoninha do Corte.jpg"
                alt={pro.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={handleImageError}
              />
            </div>
            <div className="font-semibold">{pro.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
