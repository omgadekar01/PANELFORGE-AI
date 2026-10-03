import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-slate-400">{label}</div>
        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-200">{icon}</div>
      </div>
      <div className="text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}
