'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Send,
  ShieldCheck,
} from 'lucide-react';

export default function EducatorLearnersPage() {
  const [search, setSearch] = useState('');
  const [filterCohort, setFilterCohort] = useState('ALL');
  const [interventionToast, setInterventionToast] = useState('');

  const learners = [
    {
      id: 'lrn-1',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      cohort: 'Fall 2026 AI Systems',
      progress: '82%',
      readinessScore: 84,
      assessmentAvg: '91%',
      status: 'ON_TRACK',
      weakAreas: ['Redis Cache Invalidation'],
    },
    {
      id: 'lrn-2',
      name: 'Tariq Rahman',
      email: 'tariq.r@example.com',
      cohort: 'Fall 2026 AI Systems',
      progress: '45%',
      readinessScore: 61,
      assessmentAvg: '68%',
      status: 'NEEDS_INTERVENTION',
      weakAreas: ['TypeScript Generics', 'Dependency Injection'],
    },
    {
      id: 'lrn-3',
      name: 'Elena Rostova',
      email: 'elena.r@example.com',
      cohort: 'Full-Stack Distributed Core',
      progress: '94%',
      readinessScore: 92,
      assessmentAvg: '96%',
      status: 'EXCELLING',
      weakAreas: ['None - Ready for Talent Pipeline'],
    },
  ];

  const handleDispatchIntervention = (learnerName: string) => {
    setInterventionToast(`Automated Socratic diagnostic intervention dispatched to ${learnerName}`);
    setTimeout(() => setInterventionToast(''), 4000);
  };

  const filtered = learners.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast */}
      {interventionToast && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between animate-in fade-in duration-150">
          <span>{interventionToast}</span>
          <button onClick={() => setInterventionToast('')} className="text-zinc-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Authorized Learner Roster
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Cohort Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time competency tracking and early algorithmic intervention dispatch for enrolled students.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search learners by name or email..."
            className="pl-9 pr-4 py-2 rounded-xl bg-[#090d16] border border-[#1a2236] text-xs text-white focus:outline-none focus:border-cyan-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Learner Roster Table/Cards */}
      <div className="space-y-4">
        {filtered.map((l) => (
          <div
            key={l.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{l.name}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider font-mono ${
                    l.status === 'EXCELLING'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : l.status === 'NEEDS_INTERVENTION'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  }`}
                >
                  {l.status}
                </span>
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                {l.email} • {l.cohort}
              </div>

              {/* Weak areas */}
              <div className="pt-1 flex items-center gap-2 text-xs">
                <span className="text-zinc-500 font-semibold">Identified Skill Gaps:</span>
                <div className="flex flex-wrap gap-1">
                  {l.weakAreas.map((w) => (
                    <span
                      key={w}
                      className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-zinc-300 text-[11px] font-mono"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics & Actions */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="text-center">
                <div className="text-base font-bold text-emerald-400">{l.readinessScore}/100</div>
                <div className="text-[10px] text-zinc-500">Readiness</div>
              </div>

              <div className="text-center">
                <div className="text-base font-bold text-cyan-400">{l.progress}</div>
                <div className="text-[10px] text-zinc-500">Progress</div>
              </div>

              <div className="text-center">
                <div className="text-base font-bold text-purple-400">{l.assessmentAvg}</div>
                <div className="text-[10px] text-zinc-500">Assessments</div>
              </div>

              <button
                onClick={() => handleDispatchIntervention(l.name)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Intervene</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
