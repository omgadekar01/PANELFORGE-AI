import type { Panel } from '../types/project';

interface InspectorProps {
  panel: Panel | null;
  onChange: (patch: Partial<Panel>) => void;
  onSave: () => void;
}

export function Inspector({ panel, onChange, onSave }: InspectorProps) {
  if (!panel) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-slate-400">
        Select a panel to inspect it.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
      <div className="mb-4 text-lg font-semibold text-white">Selected Panel</div>
      <div className="space-y-4 text-sm text-slate-300">
        <div>
          <label className="mb-1 block text-slate-400">Shot</label>
          <input
            value={panel.shot}
            onChange={(event) => onChange({ shot: event.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0 focus:border-violet-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-slate-400">Characters</label>
          <input
            value={panel.character ?? 'Maya'}
            onChange={(event) => onChange({ character: event.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0 focus:border-violet-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-slate-400">Emotion</label>
          <input
            value={panel.emotion}
            onChange={(event) => onChange({ emotion: event.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0 focus:border-violet-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-slate-400">Dialogue</label>
          <textarea
            value={panel.dialogue ?? ''}
            onChange={(event) => onChange({ dialogue: event.target.value })}
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-violet-500"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onSave}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400"
      >
        Save Changes
      </button>
    </div>
  );
}
