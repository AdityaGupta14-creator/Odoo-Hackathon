import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import type { ChatMessage as ChatMessageType, TripPlan } from '@/types';
import { generatePlan } from '@/data/ai';
import { ChatMessageBubble, TypingIndicator } from './ChatMessage';
import { Button } from '@/components/ui/Button';

const chips = [
  { icon: '✨', label: 'Plan my trip', prompt: 'Plan a 4-day Dubai trip for my family under ₹60,000' },
  { icon: '🌦️', label: 'Check travel conditions', prompt: 'What are the travel conditions like in Dubai?' },
  { icon: '🏨', label: 'Find a hotel', prompt: 'Find a family-friendly hotel in Dubai under ₹7,000 per night' },
  { icon: '💰', label: 'Optimize my budget', prompt: 'Make my Dubai trip cheaper — budget is ₹60,000' },
  { icon: '🗺️', label: 'Build an itinerary', prompt: 'Build a 4-day Dubai itinerary with sightseeing, food and relaxation' },
];

const examples = [
  'Plan a 4-day Dubai trip under ₹60,000',
  'Plan a romantic trip to Paris',
  'Best family trip to Singapore',
  'Make my Europe trip cheaper',
  'Plan a 5-day Goa trip with friends',
];

interface AIChatProps {
  onPlan: (plan: TripPlan | null) => void;
  resetKey: number;
}

export function AIChat({ onPlan, resetKey }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    setInput('');
    setLoading(false);
    onPlan(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessageType = { id: `u${Date.now()}`, role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    onPlan(null);

    setTimeout(() => {
      const plan = generatePlan(text);
      const aiMsg: ChatMessageType = {
        id: `a${Date.now()}`,
        role: 'ai',
        text: `I've put together a complete ${plan.destination} trip plan for you — travel conditions, recommended stays, activities, a day-by-day itinerary and a budget breakdown. Take a look at the plan on the right.`,
        plan,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      onPlan(plan);
    }, 1600);
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-1">
        {messages.length === 0 && !loading ? (
          <EmptyState onExample={(p) => send(p)} examples={examples} />
        ) : (
          <div className="space-y-5 py-2">
            {messages.map((m) => (
              <ChatMessageBubble key={m.id} message={m} />
            ))}
            {loading && <TypingIndicator />}
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 px-1">
          {chips.map((c) => (
            <button
              key={c.label}
              onClick={() => setInput(c.prompt)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-ink-200 text-sm font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all whitespace-nowrap shadow-soft shrink-0"
            >
              <span className="text-base leading-none">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="pt-3">
        <div className="flex items-end gap-2 p-2 rounded-2xl bg-white border border-ink-200 shadow-soft focus-within:border-brand-300 focus-within:shadow-card transition-all">
          <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
            <Sparkles size={18} />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Try: Plan a 4-day Dubai trip for my family under ₹60,000..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none py-2 max-h-32"
          />
          <Button
            size="md"
            variant="primary"
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="!h-9 !px-3.5 shrink-0"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onExample, examples }: { onExample: (p: string) => void; examples: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-3xl bg-brand-100 flex items-center justify-center mb-4 animate-float">
        <span className="text-3xl">🌍</span>
      </div>
      <h3 className="text-xl font-display font-bold text-ink-900 mb-1.5">Where do you want to go?</h3>
      <p className="text-sm text-ink-500 max-w-xs mb-6">
        Tell me your destination, dates, budget and travel style.
      </p>
      <div className="w-full max-w-sm space-y-2">
        <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider text-left">Example prompts</p>
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => onExample(ex)}
            className="w-full text-left px-4 py-3 rounded-2xl bg-white border border-ink-100 text-sm text-ink-700 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 transition-all shadow-soft"
          >
            "{ex}"
          </button>
        ))}
      </div>
    </div>
  );
}
