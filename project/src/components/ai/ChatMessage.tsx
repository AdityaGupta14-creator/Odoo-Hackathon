import type { ChatMessage as ChatMessageType } from '@/types';
import { Sparkles, User } from 'lucide-react';

export function ChatMessageBubble({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 animate-fade-up ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
          isUser ? 'bg-ink-900 text-white' : 'bg-brand-600 text-white shadow-soft'
        }`}
      >
        {isUser ? <User size={18} /> : <Sparkles size={18} />}
      </div>
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <span className="text-xs font-semibold text-ink-400 px-1">
          {isUser ? 'You' : 'GlobeGuide AI'}
        </span>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-ink-900 text-white rounded-tr-md'
              : 'bg-white border border-ink-100 text-ink-700 shadow-soft rounded-tl-md'
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 bg-brand-600 text-white shadow-soft">
        <Sparkles size={18} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-ink-400 px-1">GlobeGuide AI</span>
        <div className="px-4 py-3.5 rounded-2xl rounded-tl-md bg-white border border-ink-100 shadow-soft">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-ink-500 mr-1">GlobeGuide is planning your trip</span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce-dot" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce-dot" style={{ animationDelay: '160ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce-dot" style={{ animationDelay: '320ms' }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
