import type { Panel } from '../types/project';
import { ComicPanel } from './ComicPanel';

interface LayoutEditorProps {
  panels: Panel[];
  selectedLayout: '2x2 Grid' | 'Cinematic' | 'Manga' | 'Storyboard';
  selectedPanelId: string | null;
  onSelectPanel: (panelId: string) => void;
}

export function LayoutEditor({ panels, selectedLayout, selectedPanelId, onSelectPanel }: LayoutEditorProps) {
  const layoutMap = {
    '2x2 Grid': 'grid-cols-2',
    Cinematic: 'grid-cols-1',
    Manga: 'grid-cols-2',
    Storyboard: 'grid-cols-4',
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/10">
      <div className={`grid gap-4 ${layoutMap[selectedLayout]}`}>
        {panels.map((panel, index) => {
          const isSelected = panel.id === selectedPanelId;
          const large = selectedLayout === 'Cinematic' && index === 0;
          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => onSelectPanel(panel.id)}
              className={`overflow-hidden rounded-2xl border transition ${
                isSelected ? 'border-violet-400 ring-2 ring-violet-500/40' : 'border-slate-700'
              } ${large ? 'md:col-span-2' : ''}`}
            >
              <ComicPanel panel={panel} variant={panel.variant} compact={!large} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
