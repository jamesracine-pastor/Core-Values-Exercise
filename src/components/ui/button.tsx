import type { ButtonHTMLAttributes } from 'react'

type Variant = 'default' | 'secondary' | 'outline'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ className = '', variant = 'default', disabled, ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
  const variants: Record<Variant, string> = {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
  }
  return <button className={`${base} ${variants[variant]} ${className}`.trim()} disabled={disabled} {...props} />
}
