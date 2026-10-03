interface SpeechBubbleProps {
  speaker: string;
  text: string;
}

const speakerPositions: Record<string, { left?: string; right?: string; top?: string }> = {
  Maya: { left: '18%', top: '18%' },
  Atlas: { right: '12%', top: '18%' },
  default: { left: '20%', top: '15%' },
};

export function SpeechBubble({ speaker, text }: SpeechBubbleProps) {
  const placement = speakerPositions[speaker] ?? speakerPositions.default;

  return (
    <div
      className="absolute z-20 max-w-[55%] rounded-2xl bg-white px-3 py-2 text-[10px] font-medium text-slate-900 shadow-xl shadow-black/30"
      style={{
        left: placement.left ?? 'auto',
        right: placement.right ?? 'auto',
        top: placement.top ?? '18%',
        transform: 'translateZ(0)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.18em] text-slate-500">{speaker}</span>
      </div>
      <div className="mt-1 text-xs text-slate-900">“{text}”</div>
      <div className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 rounded-sm bg-white" />
    </div>
  );
}
