'use client';

import React, { useState, useEffect } from 'react';
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
  Loader2,
  AlertCircle,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { employerApi } from '@/lib/api/employer';

export default function EmployerTalentPage() {
  const [search, setSearch] = useState('');
  const [blindHiring, setBlindHiring] = useState(true);
  const [minReadiness, setMinReadiness] = useState<number>(0);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTalent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employerApi.searchTalent({
        query: search.trim() || undefined,
        minReadiness: minReadiness > 0 ? minReadiness : undefined,
      });
      setCandidates(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to load talent pool:', err);
      setError(err?.message || 'Failed to query verified talent pool from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTalent();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, minReadiness]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Verified Talent Directory
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Live Database Pool
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
            placeholder="Search by verified skills (e.g. NestJS, RAG, TypeScript)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono">Min Readiness:</span>
            <select
              value={minReadiness}
              onChange={(e) => setMinReadiness(Number(e.target.value))}
              className="px-2.5 py-1.5 rounded-lg bg-[#070a12] border border-[#1e293b] text-xs text-zinc-300 font-mono focus:outline-none focus:border-purple-500"
            >
              <option value={0}>All Levels</option>
              <option value={60}>60%+</option>
              <option value={75}>75%+</option>
              <option value={90}>90%+</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Only real learner evidence displayed</span>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-[#1a2236] text-zinc-400 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400 mx-auto" />
          <p className="text-xs font-mono">Querying MongoDB candidate pool and skill evidence...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Failed to load talent pool</span>
          </div>
          <p className="text-xs">{error}</p>
          <button
            onClick={fetchTalent}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-mono font-bold transition"
          >
            Retry Query
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && candidates.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-[#1a2236] text-zinc-400 space-y-3">
          <Users className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Matching Candidates in Database</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            No learners currently match this query with verified skill evidence. When learners enroll, submit assignments, and pass assessments, their verifiable profiles will appear here.
          </p>
        </div>
      )}

      {/* Talent Cards Grid */}
      {!loading && !error && candidates.length > 0 && (
        <div className="space-y-4">
          {candidates.map((candidate) => {
            const displayName = blindHiring
              ? `Candidate #${candidate.id?.slice(-4) || '8000'}`
              : candidate.name || 'Verified Learner';

            return (
              <div
                key={candidate.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-bold text-white">{displayName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{candidate.verifiedSkillsCount || 0} Verified Skills</span>
                    </span>
                    {candidate.targetRole && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono">
                        {candidate.targetRole}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {candidate.bio || 'Skillora-trained learner with verifiable curriculum evidence.'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(candidate.skills || []).map((s: any, idx: number) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                          s.verified
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                            : 'bg-zinc-800/40 border-zinc-700/50 text-zinc-400'
                        }`}
                        title={s.verified ? 'Verified through assessment or rubric submission' : 'Self-declared'}
                      >
                        {s.verified ? '✓ ' : ''}{s.name || s} ({s.proficiency || 80}%)
                      </span>
                    ))}
                  </div>

                  {candidate.matchExplanation && (
                    <p className="text-[11px] text-zinc-500 font-mono italic pt-1">
                      Evidence note: {candidate.matchExplanation}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-zinc-800/60">
                  <div className="text-center font-mono">
                    <div className="text-lg font-bold text-emerald-400">
                      {candidate.readinessScore || 0}/100
                    </div>
                    <div className="text-[10px] text-zinc-500">Readiness Score</div>
                  </div>

                  <Link
                    href={`/employer/pipeline`}
                    className="px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs transition flex items-center gap-1.5"
                  >
                    <span>View in Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
