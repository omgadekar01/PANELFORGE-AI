import { ArrowRight, PencilLine, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { useProject } from '../context/ProjectContext';

const workflow = ['Story', 'Characters', 'Panels', 'Layout', 'Dialogue', 'Export'];

export function Story() {
  const navigate = useNavigate();
  const { project } = useProject();

  if (!project) return null;

  return (
    <div className="space-y-6">
      <Header title="Story Analysis" subtitle="Generated from your cinematic outline." />

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
        {workflow.map((step, index) => {
          const active = index === 0;
          return (
            <button
              key={step}
              type="button"
              onClick={() => {
                const routes = ['/story', '/characters', '/panels', '/layout', '/layout', '/export'];
                if (index <= 5) navigate(routes[index]);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] ${
                active ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {String(index + 1).padStart(2, '0')} {step}
              {index < workflow.length - 1 ? <ArrowRight size={12} /> : null}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-xl font-semibold text-white">Story Structure</div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700" onClick={() => navigate('/new-project')}>
                <PencilLine size={12} /> Edit Story
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-3 py-2 text-xs font-medium text-white hover:bg-violet-400" onClick={() => navigate('/characters')}>
                <Sparkles size={12} /> Generate Character References →
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <div className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-500">Characters</div>
              <div className="space-y-3">
                {project.characters.map((character) => (
                  <div key={character.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="text-lg font-semibold text-white">{character.name}</div>
                    <div className="mt-2 text-sm text-slate-300"><span className="text-slate-500">Role:</span> {character.role}</div>
                    <div className="mt-1 text-sm text-slate-300"><span className="text-slate-500">Appearance:</span> {character.appearance}</div>
                    <div className="mt-1 text-sm text-slate-300"><span className="text-slate-500">Emotion:</span> {character.emotion}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-500">Scenes</div>
              <div className="space-y-3">
                {project.scenes.map((scene, index) => (
                  <div key={scene} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-200">
                    <span className="text-slate-500">Scene {index + 1}:</span> {scene}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-500">Panels</div>
              <div className="space-y-3">
                {project.panels.map((panel) => (
                  <div key={panel.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="mb-2 text-sm font-semibold text-white">Panel {String(panel.number).padStart(2, '0')}</div>
                    <div className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                      <div><span className="text-slate-500">Shot:</span> {panel.shot}</div>
                      <div><span className="text-slate-500">Action:</span> {panel.action}</div>
                      <div><span className="text-slate-500">Emotion:</span> {panel.emotion}</div>
                      <div><span className="text-slate-500">Dialogue:</span> {panel.dialogue || 'None'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
          <div className="mb-4 text-lg font-semibold text-white">Project Summary</div>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Title</div>
              <div className="mt-1 text-base font-medium text-white">{project.name}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Style</div>
              <div className="mt-1 text-base font-medium text-white">{project.style}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Story Seed</div>
              <div className="mt-2 text-slate-300">{project.story}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
