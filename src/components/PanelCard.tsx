import { ArrowLeftRight, PencilLine, RefreshCw, Trash2 } from 'lucide-react';
import type { Panel } from '../types/project';
import { ComicPanel } from './ComicPanel';

interface PanelCardProps {
  panel: Panel;
  onRegenerate: () => void;
  onEdit: () => void;
  onMove: () => void;
  onDelete: () => void;
}

export function PanelCard({ panel, onRegenerate, onEdit, onMove, onDelete }: PanelCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-lg shadow-black/10">
      <ComicPanel panel={panel} compact />

      <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-white">Panel {panel.number}</div>
          <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500">{panel.shot}</div>
        </div>

        <div className="space-y-1 text-xs text-slate-300">
          <div><span className="text-slate-500">Action:</span> {panel.action}</div>
          <div><span className="text-slate-500">Character:</span> {panel.character}</div>
          <div><span className="text-slate-500">Emotion:</span> {panel.emotion}</div>
          <div><span className="text-slate-500">Dialogue:</span> {panel.dialogue || 'None'}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={onRegenerate} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700">
          <RefreshCw size={12} /> Regenerate
        </button>
        <button onClick={onEdit} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700">
          <PencilLine size={12} /> Edit
        </button>
        <button onClick={onMove} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700">
          <ArrowLeftRight size={12} /> Move
        </button>
        <button onClick={onDelete} className="inline-flex items-center gap-2 rounded-lg bg-rose-500/15 px-3 py-2 text-xs text-rose-200 hover:bg-rose-500/20">
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
}
