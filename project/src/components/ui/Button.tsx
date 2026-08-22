import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-soft hover:shadow-card transition-all',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950 transition-colors',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-soft hover:shadow-card transition-all',
  outline:
    'bg-white text-ink-800 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 transition-all',
  ghost: 'bg-transparent text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-colors',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm rounded-xl gap-1.5',
  md: 'h-11 px-5 text-sm rounded-xl gap-2',
  lg: 'h-13 px-7 text-base rounded-2xl gap-2.5',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
