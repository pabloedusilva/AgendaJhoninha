import { BookingsFilter } from '../../types/bookings'

interface FilterTabsProps {
  currentFilter: BookingsFilter
  onFilterChange: (filter: BookingsFilter) => void
}

const filters: { label: string; value: BookingsFilter['status'] }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Agendados', value: 'scheduled' },
  { label: 'Concluídos', value: 'completed' },
  { label: 'Cancelados', value: 'cancelled' }
]

export default function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 pb-2 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange({ status: filter.value })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border flex-shrink-0 ${
              currentFilter.status === filter.value
                ? 'bg-gold/15 text-gold border-gold'
                : 'bg-surface text-text/70 border-border hover:border-gold/30'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
