'use client';

import React from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Building2, ShieldCheck } from 'lucide-react';

export default function JobMatchesPage() {
  const matches = [
    {
      id: 'jm-1',
      title: 'Senior Full-Stack AI Engineer',
      company: 'TechScale AI',
      matchScore: 94,
      whyMatch: 'Direct correspondence across 4 verified competencies: TypeScript, NestJS, Docker, and Vector Similarity.',
      missingSkills: ['Kubernetes Helm Charts'],
      howToImprove: 'Complete the Kubernetes pod lifecycle lab in the Build Hub to close this gap and raise match to 99%.',
      improveUrl: '/learner/build/coding',
      improveAction: 'Launch Kubernetes Lab',
    },
    {
      id: 'jm-2',
      title: 'Backend Node.js & Distributed Systems Architect',
      company: 'NeuralFlow Data',
      matchScore: 89,
      whyMatch: 'Strong architectural score in dependency injection and asynchronous promise pooling.',
      missingSkills: ['Redis Pub/Sub Invalidation', 'Kafka Topics'],
      howToImprove: 'Complete the Redis caching diagnostics drill to verify distributed cache invalidation skills.',
      improveUrl: '/learner/assessments',
      improveAction: 'Take Redis Diagnostics Drill',
    },
    {
      id: 'jm-3',
      title: 'AI Platform Systems Engineer',
      company: 'OmniIntelligence Labs',
      matchScore: 85,
      whyMatch: 'Verified vector search embeddings and cosine similarity benchmarks align with their data retrieval layer.',
      missingSkills: ['eBPF Observability', 'gRPC Buffers'],
      howToImprove: 'Study the gRPC communication module in Socratic AI Teacher to understand protobuf serialization.',
      improveUrl: '/learner/learning/ai-teacher',
      improveAction: 'Ask Socratic AI to Explain gRPC',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              AI Job Match Intelligence
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Zero-Bias Architecture
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Skill-by-skill compatibility matrix explaining why roles match, what is missing, and how to improve.
          </p>
        </div>

        {/* Zero-bias privacy indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090d16] border border-purple-500/30 text-purple-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Ranking strictly excludes protected demographic characteristics</span>
        </div>
      </div>

      <div className="space-y-5">
        {matches.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/30 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">
                  <span className="text-zinc-300 font-semibold">{item.company}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-base font-mono font-black">
                  {item.matchScore}% Match
                </span>
              </div>
            </div>

            {/* Why This Matches */}
            <div className="p-3.5 rounded-xl bg-[#0c1220] border border-[#162136] text-xs text-zinc-300">
              <span className="font-bold text-emerald-400">Why this matches: </span>
              {item.whyMatch}
            </div>

            {/* Missing Skills & How to Improve */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] block text-rose-400">
                  Missing Competencies:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.missingSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-rose-500/20 font-mono text-[11px]">
                      ✗ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] block text-cyan-400">
                  Actionable Strategy to Improve Match:
                </span>
                <p className="text-[11px] leading-relaxed">{item.howToImprove}</p>
              </div>
            </div>

            {/* Remediation Action Link */}
            <div className="pt-2 border-t border-[#151e30] flex justify-end">
              <Link
                href={item.improveUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition active:scale-95"
              >
                <span>{item.improveAction}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
