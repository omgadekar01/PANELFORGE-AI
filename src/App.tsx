import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Characters } from './pages/Characters';
import { Dashboard } from './pages/Dashboard';
import { Export } from './pages/Export';
import { Layout } from './pages/Layout';
import { NewProject } from './pages/NewProject';
import { Panels } from './pages/Panels';
import { Story } from './pages/Story';
import './index.css';

const mobileRoutes = [
  { label: 'Dashboard', to: '/' },
  { label: 'Story', to: '/story' },
  { label: 'Chars', to: '/characters' },
  { label: 'Panels', to: '/panels' },
  { label: 'Layout', to: '/layout' },
  { label: 'Export', to: '/export' },
];

function AppShell() {
  const { toasts } = useProject();

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <div className="hidden w-72 shrink-0 md:block">
          <Sidebar />
        </div>

        <div className="flex-1">
          <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl md:hidden">
            <div className="flex gap-2 overflow-x-auto px-3 py-3">
              {mobileRoutes.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition ${
                      isActive ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <main className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-project" element={<NewProject />} />
              <Route path="/story" element={<Story />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/panels" element={<Panels />} />
              <Route path="/layout" element={<Layout />} />
              <Route path="/export" element={<Export />} />
            </Routes>
          </main>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl border px-3 py-2 text-sm shadow-lg ${
              toast.type === 'error'
                ? 'border-rose-500/50 bg-rose-500/10 text-rose-100'
                : toast.type === 'info'
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-100'
                  : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ProjectProvider>
  );
}
