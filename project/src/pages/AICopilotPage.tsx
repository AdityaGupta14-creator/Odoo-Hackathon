import { useEffect, useState } from 'react';
import { Sparkles, Plus, Save, MapPin } from 'lucide-react';
import type { TripPlan } from '@/types';
import { AIChat } from '@/components/ai/AIChat';
import { AIPlan } from '@/components/ai/AIPlan';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function AICopilotPage() {
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    const prefill = sessionStorage.getItem('globetrotter.prefill');
    if (prefill) {
      sessionStorage.removeItem('globetrotter.prefill');
      // Auto-send after a tick so AIChat mounts
      setTimeout(() => {
        const ta = document.querySelector('textarea');
        if (ta) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
          setter?.call(ta, prefill);
          ta.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => {
            ta.dispatchEvent(
              new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
            );
          }, 100);
        }
      }, 200);
    }
  }, []);

  const newChat = () => {
    setPlan(null);
    setResetKey((k) => k + 1);
  };

  const saveTrip = () => {
    if (!plan) {
      showToast('Plan a trip first, then save it', '💡');
      return;
    }
    showToast('Use "Create My Trip" to save this plan', '💡');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap animate-fade-up">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-soft">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-ink-900 leading-tight">GlobeGuide AI</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-ink-500">Ready to plan</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={newChat}>
            <Plus size={15} /> New Chat
          </Button>
          <Button variant="primary" size="sm" onClick={saveTrip}>
            <Save size={15} /> Save Trip
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-5 items-start">
        {/* Chat */}
        <div className="bg-white rounded-3xl border border-ink-100 shadow-soft p-4 sm:p-5 h-[70vh] lg:h-[calc(100vh-9rem)] lg:sticky lg:top-20 animate-fade-up" style={{ animationDelay: '60ms' }}>
          <AIChat onPlan={setPlan} resetKey={resetKey} />
        </div>

        {/* Plan / Empty state */}
        <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
          {plan ? (
            <AIPlan plan={plan} />
          ) : (
            <div className="bg-white rounded-3xl border border-ink-100 shadow-soft p-10 text-center min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-3xl bg-ink-100 flex items-center justify-center mb-4">
                <MapPin size={28} className="text-ink-400" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink-900 mb-2">Your trip plan will appear here</h3>
              <p className="text-sm text-ink-500 max-w-xs">
                Describe your trip in the chat and GlobeGuide AI will generate a complete plan — conditions, stays, activities, itinerary and budget.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
