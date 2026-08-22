import { useState } from 'react';
import { Copy, Check, Globe, Calendar, Wallet } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import type { Trip } from '@/types';

export function ShareModal({ open, onClose, trip }: { open: boolean; onClose: () => void; trip: Trip }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const slug = trip.id.replace(/[^a-z0-9-]/g, '-');
  const url = `globetrotter.app/trip/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${url}`);
      setCopied(true);
      showToast('Trip link copied!', '🔗');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Trip link copied!', '🔗');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Share your adventure 🌍">
      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={trip.image} alt={trip.name} className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h4 className="font-display font-bold text-lg leading-tight">{trip.name}</h4>
            <p className="text-sm text-white/80">
              {trip.destination} · {trip.days} Days
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-ink-500">
            <Calendar size={16} />
            {trip.startDate}
          </div>
          <div className="flex items-center gap-2 text-ink-500">
            <Wallet size={16} />₹{(trip.budgetBreakdown.accommodation + trip.budgetBreakdown.transportation + trip.budgetBreakdown.food + trip.budgetBreakdown.activities).toLocaleString('en-IN')}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2 block">Share URL</label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-ink-100 border border-ink-200">
            <Globe size={16} className="text-ink-400 ml-2 shrink-0" />
            <span className="text-sm font-medium text-ink-700 truncate flex-1">{url}</span>
            <Button size="sm" variant="primary" onClick={copy}>
              {copied ? (
                <>
                  <Check size={15} /> Copied
                </>
              ) : (
                <>
                  <Copy size={15} /> Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['WhatsApp', 'X', 'Email', 'More'].map((s) => (
            <button
              key={s}
              onClick={() => showToast(`Sharing via ${s} (demo)`, '📤')}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-ink-100 hover:bg-ink-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-ink-100 flex items-center justify-center text-sm font-bold text-ink-600">
                {s[0]}
              </div>
              <span className="text-xs font-medium text-ink-500">{s}</span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
