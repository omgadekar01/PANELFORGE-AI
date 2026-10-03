import { jsPDF } from 'jspdf';
import { Download, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { useProject } from '../context/ProjectContext';

const workflow = ['Story', 'Characters', 'Panels', 'Layout', 'Dialogue', 'Export'];

export function Export() {
  const { project, pushToast } = useProject();
  const [animaticOpen, setAnimaticOpen] = useState(false);

  if (!project) return null;

  const exportPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      pushToast('PNG export is unavailable in this browser.', 'error');
      return;
    }

    ctx.fillStyle = '#090d17';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 28px sans-serif';
    ctx.fillText(`${project.name} — Export Preview`, 56, 58);

    const panels = project.panels.slice(0, 4);
    panels.forEach((panel, index) => {
      const x = 50 + (index % 2) * 560;
      const y = 120 + Math.floor(index / 2) * 260;
      ctx.fillStyle = index % 2 === 0 ? '#111827' : '#1f2937';
      ctx.fillRect(x, y, 500, 210);
      ctx.fillStyle = '#e5e7eb';
      ctx.font = '500 18px sans-serif';
      ctx.fillText(`Panel ${panel.number}`, x + 22, y + 32);
      ctx.fillStyle = '#a5b4fc';
      ctx.fillText(panel.shot, x + 22, y + 70);
      ctx.fillStyle = '#f9fafb';
      ctx.fillText(panel.action, x + 22, y + 112, 440);
      if (panel.dialogue) {
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`“${panel.dialogue}”`, x + 22, y + 168, 420);
      }
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-comic.png`;
    link.click();
    pushToast('PNG export downloaded successfully.', 'success');
  };

  const exportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    doc.setFillColor(15, 16, 27);
    doc.rect(0, 0, 595, 842, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text(project.name, 40, 60);
    doc.setFontSize(12);
    doc.setTextColor(196, 181, 253);
    doc.text('PanelForge AI — Export Preview', 40, 90);

    project.panels.slice(0, 4).forEach((panel, index) => {
      const x = 40 + (index % 2) * 250;
      const y = 120 + Math.floor(index / 2) * 220;
      doc.setFillColor(17, 24, 39);
      doc.roundedRect(x, y, 220, 160, 10, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(`Panel ${panel.number}`, x + 18, y + 28);
      doc.setTextColor(165, 180, 252);
      doc.text(panel.shot, x + 18, y + 48);
      doc.setTextColor(255, 255, 255);
      const lines = doc.splitTextToSize(panel.action, 160);
      doc.text(lines, x + 18, y + 80);
      if (panel.dialogue) {
        doc.setTextColor(255, 255, 255);
        const bubbleText = doc.splitTextToSize(`“${panel.dialogue}”`, 150);
        doc.text(bubbleText, x + 18, y + 130);
      }
    });

    doc.save(`${project.name.toLowerCase().replace(/\s+/g, '-')}-comic.pdf`);
    pushToast('PDF generated successfully.', 'success');
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
              index === 5 ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {String(index + 1).padStart(2, '0')} {step}
          </button>
        ))}
      </div>

      <Header title="Export Your Comic" subtitle="Export the comic page or preview an animatic motion test." />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
          <div className="mb-5 text-lg font-semibold text-white">Final Comic Preview</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.panels.slice(0, 4).map((panel) => (
              <div key={panel.id} className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/80">
                <div className="flex h-52 items-end justify-between bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-800 p-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Panel {panel.number}</div>
                    <div className="mt-2 text-sm font-medium text-white">{panel.shot}</div>
                  </div>
                  <div className="rounded-full bg-violet-500/15 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-violet-200">
                    {panel.emotion}
                  </div>
                </div>
                <div className="p-3 text-sm text-slate-300">
                  <div className="mb-2 font-medium text-white">{panel.action}</div>
                  {panel.dialogue ? <div className="rounded-lg bg-white px-2 py-1 text-slate-900">“{panel.dialogue}”</div> : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
            <div className="mb-4 text-lg font-semibold text-white">Export</div>
            <div className="space-y-3">
              <Button className="w-full" onClick={exportPNG}><Download size={16} className="mr-2" /> Export PNG</Button>
              <Button className="w-full" variant="secondary" onClick={exportPDF}><Download size={16} className="mr-2" /> Export PDF</Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
            <div className="mb-3 text-lg font-semibold text-white">Optional Animatic</div>
            <div className="mb-3 text-sm text-slate-300">
              Create a simple Ken Burns-style preview using panel transitions.
            </div>
            <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
              <div>Duration per panel: 2 seconds</div>
              <div className="mt-1">Transition: Fade</div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" variant="secondary" onClick={() => { setAnimaticOpen(true); pushToast('Animatic created successfully.', 'success'); }}>
                Create Animatic
              </Button>
            </div>
            {animaticOpen ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/70">
                <div className="relative h-44 animate-pulse bg-gradient-to-r from-violet-500/20 via-cyan-400/20 to-slate-900">
                  <div className="absolute inset-0 flex items-center justify-center gap-2 text-violet-100">
                    <PlayCircle size={18} />
                    Preview Animatic
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
