export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`card p-4 min-w-0 ${className ?? ''}`}>{children}</div>
}
