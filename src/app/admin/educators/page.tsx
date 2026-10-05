'use client';

import React from 'react';
import { BookOpen, Users, CheckCircle2 } from 'lucide-react';

export default function AdminEducatorsPage() {
  const educators = [
    { name: 'Dr. Alan Mitchell', email: 'alan.mitchell@skillora.edu', institution: 'Skillora Institute', cohorts: 3, students: 84, status: 'Verified Faculty' },
    { name: 'Prof. Sumaiya Begum', email: 'sumaiya.b@ai-faculty.org', institution: 'Global AI Lab', cohorts: 2, students: 62, status: 'Verified Faculty' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Educators & Faculty Registry
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Faculty Directory
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Authorizations, teaching licenses, and institutional credentials for approved educators.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {educators.map((e) => (
          <div
            key={e.email}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div>
              <span className="font-bold text-white text-sm">{e.name}</span>
              <div className="text-zinc-400 font-mono mt-0.5">
                {e.email} • {e.institution}
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono">
              <span className="text-cyan-400 font-bold">{e.cohorts} Cohorts</span>
              <span className="text-purple-400 font-bold">{e.students} Enrolled</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase">
                {e.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
