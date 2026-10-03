import {
  BookOpen,
  Clapperboard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'New Project', to: '/new-project', icon: Sparkles },
  { label: 'Story', to: '/story', icon: FileText },
  { label: 'Characters', to: '/characters', icon: Wand2 },
  { label: 'Panels', to: '/panels', icon: Clapperboard },
  { label: 'Comic Layout', to: '/layout', icon: BookOpen },
  { label: 'Export', to: '/export', icon: Sparkles },
];

const footerItems = [
  { label: 'Settings', to: '/new-project', icon: Settings },
  { label: 'Help', to: '/story', icon: HelpCircle },
];

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col justify-between border-r border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div>
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-400 text-lg font-bold text-white shadow-lg shadow-violet-500/30">
            P
          </div>
          <div>
            <div className="text-lg font-semibold text-white">PanelForge AI</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
              Storyboard OS
            </div>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-500/15 text-violet-200 ring-1 ring-violet-500/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-1.5 border-t border-slate-800 pt-4">
        {footerItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
