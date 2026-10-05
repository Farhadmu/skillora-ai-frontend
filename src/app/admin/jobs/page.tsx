'use client';

import React, { useState } from 'react';
import { Briefcase, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([
    { id: 'j-1', title: 'Senior Full-Stack AI Systems Engineer', company: 'TechScale AI', salary: '$140k - $170k', status: 'VERIFIED_SAFE' },
    { id: 'j-2', title: 'Backend Node.js & Distributed Systems Architect', company: 'NeuralFlow Data', salary: '$150k - $185k', status: 'VERIFIED_SAFE' },
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Job Postings Moderation & Verification
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              Requisition Moderation
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review job postings for fair compensation transparency, competency accuracy, and zero discrimination.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div>
              <span className="font-bold text-white text-sm">{j.title}</span>
              <div className="text-zinc-400 font-mono mt-0.5">
                {j.company} • Compensation: {j.salary}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                {j.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
