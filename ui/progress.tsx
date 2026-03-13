interface Props {
  value: number
  className?: string
}

export function Progress({ value, className = '' }: Props) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-200 ${className}`.trim()}>
      <div className="h-full bg-slate-900 transition-all duration-300" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}
