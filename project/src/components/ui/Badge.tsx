import type { ReactNode } from 'react';

type Tone = 'brand' | 'accent' | 'amber' | 'green' | 'neutral' | 'ink';

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 border-brand-200',
  accent: 'bg-accent-50 text-accent-700 border-accent-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  neutral: 'bg-ink-100 text-ink-600 border-ink-200',
  ink: 'bg-ink-900 text-white border-ink-900',
};

export function Badge({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
