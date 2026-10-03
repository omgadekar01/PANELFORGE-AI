import { useState } from 'react';
import { Header } from '../components/Header';
import { PanelCard } from '../components/PanelCard';
import { useProject } from '../context/ProjectContext';

const workflow = ['Story', 'Characters', 'Panels', 'Layout', 'Dialogue', 'Export'];

export function Panels() {
  const { project, updateProject, updatePanel, deletePanel, regeneratePanel, pushToast } = useProject();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ action: '', dialogue: '', shot: '', emotion: '' });

  if (!project) return null;

  const handleMove = (index: number) => {
    if (index >= project.panels.length - 1) return;
    const reordered = [...project.panels];
    [reordered[index], reordered[index + 1]] = [reordered[index + 1], reordered[index]];
    const normalized = reordered.map((panel, orderIndex) => ({ ...panel, number: orderIndex + 1 }));
    updateProject({ panels: normalized });
    pushToast('Panel moved successfully.', 'success');
  };

  const handleSave = () => {
    if (!editingId) return;
    updatePanel(editingId, {
      action: draft.action,
      dialogue: draft.dialogue,
      shot: draft.shot,
      emotion: draft.emotion,
    });
    setEditingId(null);
    pushToast('Panel updated successfully.', 'success');
  };

  const handleAddPanel = () => {
    const nextNumber = project.panels.length + 1;
    const newPanel = {
      id: `panel-${Date.now()}`,
      number: nextNumber,
      shot: 'Wide Shot',
      action: `New panel ${nextNumber} in the story arc.`,
      emotion: 'Focused',
      dialogue: '',
      speaker: 'Maya',
      character: 'Maya',
      variant: 1,
    };
    updateProject({ panels: [...project.panels, newPanel] });
    pushToast('New panel added.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
        {workflow.map((step, index) => (
          <button
            key={step}
            type="button"
            onClick={() => {
              const routes = ['/story', '/characters', '/panels', '/layout', '/layout', '/export'];
              if (index <= 5) window.location.href = routes[index];
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] ${
              index === 2 ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {String(index + 1).padStart(2, '0')} {step}
          </button>
        ))}
      </div>

      <Header
        title="Panel Generator"
        subtitle="Create a 2x2 comic grid for your MVP prototype."
        action={
          <button type="button" onClick={handleAddPanel} className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-400">
            + Add Panel
          </button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {project.panels.map((panel, index) => (
          <div key={panel.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/10">
            {editingId === panel.id ? (
              <div className="space-y-3">
                <input
                  value={draft.shot}
                  onChange={(event) => setDraft((current) => ({ ...current, shot: event.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  placeholder="Shot type"
                />
                <textarea
                  value={draft.action}
                  onChange={(event) => setDraft((current) => ({ ...current, action: event.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  placeholder="Action"
                />
                <input
                  value={draft.emotion}
                  onChange={(event) => setDraft((current) => ({ ...current, emotion: event.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  placeholder="Emotion"
                />
                <textarea
                  value={draft.dialogue}
                  onChange={(event) => setDraft((current) => ({ ...current, dialogue: event.target.value }))}
                  rows={2}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  placeholder="Dialogue"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={handleSave} className="rounded-lg bg-violet-500 px-3 py-2 text-xs text-white">Save</button>
                  <button type="button" onClick={() => setEditingId(null)} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200">Cancel</button>
                </div>
              </div>
            ) : (
              <PanelCard
                panel={panel}
                onRegenerate={() => {
                  regeneratePanel(panel.id);
                  pushToast(`Panel ${panel.number} regenerated successfully.`, 'success');
                }}
                onEdit={() => {
                  setEditingId(panel.id);
                  setDraft({
                    action: panel.action,
                    dialogue: panel.dialogue ?? '',
                    shot: panel.shot,
                    emotion: panel.emotion,
                  });
                }}
                onMove={() => handleMove(index)}
                onDelete={() => {
                  const confirmed = window.confirm(`Delete panel ${panel.number}?`);
                  if (confirmed) {
                    deletePanel(panel.id);
                    pushToast(`Panel ${panel.number} deleted.`, 'success');
                  }
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
