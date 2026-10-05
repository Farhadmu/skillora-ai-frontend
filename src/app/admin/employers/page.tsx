'use client';

import React from 'react';
import { Building2, Briefcase, CheckCircle2 } from 'lucide-react';

export default function AdminEmployersPage() {
  const employers = [
    { name: 'TechScale AI Enterprises', contact: 'sarah.j@techscale.ai', jobsActive: 2, pipelineCount: 18, status: 'Verified Employer' },
    { name: 'NeuralFlow Data Systems', contact: 'recruiting@neuralflow.io', jobsActive: 1, pipelineCount: 12, status: 'Verified Employer' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Employers & Corporate Partners
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Corporate Registry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Enterprise company authorizations, verified corporate accounts, and job requisition quotas.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {employers.map((emp) => (
          <div
            key={emp.name}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div>
              <span className="font-bold text-white text-sm">{emp.name}</span>
              <div className="text-zinc-400 font-mono mt-0.5">{emp.contact}</div>
            </div>

            <div className="flex items-center gap-4 font-mono">
              <span className="text-purple-400 font-bold">{emp.jobsActive} Active Jobs</span>
              <span className="text-emerald-400 font-bold">{emp.pipelineCount} Candidates in Pipeline</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase">
                {emp.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
