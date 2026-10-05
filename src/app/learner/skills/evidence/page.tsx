'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, GitBranch, Code2, Award, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SkillEvidencePage() {
  const [filter, setFilter] = useState<'ALL' | 'PROJECT' | 'ASSESSMENT' | 'CERT'>('ALL');

  const evidenceRecords = [
    {
      id: 'ev-1',
      skill: 'NestJS Architecture',
      type: 'PROJECT',
      source: 'GitHub: skillora-microservices-core (Commit 4f8a1b)',
      date: 'Oct 4, 2026',
      hash: 'sha256:8f2a9918bc3d...',
      status: 'VERIFIED',
      metric: '94% Test Coverage with Jest Mock Interceptors',
    },
    {
      id: 'ev-2',
      skill: 'Vector Similarity & RAG Search',
      type: 'ASSESSMENT',
      source: 'Skillora Neural Proctor: Adaptive Exam #0821',
      date: 'Oct 2, 2026',
      hash: 'sha256:1a84f3310e92...',
      status: 'VERIFIED',
      metric: 'Scored 91/100 across 12 algorithmic questions',
    },
    {
      id: 'ev-3',
      skill: 'TypeScript Type-Level Programming',
      type: 'CERT',
      source: 'Skillora Verified Engineering Certificate',
      date: 'Sep 29, 2026',
      hash: 'sha256:cc99014ab182...',
      status: 'VERIFIED',
      metric: 'Issued by Skillora Workforce Ledger #1029',
    },
    {
      id: 'ev-4',
      skill: 'Docker Multi-Stage Optimization',
      type: 'PROJECT',
      source: 'Sandboxed Lab Submission: Alpine Minimization',
      date: 'Sep 25, 2026',
      hash: 'sha256:552adfe40019...',
      status: 'VERIFIED',
      metric: 'Image footprint reduced by 78% (94MB target)',
    },
  ];

  const filtered = evidenceRecords.filter((e) => {
    if (filter === 'ALL') return true;
    return e.type === filter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Verified Evidence Dossier
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Proof Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Cryptographically signed proof artifacts: code submissions, git commits, and proctored test results.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'PROJECT', 'ASSESSMENT', 'CERT'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === t
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-[#101726]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-emerald-500/20 hover:border-emerald-500/40 transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{item.skill}</h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">{item.source}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  {item.status}
                </span>
                <span className="text-xs text-zinc-500 font-mono">{item.date}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0c1220] border border-[#162136] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-zinc-300 font-mono">{item.metric}</span>
              <span className="text-zinc-500 font-mono truncate max-w-[200px]">{item.hash}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
