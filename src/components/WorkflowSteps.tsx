import { BookOpen, Clapperboard, FileText, Layers3, MessageSquareText, SendToBack } from 'lucide-react';

const steps = [
  { label: 'Story', icon: FileText },
  { label: 'Characters', icon: BookOpen },
  { label: 'Panels', icon: Clapperboard },
  { label: 'Layout', icon: Layers3 },
  { label: 'Dialogue', icon: MessageSquareText },
  { label: 'Export', icon: SendToBack },
];

export function WorkflowSteps() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
      <div className="mb-5 text-lg font-semibold text-white">Workflow</div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map(({ label, icon: Icon }, index) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-200">
              <Icon size={18} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">0{index + 1}</div>
              <div className="text-sm font-medium text-slate-100">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
