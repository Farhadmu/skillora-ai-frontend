'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Sparkles,
} from 'lucide-react';

export default function EmployerTalentPage() {
  const [search, setSearch] = useState('');
  const [blindHiring, setBlindHiring] = useState(true);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');

  const candidates = [
    {
      id: 'cand-1',
      alias: 'Candidate #8841',
      realName: 'Alex Johnson',
      role: 'Full-Stack AI Systems Engineer',
      readinessScore: 84,
      assessmentScore: '92%',
      verifiedSkills: ['TypeScript', 'NestJS', 'RAG Pipelines', 'Docker'],
      availability: 'Immediate (2 Weeks Notice)',
      status: 'AVAILABLE',
    },
    {
      id: 'cand-2',
      alias: 'Candidate #9102',
      realName: 'Elena Rostova',
      role: 'Backend Node.js & Distributed Systems Engineer',
      readinessScore: 92,
      assessmentScore: '96%',
      verifiedSkills: ['TypeScript', 'Microservices', 'Redis', 'Jest'],
      availability: 'Available Next Month',
      status: 'SHORTLISTED',
    },
    {
      id: 'cand-3',
      alias: 'Candidate #7419',
      realName: 'Marcus Vance',
      role: 'Cloud Native & DevOps Architect',
      readinessScore: 78,
      assessmentScore: '85%',
      verifiedSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux'],
      availability: 'Immediate',
      status: 'AVAILABLE',
    },
  ];

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      c.alias.toLowerCase().includes(q) ||
      (!blindHiring && c.realName.toLowerCase().includes(q)) ||
      c.role.toLowerCase().includes(q) ||
      c.verifiedSkills.some((s) => s.toLowerCase().includes(q));
    return matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Verified Talent Directory
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Proof-Verified Pool
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Search pre-screened engineers evaluated across verified proctored drills and code repositories.
          </p>
        </div>

        {/* Blind Hiring Mode Toggle */}
        <button
          onClick={() => setBlindHiring(!blindHiring)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
            blindHiring
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-inner'
              : 'bg-[#090d16] text-zinc-400 border-[#1a2236] hover:text-white'
          }`}
          title="Zero-Bias Blind Hiring Mode"
        >
          {blindHiring ? <EyeOff className="w-4 h-4 text-purple-400" /> : <Eye className="w-4 h-4" />}
          <span>{blindHiring ? 'Blind Hiring Active (Bias Free)' : 'Blind Hiring Off'}</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search verified skills (e.g. NestJS, RAG, TypeScript)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Only verified skills displayed</span>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className="space-y-4">
        {filtered.map((candidate) => (
          <div
            key={candidate.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-white">
                  {blindHiring ? candidate.alias : candidate.realName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Proctored</span>
                </span>
              </div>

              <div className="text-xs text-zinc-400 font-mono">
                {candidate.role} • Availability: {candidate.availability}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {candidate.verifiedSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-mono"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center font-mono">
                <div className="text-lg font-bold text-emerald-400">
                  {candidate.readinessScore}/100
                </div>
                <div className="text-[10px] text-zinc-500">Readiness</div>
              </div>

              <div className="text-center font-mono">
                <div className="text-lg font-bold text-cyan-400">
                  {candidate.assessmentScore}
                </div>
                <div className="text-[10px] text-zinc-500">Assessments</div>
              </div>

              <Link
                href="/employer/matching"
                className="px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs transition"
              >
                Match with Requisition
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
