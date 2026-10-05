'use client';

import React from 'react';
import { Layers, BookOpen, Award, FileCode, CheckCircle2 } from 'lucide-react';

export default function AdminContentPage() {
  const contentStats = [
    { type: 'Published Courses', count: 18, status: 'Active' },
    { type: 'Modular Lessons', count: 142, status: 'Audited' },
    { type: 'Adaptive Assessment Question Banks', count: 48, status: 'Proctored' },
    { type: 'Coding Lab Challenge Blueprints', count: 36, status: 'Sandboxed' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Global Platform Content & Curriculum Governance
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              Curriculum Audit
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Global catalog oversight of courses, proctored assessments, and coding blueprints across all institutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contentStats.map((item) => (
          <div key={item.type} className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              {item.type}
            </span>
            <div className="text-3xl font-black text-white font-mono">{item.count}</div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
