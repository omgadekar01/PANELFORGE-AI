import { useEffect, useState } from 'react';
import { LayoutEditor } from '../components/LayoutEditor';
import { Inspector } from '../components/Inspector';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useProject } from '../context/ProjectContext';
import type { Panel } from '../types/project';

const layouts = ['2x2 Grid', 'Cinematic', 'Manga', 'Storyboard'] as const;

const workflow = ['Story', 'Characters', 'Panels', 'Layout', 'Dialogue', 'Export'];

export function Layout() {
  const { project, updatePanel, pushToast } = useProject();
  const [selectedLayout, setSelectedLayout] = useState<(typeof layouts)[number]>('2x2 Grid');
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    if (!selectedPanelId && project.panels.length) {
      setSelectedPanelId(project.panels[0].id);
    }
  }, [project, selectedPanelId]);

  if (!project) return null;

  const selectedPanel = project.panels.find((panel) => panel.id === selectedPanelId) ?? project.panels[0] ?? null;

  const handleInspectorChange = (patch: Partial<Panel>) => {
    if (!selectedPanel) return;
    updatePanel(selectedPanel.id, patch);
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
              index === 3 ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {String(index + 1).padStart(2, '0')} {step}
          </button>
        ))}
      </div>

      <Header title="Comic Layout" subtitle="Arrange your panels into a cinematic sequence." />

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
        {layouts.map((layout) => (
          <button
            key={layout}
            type="button"
            onClick={() => setSelectedLayout(layout)}
            className={`rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] ${
              selectedLayout === layout ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {layout}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <LayoutEditor
          panels={project.panels}
          selectedLayout={selectedLayout}
          selectedPanelId={selectedPanelId}
          onSelectPanel={(panelId) => setSelectedPanelId(panelId)}
        />

        <div className="space-y-4">
          <Inspector
            panel={selectedPanel}
            onChange={handleInspectorChange}
            onSave={() => {
              pushToast('Layout changes saved locally.', 'success');
            }}
          />
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-3 text-lg font-semibold text-white">Layout Tools</div>
            <div className="space-y-2 text-sm text-slate-300">
              <div>• Select panel</div>
              <div>• Move panel</div>
              <div>• Delete panel</div>
              <div>• Edit dialogue</div>
              <div>• Regenerate panel</div>
            </div>
            <Button className="mt-4 w-full" variant="secondary" onClick={() => pushToast('Panel layout ready for export.', 'success')}>
              Save Layout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
