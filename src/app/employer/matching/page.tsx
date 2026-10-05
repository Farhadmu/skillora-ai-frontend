'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  Briefcase,
  Target,
} from 'lucide-react';

export default function EmployerMatchingPage() {
  const [selectedJob, setSelectedJob] = useState('Senior Full-Stack AI Systems Engineer');

  const matchComparisons = [
    {
      id: 'm-1',
      candidateAlias: 'Candidate #8841',
      matchScore: 94,
      whyMatched:
        'Near perfect alignment with required NestJS, TypeScript, and RAG vector search competencies. Verified project evidence demonstrates high code test coverage.',
      skillStrengths: ['TypeScript (92%)', 'NestJS Architecture (88%)', 'Vector RAG (82%)', 'Docker (85%)'],
      skillGaps: ['Kubernetes Helm Charts (Beginner, 45%)'],
      recommendation: 'Top candidate for technical interview. Strong architectural fundamentals.',
    },
    {
      id: 'm-2',
      candidateAlias: 'Candidate #9102',
      matchScore: 89,
      whyMatched:
        'Exceptional backend concurrency and Redis caching proof. Matches 4 of 5 requisition competencies.',
      skillStrengths: ['TypeScript (95%)', 'Redis Caching (90%)', 'Asynchronous Queues (88%)'],
      skillGaps: ['Vector Cosine Similarity Indexing (Pending proctored drill)'],
      recommendation: 'Highly compatible. Can close vector retrieval gap within 2 weeks.',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              AI Candidate Matching Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Competency Alignment
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Algorithmic ranking comparing verified evidence dossiers against active job requisitions without demographic bias.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090d16] border border-purple-500/30 text-purple-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Zero-Bias Fair Ranking</span>
        </div>
      </div>

      {/* Requisition Selector */}
      <div className="p-4 rounded-2xl bg-[#090d16] border border-[#1a2236] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-zinc-400">Comparing Candidates Against:</span>
          <span className="text-xs font-bold text-white font-mono">{selectedJob}</span>
        </div>
      </div>

      {/* Comparisons List */}
      <div className="space-y-4">
        {matchComparisons.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-white">{item.candidateAlias}</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-mono">
                  Verified Dossier
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-mono font-black self-start sm:self-auto">
                {item.matchScore}% Match
              </span>
            </div>

            {/* Why Matched */}
            <div className="p-3.5 rounded-xl bg-[#0c1220] border border-[#162136] text-xs text-zinc-300">
              <span className="font-bold text-purple-400">Why matched: </span>
              {item.whyMatched}
            </div>

            {/* Strengths & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] block text-emerald-400">
                  Verified Skill Strengths:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.skillStrengths.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-500/20 font-mono text-[11px]">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] block text-rose-400">
                  Skill Gaps Against Requisition:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.skillGaps.map((g) => (
                    <span key={g} className="px-2 py-0.5 rounded bg-rose-500/20 font-mono text-[11px]">
                      ✗ {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#151e30] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-zinc-400 font-mono">
                AI Rec: {item.recommendation}
              </span>

              <Link
                href="/employer/pipeline"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition self-end sm:self-auto"
              >
                <span>Add to Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
