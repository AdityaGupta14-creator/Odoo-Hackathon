import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-t-4xl sm:rounded-4xl shadow-lift animate-slide-up sm:animate-scale-in max-h-[90vh] overflow-y-auto no-scrollbar`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-ink-100 sticky top-0 bg-white rounded-t-4xl z-10">
            <h3 className="text-lg font-bold text-ink-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-xl text-ink-400 hover:text-ink-900 hover:bg-ink-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
