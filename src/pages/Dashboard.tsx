import { Download, FolderKanban, PanelsTopLeft, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { WorkflowSteps } from '../components/WorkflowSteps';
import { useProject } from '../context/ProjectContext';

const recentProjects = [
  { name: 'The Last Signal', panels: 4, edited: '2h ago', progress: 82 },
  { name: 'Neon Rain', panels: 6, edited: 'Yesterday', progress: 64 },
  { name: 'The Forgotten Station', panels: 8, edited: '3 days ago', progress: 44 },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { project } = useProject();

  const stats = [
    { label: 'Projects', value: 3, icon: <FolderKanban size={18} /> },
    { label: 'Characters', value: project?.characters.length ?? 0, icon: <Users size={18} /> },
    { label: 'Panels', value: project?.panels.length ?? 0, icon: <PanelsTopLeft size={18} /> },
    { label: 'Exports', value: 6, icon: <Download size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/40 p-6 shadow-2xl shadow-black/20">
        <div className="mb-2 text-xs uppercase tracking-[0.25em] text-violet-200">PanelForge AI</div>
        <h1 className="text-3xl font-semibold text-white md:text-5xl">Where Stories Become Worlds.</h1>
        <p className="mt-3 max-w-2xl text-base text-slate-300">
          Turn rough scripts into structured storyboards, consistent character references, and editable comic panels.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => navigate('/new-project')}>Create Your First Storyboard</Button>
          <Button variant="secondary" onClick={() => navigate('/story')}>
            Open Demo
          </Button>
        </div>
      </div>

      <Header
        title="Good afternoon, Creator"
        subtitle="Turn your stories into storyboard-ready comics in minutes."
        action={
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/new-project')}>+ New Project</Button>
            <Button variant="secondary" onClick={() => navigate('/story')}>
              Open Demo Project
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} icon={item.icon} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-lg font-semibold text-white">Recent Projects</div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-violet-200">
              <Sparkles size={12} />
              Active
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recentProjects.map((projectItem) => (
              <ProjectCard
                key={projectItem.name}
                name={projectItem.name}
                panels={projectItem.panels}
                edited={projectItem.edited}
                progress={projectItem.progress}
                active={projectItem.name === 'The Last Signal'}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
          <div className="mb-4 text-lg font-semibold text-white">Quick Start</div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-950/65 p-3">
              <div className="font-medium text-white">Storyboard review</div>
              <div className="mt-1 text-slate-400">Check your last panel sequence.</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/65 p-3">
              <div className="font-medium text-white">Character lock</div>
              <div className="mt-1 text-slate-400">Confirm Maya and Atlas are ready for layouts.</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/65 p-3">
              <div className="font-medium text-white">Export prep</div>
              <div className="mt-1 text-slate-400">Prepare pages for PNG and PDF export.</div>
            </div>
          </div>
        </div>
      </div>

      <WorkflowSteps />
    </div>
  );
}
