interface PromptChipProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export function PromptChip({ icon, label, onClick }: PromptChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-ink-200 text-sm font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all whitespace-nowrap shadow-soft"
    >
      <span className="text-base leading-none">{icon}</span>
      {label}
    </button>
  );
}
