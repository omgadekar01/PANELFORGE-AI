import { Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { Header } from '../components/Header';
import { useProject } from '../context/ProjectContext';

const workflow = ['Story', 'Characters', 'Panels', 'Layout', 'Dialogue', 'Export'];

export function Characters() {
  const { project, updateCharacter, updateProject, regenerateCharacter, lockCharacter, pushToast } = useProject();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: '', description: '', role: '' });

  if (!project) return null;

  const onSaveEdit = () => {
    if (!editingId) return;
    updateCharacter(editingId, {
      name: draft.name,
      description: draft.description,
      role: draft.role,
    });
    setEditingId(null);
    pushToast('Character updated successfully.', 'success');
  };

  const handleAddCharacter = () => {
    const newCharacter = {
      id: `char-${Date.now()}`,
      name: `New Character ${project.characters.length + 1}`,
      description: 'Original supporting cast member for the next story beat.',
      emotion: 'Focused',
      locked: false,
      variant: 1,
      role: 'Supporting Character',
      appearance: 'Original observer with subtle silhouette details.',
    };

    updateProject({ characters: [...project.characters, newCharacter] });
    pushToast('New character added.', 'success');
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
              index === 1 ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {String(index + 1).padStart(2, '0')} {step}
          </button>
        ))}
      </div>

      <Header
        title="Character References"
        subtitle="Lock character appearances before generating panels."
        action={
          <button type="button" onClick={handleAddCharacter} className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-400">
            <Plus size={16} />
            + Add Character
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-2">
        {project.characters.map((character) => (
          <div key={character.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/10">
            {editingId === character.id ? (
              <div className="space-y-3">
                <input
                  value={draft.name}
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                <textarea
                  value={draft.description}
                  onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                <input
                  value={draft.role}
                  onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={onSaveEdit} className="rounded-lg bg-violet-500 px-3 py-2 text-xs text-white">Save</button>
                  <button type="button" onClick={() => setEditingId(null)} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200">Cancel</button>
                </div>
              </div>
            ) : (
              <CharacterCard
                character={character}
                onRegenerate={() => {
                  regenerateCharacter(character.id);
                  pushToast(`${character.name} regenerated successfully.`, 'success');
                }}
                onEdit={() => {
                  setEditingId(character.id);
                  setDraft({
                    name: character.name,
                    description: character.description,
                    role: character.role,
                  });
                }}
                onLock={() => {
                  lockCharacter(character.id);
                  pushToast(
                    `${character.name} ${character.locked ? 'unlocked' : 'locked'} successfully.`,
                    'success',
                  );
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-5 text-center text-slate-400">
        <div className="mb-2 flex justify-center text-violet-200"><Sparkles size={18} /></div>
        Identity references are persisted locally and ready for panel planning.
      </div>
    </div>
  );
}
