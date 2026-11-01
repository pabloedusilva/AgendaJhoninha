type Props = {
  count: number
  onClick: () => void
}

export default function NotificationsBell({ count, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-10 h-10 rounded-full border border-gold/25 bg-surface/40 hover:bg-surface/60 hover:border-gold/40 transition-all shadow-lg shadow-gold/10"
      aria-label="Abrir notificações"
      title="Notificações"
    >
      <svg className="w-5 h-5 text-gold absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-[#1b1408] text-[10px] leading-[18px] font-extrabold text-center shadow-lg shadow-gold/30 border border-[#1b1408]/20">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  )
}
