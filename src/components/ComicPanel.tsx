import type { Panel } from '../types/project';
import { SpeechBubble } from './SpeechBubble';

interface ComicPanelProps {
  panel: Panel;
  variant?: number;
  compact?: boolean;
}

const scenicStyles: Record<number, string> = {
  1: 'from-slate-950 via-violet-950 to-slate-900',
  2: 'from-slate-900 via-cyan-950 to-slate-900',
  3: 'from-slate-950 via-indigo-900 to-slate-800',
  4: 'from-neutral-950 via-slate-900 to-violet-950',
};

export function ComicPanel({ panel, compact = false, variant }: ComicPanelProps) {
  const sceneVariant = variant ?? panel.variant;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br ${scenicStyles[sceneVariant]} shadow-xl shadow-black/20 ${
        compact ? 'h-40' : 'h-60'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-10 h-12 bg-slate-800/60" />
      <div className="absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-xl" />
      <div className="absolute bottom-4 left-4 h-16 w-16 rounded-[20px] bg-slate-700/80" />
      <div className="absolute bottom-4 left-16 h-16 w-10 rounded-t-[14px] bg-slate-600/80" />
      <div className="absolute bottom-5 right-8 h-14 w-14 rounded-full border-4 border-slate-600/80 bg-slate-900/50" />
      <div className="absolute bottom-5 right-20 h-10 w-24 rounded-t-[18px] bg-slate-700/80" />
      <div className="absolute bottom-8 left-[36%] h-20 w-16 rounded-t-[20px] bg-slate-950/80 shadow-inner shadow-violet-500/20" />
      <div className="absolute bottom-8 left-[42%] h-7 w-7 rounded-full bg-violet-400/80 blur-sm" />
      <div className="absolute left-6 top-5 h-12 w-12 rounded-full bg-white/10" />
      <div className="absolute right-10 top-8 h-10 w-10 rounded-full bg-violet-400/30 blur-md" />

      <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-200/80">
          <span>Panel {panel.number}</span>
          <span>{panel.shot}</span>
        </div>
      </div>

      {panel.dialogue ? <SpeechBubble speaker={panel.speaker ?? 'Maya'} text={panel.dialogue} /> : null}
    </div>
  );
}
