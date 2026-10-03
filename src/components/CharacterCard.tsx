import { Check, PencilLine, RefreshCw, ShieldCheck } from 'lucide-react';
import type { Character } from '../types/project';

interface CharacterCardProps {
  character: Character;
  onRegenerate: () => void;
  onEdit: () => void;
  onLock: () => void;
}

const portraitStyles: Record<number, string> = {
  1: 'from-violet-500/60 via-purple-500/20 to-slate-900',
  2: 'from-cyan-500/60 via-indigo-500/20 to-slate-900',
  3: 'from-amber-500/50 via-orange-500/10 to-slate-900',
  4: 'from-emerald-500/50 via-cyan-500/10 to-slate-900',
};

export function CharacterCard({ character, onRegenerate, onEdit, onLock }: CharacterCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/10">
      <div className="mb-4 flex gap-4">
        <div className={`relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br ${portraitStyles[character.variant % 4 || 1]}`}>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-950/70" />
          <div className="absolute bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-slate-200/90" />
          <div className="absolute bottom-0 left-1/2 h-12 w-12 -translate-x-1/2 rounded-t-[22px] bg-slate-800/80" />
          <div className="absolute left-4 top-3 h-4 w-4 rounded-full bg-violet-100/80" />
          <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-cyan-200/70" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">{character.name}</h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${
                character.locked ? 'bg-emerald-500/10 text-emerald-200' : 'bg-amber-500/10 text-amber-200'
              }`}
            >
              {character.locked ? <Check size={12} /> : <ShieldCheck size={12} />}
              {character.locked ? 'Identity Locked' : 'Open'}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-300">{character.description}</p>
        </div>
      </div>

      <div className="mb-4 grid gap-2 text-sm text-slate-300">
        <div><span className="text-slate-500">Role:</span> {character.role}</div>
        <div><span className="text-slate-500">Appearance:</span> {character.appearance}</div>
        <div><span className="text-slate-500">Emotion:</span> {character.emotion}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={character.locked}
        >
          <RefreshCw size={14} />
          Regenerate
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
        >
          <PencilLine size={14} />
          Edit
        </button>
        <button
          type="button"
          onClick={onLock}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-400"
        >
          <Check size={14} />
          {character.locked ? 'Unlock Identity' : 'Lock Identity'}
        </button>
      </div>
    </div>
  );
}
