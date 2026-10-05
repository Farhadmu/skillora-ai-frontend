'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle2, Award, Zap, Calendar } from 'lucide-react';

export default function SkillProgressPage() {
  const weeklyVelocity = [
    { week: 'Week 1', points: 120, skillAdded: 'TypeScript Generics' },
    { week: 'Week 2', points: 240, skillAdded: 'NestJS Dependency Injection' },
    { week: 'Week 3', points: 180, skillAdded: 'Vector Embeddings & RAG' },
    { week: 'Week 4', points: 310, skillAdded: 'Docker Multi-Stage & Redis' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Skill Growth Velocity & Trajectory
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Velocity Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Historical skill acquisition velocity and exponential mastery trajectories.
          </p>
        </div>

        <Link
          href="/learner/analytics"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition"
        >
          <span>View Deep Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Monthly Skill Delta
          </span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-2">+4 Pillars</div>
          <p className="text-[11px] text-zinc-500 mt-1">Faster than 88% of learners</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Retention Index
          </span>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-2">94.2%</div>
          <p className="text-[11px] text-zinc-500 mt-1">Socratic spaced repetition active</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Target Completion Projection
          </span>
          <div className="text-2xl font-black text-purple-400 font-mono mt-2">24 Days</div>
          <p className="text-[11px] text-zinc-500 mt-1">To 90%+ Role Readiness</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Weekly Acquisition Log</span>
        </h3>

        <div className="space-y-3">
          {weeklyVelocity.map((w) => (
            <div
              key={w.week}
              className="p-3.5 rounded-xl bg-[#0c1220] border border-[#162136] flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-white font-mono">{w.week}</span>
                <span className="text-zinc-300">{w.skillAdded}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">
                +{w.points} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
