import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { useProject } from '../context/ProjectContext';

const styleOptions = ['Ink & Manga', 'Graphic Novel', 'Noir', 'Storybook', 'Minimal Line Art'];

export function NewProject() {
  const navigate = useNavigate();
  const { createProject, pushToast } = useProject();
  const [form, setForm] = useState({
    name: '',
    story:
      'A young engineer enters an abandoned railway station at midnight. A strange blue light appears at the end of the platform. She walks toward it and discovers an old robot waiting beside a broken train.',
    style: 'Ink & Manga',
    panelCount: 4,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!form.name.trim()) {
      pushToast('Project name is required before analysis.', 'error');
      return;
    }

    if (!form.story.trim()) {
      pushToast('Story text cannot be empty.', 'error');
      return;
    }

    setLoading(true);
    pushToast('Analyzing story...', 'info');

    window.setTimeout(() => {
      const project = createProject({
        name: form.name,
        story: form.story,
        style: form.style,
        panelCount: form.panelCount,
      });
      pushToast(`Story structure created for ${project.name}.`, 'success');
      navigate('/story');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Header title="New Project" subtitle="Build a project plan from your script or story idea." />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Project Name</label>
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Enter project name..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Story / Script</label>
              <textarea
                value={form.story}
                onChange={(event) => setForm((current) => ({ ...current, story: event.target.value }))}
                rows={8}
                placeholder="Paste your story or screenplay here..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-slate-300">Visual Style</div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {styleOptions.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, style }))}
                    className={`rounded-2xl border p-3 text-left transition ${
                      form.style === style
                        ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                        : 'border-slate-700 bg-slate-950/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="mb-3 flex h-20 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="relative h-12 w-16 rounded-xl bg-gradient-to-b from-slate-700 via-violet-500/30 to-cyan-400/20" />
                    </div>
                    <div className="text-sm font-medium text-white">{style}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm text-slate-300">Panel Count</div>
              <div className="flex flex-wrap gap-3">
                {[4, 6, 8].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, panelCount: count }))}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                      form.panelCount === count
                        ? 'border-violet-500 bg-violet-500/10 text-violet-100'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {count} Panels
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
          <div className="mb-6 text-lg font-semibold text-white">Scene Outline</div>
          <div className="space-y-3">
            {['Opening shot', 'Unexpected signal', 'Investigate anomaly', 'Final reveal'].map((step, index) => (
              <div key={step} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-xs font-semibold text-violet-200">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{step}</div>
                  <div className="text-xs text-slate-400">Readable story beat for panel generation.</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Analyzing story...' : 'Analyze Story →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
