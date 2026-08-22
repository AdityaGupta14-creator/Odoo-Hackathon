import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 px-4 w-full max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 bg-ink-900 text-white px-4 py-3 rounded-2xl shadow-lift animate-slide-up max-w-full"
        >
          <span className="text-xl shrink-0">{t.icon ?? <CheckCircle2 size={20} className="text-brand-400" />}</span>
          <span className="text-sm font-semibold leading-snug">{t.message}</span>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-white/50 hover:text-white text-xs ml-1 shrink-0"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
