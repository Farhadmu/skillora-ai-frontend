'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Users,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  XCircle,
} from 'lucide-react';

type Stage = 'New' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';

interface Candidate {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  stage: Stage;
  notes: string;
  recruiter: string;
}

export default function EmployerPipelinePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 'c-1',
      name: 'Candidate #8841 (Alex J.)',
      role: 'Full-Stack AI Systems Engineer',
      matchScore: 94,
      stage: 'Shortlisted',
      notes: 'Strong NestJS test coverage proof. Ready for interview.',
      recruiter: 'Sarah Jenkins',
    },
    {
      id: 'c-2',
      name: 'Candidate #9102 (Elena R.)',
      role: 'Backend Node.js Engineer',
      matchScore: 89,
      stage: 'Interview',
      notes: 'Technical round scheduled for Thursday 2 PM.',
      recruiter: 'Marcus Vance',
    },
    {
      id: 'c-3',
      name: 'Candidate #7419 (Tariq R.)',
      role: 'Platform Reliability Engineer',
      matchScore: 82,
      stage: 'Screening',
      notes: 'Reviewing Docker container lab submission.',
      recruiter: 'Sarah Jenkins',
    },
    {
      id: 'c-4',
      name: 'Candidate #6120 (Chen W.)',
      role: 'AI Applied Research Engineer',
      matchScore: 91,
      stage: 'Offer',
      notes: 'Formal offer extended: $165,000 + equity.',
      recruiter: 'Sarah Jenkins',
    },
  ]);

  const stages: Stage[] = [
    'New',
    'Screening',
    'Shortlisted',
    'Interview',
    'Offer',
    'Hired',
    'Rejected',
  ];

  const moveStage = (id: string, newStage: Stage) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, stage: newStage } : c)),
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Hiring Pipeline & ATS Kanban
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Recruitment Funnel
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track candidates seamlessly across all stages of recruitment with assigned recruiters and status history.
          </p>
        </div>

        <Link
          href="/employer/interviews"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
        >
          <span>Schedule Interviews</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stage Buckets (Kanban Overview) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(['Screening', 'Shortlisted', 'Interview', 'Offer'] as Stage[]).map(
          (stageName) => {
            const list = candidates.filter((c) => c.stage === stageName);

            return (
              <div
                key={stageName}
                className="p-4 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col justify-between space-y-3 min-h-[300px]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#151e30] pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                      {stageName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#111728] border border-[#1e293b] text-purple-300 text-[10px] font-mono font-bold">
                      {list.length}
                    </span>
                  </div>

                  <div className="space-y-3 mt-3">
                    {list.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-xl bg-[#0c1220] border border-[#182338] hover:border-purple-500/30 transition space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{c.name}</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-400">
                            {c.matchScore}%
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate">{c.role}</div>
                        <p className="text-[10px] text-zinc-500 italic leading-snug">{c.notes}</p>

                        <div className="pt-2 border-t border-[#141d2e] flex items-center justify-between text-[10px] font-mono">
                          <span className="text-zinc-500">Recruiter: {c.recruiter}</span>
                          <select
                            value={c.stage}
                            onChange={(e) => moveStage(c.id, e.target.value as Stage)}
                            className="bg-[#070a12] border border-[#1e293b] text-zinc-300 rounded px-1.5 py-0.5 text-[10px]"
                          >
                            {stages.map((s) => (
                              <option key={s} value={s}>
                                → {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
