'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function TargetCareerPage() {
  const [targetRole, setTargetRole] = useState('Senior Full-Stack AI Engineer');
  const [targetReadiness, setTargetReadiness] = useState(84);

  const requirements = [
    { skill: 'TypeScript & Type-Level Metaprogramming', status: 'VERIFIED', proficiency: 92 },
    { skill: 'NestJS Clean Architecture & Dependency Injection', status: 'VERIFIED', proficiency: 88 },
    { skill: 'Vector Databases & Cosine Embedding Search', status: 'VERIFIED', proficiency: 82 },
    { skill: 'Distributed Caching & Redis Invalidation', status: 'PENDING_ASSESSMENT', proficiency: 65 },
    { skill: 'Kubernetes Container Orchestration', status: 'IN_PROGRESS', proficiency: 45 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Target Career Benchmark
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Role Alignment
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Pin your primary career destination to calibrate skill graphs, adaptive roadmaps, and interview simulators.
          </p>
        </div>

        <Link
          href="/learner/career/skill-gap"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
        >
          <span>Calculate Gap to Target</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Target Role Card */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Current Target
          </div>
          <h2 className="text-2xl font-black text-white">{targetRole}</h2>
          <p className="text-xs text-zinc-300 max-w-xl">
            Focusing on high-concurrency Node.js microservices, intelligent vector search backends, and production LLM orchestration.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#0e1424] p-4 rounded-xl border border-[#1a263c]">
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-400 font-mono">{targetReadiness}%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Readiness Score</div>
          </div>
          <div className="h-10 w-px bg-[#1e2d44]" />
          <div className="text-center">
            <div className="text-3xl font-black text-cyan-400 font-mono">3 / 5</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Verified Pillars</div>
          </div>
        </div>
      </div>

      {/* Target Role Competency Checklist */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Competency Matrix Requirements</span>
        </h3>

        <div className="space-y-3">
          {requirements.map((req) => (
            <div
              key={req.skill}
              className="p-3.5 rounded-xl bg-[#0c1220] border border-[#1a253c] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {req.status === 'VERIFIED' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-xs font-semibold text-zinc-200">{req.skill}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-[#162136] overflow-hidden">
                    <div
                      className={`h-full ${
                        req.proficiency >= 80 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${req.proficiency}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    {req.proficiency}%
                  </span>
                </div>

                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                    req.status === 'VERIFIED'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
