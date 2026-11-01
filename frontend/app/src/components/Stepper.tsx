type Step = { id: string; label: string }

export default function Stepper({ steps, active }: { steps: Step[]; active: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((s, idx) => (
        <div key={s.id} className="flex items-center">
          <div
            className={`grid place-items-center w-8 h-8 rounded-full border ${
              idx <= active ? 'border-gold bg-gold/15 text-gold' : 'border-border bg-surface text-text/70'
            } font-semibold ${idx === active ? 'animate-step-advance' : ''}`}
          >
            {idx + 1}
          </div>
          {idx < steps.length - 1 && <div className="w-8 h-px bg-border" />}
        </div>
      ))}
    </div>
  )
}
