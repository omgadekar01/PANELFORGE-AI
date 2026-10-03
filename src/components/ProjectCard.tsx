import { ArrowRight, ImagePlus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  name: string;
  panels: number;
  edited: string;
  progress: number;
  active?: boolean;
}

export function ProjectCard({ name, panels, edited, progress, active = false }: ProjectCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/10">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-white">{name}</div>
          <div className="mt-1 text-sm text-slate-400">{panels} panels</div>
        </div>
        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-200">
          <ImagePlus size={16} />
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
        <span>Last edited</span>
        <span>{edited}</span>
      </div>

      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-400 to-cyan-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Link
        to="/story"
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          active ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
        }`}
      >
        Open
        <ArrowRight size={14} />
      </Link>
      <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
        <Sparkles size={12} />
        {active ? 'Active project' : 'Storyboard ready'}
      </div>
    </div>
  );
}
