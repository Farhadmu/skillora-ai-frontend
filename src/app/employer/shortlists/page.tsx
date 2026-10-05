'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Star, ArrowRight, CheckCircle2, Download, Trash2 } from 'lucide-react';

export default function EmployerShortlistsPage() {
  const [shortlisted, setShortlisted] = useState([
    {
      id: 'sl-1',
      alias: 'Candidate #8841',
      role: 'Full-Stack AI Systems Engineer',
      matchScore: 94,
      readiness: 84,
      skills: ['TypeScript', 'NestJS', 'RAG Pipelines', 'Docker'],
      savedDate: 'Oct 3, 2026',
    },
    {
      id: 'sl-2',
      alias: 'Candidate #9102',
      role: 'Backend Node.js & Distributed Systems Architect',
      matchScore: 89,
      readiness: 92,
      skills: ['TypeScript', 'Redis', 'Microservices', 'Jest'],
      savedDate: 'Oct 1, 2026',
    },
  ]);

  const handleRemove = (id: string) => {
    setShortlisted(shortlisted.filter((s) => s.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Shortlisted Candidates
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Saved Talent
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Bookmarked engineers ready for interview scheduling and technical evaluation.
          </p>
        </div>

        <Link
          href="/employer/interviews"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
        >
          <span>Batch Schedule Technical Round</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {shortlisted.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{item.alias}</span>
                <span className="text-xs text-zinc-500 font-mono">Saved {item.savedDate}</span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{item.role}</p>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[11px] font-mono"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center font-mono">
                <div className="text-base font-bold text-emerald-400">{item.matchScore}%</div>
                <div className="text-[10px] text-zinc-500">Match</div>
              </div>

              <div className="text-center font-mono">
                <div className="text-base font-bold text-cyan-400">{item.readiness}/100</div>
                <div className="text-[10px] text-zinc-500">Readiness</div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                title="Remove from shortlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
