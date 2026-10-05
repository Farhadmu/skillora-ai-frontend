'use client';

import React from 'react';
import { GraduationCap, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminLearnersPage() {
  const learners = [
    { name: 'Alex Johnson', email: 'alex.j@example.com', target: 'Full-Stack AI Systems', verifiedSkills: 7, readiness: 84, status: 'Active' },
    { name: 'Elena Rostova', email: 'elena.r@example.com', target: 'Backend Node.js & Cloud', verifiedSkills: 9, readiness: 92, status: 'Active' },
    { name: 'Marcus Vance', email: 'marcus.v@example.com', target: 'Platform Reliability', verifiedSkills: 5, readiness: 78, status: 'Active' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Learners Registry Oversight
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Talent Pool
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Global directory of enrolled learners with verified readiness scores and proof attestations.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {learners.map((l) => (
          <div
            key={l.email}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div>
              <span className="font-bold text-white text-sm">{l.name}</span>
              <div className="text-zinc-400 font-mono mt-0.5">
                {l.email} • Target: {l.target}
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono">
              <span className="text-emerald-400 font-bold">{l.verifiedSkills} Verified Skills</span>
              <span className="text-cyan-400 font-bold">Readiness: {l.readiness}/100</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase">
                {l.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
