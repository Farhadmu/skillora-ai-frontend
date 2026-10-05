'use client';

import React from 'react';
import Link from 'next/link';
import { Map, ArrowRight, TrendingUp, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CareerPathsPage() {
  const paths = [
    {
      role: 'Staff AI Systems Architect',
      compatibility: '94% Alignment',
      transitionTime: '3-4 Months',
      skillsToAdd: ['Distributed Tracing', 'Raft Consensus', 'eBPF'],
      salary: '$180,000 - $220,000',
      reason: 'Your verified NestJS and TypeScript foundation directly ports to high-scale microservices architectures.',
    },
    {
      role: 'AI Applied Research Engineer',
      compatibility: '82% Alignment',
      transitionTime: '5-6 Months',
      skillsToAdd: ['PyTorch', 'Quantization (AWQ/GGUF)', 'Fine-Tuning (LoRA)'],
      salary: '$165,000 - $195,000',
      reason: 'Strong vector search and prompt engineering evidence provides rapid runway into model adaptation.',
    },
    {
      role: 'Lead Platform Reliability Engineer (SRE)',
      compatibility: '78% Alignment',
      transitionTime: '4-5 Months',
      skillsToAdd: ['Terraform', 'Kubernetes Operators', 'Chaos Engineering'],
      salary: '$160,000 - $190,000',
      reason: 'Docker lab completion demonstrates container maturity; infrastructure automation completes the stack.',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Alternative Career Pathways & Transitions
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Adjacent Trajectories
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Data-backed pivot trajectories calculated from your existing verified skill graph nodes.
          </p>
        </div>

        <Link
          href="/learner/career/recommendations"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1a2338] border border-[#1e293b] text-zinc-300 font-bold text-xs transition"
        >
          <span>View AI Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {paths.map((p) => (
          <div
            key={p.role}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{p.role}</h3>
                  <div className="text-xs text-emerald-400 font-mono font-semibold">{p.salary}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  {p.compatibility}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#111728] border border-[#1e293b] text-zinc-400 text-xs font-mono">
                  {p.transitionTime}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{p.reason}</p>

            <div className="pt-2 border-t border-[#151e30] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-semibold uppercase text-[10px]">Delta Skills Needed:</span>
                <div className="flex flex-wrap gap-1.5">
                  {p.skillsToAdd.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-zinc-300 text-[11px] font-mono"
                    >
                      +{s}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/learner/learning/roadmap"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold transition self-end sm:self-auto"
              >
                <span>Add Path to Roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
