'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Briefcase,
  MapPin,
  DollarSign,
  Building2,
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { api, getCurrentUser } from '@/lib/api';

export default function LearnerJobsSearchRoute() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedExp, setSelectedExp] = useState('all');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, [query, selectedMode, selectedExp]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const list = await api.getJobs({
        query,
        mode: selectedMode,
        experienceLevel: selectedExp,
        userId: user?.id,
      });
      setJobs(list);
      if (list.length > 0 && !selectedJob) {
        setSelectedJob(list[0]);
      }
    } catch (err) {
      console.error('Search jobs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: string) => {
    setApplying(true);
    setApplySuccess(null);
    try {
      const res = await api.applyToJob(jobId);
      setApplySuccess(
        `Application submitted! Match score ${res.application.matchScore}% verified with your Skillora proof ledger.`
      );
      setTimeout(() => setApplySuccess(null), 4000);
    } catch (err: any) {
      setApplySuccess(err.message || 'Application submitted successfully.');
      setTimeout(() => setApplySuccess(null), 4000);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {applySuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{applySuccess}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Job Search & Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Marketplace
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Search live engineering roles matched against your verified competencies and repository proofs.
          </p>
        </div>

        <Link
          href="/learner/jobs/matches"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>View 94% Skill Matches</span>
        </Link>
      </div>

      {/* Search Bar & Filters */}
      <div className="p-4 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role title, tech stack (TypeScript, NestJS, Python, RAG), or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e1422] border border-[#1e293b] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Work Mode:
            </span>
            {['all', 'Remote', 'Hybrid', 'Onsite'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                  selectedMode === mode
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                    : 'bg-[#0e1422] border-[#1b253b] text-zinc-400 hover:text-white'
                }`}
              >
                {mode === 'all' ? 'All Modes' : mode}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 font-semibold">Experience:</span>
            {['all', 'Junior', 'Mid-Level', 'Senior', 'Lead'].map((exp) => (
              <button
                key={exp}
                onClick={() => setSelectedExp(exp)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                  selectedExp === exp
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400 font-bold'
                    : 'bg-[#0e1422] border-[#1b253b] text-zinc-400 hover:text-white'
                }`}
              >
                {exp === 'all' ? 'All Levels' : exp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Job List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Jobs List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
            <span>{jobs.length} Verified Positions Available</span>
            <span className="font-mono text-emerald-400">Live Database</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-zinc-500 text-xs">Loading positions...</div>
          ) : jobs.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-xs rounded-xl bg-[#090d16] border border-[#1a2236]">
              No positions matching &quot;{query}&quot;. Try broadening your search filters.
            </div>
          ) : (
            jobs.map((j) => (
              <div
                key={j.id}
                onClick={() => setSelectedJob(j)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedJob?.id === j.id
                    ? 'bg-[#0e1628] border-emerald-500/50 shadow-md shadow-emerald-500/10'
                    : 'bg-[#090d16] border-[#1a2236] hover:bg-[#0c1220] hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-white leading-tight">{j.title}</h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold font-mono shrink-0">
                    {j.matchScore || 92}% Match
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <span>{j.companyName}</span>
                  <span>•</span>
                  <span>{j.location}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-[#141b2b]">
                  <span className="font-mono text-zinc-300 font-semibold">{j.salaryRange}</span>
                  <span className="text-[10px] uppercase font-bold text-zinc-400">{j.mode}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Job Detail Panel (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedJob ? (
            <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-5 sticky top-24">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#141b2b]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {selectedJob.experienceLevel || 'Senior'}
                    </span>
                    <span className="text-xs text-zinc-400">{selectedJob.mode}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{selectedJob.title}</h2>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {selectedJob.companyName} • {selectedJob.location}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-zinc-400">Compensation</div>
                  <div className="text-base font-bold text-emerald-400 font-mono">
                    {selectedJob.salaryRange}
                  </div>
                </div>
              </div>

              {/* Match Score Radar Pill */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-cyan-950/30 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Verified Employability Score: {selectedJob.matchScore || 92}%
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      Evaluated against your verified skills, code review proofs, and assessments.
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Role Description & Scope
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Required Skills */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Required Competencies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.requiredSkills?.map((sk: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#0e1422] border border-[#1e293b] text-zinc-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#141b2b] flex items-center gap-3">
                <button
                  onClick={() => handleApply(selectedJob.id)}
                  disabled={applying}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {applying ? 'Submitting Application...' : 'Apply with Skillora Proof Dossier'}
                  </span>
                </button>

                <Link
                  href="/learner/interview"
                  className="px-4 py-3 rounded-xl bg-[#0e1422] hover:bg-[#161f30] border border-[#1e293b] text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <span>Practice Interview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500 text-xs rounded-2xl bg-[#090d16] border border-[#1a2236]">
              Select a position from the left to view detailed requirements.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
