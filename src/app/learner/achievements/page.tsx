'use client';

import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  Star,
  ExternalLink,
  Download,
  Share2,
  Lock,
  Zap,
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  category: 'VERIFIED' | 'SELF_CLAIMED';
  type: 'badge' | 'certificate' | 'milestone';
  description: string;
  issuer: string;
  date: string;
  verificationHash?: string;
  score?: string;
  iconName: string;
}

export default function AchievementsPage() {
  const [filter, setFilter] = useState<'ALL' | 'VERIFIED' | 'SELF_CLAIMED'>('ALL');

  const streakDays = 18;
  const totalVerified = 7;
  const totalSelfClaimed = 3;

  const achievements: Achievement[] = [
    {
      id: 'ach-1',
      title: 'Distributed NestJS Architecture Specialist',
      category: 'VERIFIED',
      type: 'certificate',
      description: 'Passed automated multi-service architectural assessment with 94% test coverage.',
      issuer: 'Skillora Neural Proctor #0941',
      date: 'Oct 2026',
      verificationHash: '0x8f2a...b49e',
      score: '94 / 100',
      iconName: 'ShieldCheck',
    },
    {
      id: 'ach-2',
      title: 'Full-Stack RAG & Vector Pipeline Engineer',
      category: 'VERIFIED',
      type: 'badge',
      description: 'Built and verified vector embedding ingestion with cosine similarity benchmarks.',
      issuer: 'Skillora AI Code Review Engine',
      date: 'Sep 2026',
      verificationHash: '0x3c11...912a',
      score: '91 / 100',
      iconName: 'Sparkles',
    },
    {
      id: 'ach-3',
      title: 'TypeScript Type-Level Mastery',
      category: 'VERIFIED',
      type: 'badge',
      description: 'Solved advanced recursive conditional types and template literal challenges.',
      issuer: 'Skillora Adaptive Testing Center',
      date: 'Sep 2026',
      verificationHash: '0x7e84...f102',
      score: '98 / 100',
      iconName: 'Award',
    },
    {
      id: 'ach-4',
      title: 'Docker & Microservices Deployment',
      category: 'VERIFIED',
      type: 'milestone',
      description: 'Successfully containerized and orchestrated a 4-tier application in the coding lab.',
      issuer: 'Skillora Sandbox Proctor',
      date: 'Aug 2026',
      verificationHash: '0x129f...44bc',
      score: 'Verified',
      iconName: 'Zap',
    },
    {
      id: 'ach-5',
      title: 'Frontend React Performance Optimization',
      category: 'SELF_CLAIMED',
      type: 'milestone',
      description: 'Self-reported proficiency in React Suspense, Profiler, and Web Vitals tuning.',
      issuer: 'Self-Declared (Pending Proctor)',
      date: 'Jul 2026',
      score: 'Self-Assessed (85%)',
      iconName: 'Star',
    },
    {
      id: 'ach-6',
      title: 'GraphQL API Design',
      category: 'SELF_CLAIMED',
      type: 'badge',
      description: 'Self-reported schema design and resolver batching using DataLoader.',
      issuer: 'Self-Declared (Pending Proctor)',
      date: 'Jun 2026',
      score: 'Self-Assessed (78%)',
      iconName: 'Star',
    },
  ];

  const filtered = achievements.filter((a) => {
    if (filter === 'ALL') return true;
    return a.category === filter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Achievements & Verified Proof
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Proof Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Tamper-proof verifiable credentials and self-claimed proficiencies for employer talent audits.
          </p>
        </div>

        {/* Learning Streak Banner */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 shadow-inner">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>{streakDays} Days Daily Streak</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">Top 5% Learner Consistency</div>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#090d16] border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Verified Credentials
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{totalVerified}</div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Backed by cryptographic evidence
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Self-Claimed Skills
            </span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{totalSelfClaimed}</div>
          <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Requires proctored assessment to verify
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Verification Ratio
            </span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">70.0%</div>
          <p className="text-[11px] text-cyan-400 mt-1 font-mono">
            High credibility tier for recruiters
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1a2236] pb-3">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
            filter === 'ALL'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-zinc-400 hover:text-white hover:bg-[#101726]'
          }`}
        >
          All Badges & Certs ({achievements.length})
        </button>
        <button
          onClick={() => setFilter('VERIFIED')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
            filter === 'VERIFIED'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'text-zinc-400 hover:text-white hover:bg-[#101726]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified ({totalVerified})</span>
        </button>
        <button
          onClick={() => setFilter('SELF_CLAIMED')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
            filter === 'SELF_CLAIMED'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              : 'text-zinc-400 hover:text-white hover:bg-[#101726]'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-400" />
          <span>Self-Claimed ({totalSelfClaimed})</span>
        </button>
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isVerified = item.category === 'VERIFIED';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl bg-[#090d16] border transition hover:border-zinc-700 flex flex-col justify-between ${
                isVerified ? 'border-emerald-500/25' : 'border-amber-500/20'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                        isVerified
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {isVerified ? (
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Star className="w-5 h-5 text-amber-400" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        {item.issuer} • {item.date}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-wider shrink-0 ${
                      isVerified
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {isVerified ? 'Verified' : 'Self-Claimed'}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Metadata & Action */}
              <div className="mt-4 pt-3 border-t border-[#151e30] flex items-center justify-between text-[11px]">
                {isVerified ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-mono">
                    <span className="font-bold">{item.score}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400 truncate max-w-[120px]">
                      {item.verificationHash}
                    </span>
                  </div>
                ) : (
                  <div className="text-amber-400 font-medium">
                    Take proctored assessment to upgrade to Verified
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  {isVerified ? (
                    <button
                      className="p-1.5 rounded-lg bg-[#111726] hover:bg-[#1a2338] text-zinc-400 hover:text-white transition"
                      title="Share Verifiable Credential"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href="/learner/assessments"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold transition text-[10px]"
                    >
                      Verify Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
